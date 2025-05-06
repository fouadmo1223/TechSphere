import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { CreateArticleSchema, CreateCommentSchema, UpdateCommentSchema } from '@/utils/validationSchemas';
import { prisma } from "@/utils/db";
interface JWTPayload {
    userId: number,
    isAdmin: boolean,
    username: string
}

/**
 * @method PUT
 * @route ~/api/comments/[id]
 * @desc Update a comment
 * @access private (only comment creator or admin)
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const commentId = parseInt(params.id);
        if (isNaN(commentId)) {
            return NextResponse.json(
                { message: "Invalid comment ID" },
                { status: 400 }
            );
        }

        const data = await request.json();
        const token = request.cookies.get('token')?.value as string;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - You must login first" },
                { status: 401 }
            );
        }

        let userFromToken: JWTPayload;
        try {
            userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        } catch (error) {
            return NextResponse.json(
                { message: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        // Find the comment
        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return NextResponse.json(
                { message: "Comment not found" },
                { status: 404 }
            );
        }

        const isCreator = comment.creatorId === userFromToken.userId;
        const isAdmin = userFromToken.isAdmin;

        if (!isCreator && !isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized - You can only update your own comments" },
                { status: 403 }
            );
        }

        // Validate with Zod
        const validation = UpdateCommentSchema.safeParse(data);
        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        // Update the comment
        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: validation.data
        });

        return NextResponse.json(updatedComment, { status: 200 });

    } catch (error) {
        console.error('Error updating comment:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * @method DELETE
 * @route ~/api/comments/[id]
 * @desc Delete a comment
 * @access private (only comment creator or admin)
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const commentId = parseInt(params.id);
        if (isNaN(commentId)) {
            return NextResponse.json(
                { message: "Invalid comment ID" },
                { status: 400 }
            );
        }

        const token = request.cookies.get('token')?.value as string;
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - You must login first" },
                { status: 401 }
            );
        }

        let userFromToken: JWTPayload;
        try {
            userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        } catch (error) {
            return NextResponse.json(
                { message: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        // Find the comment
        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return NextResponse.json(
                { message: "Comment not found" },
                { status: 404 }
            );
        }

        // Check if user is authorized to delete
        const isCreator = comment.creatorId === userFromToken.userId;
        const isAdmin = userFromToken.isAdmin;

        if (!isCreator && !isAdmin) {
            return NextResponse.json(
                { message: "Unauthorized - You can only delete your own comments" },
                { status: 403 }
            );
        }

        // Delete the comment
        await prisma.comment.delete({
            where: { id: commentId }
        });

        return NextResponse.json(
            { message: "Comment deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting comment:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
