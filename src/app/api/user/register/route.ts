import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { CreateUserSchema } from "@/utils/validationSchemas";
import bcrypt from 'bcryptjs';

/**
 * @method POST
 * @route ~/api/user/register 
 * @desc  Create new user
 * @access public
 */


interface UserRegister {
    username: string;
    email: string;
    password: string
}

export async function POST(request: NextRequest) {
    try {
        const userData: UserRegister = await request.json();

        // Validate input
        const validation = CreateUserSchema.safeParse(userData);
        if (!validation.success) {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: validation.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        // Check if email already exists (optimized query)
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    message: "User already exists",
                    errors: { email: ["Email already in use"] }
                },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const token = null
        // Create user (excluding password from response)
        const newUser = await prisma.user.create({
            data: {
              username: userData.username,
              email: userData.email,
              password: hashedPassword,
              
              // image and isAdmin will use their defaults
            },
            select: {
              id: true,
              username: true,
              email: true,
              image: true,
              isAdmin: true,
              createdAt: true,
              updatedAt: true,
              articles: {
                select: {
                  id: true,
                  title: true,
                  body: true,
                  createdAt: true,
                  updatedAt: true,
                },
                orderBy: {
                  createdAt: 'desc', // Newest articles first
                },
                take: 5, // Limit to 5 most recent articles
              },
              comments: {
                select: {
                  id: true,
                  body: true,
                  createdAt: true,
                  updatedAt: true,
                  article: {
                    select: {
                      id: true,
                      title: true, // Include article title with comments
                    },
                  },
                },
                orderBy: {
                  createdAt: 'desc', // Newest comments first
                },
                take: 5, // Limit to 5 most recent comments
              },
            },
          });
      

        return NextResponse.json(
            {
                message: "User created successfully",
                user: newUser,
                token
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}