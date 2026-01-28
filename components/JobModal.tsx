'use client';

import React, { useState, useEffect } from 'react';
import { JobApplication, JobStatus } from '@/types';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Partial<JobApplication>) => void;
  editingJob?: JobApplication | null;
}

const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, onSave, editingJob }) => {
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    companyName: '',
    role: '',
    status: JobStatus.APPLIED,
    appliedDate: new Date().toISOString().split('T')[0],
    followUpDate: '',
    notes: '',
    location: '',
    salary: ''
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        id: editingJob.id,
        companyName: editingJob.companyName,
        role: editingJob.role,
        status: editingJob.status,
        appliedDate: editingJob.appliedDate,
        followUpDate: editingJob.followUpDate || '',
        notes: editingJob.notes || '',
        location: editingJob.location || '',
        salary: editingJob.salary || ''
      });
    } else {
      setFormData({
        companyName: '',
        role: '',
        status: JobStatus.APPLIED,
        appliedDate: new Date().toISOString().split('T')[0],
        followUpDate: '',
        notes: '',
        location: '',
        salary: ''
      });
    }
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-emerald-950/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in duration-500">
        <div className="p-10 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/30">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {editingJob ? 'Edit Your Seed' : 'Plant a New Application'}
            </h3>
            <p className="text-sm font-medium text-emerald-600 italic">Tracking the roots of your success</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Company</label>
              <input
                required
                type="text"
                className="w-full px-6 py-4 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                placeholder="e.g. OpenAI"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Position</label>
              <input
                required
                type="text"
                className="w-full px-6 py-4 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                placeholder="e.g. Product Lead"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Pulse</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as JobStatus })}
              >
                <option value={JobStatus.APPLIED}>Applied</option>
                <option value={JobStatus.INTERVIEW}>Interview Stage</option>
                <option value={JobStatus.OFFER}>Job Offered</option>
                <option value={JobStatus.REJECTED}>Closed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Applied Date</label>
              <input
                type="date"
                className="w-full px-6 py-4 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                value={formData.appliedDate}
                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Salary Range</label>
              <input
                type="text"
                placeholder="e.g. $140k - $160k"
                className="w-full px-6 py-4 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                value={formData.salary || ''}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Follow-up Reminder</label>
              <input
                type="date"
                className="w-full px-6 py-4 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800"
                value={formData.followUpDate || ''}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Personal Notes</label>
            <textarea
              rows={3}
              className="w-full px-6 py-4 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium text-slate-800 resize-none leading-relaxed"
              placeholder="Who did you talk to? What were the key takeaways?"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 border border-emerald-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              Back to Garden
            </button>
            <button
              type="submit"
              className="flex-1 py-4 px-6 bg-emerald-600 text-white rounded-2xl font-extrabold text-lg shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all"
            >
              {editingJob ? 'Update Pulse' : 'Plant Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
