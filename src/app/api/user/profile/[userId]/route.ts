import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import jwt from 'jsonwebtoken';
import { UpdateUserSchema } from "@/utils/validationSchemas";
import bcrypt from 'bcryptjs';


interface Props {
    params: { userId: string }
}

/**
 * @method DELETE
 * @route ~/api/user/profile/":id
 * @desc Delete user
 * @access private
 */

interface JWTPlayLoad {
    userId: number,
    isAdmin: boolean,
    username: string
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const userId = Number(params.userId);
        if (isNaN(userId)) {
            return NextResponse.json(
                { message: "Invalid user ID" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include:{
              comments:true,
              articles:true,
            }
        })

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const token = request.cookies.get('token')?.value as string;
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - No token provided" },
                { status: 401 }
            );
        }

        let userFromToken: JWTPlayLoad;
        try {
            userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPlayLoad;
        } catch (error) {
            return NextResponse.json(
                { message: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        if (userFromToken.userId !== user.id) {
            return NextResponse.json(
                { message: "Unauthorized - You can only delete your own account" },
                { status: 403 }
            );
        }
        const deletedCommentsIds:number[] = user.comments?.map(comment=>comment.id)
        const deletedArticlesIds:number[] = user.articles?.map(article=>article.id)
        await prisma.comment.deleteMany({
          where:{
            id:{
              in:deletedCommentsIds
            }
          }
        })
        await prisma.article.deleteMany({
          where:{
            id:{
              in:deletedArticlesIds
            }
          }
        })
        await prisma.user.delete({
            where: { id: userId }
        });

        return NextResponse.json(
            { message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete user error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * @method GET
 * @route ~/api/user/profile /:id
 * @desc Get user by id
 * @access private
 */
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
      const userId = Number(params.userId);
      if (isNaN(userId)) {
          return NextResponse.json(
              { message: "Invalid user ID" },
              { status: 400 }
          );
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          username: true,
          image: true,
          isAdmin: true,
          createdAt: true,
          updatedAt: true,
          comments: {
            select: {
              id: true,
              body: true,
              updatedAt: true,
              article: {
                select: {
                  title: true,
                  creator: {  // Add creator information
                    select: {
                      username: true
                    }
                  }
                }
              }
            }
          },
          articles: true
        }
      });

      if (!user) {
          return NextResponse.json(
              { message: "User not found" },
              { status: 404 }
          );
      }

      const token = request.cookies.get('token')?.value;
      if (!token) {
          return NextResponse.json(
              { message: "Unauthorized - No token provided" },
              { status: 401 }
          );
      }

      let userFromToken: JWTPlayLoad;
      try {
          userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPlayLoad;
      } catch (error) {
          return NextResponse.json(
              { message: "Unauthorized - Invalid token" },
              { status: 401 }
          );
      }

      if (userFromToken.userId !== user.id && userFromToken.isAdmin === false) {
          return NextResponse.json(
              { message: "Unauthorized - You can only access your own account" },
              { status: 403 }
          );
      }

      return NextResponse.json(user, { status: 200 });
  } catch (error) {
      console.error("Get user error:", error);
      return NextResponse.json(
          { message: "Internal server error" },
          { status: 500 }
      );
  }
}


export async function PUT(request: NextRequest, { params }: Props) {
    try {
      const userId = Number(params.userId);
      const userData = await request.json();
  
      if (isNaN(userId)) {
        return NextResponse.json(
          { message: "Invalid user ID" },
          { status: 400 }
        );
      }
  
      // First verify the token before doing any database operations
      const token = request.cookies.get('token')?.value as string;
      if (!token) {
        return NextResponse.json(
          { message: "Unauthorized - No token provided" },
          { status: 401 }
        );
      }
  
      let userFromToken: JWTPlayLoad;
      try {
        userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPlayLoad;
      } catch (error) {
        return NextResponse.json(
          { message: "Unauthorized - Invalid token" },
          { status: 401 }
        );
      }
  
      if (userFromToken.userId !== userId) {
        return NextResponse.json(
          { message: "Unauthorized - You can only update your own account" },
          { status: 403 }
        );
      }
  
      const validation = UpdateUserSchema.safeParse(userData);
      if (!validation.success) {
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors
          },
          { status: 400 }
        );
      }
  
      // Hash the new password if it's being updated
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: userData,
        select: {
          id: true,
          email: true,
          username: true,
          image: true,
          isAdmin: true,
          createdAt: true,
          updatedAt: true,
        }
      });
  
      return NextResponse.json(
        { message: "User updated successfully", user: updatedUser },
        { status: 200 }
      );
  
    } catch (e) {
      console.error("Update user error:", e);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
