import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CreateUserFromAdminSchema } from "@/utils/validationSchemas";


interface JWTPlayLoad {
    userId: number,
    isAdmin: boolean,
    username: string
}

export async function GET(request: NextRequest) {
    try {
        // Get token from cookies
        const token = request.cookies.get('token')?.value;
        
        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }
        
        // Verify token and check if user is admin
        let userFromToken: JWTPlayLoad;
        try {
            userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPlayLoad;
        } catch (error) {
            return NextResponse.json(
                { message: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        // Only allow admin users to access this endpoint
        if (!userFromToken.isAdmin) {
            return NextResponse.json(
                { error: "Forbidden - Admin access required" },
                { status: 403 }
            );
        }

        // Parse query parameters with validation
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
        
        // Fetch users with pagination
        const users = await prisma.user.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true,
                // Exclude sensitive information
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Get total count for pagination metadata
        const totalCount = await prisma.user.count();
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            data: users,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


/**
 * @method POST
 * @route ~/api/user/ 
 * @desc  Create new user
 * @access private
 */


interface UserRegister {
    username: string;
    email: string;
    password: string,
    isAdmin?: boolean,
}

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token and check if user is admin
        let userFromToken: JWTPlayLoad;
        try {
            userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPlayLoad;
        } catch (error) {
            return NextResponse.json(
                { message: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        // Only allow admin users to access this endpoint
        if (!userFromToken.isAdmin) {
            return NextResponse.json(
                { message: "Forbidden - Admin access required" },
                { status: 403 }
            );
        }

        const userData: UserRegister = await request.json();

        // Validate input
        const validation = CreateUserFromAdminSchema.safeParse(userData);
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
        // Create user (excluding password from response)
        const newUser = await prisma.user.create({
            data: {
              username: userData.username,
              email: userData.email,
              password: hashedPassword,
              isAdmin: userData.isAdmin || false,
              
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
             
            },
          });
      

        return NextResponse.json(
            {
                message: "User created successfully",
                user: newUser,
               
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
