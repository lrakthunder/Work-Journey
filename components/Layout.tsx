'use client';

import React from 'react';
import { User } from '@/types';

export type TabType = 'dashboard' | 'applied' | 'applications' | 'interviews' | 'offers' | 'closed';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-emerald-50 flex flex-col hidden lg:flex relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 organic-shape -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
        
        <div className="p-8 relative z-10">
          <h1 className="text-2xl font-extrabold flex items-center gap-3 text-slate-900">
            <span className="bg-emerald-500 p-2 rounded-2xl shadow-lg shadow-emerald-500/30 text-white flex items-center justify-center transform hover:rotate-12 transition-transform cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.16 4.16a2 2 0 012.83 0l.94.94a2 2 0 11-2.83 2.83l-.94-.94a2 2 0 010-2.83zM10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM15.84 4.16a2 2 0 010 2.83l-.94.94a2 2 0 01-2.83-2.83l.94.94a2 2 0 012.83 0zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.84 15.84a2 2 0 01-2.83 0l-.94-.94a2 2 0 012.83-2.83l.94.94a2 2 0 010 2.83zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM4.16 15.84a2 2 0 010-2.83l.94-.94a2 2 0 112.83 2.83l-.94.94a2 2 0 01-2.83 0zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </span>
            Work Journey
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1 relative z-10 overflow-y-auto">
          <NavItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon="📊" 
            label="Overview" 
          />
          <NavItem 
            active={activeTab === 'applications'} 
            onClick={() => setActiveTab('applications')}
            icon="💼" 
            label="Applications" 
          />
          <NavItem 
            active={activeTab === 'applied'} 
            onClick={() => setActiveTab('applied')}
            icon="🌱" 
            label="Applied" 
          />
          <NavItem 
            active={activeTab === 'interviews'} 
            onClick={() => setActiveTab('interviews')}
            icon="🤝" 
            label="Interviews" 
          />
          <NavItem 
            active={activeTab === 'offers'} 
            onClick={() => setActiveTab('offers')}
            icon="✨" 
            label="Job Offers" 
          />
          <NavItem 
            active={activeTab === 'closed'} 
            onClick={() => setActiveTab('closed')}
            icon="🍃" 
            label="Closed" 
          />
        </nav>

        <div className="p-6 mt-auto relative z-10">
          <div className="bg-emerald-50/50 rounded-3xl p-5 border border-emerald-100/50 group hover:bg-emerald-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600 font-bold border border-emerald-100 group-hover:scale-110 transition-transform">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-emerald-600 font-medium truncate opacity-70 italic">@{user.username}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full mt-4 py-2 px-4 rounded-xl text-sm font-bold text-emerald-700 bg-white border border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header with leafy design */}
        <header className="h-24 bg-white border-b border-emerald-50 flex items-center justify-between px-10 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-40 h-40 bg-emerald-50 organic-shape -mt-20"></div>
            <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-teal-50 organic-shape -mb-16"></div>
          </div>
          
          <div className="relative z-10 flex flex-col">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'dashboard' ? 'Overview' : 
               activeTab === 'offers' ? 'Job Offers' :
               activeTab === 'applied' ? 'Applied' :
               activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-sm font-medium text-emerald-600/70">Tracking your journey on the job market</p>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-emerald-50 rounded-2xl px-4 py-2 border border-emerald-100">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
               <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Active Search</span>
            </div>
            <button className="w-12 h-12 bg-white border border-emerald-50 rounded-2xl flex items-center justify-center text-xl shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              🌿
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#fbfdfc]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-5 py-3 rounded-2xl transition-all flex items-center gap-4 group ${
      active 
        ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 translate-x-1' 
        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
    }`}
  >
    <span className={`text-xl transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
    <span className="font-bold text-sm tracking-wide">{label}</span>
    {active && (
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
    )}
  </button>
);

export default Layout;
