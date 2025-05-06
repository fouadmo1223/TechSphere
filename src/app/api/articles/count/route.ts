import { NextResponse } from 'next/server';
import { prisma } from "@/utils/db";



export async function GET() {
  try {
    const count = await prisma.article.count();
    
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching article count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article count' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
