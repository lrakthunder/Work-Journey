import { randomUUID } from 'crypto';
import { pool } from './db';
import { JobApplication } from '@/types';

export const jobService = {
  async getJobs(userId: string) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM jobs WHERE user_id = ? ORDER BY applied_date DESC',
        [userId]
      );

      return (Array.isArray(rows) ? rows : []).map((job: any) => ({
        id: job.id,
        userId: job.user_id,
        companyName: job.company_name,
        role: job.role,
        status: job.status,
        appliedDate: job.applied_date ? new Date(job.applied_date).toISOString().split('T')[0] : '',
        followUpDate: job.follow_up_date ? new Date(job.follow_up_date).toISOString().split('T')[0] : null,
        notes: job.notes,
        location: job.location,
        salary: job.salary,
      }));
    } finally {
      connection.release();
    }
  },

  async saveJob(jobData: Partial<JobApplication> & { userId: string }) {
    const connection = await pool.getConnection();
    try {
      if (jobData.id) {
        // Update existing job
        await connection.execute(
          `UPDATE jobs SET 
            company_name = ?, role = ?, status = ?, applied_date = ?,
            follow_up_date = ?, notes = ?, location = ?, salary = ?
            WHERE id = ? AND user_id = ?`,
          [
            jobData.companyName || '',
            jobData.role || '',
            jobData.status || 'applied',
            jobData.appliedDate || new Date().toISOString().split('T')[0],
            jobData.followUpDate || null,
            jobData.notes || '',
            jobData.location || '',
            jobData.salary || '',
            jobData.id,
            jobData.userId,
          ]
        );

        return { ...jobData, id: jobData.id };
      } else {
        // Create new job
        const id = randomUUID();
        await connection.execute(
          `INSERT INTO jobs 
            (id, user_id, company_name, role, status, applied_date, follow_up_date, notes, location, salary)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            id,
            jobData.userId,
            jobData.companyName || '',
            jobData.role || '',
            jobData.status || 'applied',
            jobData.appliedDate || new Date().toISOString().split('T')[0],
            jobData.followUpDate || null,
            jobData.notes || '',
            jobData.location || '',
            jobData.salary || '',
          ]
        );

        return { ...jobData, id };
      }
    } finally {
      connection.release();
    }
  },

  async deleteJob(jobId: string, userId: string) {
    const connection = await pool.getConnection();
    try {
      await connection.execute(
        'DELETE FROM jobs WHERE id = ? AND user_id = ?',
        [jobId, userId]
      );
    } finally {
      connection.release();
    }
  }
};
