import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { articles } from '@/utils/data';
import { CreateArticleSchema, UpdateArticleSchema } from "@/utils/validationSchemas";
import { prisma } from "@/utils/db";
interface JWTPayload {
    userId: number,
    isAdmin: boolean,
    username: string
}

/**
 * @method Get
 * @route ~/api/articles/:id
 * @desc  Get Single article
 * @access public
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } } & Record<string, any>
  ): Promise<NextResponse> {
    try {

        

        const articleId = Number(params.id);
        if (isNaN(articleId)) {
            return NextResponse.json(
                { message: "Invalid article ID" },
                { status: 400 }
            );
        }
        const article = await prisma.article.findUnique({
            where: {
                id: Number(params.id)
            }, include: {
                creator: {
                    select: {
                        username: true,
                        image: true,
                        email: true
                    }
                },
                comments: {
                    include: {
                        creator: {
                            select: {
                                username: true,
                                image: true,
                                email: true,
                                id: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });
        if (!article) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }
        return NextResponse.json(article, { status: 200 });
    } catch (e) {
        console.error("Error deleting article:", e);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


/**
 * @method Update
 * @route ~/api/articles/:id
 * @desc  Get Single article
 * @access public
 */



export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = request.cookies?.get('token');
        if (!token) {
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
        // Validate article ID
        const articleId = Number(params.id);
        if (isNaN(articleId)) {
            return NextResponse.json(
                { message: "Invalid article ID" },
                { status: 400 }
            );
        }

        // Find article
        const article = await prisma.article.findUnique({
            where: { id: articleId }
        })

        if (!article) {
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404 }
            );
        }

        if (article.creatorId !== userFromToken.userId && userFromToken.isAdmin === false) {
            return NextResponse.json(
                { message: "Unauthorized - ONly owner can edit his article " },
                { status: 401 }
            );
        }

        // Validate request body with Zod
        const requestData = await request.json();
        const validation = UpdateArticleSchema.safeParse(requestData);

        if (!validation.success) {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: validation.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        // Type-safe data after validation
        const updatedArticle = validation.data;
        await prisma.article.update({
            where: { id: articleId },
            data: updatedArticle
        })


        // Return updated article
        return NextResponse.json(
            {
                message: "Article updated successfully",
                article: updatedArticle
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating article:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
/**
 * @method Delete
 * @route ~/api/articles/:id
 * @desc  Delete Single article
 * @access public
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const token = request.cookies?.get('token');
        if (!token) {
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
        // Validate article ID
        const articleId = Number(params.id);
        if (isNaN(articleId)) {
            return NextResponse.json(
                { message: "Invalid article ID" },
                { status: 400 }
            );
        }

        // Find article
        const article = await prisma.article.findUnique({
            where: { id: articleId },
            include: {
                comments: true
            }
        })
        if (!article) {
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404 }
            );
        }
        if (article.creatorId !== userFromToken.userId && userFromToken.isAdmin === false) {
            return NextResponse.json(
                { message: "Unauthorized - ONly owner can edit his article " },
                { status: 401 }
            );
        }
        const deletedCommentsIds: number[] = article.comments?.map(comment => comment.id)
        // for(const commentId of  deletedCommentsIds){
        //     await prisma.comment.delete({
        //         where:{id:commentId}
        //     })
        // }
        await prisma.comment.deleteMany({
            where: {
                id: {
                    in: deletedCommentsIds
                }
            }
        })
        // Delete article
        const deletedArticle = await prisma.article.delete({
            where: { id: articleId },
        })

        // Return success response
        return NextResponse.json(
            {
                message: "Article deleted successfully",
                article: deletedArticle
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting article:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
