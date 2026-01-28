'use client';

import React, { useState } from 'react';
import { JobApplication, JobStatus } from '@/types';

interface ApplicationListProps {
  jobs: JobApplication[];
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ jobs, onEdit, onDelete, onAdd }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<JobStatus | 'ALL'>('ALL');

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.companyName.toLowerCase().includes(search.toLowerCase()) || 
                          j.role.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || j.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Controls with modern aesthetic */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-sm border border-emerald-50">
        <div className="flex-1 w-full md:max-w-lg relative group">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400 group-focus-within:text-emerald-600 transition-colors">🔍</span>
          <input
            type="text"
            placeholder="Search company or role..."
            className="w-full pl-14 pr-6 py-4 bg-emerald-50/30 border-none rounded-2xl focus:ring-4 focus:ring-emerald-100 outline-none transition-all font-medium text-slate-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="flex-1 md:flex-none px-6 py-4 bg-white border border-emerald-100 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:ring-4 focus:ring-emerald-100 transition-all appearance-none cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="ALL">All Statuses</option>
            <option value={JobStatus.APPLIED}>Applied</option>
            <option value={JobStatus.INTERVIEW}>Interview</option>
            <option value={JobStatus.OFFER}>Offer</option>
            <option value={JobStatus.REJECTED}>Rejected</option>
          </select>
          <button
            onClick={onAdd}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all whitespace-nowrap"
          >
            + New Hunt
          </button>
        </div>
      </div>

      {/* Grid of modernized cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-50 p-8 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all group flex flex-col relative overflow-hidden">
            {/* Organic decorative element inside card */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-50 organic-shape opacity-20 -mr-8 -mb-8 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-2xl shadow-inner group-hover:bg-white group-hover:shadow-md transition-all">
                {job.companyName.charAt(0)}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => onEdit(job)}
                  className="p-3 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl shadow-sm border border-emerald-50 transition-all"
                >
                  📝
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="p-3 bg-white text-red-500 hover:bg-red-500 hover:text-white rounded-2xl shadow-sm border border-emerald-50 transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">{job.companyName}</h4>
              <p className="text-slate-400 font-bold text-sm tracking-wide mt-1 uppercase">{job.role}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`text-[10px] px-3 py-1 rounded-full font-extrabold uppercase tracking-[0.1em] ${
                job.status === JobStatus.APPLIED ? 'bg-emerald-50 text-emerald-600' :
                job.status === JobStatus.INTERVIEW ? 'bg-teal-50 text-teal-600' :
                job.status === JobStatus.OFFER ? 'bg-emerald-600 text-white' :
                'bg-slate-50 text-slate-400'
              }`}>
                {job.status}
              </span>
              {job.salary && (
                <span className="text-[10px] px-3 py-1 rounded-full font-extrabold uppercase tracking-[0.1em] bg-slate-50 text-slate-500 border border-slate-100 flex items-center gap-1">
                  💰 {job.salary}
                </span>
              )}
            </div>

            {job.notes && (
              <div className="relative mb-8">
                <p className="text-sm font-medium text-slate-600 bg-emerald-50/50 p-5 rounded-3xl line-clamp-3 italic leading-relaxed">
                  "{job.notes}"
                </p>
              </div>
            )}

            <div className="mt-auto flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-6 border-t border-emerald-50 relative z-10">
              <div className="flex flex-col">
                <span className="opacity-50">Applied</span>
                <span className="text-slate-600">{new Date(job.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              {job.followUpDate && (
                <div className="flex flex-col items-end">
                  <span className="opacity-50">Reminder</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    🌿 {new Date(job.followUpDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-emerald-200 shadow-inner">
            <div className="text-5xl mb-6 grayscale opacity-30">🔍</div>
            <p className="text-xl font-bold text-slate-400">No applications found in this corner.</p>
            <p className="text-sm font-medium text-slate-300 mt-2 italic">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
