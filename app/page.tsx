'use client';

import React, { useState, useEffect } from 'react';
import { User, JobApplication, JobStatus } from '@/types';
import Layout, { TabType } from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import ApplicationList from '@/components/ApplicationList';
import JobModal from '@/components/JobModal';
import Auth from '@/components/Auth';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      loadJobs();
    }
  }, [user, token]);

  const loadJobs = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/jobs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Failed to load jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (loggedUser: User, authToken: string) => {
    setUser(loggedUser);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(loggedUser));
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setJobs([]);
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job: JobApplication) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteJob = async (id: string) => {
    if (!token || !window.confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        loadJobs();
      }
    } catch (error) {
      console.error('Failed to delete job', error);
    }
  };

  const handleSaveJob = async (jobData: Partial<JobApplication>) => {
    if (!token) return;
    
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });
      
      if (response.ok) {
        setIsModalOpen(false);
        loadJobs();
      } else {
        const error = await response.json();
        alert(`Error saving job: ${error.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Save job error:', error);
      alert(`Error saving job: ${error.message || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const getFilteredJobs = () => {
    switch (activeTab) {
      case 'applied':
        return jobs.filter(j => j.status === JobStatus.APPLIED);
      case 'interviews':
        return jobs.filter(j => j.status === JobStatus.INTERVIEW);
      case 'offers':
        return jobs.filter(j => j.status === JobStatus.OFFER);
      case 'closed':
        return jobs.filter(j => j.status === JobStatus.REJECTED);
      case 'applications':
        return jobs;
      default:
        return jobs;
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' ? (
        <Dashboard jobs={jobs} onAddJob={handleAddJob} />
      ) : (
        <ApplicationList 
          jobs={getFilteredJobs()} 
          onEdit={handleEditJob} 
          onDelete={handleDeleteJob} 
          onAdd={handleAddJob} 
        />
      )}

      <JobModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveJob} 
        editingJob={editingJob} 
      />
    </Layout>
  );
}
