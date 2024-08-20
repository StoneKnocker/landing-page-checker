import { NextResponse } from 'next/server';
import { calculatePageScore } from '@/lib/functions';

export async function POST(request: Request) {
  const { url } = await request.json();
  
  try {
    const { score, reasons } = await calculatePageScore(url);
    return NextResponse.json({ score, reasons });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to calculate page score' }, { status: 500 });
  }
}