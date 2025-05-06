import  jwt  from 'jsonwebtoken';
import { NextRequest,NextResponse } from "next/server";
import { CreateArticleSchema, CreateCommentSchema } from '@/utils/validationSchemas';
import { prisma } from "@/utils/db";



/**
 * @method GET
 * @route ~/api/comments 
 * @desc  Get Alls comments 
 * @access public
 */


interface JWTPlayLoad {
  userId: number;
  [key: string]: any;
}
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - You must login first" },
        { status: 401 }
      );
    }

    // Token verification
    let userFromToken: JWTPlayLoad;
    try {
      userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPlayLoad;
    } catch (error) {
      return NextResponse.json(
        { message: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    if (isNaN(userFromToken.userId)) {
      return NextResponse.json(
        { message: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    // Pagination parameters
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 6; // Default to 10 comments per page
    
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Page and limit must be positive numbers" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;
    
    // Get paginated comments with related data
    const [comments, totalCount] = await Promise.all([
      prisma.comment.findMany({
        skip,
        take: limit,
        include: {
          creator: {
            select: {
              username: true
            }
          },
          article: {
            select: {
              title: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc' // Newest comments first
        }
      }),
      prisma.comment.count()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      data: comments,
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
    console.error('Error getting comments:', e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/comments 
 * @desc  Create new comment
 * @access private (only logged in users )
 */

interface JWTPlayLoad {
    userId: number,
    isAdmin: boolean,
    username: string
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const token = request.cookies.get('token')?.value as string;
        if (!token) {
          return NextResponse.json(
            { message: "Unauthorized - You must login first" },
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

        if(isNaN(userFromToken.userId)){
            return NextResponse.json(
                { message: "Unauthorized - Invalid token" },
                { status: 401 }
              );
        }

        // Validate with Zod
        const validation = CreateCommentSchema.safeParse(data);

        // If validation fails, return errors
        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            return NextResponse.json({ errors }, { status: 400 });
        }

        // If valid, create the article
        const newComment = {
            body: validation.data.body,
            articleId: validation.data.articleId,
            creatorId: userFromToken.userId,
            
        };

        const addedComment = await prisma.comment.create({
            data:newComment
        });

        return NextResponse.json(
            { article: addedComment },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating Comment:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}