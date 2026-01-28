import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/authService';
import { jobService } from '@/lib/jobService';
import { JobApplication } from '@/types';

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

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request);
    const jobs = await jobService.getJobs(userId);
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('token') ? 401 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request);
    const jobData = await request.json() as Partial<JobApplication>;
    
    const saved = await jobService.saveJob({ ...jobData, userId });
    return NextResponse.json(saved);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes('token') ? 401 : 400 }
    );
  }
}
