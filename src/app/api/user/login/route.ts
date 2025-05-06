import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import {  LoginSchema } from "@/utils/validationSchemas";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {serialize} from "cookie"
import { strict } from "assert";
/**
 * @method POST
 * @route ~/api/user/login 
 * @desc  Get user
 * @access public
 */


interface UserLogin {
   
    email: string;
    password: string
}

export async function POST(request: NextRequest) {
    try {
      const loginData = await request.json();
  
      // Validate input
      const validation = LoginSchema.safeParse(loginData);
      if (!validation.success) {
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors
          },
          { status: 400 }
        );
      }
  
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email: loginData.email },
        select: {
          id: true,
          image:true,
          email: true,
          password: true,
          username: true,
          isAdmin: true,
          createdAt: true,
          updatedAt: true,
        
        }
      });
  
      if (!user) {
        return NextResponse.json(
          { message: "Wrong Credentials", errors: { email: ["No user with this email"] } },
          { status: 404 }
        );
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid credentials", errors: { password: ["Incorrect password"] } },
          { status: 401 }
        );
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin,username:user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '5d' }
      );
      const cookie = serialize('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict',
        path:'/',
        maxAge:60*60*24*7, //week
      })
      // Return user data (excluding password) and token
      return NextResponse.json(
        {
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            image:user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          } 
        },
        { status: 200,
          headers:{'Set-Cookie':cookie}
         }
      );
  
    } catch (error) {
      console.error("Login error:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }