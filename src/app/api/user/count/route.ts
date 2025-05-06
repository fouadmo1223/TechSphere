import { NextResponse } from 'next/server';
import { prisma } from "@/utils/db";

/**
 * @method GET
 * @route ~/api/user/count
 * @desc Get total number of users
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.user.count();
    
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user count' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
