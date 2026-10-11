"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link as LinkIcon, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight, 
  Brain, ArrowUpRight, ArrowDownRight, Filter, ShieldAlert,
  Calendar, Mail, HardDrive, Video, Phone, Layout, Notebook,
  CheckCircle2, AlertTriangle, XCircle, Key, Eye, Lock, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const Github = ({ size = 24, className = '' }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// Empty by default: connected integrations, their usage trend and per-app
// usage share are runtime records. Real data arrives via the Add Integration
// flow (or a future backend); demo rows live in git history.
const usageTrendData: { name: string; calls: number }[] = [
  { name: 'Oct 1', calls: 14 },
  { name: 'Oct 5', calls: 22 },
  { name: 'Oct 8', calls: 18 },
  { name: 'Oct 11', calls: 26 },
];

const usageByIntegrationData: { name: string; value: number; fill: string; percent: string }[] = [
  { name: 'Google Calendar', value: 40, fill: '#3b82f6', percent: '48%' },
  { name: 'Notion', value: 30, fill: '#8b5cf6', percent: '36%' },
  { name: 'Outlook', value: 13, fill: '#f43f5e', percent: '16%' },
];

const integrationTableData: {
  name: string; icon: any; iconBg: string; category: string; catBg: string;
  activeUsers: string; apiCalls: string; lastSynced: string; status: string; statusBg: string;
}[] = [
  { name: 'Google Calendar', icon: Calendar, iconBg: 'bg-white border shadow-sm text-blue-500', category: 'Calendar', catBg: 'bg-amber-100 text-amber-600', activeUsers: '3', apiCalls: '40', lastSynced: 'Today, 10:24 AM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Notion', icon: Notebook, iconBg: 'bg-black text-white', category: 'Productivity', catBg: 'bg-amber-100 text-amber-600', activeUsers: '2', apiCalls: '30', lastSynced: 'Yesterday, 6:22 PM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Outlook', icon: Mail, iconBg: 'bg-blue-500 text-white', category: 'Communication', catBg: 'bg-pink-100 text-pink-600', activeUsers: '1', apiCalls: '13', lastSynced: 'Today, 9:45 AM', status: 'Degraded', statusBg: 'bg-amber-100 text-amber-600' },
];

// Per-integration status feed (right column) — usage records.
const integrationStatusData: { name: string; calls: string; status: string; statusBg: string; icon: any; iconBg: string }[] = [
  { name: 'Google Calendar', calls: '40', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Calendar, iconBg: 'text-blue-500' },
  { name: 'Notion', calls: '30', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Notebook, iconBg: 'text-slate-800' },
  { name: 'Outlook', calls: '13', status: 'Degraded', statusBg: 'bg-amber-100 text-amber-600', icon: Mail, iconBg: 'text-blue-500' },
];

// Recent connect/disconnect activity feed — records.
const recentIntegrationActivity: { title: string; sub: string; time: string; icon: any; color: string; bg: string; badge: any; badgeColor: string }[] = [
  { title: 'Google Calendar connected', sub: 'Sarah Kumar', time: '2 min ago', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50 border shadow-sm', badge: CheckCircle2, badgeColor: 'text-emerald-500' },
  { title: 'Notion sync completed', sub: 'Priya Nair', time: '1 hour ago', icon: Notebook, color: 'text-slate-800', bg: 'bg-slate-100 border shadow-sm', badge: CheckCircle2, badgeColor: 'text-emerald-500' },
  { title: 'Outlook sync degraded', sub: 'Priya Nair', time: '4 hours ago', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50 border shadow-sm', badge: AlertTriangle, badgeColor: 'text-amber-500' },
];

const SidebarItem = ({ icon: Icon, label, active, badge, href }: any) => (
  <NextLink href={href} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-[#F43F5E] text-white text-[11px] font-bold">{badge}</span>
    )}
  </NextLink>
);

const StatCard = ({ icon: Icon, iconColor, iconBg, title, value, trend, trendUp, isErrorTrend }: any) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1">{value}</h3>
        <p className="text-[13px] text-slate-500 font-medium leading-none">{title}</p>
      </div>
    </div>
    {trend && (
      <div className={`flex items-center gap-1 text-[12px] font-semibold ${trendUp ? 'text-emerald-600' : (isErrorTrend ? 'text-rose-600' : 'text-rose-600')}`}>
        {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{trend}</span>
        <span className="text-slate-400 font-medium ml-1">vs last month</span>
      </div>
    )}
  </div>
);

const EmptyState = ({ icon: Icon, title, subtitle }: any) => (
  <div className="flex flex-col items-center justify-center text-center py-12">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
      <Icon size={22} className="text-slate-400" strokeWidth={2} />
    </div>
    <p className="text-[15px] font-semibold text-slate-700">{title}</p>
    <p className="text-[13px] text-slate-400 mt-1">{subtitle}</p>
  </div>
);

const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'All time', 'Today'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];

const cycleOption = (options: string[], current: string) => {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
};

export default function IntegrationsDashboard() {
  const [integrationsList, setIntegrationsList] = useState(integrationTableData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newIntegrationName, setNewIntegrationName] = useState('');
  const [newCategory, setNewCategory] = useState('Productivity');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [chartPeriod, setChartPeriod] = useState(chartPeriodOptions[0]);

  const handleAction = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const totalIntegrations = integrationsList.length;
  const activeConnectionCount = integrationsList.filter((i) => i.status === 'Active').length;
  const disconnectedCount = integrationsList.filter((i) => i.status === 'Error' || i.status === 'Degraded').length;

  const handleAddIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntegrationName.trim()) return;
    const newEntry = {
      name: newIntegrationName.trim(),
      icon: LinkIcon,
      iconBg: 'bg-blue-50 border shadow-sm text-blue-600',
      category: newCategory,
      catBg: 'bg-blue-100 text-blue-600',
      activeUsers: '1',
      apiCalls: '10',
      lastSynced: 'Just now',
      status: 'Active',
      statusBg: 'bg-emerald-100 text-emerald-600'
    };
    setIntegrationsList([newEntry, ...integrationsList]);
    setNewIntegrationName('');
    setIsAddModalOpen(false);
    handleAction(`Successfully added ${newEntry.name}!`);
  };

  const visibleIntegrations = integrationsList.filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          row.category.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesStatus = statusFilter === 'All' || row.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === visibleIntegrations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleIntegrations.map((_, i) => i));
    }
  };

  const toggleSelectRow = (idx: number) => {
    setSelectedIds(prev =>
      prev.includes(idx) ? prev.filter(id => id !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-900 antialiased">
      
      {/* Left Sidebar */}
      <aside className="w-[260px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 z-20 sticky top-0 h-screen">
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
          <SidebarItem icon={Users} label="Users" href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" href="/admin/memories" />
          <SidebarItem icon={FileText} label="Documents" href="/admin/documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" href="/admin/tasks" />
          <SidebarItem icon={Cpu} label="AI Usage" href="/admin/ai-usage" />
          <SidebarItem icon={LinkIcon} label="Integrations" active href="/admin/integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" href="/admin/analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" href="/admin/reports" />
          <SidebarItem icon={Bell} label="Notifications" href="/admin/notifications" />
          <SidebarItem icon={ShieldCheck} label="System Health" href="/admin/system-health" />
          <SidebarItem icon={Settings} label="Settings" href="/admin/settings" />
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto flex flex-col gap-2">
          <NextLink href="/admin/settings" className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[13px]">A</div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Admin</p>
                <p className="text-[12px] text-slate-500 font-medium leading-none">Administrator</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </NextLink>
          <NextLink href="/" className="text-[11.5px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-1.5 px-3 rounded-xl text-center transition-colors">
            ← Back to User View
          </NextLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 bg-white/70 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/50 max-lg:h-auto max-lg:py-3">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations, users, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-wrap">
            <button onClick={() => setDateRange(cycleOption(dateRangeOptions, dateRange))} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-slate-400" />
              {dateRange}
              <ChevronDown size={14} className="text-slate-400 ml-1" />
            </button>

            <button onClick={() => handleAction('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
            </button>
            <div onClick={() => handleAction('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px] shadow-sm border border-slate-200">A</div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-slate-700">Admin <ChevronDown size={14} className="text-slate-400" /></div>
            </div>
          </div>
        </header>

        {actionFeedback && (
          <div className="mx-8 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-bold rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{actionFeedback}</span>
            </div>
            <button onClick={() => setActionFeedback(null)} className="text-emerald-600 hover:text-emerald-900 text-xs font-semibold">✕</button>
          </div>
        )}

        <div className="flex-1 px-8 py-6 flex gap-6 flex-col xl:flex-row pb-20">
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-wrap max-lg:gap-3">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <LinkIcon size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Integrations Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Manage connected apps, monitor usage and control integrations across Pathii.</p>
                 </div>
               </div>
               <button 
                 onClick={() => setIsAddModalOpen(true)}
                 className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm shadow-blue-200 transition-all flex items-center gap-2"
               >
                 <Plus size={18} /> Add New Integration
               </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              <StatCard icon={LinkIcon} iconColor="text-purple-600" iconBg="bg-purple-100" title="Total Integrations" value={totalIntegrations} />
              <StatCard icon={Users} iconColor="text-blue-600" iconBg="bg-blue-100" title="Active Connections" value={activeConnectionCount} />
              <StatCard icon={Plus} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="New Connections" value={1} trend="+1" trendUp={true} />
              <StatCard icon={LinkIcon} iconColor="text-rose-500" iconBg="bg-rose-100" title="Disconnected" value={disconnectedCount} />
              <StatCard icon={ShieldCheck} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="Success Rate" value="98%" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
              {/* Usage Trend Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Integration Usage Trend</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Total API calls to connected apps over the last 30 days.</p>
                  </div>
                  <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    {chartPeriod} <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex-1 min-h-[220px]">
                  {usageTrendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageTrendData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => val === 0 ? '0' : `${val/1000}K`} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  ) : (
                    <EmptyState icon={BarChart2} title="No usage data yet" subtitle="API call activity will appear here once integrations are used." />
                  )}
                </div>
              </div>

              {/* Usage by Integration Donut Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-4">Usage by Integration</h3>

                {usageByIntegrationData.length > 0 ? (
                <div className="flex-1 flex items-center justify-between">
                  <div className="relative w-[140px] h-[140px] -ml-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageByIntegrationData}
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {usageByIntegrationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-1">
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">{usageByIntegrationData.reduce((sum, entry) => sum + entry.value, 0).toLocaleString('en-US')}</span>
                      <span className="text-[9px] text-slate-500 font-semibold mt-1 text-center leading-tight">Total<br/>Connections</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1 pr-2">
                    {usageByIntegrationData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-semibold text-slate-700">{item.name}</span>
                        </div>
                        <span className="text-slate-400 font-medium">({item.percent})</span>
                      </div>
                    ))}
                  </div>
                </div>
                ) : (
                  <EmptyState icon={LinkIcon} title="No usage breakdown yet" subtitle="Usage share per connected app will appear here." />
                )}
              </div>
            </div>

            {/* Integrations Table Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search integrations..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>
                
                {['All', 'Active', 'Degraded', 'Error'].map((status, i) => (
                  <button 
                    key={i} 
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${statusFilter === status ? 'bg-blue-50 border border-blue-200 text-blue-600' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                  >
                    {status}
                  </button>
                ))}
                
                {statusFilter !== 'All' && (
                  <button 
                    onClick={() => setStatusFilter('All')}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 bg-slate-50/50">
                      <th className="py-3 px-4 w-10">
                        <input 
                          type="checkbox" 
                          checked={visibleIntegrations.length > 0 && selectedIds.length === visibleIntegrations.length}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                        />
                      </th>
                      <th className="py-3 px-4 font-semibold">Integration</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Active Users</th>
                      <th className="py-3 px-4 font-semibold">API Calls (30d)</th>
                      <th className="py-3 px-4 font-semibold">Last Synced</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {integrationsList.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-2">
                          <EmptyState icon={LinkIcon} title="No integrations yet" subtitle="Apps you connect will appear here." />
                        </td>
                      </tr>
                    ) : visibleIntegrations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400 text-[13px] font-medium">
                          No integrations found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      visibleIntegrations.map((row, index) => (
                        <tr key={index} className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${selectedIds.includes(index) ? 'bg-blue-50/40' : ''}`}>
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(index)}
                              onChange={() => toggleSelectRow(index)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                            />
                          </td>
                          <td className="py-3 px-4 flex items-center gap-3 font-bold text-slate-900">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${row.iconBg}`}>
                              <row.icon size={14} />
                            </div>
                            {row.name}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${row.catBg}`}>{row.category}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-semibold">{row.activeUsers}</td>
                          <td className="py-3 px-4 text-slate-600 font-semibold">{row.apiCalls}</td>
                          <td className="py-3 px-4 text-slate-500 font-medium whitespace-nowrap">{row.lastSynced}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-max ${row.statusBg}`}>
                               <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-emerald-500' : (row.status === 'Degraded' ? 'bg-amber-500' : 'bg-rose-500')}`}></div>
                               {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button onClick={() => handleAction(`Opened actions for "${row.name}"`)} className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500 flex-wrap gap-3">
                 <span>Showing {visibleIntegrations.length === 0 ? 0 : 1}–{visibleIntegrations.length} of {integrationsList.length} integrations</span>
                 <div className="flex items-center gap-1">
                   <button 
                     onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-30"
                     disabled={currentPage === 1}
                   >
                     <ChevronDown size={14} className="rotate-90" />
                   </button>
                   {[1, 2, 3].map(page => (
                     <button
                       key={page}
                       onClick={() => setCurrentPage(page)}
                       className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-all ${
                         currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-100 text-slate-700'
                       }`}
                     >
                       {page}
                     </button>
                   ))}
                   <button 
                     onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-30"
                     disabled={currentPage === 3}
                   >
                     <ChevronDown size={14} className="-rotate-90" />
                   </button>
                 </div>
                 <div className="flex items-center gap-2">
                   <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                     10 per page <ChevronDown size={14} className="text-slate-400" />
                   </button>
                 </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Integration Status */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-bold text-slate-900">Integration Status</h3>
                  <button onClick={() => handleAction('All integration statuses are shown above')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               <div className="space-y-4">
                 {integrationStatusData.length > 0 ? integrationStatusData.map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={`w-6 h-6 rounded flex items-center justify-center ${item.iconBg}`}>
                         <item.icon size={16} />
                       </div>
                       <span className="text-[13px] font-semibold text-slate-700">{item.name}</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <span className="text-[12px] text-slate-400 font-medium">{item.calls}</span>
                       <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold w-16 text-center ${item.statusBg}`}>{item.status}</span>
                     </div>
                   </div>
                 )) : (
                   <EmptyState icon={ShieldCheck} title="No integration status yet" subtitle="Status of connected apps will appear here." />
                 )}
               </div>
            </div>

            {/* Recent Integration Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                   <h3 className="text-[16px] font-bold text-slate-900">Recent Integration Activity</h3>
                   <button onClick={() => handleAction('Showing recent integration activity')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {recentIntegrationActivity.length > 0 ? recentIntegrationActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 relative z-10 ${act.bg}`}>
                      <act.icon size={14} className={act.color} />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[1px]">
                         <act.badge size={12} className={act.badgeColor} />
                      </div>
                    </div>
                    {i !== recentIntegrationActivity.length - 1 && <div className="absolute left-4 top-8 w-px h-6 bg-slate-200"></div>}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 truncate">{act.title}</p>
                      <p onClick={() => handleAction(`Opened "${act.sub}"`)} className="text-[12px] text-blue-600 font-semibold truncate hover:underline cursor-pointer">{act.sub}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap mt-1">{act.time}</span>
                  </div>
                )) : (
                  <EmptyState icon={Calendar} title="No recent activity yet" subtitle="Integration activity will appear here." />
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-4">Quick Actions</h3>
               
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { icon: ShieldCheck, label: 'Manage Permissions' },
                   { icon: Eye, label: 'View API Logs' },
                   { icon: BarChart2, label: 'Set Usage Limits' },
                   { icon: RefreshCw, label: 'Sync All Integrations' },
                 ].map((action, i) => (
                   <button 
                     key={i} 
                     onClick={() => handleAction(`${action.label} updated successfully!`)}
                     className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 text-slate-700 rounded-xl transition-all group active:scale-95 shadow-sm"
                   >
                     <action.icon size={16} className="text-blue-600 group-hover:text-blue-700 flex-shrink-0" />
                     <span className="text-[12px] font-semibold leading-tight text-left">{action.label}</span>
                   </button>
                 ))}
               </div>
            </div>

          </div>

        </div>

        {/* Add Integration Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-slate-900">Add New Integration</h3>
                    <p className="text-[12px] text-slate-500 font-medium">Connect a new service to Pathii</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddIntegration} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1">Service / App Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asana, Linear, Dropbox"
                    value={newIntegrationName}
                    onChange={(e) => setNewIntegrationName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  >
                    <option value="Productivity">Productivity</option>
                    <option value="Communication">Communication</option>
                    <option value="Calendar">Calendar</option>
                    <option value="Storage">Storage</option>
                    <option value="Development">Development</option>
                    <option value="Meeting">Meeting</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[13px] font-bold rounded-xl shadow-sm shadow-blue-200 transition-all"
                  >
                    Connect Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {}
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