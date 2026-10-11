"use client";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Database, FileText, CalendarCheck,
  Cpu, Link as LinkIcon, BarChart2, FileSpreadsheet, Bell, ShieldCheck,
  Settings, Search, ChevronDown, ChevronRight,
  Brain, ArrowUpRight, ArrowDownRight, Bot, MessageSquare, Clock,
  Coins, Star, CheckCircle2,
  Lightbulb, Filter, Settings2, Download
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

type UsagePoint = { name: string; requests: number };

const usageTrendData: UsagePoint[] = [
  { name: 'Oct 1', requests: 3 },
  { name: 'Oct 5', requests: 5 },
  { name: 'Oct 8', requests: 4 },
  { name: 'Oct 11', requests: 6 },
];

type FeatureSlice = { name: string; value: number; fill: string; percent: string };

const featureUsageData: FeatureSlice[] = [
  { name: 'AI Chat Assistant', value: 9, fill: '#3b82f6', percent: '47%' },
  { name: 'Summarization', value: 6, fill: '#8b5cf6', percent: '32%' },
  { name: 'Voice Processing', value: 4, fill: '#10b981', percent: '21%' },
];

const costBreakdownData: FeatureSlice[] = [
  { name: 'AI Chat Assistant', value: 96, fill: '#3b82f6', percent: '50%' },
  { name: 'Summarization', value: 60, fill: '#8b5cf6', percent: '31%' },
  { name: 'Voice Processing', value: 36, fill: '#10b981', percent: '19%' },
];

// Model usage shares are usage records (not a static catalog) — empty until real traffic exists.
type ModelUsage = { name: string; percent: number; bg: string };

const modelUsageData: ModelUsage[] = [
  { name: 'GPT-4o mini', percent: 48, bg: 'bg-blue-500' },
  { name: 'Gemini 1.5 Flash', percent: 34, bg: 'bg-purple-500' },
  { name: 'Whisper (STT)', percent: 18, bg: 'bg-emerald-500' },
];

type TopUser = { rank: number; name: string; initials: string; bg: string; requests: number; percent: number; color: string };

const topUsersData: TopUser[] = [
  { rank: 1, name: 'Sarah Kumar', initials: 'SK', bg: 'bg-purple-100 text-purple-600', requests: 8, percent: 44, color: 'bg-blue-500' },
  { rank: 2, name: 'Priya Nair', initials: 'PN', bg: 'bg-emerald-100 text-emerald-600', requests: 6, percent: 33, color: 'bg-purple-500' },
  { rank: 3, name: 'Arun Raj', initials: 'AR', bg: 'bg-blue-100 text-blue-600', requests: 4, percent: 23, color: 'bg-emerald-500' },
];

type FeaturePerformance = { feature: string; icon: any; color: string; bg: string; requests: number; avgTime: string; success: string };

const featurePerformanceData: FeaturePerformance[] = [
  { feature: 'AI Chat Assistant', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100', requests: 9, avgTime: '1.8s', success: '98.5%' },
  { feature: 'Summarization', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-100', requests: 6, avgTime: '2.4s', success: '97.8%' },
  { feature: 'Voice Processing', icon: Bot, color: 'text-emerald-500', bg: 'bg-emerald-100', requests: 4, avgTime: '3.1s', success: '96.2%' },
];

type ActivityRow = {
  num: string; icon: any; color: string; bg: string; prompt: string; feature: string;
  user: string; initials: string; avatarColor: string; tokens: string;
  time: string; status: string; timeAgo: string;
};

const recentActivityData: ActivityRow[] = [
  { num: '01', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-100', prompt: 'Summarize meeting notes', feature: 'Summarization', user: 'Sarah Kumar', initials: 'SK', avatarColor: 'bg-purple-100 text-purple-600', tokens: '1.2K', time: '2.1s', status: 'Success', timeAgo: '2 min ago' },
  { num: '02', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100', prompt: 'What do I have scheduled this week?', feature: 'AI Chat Assistant', user: 'Priya Nair', initials: 'PN', avatarColor: 'bg-emerald-100 text-emerald-600', tokens: '856', time: '1.8s', status: 'Success', timeAgo: '18 min ago' },
  { num: '03', icon: Bot, color: 'text-emerald-500', bg: 'bg-emerald-100', prompt: 'Transcribe voice note', feature: 'Voice Processing', user: 'Arun Raj', initials: 'AR', avatarColor: 'bg-blue-100 text-blue-600', tokens: '2.4K', time: '3.2s', status: 'Success', timeAgo: '1 hour ago' },
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

const StatCard = ({ icon: Icon, iconColor, iconBg, title, value, subValue, trend, trendUp, isCurrency }: any) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1 flex items-center">
          {isCurrency && <span className="font-semibold mr-0.5">₹</span>}
          {typeof value === 'number' ? value.toLocaleString('en-US') : value}
        </h3>
        <p className="text-[13px] text-slate-500 font-medium leading-none">{title}</p>
      </div>
    </div>
    {trend && (
      <div className={`flex items-center gap-1 text-[12px] font-semibold ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
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

const timeRangeOptions = ['Today', '7 days', 'Last 30 days'];
const chartGranularityOptions = ['Daily', 'Weekly', 'Monthly'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];

const cycleOption = (options: string[], current: string) => {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
};

const downloadCsv = (filename: string, rows: (string | number)[][]) => {
  const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [featureFilter, setFeatureFilter] = useState('All Features');
  const [period, setPeriod] = useState('Last 30 days');
  const [chartGranularity, setChartGranularity] = useState('Daily');
  const [chartPeriod, setChartPeriod] = useState('This Month');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const totalAiRequests = usageTrendData.reduce((sum, point) => sum + point.requests, 0);
  const activeAiUsers = topUsersData.length;
  const featureUsageTotal = featureUsageData.reduce((sum, slice) => sum + slice.value, 0);
  const totalCost = costBreakdownData.reduce((sum, slice) => sum + slice.value, 0);
  const totalPages = Math.max(1, Math.ceil(recentActivityData.length / 5));

  const visibleActivity = recentActivityData.filter((row) => {
    const matchesSearch =
      row.prompt.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      row.user.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      row.feature.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesFeature =
      featureFilter === 'All Features' || row.feature === featureFilter;
    return matchesSearch && matchesFeature;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === visibleActivity.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleActivity.map((_, i) => i));
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
          <SidebarItem icon={Bot} label="AI Usage" active href="/admin/ai-usage" />
          <SidebarItem icon={LinkIcon} label="Integrations" href="/admin/integrations" />
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
      <main className="flex-1 flex flex-col min-w-0 min-h-screen pb-20">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 sticky top-0 z-20 bg-[#F4F7F9]/95 backdrop-blur-sm border-b border-slate-200/40">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, prompts, features, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-wrap">
            <button onClick={() => setPeriod(cycleOption(timeRangeOptions, period))} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-slate-400" />
              {period}
              <ChevronDown size={14} className="text-slate-400 ml-1" />
            </button>

            <button onClick={() => showToast('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
            </button>
            <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px] shadow-sm border border-slate-200">A</div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-slate-700">Admin <ChevronDown size={14} className="text-slate-400" /></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 pt-4 flex flex-col xl:flex-row gap-6">
          
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between max-lg:flex-wrap max-lg:gap-3">
               <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex-1">
                 <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">
                    <Bot size={28} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">AI Usage</h2>
                   <p className="text-[13px] text-slate-500 font-medium mt-0.5">Monitor and analyze AI feature usage, model performance and costs across Pathii.</p>
                 </div>
               </div>
               <div className="ml-4 max-lg:ml-0 flex items-center gap-2">
                  {['Today', '7 days', 'Last 30 days'].map((p) => (
                    <button 
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors ${period === p ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      {p}
                    </button>
                  ))}
               </div>
            </div>

            {/* Stat Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              <StatCard icon={MessageSquare} iconColor="text-purple-500" iconBg="bg-purple-100" title="Total AI Requests" value={totalAiRequests} />
              <StatCard icon={Users} iconColor="text-blue-500" iconBg="bg-blue-100" title="Active Users" value={activeAiUsers} />
              <StatCard icon={Clock} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="Avg Response Time" value="2.1s" />
              <StatCard icon={Coins} iconColor="text-amber-500" iconBg="bg-amber-100" title="Estimated Cost" value={totalCost} isCurrency={true} />
              <StatCard icon={Star} iconColor="text-pink-500" iconBg="bg-pink-100" title="Success Rate" value="98.5%" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
              {/* AI Usage Trend Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">AI Usage Trend</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Total AI requests over the last 30 days.</p>
                  </div>
                  <button onClick={() => setChartGranularity(cycleOption(chartGranularityOptions, chartGranularity))} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    {chartGranularity} <ChevronDown size={14} />
                  </button>
                </div>
                {usageTrendData.length > 0 ? (
                <div className="flex-1 min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageTrendData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                ) : (
                  <EmptyState icon={BarChart2} title="No usage yet" subtitle="AI request activity will appear here." />
                )}
              </div>

              {/* Usage by AI Feature Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-4">Usage by AI Feature</h3>
                {featureUsageData.length > 0 ? (
                <div className="flex-1 flex items-center justify-between">
                  <div className="relative w-[140px] h-[140px] ml-4 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={featureUsageData}
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {featureUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">{featureUsageTotal.toLocaleString('en-US')}</span>
                      <span className="text-[9px] text-slate-500 font-semibold mt-1 text-center leading-tight">Total<br/>Requests</span>
                    </div>
                  </div>

                  <div className="w-full ml-8 flex flex-col gap-2">
                    {featureUsageData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-semibold text-slate-700">{item.name}</span>
                        </div>
                          <div className="flex items-center gap-3">
                           <span className="text-slate-500 font-medium">{item.value.toLocaleString('en-US')}</span>
                           <span className="text-slate-400 font-medium w-9 text-right">({item.percent})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                ) : (
                  <EmptyState icon={Cpu} title="No data yet" subtitle="Feature usage breakdown will appear here." />
                )}
              </div>
            </div>

            {/* Top Users & Feature Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
               {/* Top Users */}
               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                 <h3 className="text-[16px] font-bold text-slate-900 mb-5">Top Users by AI Usage</h3>
                 <div className="flex flex-col gap-4">
                   {topUsersData.length > 0 ? topUsersData.map((user, i) => (
                     <div key={i} className="flex items-center gap-4">
                       <span className="text-[12px] font-bold text-slate-400 w-3">{user.rank}</span>
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${user.bg}`}>{user.initials}</div>
                       <div className="flex-1 min-w-0 flex items-center justify-between">
                         <div className="min-w-[100px]">
                           <p className="text-[13px] font-bold text-slate-900 truncate">{user.name}</p>
                           <p className="text-[12px] text-slate-500 font-medium">{user.requests.toLocaleString('en-US')} requests</p>
                         </div>
                         <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden mx-4">
                           <div className={`h-full rounded-full ${user.color}`} style={{ width: `${user.percent * 3}%` }}></div>
                         </div>
                         <span className="text-[13px] font-medium text-slate-400 w-8 text-right">{user.percent}%</span>
                       </div>
                     </div>
                   )) : (
                     <EmptyState icon={Users} title="No AI usage yet" subtitle="Top users will appear here once AI features are used." />
                   )}
                 </div>
               </div>

               {/* Feature Performance Table */}
               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                 <h3 className="text-[16px] font-bold text-slate-900 mb-5">AI Feature Performance</h3>
                 <div className="overflow-hidden">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                         <th className="pb-3 font-semibold">Feature</th>
                         <th className="pb-3 font-semibold text-right">Requests</th>
                         <th className="pb-3 font-semibold text-right">Avg. Response Time</th>
                         <th className="pb-3 font-semibold text-right">Success Rate</th>
                       </tr>
                     </thead>
                     <tbody className="text-[13px]">
                       {featurePerformanceData.length === 0 ? (
                         <tr>
                           <td colSpan={4} className="py-2">
                             <EmptyState icon={Cpu} title="No performance data yet" subtitle="Feature metrics will appear here as AI features are used." />
                           </td>
                         </tr>
                       ) : (
                       featurePerformanceData.map((item, i) => (
                         <tr key={i} className="border-b border-slate-50 last:border-0">
                           <td className="py-2.5 flex items-center gap-3 font-bold text-slate-700">
                             <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                               <item.icon size={13} className={item.color} />
                             </div>
                             {item.feature}
                           </td>
                           <td className="py-2.5 text-right font-medium text-slate-500">{item.requests.toLocaleString('en-US')}</td>
                           <td className="py-2.5 text-right font-medium text-slate-500">{item.avgTime}</td>
                           <td className="py-2.5 text-right font-bold text-emerald-500">{item.success}</td>
                         </tr>
                       ))
                       )}
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>

            {}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-slate-900">Recent AI Activity</h3>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search prompts, users or content..." 
                      className="w-[240px] pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                    />
                  </div>
                  
                  {['All Features', 'Voice Processing', 'AI Chat Assistant', 'Summarization'].map((filter, i) => (
                    <button 
                      key={i} 
                      onClick={() => setFeatureFilter(filter)}
                      className={`px-3 py-1.5 border rounded-lg text-[12px] font-semibold flex items-center gap-2 transition-colors ${featureFilter === filter ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                    >
                      {filter}
                    </button>
                  ))}
                  
                  {featureFilter !== 'All Features' && (
                    <button 
                      onClick={() => setFeatureFilter('All Features')}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10">
                        <input 
                          type="checkbox" 
                          checked={visibleActivity.length > 0 && selectedIds.length === visibleActivity.length}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                        />
                      </th>
                      <th className="py-3 px-4 font-semibold">Type</th>
                      <th className="py-3 px-4 font-semibold">Prompt / Input</th>
                      <th className="py-3 px-4 font-semibold">Feature</th>
                      <th className="py-3 px-4 font-semibold">User</th>
                      <th className="py-3 px-4 font-semibold">Tokens</th>
                      <th className="py-3 px-4 font-semibold">Response Time</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {recentActivityData.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-2">
                          <EmptyState icon={Cpu} title="No AI activity yet" subtitle="AI requests will appear here as features are used." />
                        </td>
                      </tr>
                    ) : visibleActivity.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-slate-400 text-[13px] font-medium">
                          No AI activity matching your search criteria.
                        </td>
                      </tr>
                    ) : (
                      visibleActivity.map((row, index) => (
                        <tr key={index} className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${selectedIds.includes(index) ? 'bg-blue-50/40' : ''}`}>
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(index)}
                              onChange={() => toggleSelectRow(index)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                            />
                          </td>
                          <td className="py-3 px-4">
                             <div className="flex items-center gap-2 text-slate-400 font-semibold text-[12px]">
                               {row.num}
                               <div className={`w-6 h-6 rounded flex items-center justify-center ${row.bg}`}>
                                 <row.icon size={13} className={row.color} />
                               </div>
                             </div>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-800">{row.prompt}</td>
                          <td className="py-3 px-4 text-slate-500 font-medium">{row.feature}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 font-semibold text-slate-700">
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${row.avatarColor}`}>{row.initials}</div>
                               {row.user}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-medium">{row.tokens}</td>
                          <td className="py-3 px-4 text-slate-500 font-medium">{row.time}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-400 font-medium text-[12px]">{row.timeAgo}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 flex items-center justify-between text-[13px] font-medium text-slate-500 flex-wrap gap-3">
                 <span>Showing {visibleActivity.length === 0 ? 0 : 1}–{visibleActivity.length} of {recentActivityData.length} requests</span>
                 <div className="flex items-center gap-1">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="rotate-90" /></button>
                   {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNum) => (
                     <button key={pageNum} className={`w-8 h-8 flex items-center justify-center rounded-lg ${pageNum === 1 ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 font-semibold text-slate-700'}`}>{pageNum}</button>
                   ))}
                   {totalPages > 5 && (
                     <>
                       <span className="px-1 text-slate-400">...</span>
                       <button className="w-[50px] h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">{totalPages.toLocaleString('en-US')}</button>
                     </>
                   )}
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="-rotate-90" /></button>
                 </div>
                 <div className="flex items-center gap-2">
                   <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                     5 per page <ChevronDown size={14} className="text-slate-400" />
                   </button>
                 </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6 h-fit sticky top-24">
            
            {/* Model Usage */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[16px] font-bold text-slate-900 mb-5">Model Usage</h3>
              <div className="flex flex-col gap-4">
                {modelUsageData.length > 0 ? modelUsageData.map((model, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-slate-700 w-28 flex-shrink-0">{model.name}</span>
                    <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${model.bg}`} style={{ width: `${model.percent}%` }}></div>
                    </div>
                    <span className="text-[12px] font-medium text-slate-400 w-8 text-right">{model.percent}%</span>
                  </div>
                )) : (
                  <EmptyState icon={Cpu} title="No model usage yet" subtitle="Request share per AI model will appear here." />
                )}
              </div>
            </div>

            {/* API Cost Breakdown Donut */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-[16px] font-bold text-slate-900">API Cost Breakdown</h3>
                 <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 transition-colors">
                    {chartPeriod} <ChevronDown size={14} />
                 </button>
              </div>
              <div className="mb-4">
                 <h4 className="text-[24px] font-extrabold text-slate-900 flex items-center tracking-tight">₹{totalCost.toLocaleString('en-US')}</h4>
                 <p className="text-[12px] text-slate-500 font-medium">Total Cost (Estimated)</p>
              </div>
              
              {costBreakdownData.length > 0 ? (
              <div className="flex items-center justify-between">
                <div className="relative w-[110px] h-[110px] flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdownData}
                        innerRadius={35}
                        outerRadius={55}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 ml-4 flex flex-col gap-1.5">
                  {costBreakdownData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <span className="text-slate-500 font-medium">₹{item.value}</span>
                         <span className="text-slate-400 font-medium w-8 text-right">({item.percent})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              ) : (
                <EmptyState icon={Coins} title="No costs yet" subtitle="Cost breakdown will appear here once AI features are used." />
              )}
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Lightbulb size={18} className="text-blue-500" />
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900 leading-none mb-0.5">AI Insights</h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-none">Key Insights for Admin</p>
                  </div>
                </div>
                <button onClick={() => showToast('All AI insights for this period are shown')} className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <EmptyState icon={Lightbulb} title="No insights yet" subtitle="Insights will appear as AI usage grows." />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-4">Quick Actions</h3>
               
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { icon: BarChart2, label: 'View Full Reports' },
                   { icon: Settings2, label: 'Manage AI Models' },
                   { icon: ShieldCheck, label: 'Set Usage Limits' },
                   { icon: Download, label: 'Export AI Usage' },
                 ].map((action, i) => (
                   <button
                     key={i}
                     onClick={() => {
                       if (action.label === 'View Full Reports') router.push('/admin/reports');
                       else if (action.label === 'Manage AI Models') showToast('AI model configuration opened');
                       else if (action.label === 'Set Usage Limits') showToast('Usage limit settings opened');
                       else {
                         if (recentActivityData.length === 0) {
                           showToast('No data to export');
                           return;
                         }
                         downloadCsv('pathii-ai-activity.csv', [
                           ['Prompt / Input', 'Feature', 'User', 'Tokens', 'Response Time', 'Status'],
                           ...recentActivityData.map((r) => [r.prompt, r.feature, r.user, r.tokens, r.time, r.status]),
                         ]);
                         showToast(`Exported ${recentActivityData.length} rows`);
                       }
                     }}
                     className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 text-slate-600 rounded-xl transition-all group">
                     <action.icon size={16} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                     <span className="text-[12px] font-semibold leading-tight text-left">{action.label}</span>
                   </button>
                 ))}
               </div>
            </div>

          </div>

        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 shadow-lg rounded-xl px-4 py-3 flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
          <span className="text-[13px] font-semibold text-slate-800">{toast}</span>
        </div>
      )}

      {/* CSS for custom scrollbar */}
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