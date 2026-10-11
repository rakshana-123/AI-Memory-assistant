"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight,
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

const userTabs = [
  { label: 'All Users (1,248)', match: (u: typeof usersData[number]) => true },
  { label: 'Active (912)', match: (u: typeof usersData[number]) => u.status === 'Active' },
  { label: 'Inactive (186)', match: (u: typeof usersData[number]) => u.status === 'Inactive' },
  { label: 'Pro (324)', match: (u: typeof usersData[number]) => u.plan === 'Pro' },
  { label: 'Free (924)', match: (u: typeof usersData[number]) => u.plan === 'Free' },
  { label: 'Teams (24)', match: (u: typeof usersData[number]) => u.plan === 'Team' },
];

const planOptions = ['All Plans', 'Free', 'Pro', 'Team'];
const statusOptions = ['All Status', 'Active', 'Inactive'];
const teamOptions = ['All Teams', 'Design', 'Development', 'Product', 'Marketing', 'Research'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];

const cycleOption = (options: string[], current: string) => {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
};

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
  const [headerQuery, setHeaderQuery] = useState('');
  const [tableQuery, setTableQuery] = useState('');
  const [activeTab, setActiveTab] = useState(userTabs[0].label);
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [teamFilter, setTeamFilter] = useState('All Teams');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(usersData);
  const [newUser, setNewUser] = useState({ name: '', email: '', plan: 'Pro', team: 'Development' });
  const [chartPeriod, setChartPeriod] = useState(chartPeriodOptions[0]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const tabMatch = userTabs.find((tab) => tab.label === activeTab) ?? userTabs[0];

  const visibleUsers = usersList.filter((user) => {
    const header = headerQuery.trim().toLowerCase();
    const table = tableQuery.trim().toLowerCase();
    const matchesSearch =
      (header === '' ||
        user.name.toLowerCase().includes(header) ||
        user.email.toLowerCase().includes(header) ||
        user.team.toLowerCase().includes(header)) &&
      (table === '' ||
        user.name.toLowerCase().includes(table) ||
        user.email.toLowerCase().includes(table) ||
        user.team.toLowerCase().includes(table));
    return (
      tabMatch.match(user) &&
      matchesSearch &&
      (planFilter === 'All Plans' || user.plan === planFilter) &&
      (statusFilter === 'All Status' || user.status === statusFilter) &&
      (teamFilter === 'All Teams' || user.team === teamFilter)
    );
  });

  const isFiltered = visibleUsers.length !== usersList.length;

  const allVisibleSelected =
    visibleUsers.length > 0 && visibleUsers.every((user) => selectedIds.has(user.id));

  const toggleAllVisible = () => {
    setSelectedIds((prev) => {
      if (allVisibleSelected) {
        const next = new Set(prev);
        visibleUsers.forEach((user) => next.delete(user.id));
        return next;
      }
      const next = new Set(prev);
      visibleUsers.forEach((user) => next.add(user.id));
      return next;
    });
  };

  const toggleUser = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    const created = {
      id: Date.now(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      plan: newUser.plan,
      status: 'Active',
      team: newUser.team,
      joined: 'Just now',
      lastActive: 'Just now',
      initials: newUser.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
      bg: 'bg-blue-100 text-blue-600',
    };
    setUsersList([created, ...usersList]);
    setNewUser({ name: '', email: '', plan: 'Pro', team: 'Development' });
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-900 antialiased">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 z-10 sticky top-0 h-screen">
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

        <div className="p-4 border-t border-slate-100 mt-auto flex flex-col gap-2">
          <NextLink href="/admin/settings" className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Admin</p>
                <p className="text-[12px] text-slate-500 font-medium leading-none">Administrator</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </NextLink>
          <NextLink 
            href="/"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[12px] font-bold transition-all border border-slate-200"
          >
            <span>← Back to User View</span>
          </NextLink>
        </div>
      </aside>

      {/* Main Column */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 border-b border-slate-200/50 bg-white/70 backdrop-blur-sm sticky top-0 z-20">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={headerQuery}
              onChange={(event) => setHeaderQuery(event.target.value)}
              placeholder="Search users, email, plan, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-4 max-lg:flex-shrink-0">
            <button onClick={() => showToast('You have 3 unread notifications')} className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#F43F5E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">3</span>
            </button>
            <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1.5 pl-2 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-8 h-8 rounded-full object-cover shadow-sm" />
              <span className="text-[13px] font-bold text-slate-700">Admin</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 lg:px-8 py-6 flex gap-6 flex-col xl:flex-row pb-20">
          
          {/* Main Left Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Section */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-col max-lg:items-start max-lg:gap-4">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Users Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Manage users, roles, plans and access across Pathii.</p>
                 </div>
               </div>
               <button 
                 onClick={() => setIsAddModalOpen(true)}
                 className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[14px] font-semibold transition-colors shadow-sm"
               >
                 <Plus size={18} /> Add User
               </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
              <div className="flex items-center gap-2 max-lg:flex-wrap">
                {userTabs.map((tab) => (
                  <button 
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${activeTab === tab.label ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 max-lg:flex-wrap">
                <div className="relative flex-1 max-lg:min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={tableQuery}
                    onChange={(event) => setTableQuery(event.target.value)}
                    placeholder="Search by name, email or team..." 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-400" 
                  />
                </div>
                
                {[
                  { label: planFilter, options: planOptions, onSelect: setPlanFilter },
                  { label: statusFilter, options: statusOptions, onSelect: setStatusFilter },
                  { label: teamFilter, options: teamOptions, onSelect: setTeamFilter },
                ].map((filter) => (
                  <button 
                    key={filter.options[0]}
                    onClick={() => filter.onSelect(cycleOption(filter.options, filter.label))}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-50"
                  >
                    {filter.label} <ChevronDown size={14} className="text-slate-400" />
                  </button>
                ))}
                
                <button onClick={() => showToast('Advanced filters: plan, status, team, joined date')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-50">
                  <Filter size={14} className="text-slate-400" /> Filter
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
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
                    {visibleUsers.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-slate-400 font-medium">
                          No users found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      visibleUsers.map((user) => (
                        <tr key={user.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4"><input type="checkbox" checked={selectedIds.has(user.id)} onChange={() => toggleUser(user.id)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
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
                            <button onClick={() => showToast(`Opened actions for "${user.name}"`)} className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100"><MoreVertical size={16} /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="py-3 px-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] bg-slate-50/30">
                <span className="text-slate-500 font-medium">
                  {isFiltered
                    ? `Showing ${visibleUsers.length === 0 ? 0 : 1}–${visibleUsers.length} of ${visibleUsers.length} users`
                    : 'Showing 1–10 of 1,248 users'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"
                  >
                    &lt;
                  </button>
                  {[1, 2, 3, 4, 5].map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-transparent text-slate-600 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <span className="text-slate-400 px-1">...</span>
                  <button 
                    onClick={() => setCurrentPage(125)}
                    className="w-8 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-100 font-medium"
                  >
                    125
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    &gt;
                  </button>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-600 font-medium hover:bg-slate-50">
                  10 per page <ChevronDown size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-6">
            
            {/* User Plan Distribution */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">User Plan Distribution</h3>
              <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-4">
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
                <div className="flex flex-col gap-3 flex-1 ml-4 max-lg:ml-0 max-lg:w-full">
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
                <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-600">
                  {chartPeriod} <ChevronDown size={12} />
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
                <button onClick={() => showToast('All teams are shown above (12 total)')} className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
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
                <button onClick={() => showToast('Showing all recent user activity')} className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
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

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-bold text-slate-900">Add New User</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. rahul@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">Plan</label>
                  <select 
                    value={newUser.plan}
                    onChange={(e) => setNewUser(prev => ({ ...prev, plan: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Pro">Pro</option>
                    <option value="Team">Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">Team</label>
                  <select 
                    value={newUser.team}
                    onChange={(e) => setNewUser(prev => ({ ...prev, team: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-colors shadow-sm"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 shadow-lg rounded-xl px-4 py-3 flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
          <span className="text-[13px] font-semibold text-slate-800">{toast}</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          display: none !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          display: none !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          display: none !important;
        }
      `}} />
    </div>
  );
}
