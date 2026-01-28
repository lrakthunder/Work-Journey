import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/authService';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = authService.verifyToken(token);
    return NextResponse.json({ userId: decoded.userId });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}
