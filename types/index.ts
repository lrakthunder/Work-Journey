export enum JobStatus {
  APPLIED = 'applied',
  INTERVIEW = 'interview',
  REJECTED = 'rejected',
  OFFER = 'offer'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  companyName: string;
  role: string;
  status: JobStatus;
  appliedDate: string;
  followUpDate: string | null;
  notes: string;
  location?: string;
  salary?: string;
}

export interface DashboardStats {
  total: number;
  applied: number;
  interviews: number;
  rejected: number;
}

export interface AuthRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
}
