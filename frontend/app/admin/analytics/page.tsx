"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, ChevronRight, 
  Brain, ArrowUpRight, ArrowDownRight, MessageSquare, 
  Download, FileBarChart, Activity, Sparkles, CheckCircle2, 
  TrendingUp, Clock, File, Briefcase, User, Folder, BookOpen, 
  MoreHorizontal, Filter
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

const userGrowthData = [
  { name: 'Oct 1', newUsers: 300, activeUsers: 600 },
  { name: 'Oct 5', newUsers: 450, activeUsers: 900 },
  { name: 'Oct 10', newUsers: 400, activeUsers: 850 },
  { name: 'Oct 15', newUsers: 700, activeUsers: 1400 },
  { name: 'Oct 20', newUsers: 600, activeUsers: 1200 },
  { name: 'Oct 25', newUsers: 850, activeUsers: 1600 },
  { name: 'Oct 31', newUsers: 1000, activeUsers: 1800 },
];

const contentTrendData = [
  { name: 'Oct 1', memories: 120, documents: 80, tasks: 40, events: 20 },
  { name: 'Oct 5', memories: 180, documents: 100, tasks: 60, events: 30 },
  { name: 'Oct 10', memories: 150, documents: 110, tasks: 50, events: 40 },
  { name: 'Oct 15', memories: 250, documents: 150, tasks: 80, events: 50 },
  { name: 'Oct 20', memories: 210, documents: 130, tasks: 70, events: 45 },
  { name: 'Oct 25', memories: 290, documents: 180, tasks: 100, events: 60 },
  { name: 'Oct 31', memories: 320, documents: 210, tasks: 120, events: 80 },
];

const platformActivityData = [
  { name: 'Oct 1', memories: 200, documents: 150, tasks: 100, events: 50, aiUsage: 120, integrations: 80 },
  { name: 'Oct 5', memories: 250, documents: 180, tasks: 120, events: 60, aiUsage: 140, integrations: 90 },
  { name: 'Oct 10', memories: 220, documents: 160, tasks: 110, events: 55, aiUsage: 130, integrations: 85 },
  { name: 'Oct 15', memories: 350, documents: 250, tasks: 180, events: 90, aiUsage: 200, integrations: 120 },
  { name: 'Oct 20', memories: 300, documents: 220, tasks: 160, events: 80, aiUsage: 180, integrations: 110 },
  { name: 'Oct 25', memories: 400, documents: 280, tasks: 200, events: 100, aiUsage: 250, integrations: 140 },
  { name: 'Oct 31', memories: 450, documents: 320, tasks: 230, events: 120, aiUsage: 280, integrations: 160 },
];

const memoryTypesData = [
  { name: 'Text Notes', value: 1124, fill: '#3b82f6', percent: '35%' },
  { name: 'Voice Notes', value: 856, fill: '#8b5cf6', percent: '27%' },
  { name: 'Images', value: 562, fill: '#10b981', percent: '18%' },
  { name: 'Documents', value: 428, fill: '#f59e0b', percent: '13%' },
  { name: 'Links', value: 228, fill: '#ef4444', percent: '7%' },
];

const aiFeatureUsageData = [
  { name: 'Chat / Q&A', value: 4218, fill: '#3b82f6', percent: '33%' },
  { name: 'Summarization', value: 2864, fill: '#8b5cf6', percent: '22%' },
  { name: 'Transcription', value: 1986, fill: '#10b981', percent: '15%' },
  { name: 'OCR', value: 1542, fill: '#f59e0b', percent: '12%' },
  { name: 'Task Extraction', value: 986, fill: '#ef4444', percent: '8%' },
  { name: 'Others', value: 1249, fill: '#94a3b8', percent: '10%' },
];

const recentActivityList = [
  { actionIcon: Database, actionColor: 'text-blue-600', actionBg: 'bg-blue-100', action: 'Created memory', user: 'Sarah Kumar', userImg: 'https://i.pravatar.cc/150?img=1', module: 'Memories', details: 'Added new voice note', time: '2 min ago' },
  { actionIcon: FileText, actionColor: 'text-emerald-500', actionBg: 'bg-emerald-100', action: 'Uploaded document', user: 'Vikram S', userImg: 'https://i.pravatar.cc/150?img=11', module: 'Documents', details: 'Uploaded project_report.pdf', time: '8 min ago' },
  { actionIcon: CalendarCheck, actionColor: 'text-amber-500', actionBg: 'bg-amber-100', action: 'Created task', user: 'Priya Nair', userImg: 'https://i.pravatar.cc/150?img=5', module: 'Tasks', details: 'Created "Review design"', time: '15 min ago' },
  { actionIcon: Sparkles, actionColor: 'text-purple-600', actionBg: 'bg-purple-100', action: 'AI summary generated', user: 'Arun Raj', userImg: 'https://i.pravatar.cc/150?img=12', module: 'AI Usage', details: 'Summarized meeting notes', time: '22 min ago' },
  { actionIcon: Link, actionColor: 'text-emerald-600', actionBg: 'bg-emerald-100', action: 'Connected integration', user: 'Meena R', userImg: 'https://i.pravatar.cc/150?img=9', module: 'Integrations', details: 'Connected Google Calendar', time: '28 min ago' },
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

const StatCard = ({ icon: Icon, iconColor, iconBg, title, value, trend, trendUp }: any) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between h-full relative overflow-hidden group">
    <div className="flex items-center gap-3 mb-3 relative z-10">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1">{value}</h3>
        <p className="text-[13px] text-slate-500 font-medium leading-none">{title}</p>
      </div>
    </div>
    <div className={`flex items-center gap-1 text-[12px] font-semibold relative z-10 ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
      {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      <span>{trend}</span>
      <span className="text-slate-400 font-medium ml-1">vs last month</span>
    </div>
  </div>
);

const ChartLegend = ({ data }: any) => (
  <div className="w-full flex flex-col gap-1.5">
    {data.map((item: any, i: any) => (
      <div key={i} className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }}></div>
          <span className="font-semibold text-slate-700 truncate">{item.name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
           <span className="text-slate-500 font-medium">{item.value.toLocaleString('en-US')}</span>
           <span className="text-slate-400 font-medium w-8 text-right">({item.percent})</span>
        </div>
      </div>
    ))}
  </div>
);

// Deterministic seeded PRNG (mulberry32). Replaces Math.random(): the
// module-level heatmap generator produced different values on server prerender
// vs client hydration, causing a React hydration mismatch on the heatmap grid
// divs. Seeded so both runs compute identical data.
const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Simulating the heatmap grid
const generateHeatmap = () => {
  const rand = seededRandom(42);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const cols = 24;
  return days.map(day => {
    const cells = Array.from({ length: cols }).map((_, i) => {
      // Create a pattern that looks roughly like the image (more active in middle of day/week)
      let opacity = 0.1;
      const isWeekend = day === 'Sat' || day === 'Sun';
      if (!isWeekend && i > 8 && i < 18) opacity = rand() > 0.3 ? (rand() > 0.5 ? 0.8 : 0.5) : 0.2;
      if (!isWeekend && i > 10 && i < 16) opacity = rand() > 0.2 ? 1 : 0.6;
      if (isWeekend) opacity = rand() > 0.8 ? 0.4 : 0.1;
      return opacity;
    });
    return { day, cells };
  });
};
const heatmapData = generateHeatmap();

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [timeRange, setTimeRange] = useState('Last 30 days');

  const visibleActivities = recentActivityList.filter(item => {
    const matchesSearch = item.action.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          item.user.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          item.details.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          item.module.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesModule = moduleFilter === 'All Modules' || item.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

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
          <SidebarItem icon={Cpu} label="AI Usage" href="/admin/ai-usage" />
          <SidebarItem icon={Link} label="Integrations" href="/admin/integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" active href="/admin/analytics" />
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
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, memories, documents, or analytics..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-slate-400" />
              {timeRange}
              <ChevronDown size={14} className="text-slate-400 ml-1" />
            </button>

            <button className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">3</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-5">
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200" />
              <div className="flex items-center gap-1 text-[13px] font-bold text-slate-700">Admin <ChevronDown size={14} className="text-slate-400" /></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar flex gap-6 flex-col lg:flex-row">
          
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-wrap max-lg:gap-3">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart2 size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Analytics</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Get detailed insights about user activity, content creation, AI usage and overall platform performance.</p>
                 </div>
               </div>
               <div className="flex items-center gap-2 flex-wrap">
                 {['Today', '7 days', 'Last 30 days'].map((range) => (
                   <button 
                     key={range}
                     onClick={() => setTimeRange(range)}
                     className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${timeRange === range ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                   >
                     {range}
                   </button>
                 ))}
               </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard icon={Users} iconColor="text-blue-600" iconBg="bg-blue-100" title="Active Users" value="1,248" trend="18%" trendUp={true} />
              <StatCard icon={FileText} iconColor="text-rose-500" iconBg="bg-rose-100" title="Memories Created" value="3,198" trend="24%" trendUp={true} />
              <StatCard icon={CalendarCheck} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="Tasks & Events" value="1,842" trend="20%" trendUp={true} />
              <StatCard icon={MessageSquare} iconColor="text-purple-600" iconBg="bg-purple-100" title="AI Requests" value="12,845" trend="28%" trendUp={true} />
              <StatCard icon={Link} iconColor="text-blue-500" iconBg="bg-blue-100" title="API Calls" value="8,426" trend="32%" trendUp={true} />
            </div>

            {/* Area Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* User Growth Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">User Growth</h3>
                    <p className="text-[12px] text-slate-500 font-medium">New and active users over time.</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    Daily <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex justify-end items-center gap-4 mb-2 text-[11px] font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> New Users</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Active Users</div>
                </div>
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="activeUsers" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActive)" />
                      <Area type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNew)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Content Creation Trend Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Content Creation Trend</h3>
                    <p className="text-[12px] text-slate-500 font-medium">Memories, documents, tasks and events.</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    This Month <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex justify-end items-center gap-3 mb-2 text-[11px] font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Memories</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Documents</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Tasks</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Events</div>
                </div>
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={contentTrendData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colMem" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                        <linearGradient id="colDoc" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                        <linearGradient id="colTsk" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                        <linearGradient id="colEvt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="memories" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colMem)" />
                      <Area type="monotone" dataKey="documents" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colDoc)" />
                      <Area type="monotone" dataKey="tasks" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colTsk)" />
                      <Area type="monotone" dataKey="events" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colEvt)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Distribution Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Memory Types Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <h3 className="text-[15px] font-bold text-slate-900 mb-3">Memory Types Distribution</h3>
                <div className="flex-1 flex items-center justify-between gap-2">
                  <div className="relative w-[110px] h-[110px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={memoryTypesData} innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none">
                          {memoryTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                      <span className="text-[16px] font-extrabold text-slate-900 leading-none">3,198</span>
                      <span className="text-[8px] text-slate-500 font-semibold mt-0.5 text-center leading-tight">Total<br/>Memories</span>
                    </div>
                  </div>
                  <ChartLegend data={memoryTypesData} />
                </div>
              </div>

              {/* Productivity Heatmap */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <h3 className="text-[15px] font-bold text-slate-900 mb-3">Productivity by Day</h3>
                <div className="flex-1 flex flex-col">
                  {/* Top axis */}
                  <div className="flex text-[9px] text-slate-400 font-semibold mb-1 ml-6 justify-between pr-2">
                    <span>12 AM</span><span>4 AM</span><span>8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span>
                  </div>
                  {/* Grid */}
                  <div className="flex flex-col gap-1 flex-1">
                    {heatmapData.map((row, i) => (
                      <div key={i} className="flex items-center gap-1.5 h-full">
                        <span className="text-[9px] text-slate-400 font-semibold w-5">{row.day}</span>
                        <div className="flex gap-[3px] flex-1 h-full items-center">
                          {row.cells.map((opacity, j) => (
                            <div key={j} className="flex-1 aspect-square rounded-[2px] bg-blue-500" style={{ opacity }}></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Legend */}
                  <div className="flex items-center justify-between mt-3 text-[10px] font-semibold text-slate-500">
                    <span>Less activity</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-[2px] bg-blue-500 opacity-10"></div>
                      <div className="w-3 h-3 rounded-[2px] bg-blue-500 opacity-30"></div>
                      <div className="w-3 h-3 rounded-[2px] bg-blue-500 opacity-50"></div>
                      <div className="w-3 h-3 rounded-[2px] bg-blue-500 opacity-70"></div>
                      <div className="w-3 h-3 rounded-[2px] bg-blue-500 opacity-100"></div>
                    </div>
                    <span>More activity</span>
                  </div>
                </div>
              </div>

              {/* AI Feature Usage Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <h3 className="text-[15px] font-bold text-slate-900 mb-3">AI Feature Usage</h3>
                <div className="flex-1 flex items-center justify-between gap-2">
                  <div className="relative w-[110px] h-[110px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={aiFeatureUsageData} innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value" stroke="none">
                          {aiFeatureUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                      <span className="text-[16px] font-extrabold text-slate-900 leading-none">12,845</span>
                      <span className="text-[8px] text-slate-500 font-semibold mt-0.5 text-center leading-tight">Total<br/>Requests</span>
                    </div>
                  </div>
                  <ChartLegend data={aiFeatureUsageData} />
                </div>
              </div>
            </div>

            {}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-bold text-slate-900">Platform Activity</h3>
                  <p className="text-[12px] text-slate-500 font-medium">Overall platform usage across all features.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    This Month <ChevronDown size={14} />
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 mb-2 text-[11px] font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Memories</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Documents</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Tasks</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Events</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div> AI Usage</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div> Integrations</div>
              </div>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformActivityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                    <Bar dataKey="memories" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="documents" stackId="a" fill="#10b981" />
                    <Bar dataKey="tasks" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="events" stackId="a" fill="#8b5cf6" />
                    <Bar dataKey="aiUsage" stackId="a" fill="#ec4899" />
                    <Bar dataKey="integrations" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Activity</h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search activities..." 
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                    />
                  </div>
                  {['All Modules', 'Memories', 'Documents', 'Tasks', 'AI Usage'].map((filter, i) => (
                    <button 
                      key={i} 
                      onClick={() => setModuleFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${moduleFilter === filter ? 'bg-blue-50 border border-blue-200 text-blue-600' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                    >
                      {filter}
                    </button>
                  ))}
                  {moduleFilter !== 'All Modules' && (
                    <button 
                      onClick={() => setModuleFilter('All Modules')}
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
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-2.5 px-4 w-10"></th>
                      <th className="py-2.5 px-4">Action</th>
                      <th className="py-2.5 px-4">User</th>
                      <th className="py-2.5 px-4">Module</th>
                      <th className="py-2.5 px-4">Details</th>
                      <th className="py-2.5 px-4 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    {visibleActivities.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 text-[13px] font-medium">
                          No recent activities found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      visibleActivities.map((item, index) => (
                        <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                          <td className="py-2.5 px-4">
                             <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.actionBg}`}>
                               <item.actionIcon size={14} className={item.actionColor} />
                             </div>
                          </td>
                          <td className="py-2.5 px-4 font-bold text-slate-900">{item.action}</td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2 font-semibold text-slate-700">
                               <img src={item.userImg} alt={item.user} className="w-6 h-6 rounded-full object-cover" />
                               {item.user}
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-slate-500 font-medium">{item.module}</td>
                          <td className="py-2.5 px-4 text-slate-500 truncate max-w-[200px]">{item.details}</td>
                          <td className="py-2.5 px-4 text-right text-slate-400 font-medium">{item.time}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Top Active Users */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Top Active Users</h3>
                 <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               <div className="space-y-4">
                 {[
                   { rank: 1, name: 'Sarah Kumar', mem: '428', req: '1,842', img: '1' },
                   { rank: 2, name: 'Vikram S', mem: '356', req: '1,263', img: '11' },
                   { rank: 3, name: 'Priya Nair', mem: '298', req: '1,102', img: '5' },
                   { rank: 4, name: 'Arun Raj', mem: '264', req: '986', img: '12' },
                   { rank: 5, name: 'Meena R', mem: '220', req: '842', img: '9' },
                 ].map((user, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <span className="w-5 text-[12px] font-bold text-slate-400 text-center">{user.rank}</span>
                     <img src={`https://i.pravatar.cc/150?img=${user.img}`} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                     <div className="flex-1 min-w-0">
                       <p className="text-[13px] font-bold text-slate-900 truncate">{user.name}</p>
                       <p className="text-[11px] text-slate-500 font-medium">{user.mem} memories</p>
                     </div>
                     <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">{user.req} requests</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Top Memory Categories */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Top Memory Categories</h3>
                 <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               <div className="space-y-3.5">
                 {[
                   { icon: BookOpen, label: 'Academic', color: 'text-blue-600', bg: 'bg-blue-100', barBg: 'bg-blue-500', pct: '70%', val: '684' },
                   { icon: Briefcase, label: 'Work', color: 'text-amber-500', bg: 'bg-amber-100', barBg: 'bg-amber-500', pct: '55%', val: '542' },
                   { icon: User, label: 'Personal', color: 'text-rose-500', bg: 'bg-rose-100', barBg: 'bg-rose-500', pct: '50%', val: '498' },
                   { icon: Folder, label: 'Projects', color: 'text-emerald-500', bg: 'bg-emerald-100', barBg: 'bg-emerald-500', pct: '45%', val: '436' },
                   { icon: FileText, label: 'Research', color: 'text-purple-600', bg: 'bg-purple-100', barBg: 'bg-purple-500', pct: '40%', val: '398' },
                   { icon: MoreHorizontal, label: 'Others', color: 'text-slate-500', bg: 'bg-slate-100', barBg: 'bg-slate-300', pct: '60%', val: '640' },
                 ].map((cat, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cat.bg} ${cat.color}`}>
                       <cat.icon size={14} />
                     </div>
                     <div className="flex-1">
                       <div className="flex justify-between items-end mb-1">
                          <span className="text-[12px] font-semibold text-slate-700 leading-none">{cat.label}</span>
                          <span className="text-[11px] font-medium text-slate-500 leading-none">{cat.val}</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${cat.barBg}`} style={{ width: cat.pct }}></div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Key Insights */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                   <div className="text-blue-600"><Brain size={18} /></div>
                   <h3 className="text-[16px] font-bold text-slate-900">Key Insights</h3>
                </div>
                <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {[
                  { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100', text: 'Active users increased by 18% this month.' },
                  { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100', text: 'Memory creation is 24% higher than last month.' },
                  { icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100', text: 'AI usage shows 28% growth with 98.2% success rate.' },
                  { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100', text: 'Most active time is between 10 AM - 4 PM.' },
                ].map((insight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${insight.bg}`}>
                      <insight.icon size={14} className={insight.color} />
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
                   { icon: Download, label: 'Export Analytics' },
                   { icon: FileBarChart, label: 'Generate Report' },
                   { icon: BarChart2, label: 'View User Trends' },
                   { icon: Activity, label: 'Analyze AI Usage' },
                 ].map((action, i) => (
                   <button key={i} className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 text-slate-600 rounded-xl transition-all group">
                     <action.icon size={16} className="text-blue-500 flex-shrink-0" />
                     <span className="text-[12px] font-semibold leading-tight text-left">{action.label}</span>
                   </button>
                 ))}
               </div>
            </div>

          </div>

        </div>
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