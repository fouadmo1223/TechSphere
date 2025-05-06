import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

interface JWTPayload {
  userId: number,
  isAdmin: boolean,
  username: string
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isApiRoute = path.startsWith('/api/user/profile');
  const isAdminRoute = path.startsWith('/admin');
  const isProfileRoute = path.startsWith('/profile') ||path.startsWith('/settings');
  
  // Get token from cookies (your existing code)
  const token = request.cookies.get('token')?.value;
  
  // If no token is found (your existing logic)
  if (!token) {
    if (isApiRoute || isAdminRoute || isProfileRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    } 
    return NextResponse.next();
  }
  
  try {
    // Verify token using jose instead of jsonwebtoken
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    const { payload } = await jwtVerify(token, secret);
    const userFromToken = payload as JWTPayload;
    
    // Your existing redirect logic for login/register pages
    if (path === '/login' || path === '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Your existing admin check
    if (isAdminRoute && !userFromToken.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
  } catch (error) {
    console.error(error);
    if (isApiRoute || isAdminRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/user/profile/:path*','/login','/register','/admin','/admin/:path*','/profile','/settings'],
}