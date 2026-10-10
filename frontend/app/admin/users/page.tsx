"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, 
  Brain, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight,
  Filter, UserPlus, LogIn, Upload, Layers
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const statCardsData = [
  { title: 'Total Users', value: '1,248', trend: '12%', trendUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Active Users', value: '912', trend: '18%', trendUp: true, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { title: 'Inactive Users', value: '186', trend: '6%', trendUp: false, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-100' },
  { title: 'Pro Users', value: '324', trend: '28%', trendUp: true, icon: Layers, color: 'text-amber-500', bg: 'bg-amber-100' },
  { title: 'Team Workspaces', value: '24', trend: '20%', trendUp: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
];

const userGrowthData = [
  { name: 'Oct 1', newUsers: 30, activeUsers: 60 },
  { name: 'Oct 8', newUsers: 50, activeUsers: 90 },
  { name: 'Oct 15', newUsers: 40, activeUsers: 140 },
  { name: 'Oct 22', newUsers: 90, activeUsers: 120 },
  { name: 'Oct 31', newUsers: 140, activeUsers: 200 },
];

const planDistributionData = [
  { name: 'Free', value: 924, percent: '74%', fill: '#3b82f6' },
  { name: 'Pro', value: 324, percent: '26%', fill: '#a855f7' },
  { name: 'Team', value: 24, percent: '2%', fill: '#f59e0b' },
];

const topTeamsData = [
  { name: 'Development', value: 428, percent: '34%', color: 'bg-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { name: 'Design', value: 312, percent: '25%', color: 'bg-purple-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { name: 'Product', value: 246, percent: '20%', color: 'bg-emerald-400', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { name: 'Marketing', value: 162, percent: '13%', color: 'bg-amber-400', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  { name: 'Research', value: 100, percent: '8%', color: 'bg-rose-400', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
];

const usersData = [
  { id: 1, name: 'Sarah Kumar', email: 'sarah@example.com', plan: 'Pro', status: 'Active', team: 'Design', joined: 'Oct 28, 2024', lastActive: '2 min ago', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Arun Raj', email: 'arun@example.com', plan: 'Free', status: 'Active', team: 'Development', joined: 'Oct 26, 2024', lastActive: '15 min ago', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Priya Nair', email: 'priya@example.com', plan: 'Pro', status: 'Active', team: 'Product', joined: 'Oct 24, 2024', lastActive: '1 hour ago', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'Vikram S', email: 'vikram@example.com', plan: 'Team', status: 'Inactive', team: 'Marketing', joined: 'Oct 22, 2024', lastActive: '3 days ago', initials: 'VS', bg: 'bg-purple-100 text-purple-600' },
  { id: 5, name: 'Meena R', email: 'meena@example.com', plan: 'Free', status: 'Active', team: 'Research', joined: 'Oct 20, 2024', lastActive: '10 min ago', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 6, name: 'Karthik P', email: 'karthik@example.com', plan: 'Pro', status: 'Active', team: 'Development', joined: 'Oct 18, 2024', lastActive: '4 min ago', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 7, name: 'Ananya S', email: 'ananya@example.com', plan: 'Free', status: 'Inactive', team: 'Design', joined: 'Oct 16, 2024', lastActive: '7 days ago', initials: 'AS', bg: 'bg-blue-100 text-blue-600' },
  { id: 8, name: 'Rakesh M', email: 'rakesh@example.com', plan: 'Pro', status: 'Active', team: 'Product', joined: 'Oct 14, 2024', lastActive: '30 min ago', avatar: 'https://i.pravatar.cc/150?img=14' },
  { id: 9, name: 'Sneha B', email: 'sneha@example.com', plan: 'Team', status: 'Active', team: 'Marketing', joined: 'Oct 12, 2024', lastActive: '1 hour ago', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 10, name: 'John Doe', email: 'john@example.com', plan: 'Free', status: 'Active', team: 'Research', joined: 'Oct 10, 2024', lastActive: '5 min ago', initials: 'JD', bg: 'bg-rose-100 text-rose-600' },
];

const SidebarItem = ({ icon: Icon, label, active, badge, href }: any) => (
  <NextLink href={href} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px] font-bold">{badge}</span>
    )}
  </NextLink>
);

const PlanBadge = ({ plan }: any) => {
  const styles: any = {
    'Pro': 'bg-purple-100 text-purple-600',
    'Free': 'bg-blue-100 text-blue-600',
    'Team': 'bg-amber-100 text-amber-600',
  };
  return <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${styles[plan]}`}>{plan}</span>;
};

const StatusBadge = ({ status }: any) => {
  const isAct = status === 'Active';
  return (
    <div className={`inline-flex items-center gap-1.5 font-semibold text-[12px] ${isAct ? 'text-emerald-600' : 'text-rose-600'}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${isAct ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
      {status}
    </div>
  );
};

export default function UsersManagementDashboard() {
  return (
    <div className="flex h-screen bg-[#F4F7F9] font-sans overflow-hidden text-slate-900 antialiased">
      
      {}
      <aside className="w-[260px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 z-10">
        <div className="flex items-center gap-3 pt-6 pb-8 px-6">
          <div className="text-[#2563EB]">
             <Brain size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold text-slate-900 leading-tight tracking-tight">Pathii</h1>
            <p className="text-[12px] text-slate-500 font-medium">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
          <SidebarItem icon={LayoutDashboard} label="Overview" href="/admin" />
          <SidebarItem icon={Users} label="Users" active href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" href="/admin/memories" />
          <SidebarItem icon={FileText} label="Documents" href="/admin/documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" href="/admin/tasks" />
          <SidebarItem icon={Cpu} label="AI Usage" href="/admin/ai-usage" />
          <SidebarItem icon={Link} label="Integrations" href="/admin/integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" href="/admin/analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" href="/admin/reports" />
          <SidebarItem icon={Bell} label="Notifications" badge="3" href="/admin/notifications" />
          <SidebarItem icon={ShieldCheck} label="System Health" href="/admin/system-health" />
          <SidebarItem icon={Settings} label="Settings" href="/admin/settings" />
        </nav>
      </aside>

      {}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 border-b border-slate-200/50 bg-white/50 backdrop-blur-sm">
          <div className="relative w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users, email, plan, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute 1 top-1.5 right-1.5 w-4 h-4 bg-[#F43F5E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">3</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1.5 pl-2 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-8 h-8 rounded-full object-cover shadow-sm" />
              <span className="text-[13px] font-bold text-slate-700">Admin</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar flex gap-6">
          
          {}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Section */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Users Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Manage users, roles, plans and access across Pathii.</p>
                 </div>
               </div>
               <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[14px] font-semibold transition-colors shadow-sm">
                 <Plus size={18} /> Add User
               </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-5 gap-4">
              {statCardsData.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                      <stat.icon size={20} className={stat.color} />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1">{stat.value}</h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-none">{stat.title}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-[12px] font-semibold ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{stat.trend}</span>
                    <span className="text-slate-400 font-medium ml-1">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs & Filters */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                {['All Users (1,248)', 'Active (912)', 'Inactive (186)', 'Pro (324)', 'Free (924)', 'Teams (24)'].map((tab, i) => (
                  <button key={i} className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search by name, email or team..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-400" />
                </div>
                
                {['All Plans', 'All Status', 'All Teams'].map((filter, i) => (
                  <button key={i} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-50">
                    {filter} <ChevronDown size={14} className="text-slate-400" />
                  </button>
                ))}
                
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-50">
                  <Filter size={14} className="text-slate-400" /> Filter
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                      <th className="py-3 px-2 font-semibold">Name</th>
                      <th className="py-3 px-2 font-semibold">Email</th>
                      <th className="py-3 px-2 font-semibold">Plan</th>
                      <th className="py-3 px-2 font-semibold">Status</th>
                      <th className="py-3 px-2 font-semibold">Team</th>
                      <th className="py-3 px-2 font-semibold">Joined On</th>
                      <th className="py-3 px-2 font-semibold">Last Active</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {usersData.map((user) => (
                      <tr key={user.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
                        <td className="py-3 px-2 flex items-center gap-3 font-bold text-slate-900">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                          ) : (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${user.bg}`}>{user.initials}</div>
                          )}
                          {user.name}
                        </td>
                        <td className="py-3 px-2 text-slate-500 font-medium">{user.email}</td>
                        <td className="py-3 px-2"><PlanBadge plan={user.plan} /></td>
                        <td className="py-3 px-2"><StatusBadge status={user.status} /></td>
                        <td className="py-3 px-2 text-slate-500 font-medium">{user.team}</td>
                        <td className="py-3 px-2 text-slate-500 font-medium">{user.joined}</td>
                        <td className="py-3 px-2 text-slate-500 font-medium">{user.lastActive}</td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="py-3 px-5 border-t border-slate-100 flex items-center justify-between text-[13px] bg-slate-50/30">
                <span className="text-slate-500 font-medium">Showing 1–10 of 1,248 users</span>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50">&lt;</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white font-bold">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">3</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">4</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">5</button>
                  <span className="text-slate-400">...</span>
                  <button className="w-8 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">125</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50">&gt;</button>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-600 font-medium hover:bg-slate-50">
                  10 per page <ChevronDown size={14} />
                </button>
              </div>
            </div>

          </div>

          {}
          <div className="w-[340px] flex-shrink-0 flex flex-col gap-6">
            
            {/* User Plan Distribution */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">User Plan Distribution</h3>
              <div className="flex items-center justify-between">
                <div className="relative w-[140px] h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planDistributionData}
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                      >
                        {planDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[18px] font-extrabold text-slate-900 leading-none">1,248</span>
                    <span className="text-[10px] text-slate-500 font-semibold mt-1">Total Users</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-1 ml-4">
                  {planDistributionData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-slate-500 font-medium">{item.value}</span>
                         <span className="text-slate-400 font-medium w-8 text-right">({item.percent})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Growth Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-slate-900">User Growth</h3>
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-600">
                  This Month <ChevronDown size={12} />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4 text-[11px] font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> New Users</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Active Users</div>
              </div>
              <div className="h-[140px] w-full -ml-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorNewU" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActiveU" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={30} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorNewU)" />
                    <Area type="monotone" dataKey="activeUsers" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorActiveU)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Teams */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Top Teams</h3>
                <button className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>
              <div className="space-y-4">
                {topTeamsData.map((team, i) => (
                  <div key={i} className="flex items-center gap-3 text-[12px]">
                    <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${team.iconBg}`}>
                       {i === 0 && <Layers size={12} className={team.iconColor} />}
                       {i === 1 && <FileText size={12} className={team.iconColor} />}
                       {i === 2 && <CheckCircle2 size={12} className={team.iconColor} />}
                       {i === 3 && <PieChart {...({ size: 12, className: team.iconColor } as any)} />}
                       {i === 4 && <Search size={12} className={team.iconColor} />}
                    </div>
                    <span className="w-20 font-semibold text-slate-700">{team.name}</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex items-center">
                      <div className={`h-full rounded-full ${team.color}`} style={{ width: team.percent }}></div>
                    </div>
                    <div className="flex items-center gap-1.5 w-16 justify-end">
                      <span className="font-medium text-slate-500">{team.value}</span>
                      <span className="text-slate-400 font-medium">({team.percent})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent User Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent User Activity</h3>
                <button className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>
              <div className="space-y-4">
                {[
                  { user: 'Sarah Kumar', action: 'upgraded to Pro plan', time: '2 min ago', icon: ArrowUpRight, bg: 'bg-blue-100', color: 'text-blue-600' },
                  { user: 'New user registered', action: '(arun@example.com)', time: '8 min ago', icon: UserPlus, bg: 'bg-blue-50', color: 'text-blue-500' },
                  { user: 'Vikram S', action: 'logged in', time: '15 min ago', icon: LogIn, bg: 'bg-amber-100', color: 'text-amber-500' },
                  { user: 'Meena R', action: 'created a new workspace', time: '28 min ago', icon: Users, bg: 'bg-emerald-100', color: 'text-emerald-500' },
                  { user: 'Priya Nair', action: 'uploaded a document', time: '42 min ago', icon: Upload, bg: 'bg-purple-100', color: 'text-purple-500' },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${act.bg}`}>
                      <act.icon size={12} className={act.color} />
                    </div>
                    <div className="flex-1 min-w-0 text-[12px] leading-snug pt-0.5">
                      <span className="font-bold text-slate-900">{act.user}</span> <span className="text-slate-500">{act.action}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap pt-0.5">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94A3B8;
        }
      `}} />
    </div>
  );
}
