'use client';

import React from 'react';
import { JobApplication, JobStatus } from '@/types';

interface DashboardProps {
  jobs: JobApplication[];
  onAddJob: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ jobs, onAddJob }) => {
  const stats = {
    total: jobs.filter(j => j.status === JobStatus.APPLIED).length,
    interview: jobs.filter(j => j.status === JobStatus.INTERVIEW).length,
    offer: jobs.filter(j => j.status === JobStatus.OFFER).length,
    rejected: jobs.filter(j => j.status === JobStatus.REJECTED).length,
  };

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Stats Cards - Forced to 1 row on Large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Applications', value: stats.total, color: 'emerald', icon: '🌱' },
          { label: 'Interviews', value: stats.interview, color: 'teal', icon: '🤝' },
          { label: 'Job Offers', value: stats.offer, color: 'emerald', icon: '✨' },
          { label: 'Closed', value: stats.rejected, color: 'slate', icon: '🍃' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 organic-shape -mr-8 -mt-8 opacity-40 group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-2xl filter saturate-150">{stat.icon}</span>
              <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest border border-emerald-100/50">
                {stat.label}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 relative z-10 tabular-nums">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
             Recent Movements <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">{recentJobs.length}</span>
          </h3>
          <button 
            onClick={onAddJob}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4 decoration-emerald-200"
          >
            Add New Application
          </button>
        </div>
        
        {/* Recent Applications in 1 Row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {recentJobs.length > 0 ? (
            recentJobs.map(job => (
              <div key={job.id} className="bg-white rounded-[2rem] shadow-sm border border-emerald-50 p-6 hover:shadow-lg transition-all group flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-emerald-500/10 group-hover:rotate-6 transition-transform">
                    {job.companyName.charAt(0)}
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest ${
                    job.status === JobStatus.APPLIED ? 'bg-emerald-50 text-emerald-600' :
                    job.status === JobStatus.INTERVIEW ? 'bg-teal-50 text-teal-600' :
                    job.status === JobStatus.OFFER ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="mb-4 flex-1">
                  <p className="font-extrabold text-slate-800 text-base group-hover:text-emerald-700 transition-colors line-clamp-1">{job.companyName}</p>
                  <p className="text-xs font-medium text-slate-400 line-clamp-1">{job.role}</p>
                </div>
                <div className="pt-4 border-t border-emerald-50 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  <span>{new Date(job.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">View →</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-[2.5rem] border border-emerald-50">
              <p className="text-slate-400">Ready to plant some career seeds?</p>
              <button onClick={onAddJob} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-emerald-500/20">Plant First Seed</button>
            </div>
          )}
        </div>
      </div>

      {/* Career Wisdom Card - Full Width 1 Row */}
      <div className="p-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 organic-shape"></div>
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-emerald-400/10 organic-shape"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
           <div>
             <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-80">Words of Wisdom</p>
             <h4 className="text-2xl font-bold leading-tight max-w-xl italic">"The job hunt is not a sprint, it's a living ecosystem. Care for your connections, and they will bloom."</h4>
           </div>
           <div className="shrink-0 flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold">Today's Focus</p>
                <p className="text-xs opacity-70">Follow-up with connections</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl">🌿</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
