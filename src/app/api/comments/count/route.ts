import { NextResponse } from 'next/server';
import { prisma } from "@/utils/db";

/**
 * @method GET
 * @route ~/api/comments/count
 * @desc Get total number of comments
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.comment.count();
    
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comment count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comment count' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
