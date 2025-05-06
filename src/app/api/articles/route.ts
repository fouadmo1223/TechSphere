import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { CreateArticleSchema } from '@/utils/validationSchemas';
import { prisma } from "@/utils/db";


/**
 * @method GET
 * @route ~/api/articles 
 * @desc  Get Alls article 
 * @access public
 */


export async function GET(request: NextRequest) {
    try {
        // Parse query parameters with better validation
        const page = Number(request.nextUrl.searchParams.get('page')) || 1;
        const limit = Number(request.nextUrl.searchParams.get('limit')) || 6;
        
        // Validate parameters
        if (page < 1 || limit < 1) {
            return NextResponse.json(
                { error: "Page and limit must be positive numbers" },
                { status: 400 }
            );
        }

        // Calculate skip value
        const skip = (page - 1) * limit;
        
        // Get articles with pagination
        const articles = await prisma.article.findMany({
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc'}
           
        });

        // Get total count for pagination metadata
        const totalCount = await prisma.article.count();
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
            }
        }, { status: 200 });

    } catch (e) {
        console.error('Error getting articles:', e);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * @method POST
 * @route ~/api/articles 
 * @desc  Create new article
 * @access public
 */



interface JWTPayload {
    userId: number,
    isAdmin: boolean,
    username: string
}
export async function POST(request: NextRequest) {
    try {

        const token =request.cookies?.get('token');
        if(!token){
            return NextResponse.json(
                { message: "Unauthorized - You must login first" },
                { status: 401 }
            );
        }
      
        let userFromToken: JWTPayload;
        try {
            userFromToken = jwt.verify(token.value, process.env.JWT_SECRET as string) as unknown as JWTPayload;
        } catch (error) {
            return NextResponse.json(
                { message: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }
        const data = await request.json();

        // Validate with Zod
        const validation = CreateArticleSchema.safeParse(data);

        // If validation fails, return errors
        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        // If valid, create the article
        const newArticle = {
            body: validation.data.body,
            title: validation.data.title,
            creatorId:userFromToken.userId
        };

        const addedArticle = await prisma.article.create({
            data: newArticle
        });

        return NextResponse.json(
            { article: addedArticle },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}