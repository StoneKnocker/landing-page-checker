import { NextResponse } from 'next/server';
import { calculatePageScore } from '@/lib/functions';

export async function POST(request: Request) {
  const { url } = await request.json();
  
  try {
    const score = await calculatePageScore(url);
    return NextResponse.json({ score });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate page score' }, { status: 500 });
  }
}
