import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/authService';
import { jobService } from '@/lib/jobService';

function getUserIdFromToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  try {
    const decoded = authService.verifyToken(token);
    return decoded.userId;
  } catch {
    throw new Error('Invalid token');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromToken(request);
    await jobService.deleteJob(params.id, userId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('token') ? 401 : 500 }
    );
  }
}
