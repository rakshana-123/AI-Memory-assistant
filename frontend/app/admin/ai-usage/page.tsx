"use client";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Database, FileText, CalendarCheck,
  Cpu, Link as LinkIcon, BarChart2, FileSpreadsheet, Bell, ShieldCheck,
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight,
  Brain, ArrowUpRight, ArrowDownRight, Bot, MessageSquare, Clock,
  Coins, Star, FileSearch, Mic, Image as ImageIcon, ListTodo, CheckCircle2,
  Lightbulb, TrendingUp, Clock3, Filter, Settings2, Download,
  FileBox
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const usageTrendData = [
  { name: 'Oct 1', requests: 200 }, { name: 'Oct 5', requests: 500 },
  { name: 'Oct 10', requests: 380 }, { name: 'Oct 15', requests: 450 },
  { name: 'Oct 20', requests: 390 }, { name: 'Oct 25', requests: 680 },
  { name: 'Oct 31', requests: 900 },
];

const featureUsageData = [
  { name: 'Chat / Q&A', value: 4218, fill: '#3b82f6', percent: '33%' },
  { name: 'Summarization', value: 2864, fill: '#8b5cf6', percent: '22%' },
  { name: 'Transcription', value: 1986, fill: '#10b981', percent: '15%' },
  { name: 'OCR', value: 1542, fill: '#f59e0b', percent: '12%' },
  { name: 'Task Extraction', value: 986, fill: '#ec4899', percent: '8%' },
  { name: 'Others', value: 1249, fill: '#64748b', percent: '10%' },
];

const costBreakdownData = [
  { name: 'Chat / Q&A', value: 782, fill: '#3b82f6', percent: '42%' },
  { name: 'Summarization', value: 421, fill: '#8b5cf6', percent: '23%' },
  { name: 'Transcription', value: 298, fill: '#10b981', percent: '16%' },
  { name: 'OCR', value: 194, fill: '#f59e0b', percent: '10%' },
  { name: 'Task Extraction', value: 98, fill: '#ec4899', percent: '5%' },
  { name: 'Others', value: 49, fill: '#f43f5e', percent: '3%' },
];

const modelUsageData = [
  { name: 'GPT-4o', percent: 42, bg: 'bg-blue-500' },
  { name: 'GPT-4o mini', percent: 28, bg: 'bg-purple-500' },
  { name: 'Claude 3.5', percent: 12, bg: 'bg-emerald-500' },
  { name: 'Gemini 1.5', percent: 10, bg: 'bg-amber-500' },
  { name: 'Whisper (STT)', percent: 6, bg: 'bg-pink-500' },
  { name: 'Tesseract (OCR)', percent: 2, bg: 'bg-indigo-500' },
];

const topUsersData = [
  { rank: 1, name: 'Sarah Kumar', avatar: 'https://i.pravatar.cc/150?img=1', requests: '1,842', percent: 14, color: 'bg-blue-500' },
  { rank: 2, name: 'Vikram S', avatar: 'https://i.pravatar.cc/150?img=11', requests: '1,263', percent: 10, color: 'bg-purple-500' },
  { rank: 3, name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=5', requests: '1,102', percent: 9, color: 'bg-emerald-500' },
  { rank: 4, name: 'Arun Raj', avatar: 'https://i.pravatar.cc/150?img=8', requests: '986', percent: 8, color: 'bg-amber-500' },
  { rank: 5, name: 'Meena R', avatar: 'https://i.pravatar.cc/150?img=9', requests: '842', percent: 7, color: 'bg-pink-500' },
];

const featurePerformanceData = [
  { feature: 'Chat / Q&A', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100', requests: '4,218', avgTime: '1.8s', success: '98.5%' },
  { feature: 'Summarization', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-100', requests: '2,864', avgTime: '2.4s', success: '97.8%' },
  { feature: 'Transcription', icon: Mic, color: 'text-emerald-500', bg: 'bg-emerald-100', requests: '1,986', avgTime: '3.1s', success: '96.2%' },
  { feature: 'OCR', icon: ImageIcon, color: 'text-amber-500', bg: 'bg-amber-100', requests: '1,542', avgTime: '2.7s', success: '97.9%' },
  { feature: 'Task Extraction', icon: ListTodo, color: 'text-pink-500', bg: 'bg-pink-100', requests: '986', avgTime: '1.9s', success: '98.7%' },
  { feature: 'Embeddings', icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-100', requests: '684', avgTime: '2.3s', success: '98.1%' },
  { feature: 'Others', icon: Cpu, color: 'text-slate-500', bg: 'bg-slate-100', requests: '565', avgTime: '2.1s', success: '97.6%' },
];

const recentActivityData = [
  { num: '4', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-100', prompt: 'Summarize meeting notes', feature: 'Summarization', user: 'Sarah Kumar', avatar: 'https://i.pravatar.cc/150?img=1', tokens: '1.2K', time: '2.1s', status: 'Success', timeAgo: '2 min ago' },
  { num: '2', icon: ListTodo, color: 'text-pink-500', bg: 'bg-pink-100', prompt: 'Extract tasks from this note', feature: 'Task Extraction', user: 'Arun Raj', avatar: 'https://i.pravatar.cc/150?img=8', tokens: '856', time: '1.8s', status: 'Success', timeAgo: '8 min ago' },
  { num: '4', icon: Mic, color: 'text-emerald-500', bg: 'bg-emerald-100', prompt: 'Transcribe audio file', feature: 'Transcription', user: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=5', tokens: '2.4K', time: '3.2s', status: 'Success', timeAgo: '15 min ago' },
  { num: '5', icon: ImageIcon, color: 'text-amber-500', bg: 'bg-amber-100', prompt: 'What is in this image?', feature: 'OCR', user: 'Vikram S', avatar: 'https://i.pravatar.cc/150?img=11', tokens: '1.1K', time: '2.6s', status: 'Success', timeAgo: '22 min ago' },
  { num: '5', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100', prompt: 'Answer my question', feature: 'Chat / Q&A', user: 'Meena R', avatar: 'https://i.pravatar.cc/150?img=9', tokens: '980', time: '1.9s', status: 'Success', timeAgo: '28 min ago' },
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
          {value}
        </h3>
        <p className="text-[13px] text-slate-500 font-medium leading-none">{title}</p>
      </div>
    </div>
    <div className={`flex items-center gap-1 text-[12px] font-semibold ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
      {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      <span>{trend}</span>
      <span className="text-slate-400 font-medium ml-1">vs last month</span>
    </div>
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
    <div className="flex min-h-screen lg:h-screen bg-[#F4F7F9] font-sans lg:overflow-hidden text-slate-900 antialiased">
      
      {/* Left Sidebar */}
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
          <SidebarItem icon={Users} label="Users" href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" href="/admin/memories" />
          <SidebarItem icon={FileText} label="Documents" href="/admin/documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" href="/admin/tasks" />
          <SidebarItem icon={Bot} label="AI Usage" active href="/admin/ai-usage" />
          <SidebarItem icon={LinkIcon} label="Integrations" href="/admin/integrations" />
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
          <NextLink href="/" className="text-[11.5px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-1.5 px-3 rounded-xl text-center transition-colors">
            ← Back to User View
          </NextLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 max-lg:h-auto max-lg:py-3">
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

            <button onClick={() => showToast('You have 3 unread notifications')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">3</span>
            </button>
            <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-5">
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200" />
              <div className="flex items-center gap-1 text-[13px] font-bold text-slate-700">Admin <ChevronDown size={14} className="text-slate-400" /></div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar flex gap-6 flex-col lg:flex-row">
          
          {}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard icon={MessageSquare} iconColor="text-purple-500" iconBg="bg-purple-100" title="Total AI Requests" value="12,845" trend="28%" trendUp={true} />
              <StatCard icon={Users} iconColor="text-blue-500" iconBg="bg-blue-100" title="Active Users" value="1,248" trend="18%" trendUp={true} />
              <StatCard icon={Clock} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="Avg Response Time" value="2.4s" trend="32%" trendUp={true} />
              <StatCard icon={Coins} iconColor="text-amber-500" iconBg="bg-amber-100" title="Estimated Cost" value="1,842" trend="12%" trendUp={false} isCurrency={true} />
              <StatCard icon={Star} iconColor="text-pink-500" iconBg="bg-pink-100" title="Success Rate" value="98.2%" trend="2%" trendUp={true} />
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
              </div>

              {/* Usage by AI Feature Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-4">Usage by AI Feature</h3>
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
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">12,845</span>
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
              </div>
            </div>

            {/* Top Users & Feature Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
               {/* Top Users */}
               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                 <h3 className="text-[16px] font-bold text-slate-900 mb-5">Top Users by AI Usage</h3>
                 <div className="flex flex-col gap-4">
                   {topUsersData.map((user, i) => (
                     <div key={i} className="flex items-center gap-4">
                       <span className="text-[12px] font-bold text-slate-400 w-3">{user.rank}</span>
                       <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                       <div className="flex-1 min-w-0 flex items-center justify-between">
                         <div className="min-w-[100px]">
                           <p className="text-[13px] font-bold text-slate-900 truncate">{user.name}</p>
                           <p className="text-[12px] text-slate-500 font-medium">{user.requests} requests</p>
                         </div>
                         <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden mx-4">
                           <div className={`h-full rounded-full ${user.color}`} style={{ width: `${user.percent * 3}%` }}></div>
                         </div>
                         <span className="text-[13px] font-medium text-slate-400 w-8 text-right">{user.percent}%</span>
                       </div>
                     </div>
                   ))}
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
                       {featurePerformanceData.map((item, i) => (
                         <tr key={i} className="border-b border-slate-50 last:border-0">
                           <td className="py-2.5 flex items-center gap-3 font-bold text-slate-700">
                             <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                               <item.icon size={13} className={item.color} />
                             </div>
                             {item.feature}
                           </td>
                           <td className="py-2.5 text-right font-medium text-slate-500">{item.requests}</td>
                           <td className="py-2.5 text-right font-medium text-slate-500">{item.avgTime}</td>
                           <td className="py-2.5 text-right font-bold text-emerald-500">{item.success}</td>
                         </tr>
                       ))}
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
                    {visibleActivity.length === 0 ? (
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
                               <img src={row.avatar} alt={row.user} className="w-6 h-6 rounded-full object-cover" />
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
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">1</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">2</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">3</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">4</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">5</button>
                   <span className="px-1 text-slate-400">...</span>
                   <button className="w-[50px] h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">2,569</button>
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
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Model Usage */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[16px] font-bold text-slate-900 mb-5">Model Usage</h3>
              <div className="flex flex-col gap-4">
                {modelUsageData.map((model, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-slate-700 w-28 flex-shrink-0">{model.name}</span>
                    <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${model.bg}`} style={{ width: `${model.percent}%` }}></div>
                    </div>
                    <span className="text-[12px] font-medium text-slate-400 w-8 text-right">{model.percent}%</span>
                  </div>
                ))}
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
                 <h4 className="text-[24px] font-extrabold text-slate-900 flex items-center tracking-tight">₹1,842</h4>
                 <p className="text-[12px] text-slate-500 font-medium">Total Cost (Estimated)</p>
              </div>
              
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

              <div className="space-y-4">
                {[
                  { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-100', text: 'AI usage increased by 28% this month.' },
                  { icon: Users, color: 'text-blue-500', bg: 'bg-blue-100', text: 'Summarization is the most used feature.' },
                  { icon: Clock3, color: 'text-purple-500', bg: 'bg-purple-100', text: 'Average response time improved by 32%.' },
                  { icon: Star, color: 'text-amber-500', bg: 'bg-amber-100', text: '98.2% success rate across all features.' },
                  { icon: Coins, color: 'text-pink-500', bg: 'bg-pink-100', text: 'Estimated cost is within budget.' },
                ].map((insight, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${insight.bg}`}>
                      <insight.icon size={16} className={insight.color} />
                    </div>
                    <p className="text-[13px] font-medium text-slate-700 leading-snug">{insight.text}</p>
                  </div>
                ))}
              </div>
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
                       else if (action.label === 'Manage AI Models') showToast('6 models configured (GPT-4o, Claude 3.5, Gemini 1.5, Whisper, Tesseract)');
                       else if (action.label === 'Set Usage Limits') showToast('Usage limits: 1,000 requests per user per month');
                       else {
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