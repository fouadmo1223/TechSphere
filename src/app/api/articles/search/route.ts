
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { CreateArticleSchema } from '@/utils/validationSchemas';
import { prisma } from "@/utils/db";

/**
 * @method Get
 * @route ~/api/articles/search?searchText =
 * @desc  Search in Articles
 * @access public
 */

export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText")?.trim();
        const page = Number(request.nextUrl.searchParams.get("page")) || 1;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 6;

        // Validate pagination parameters
        if (page < 1 || limit < 1) {
            return NextResponse.json(
                { message: "Page and limit must be positive numbers" },
                { status: 400 }
            );
        }

        const skip = (page - 1) * limit;
        let articles;
        let totalCount;

        if (searchText) {
            // Search with text (case-insensitive, contains match)
            [articles, totalCount] = await Promise.all([
                prisma.article.findMany({
                    where: {
                        OR: [
                            { title: { contains: searchText, mode: 'insensitive' } },
                            { body: { contains: searchText, mode: 'insensitive' } }
                        ]
                    },
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.article.count({
                    where: {
                        OR: [
                            { title: { contains: searchText, mode: 'insensitive' } },
                            { body: { contains: searchText, mode: 'insensitive' } }
                        ]
                    }
                })
            ]);
        } else {
            // Get all articles without search
            [articles, totalCount] = await Promise.all([
                prisma.article.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma.article.count()
            ]);
        }

        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            data: articles,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            },
            searchText: searchText || undefined
        }, { status: 200 });

    } catch (e) {
        console.error('Error fetching articles:', e);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}