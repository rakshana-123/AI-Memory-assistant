"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, ChevronRight, Brain, 
  Monitor, Clock, Activity, AlertTriangle, CloudUpload,
  Globe, Code2, HardDrive, Lock, Mail, Link2, AlertCircle,
  CheckCircle2, FileWarning, Eye, Server, Activity as PulseIcon, BellRing, Filter
} from 'lucide-react';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- DATA (empty by default) ---
// System Health surfaces runtime infrastructure data (performance series,
// resource usage, error mix, response times, logs, service status, alerts).
// All of it is empty until a real monitoring backend feeds it; demo rows
// remain recoverable from git history (pre-branch commits).

const performanceData: { name: string; rt: number; tp: number }[] = [
  { name: 'Oct 5', rt: 120, tp: 42 },
  { name: 'Oct 8', rt: 95, tp: 38 },
  { name: 'Oct 10', rt: 140, tp: 45 },
  { name: 'Oct 11', rt: 110, tp: 40 },
];

const resourceData: { name: string; cpu: number; mem: number; disk: number }[] = [
  { name: 'Oct 5', cpu: 34, mem: 52, disk: 41 },
  { name: 'Oct 8', cpu: 38, mem: 55, disk: 41 },
  { name: 'Oct 10', cpu: 45, mem: 58, disk: 42 },
  { name: 'Oct 11', cpu: 41, mem: 54, disk: 42 },
];

const errorRateData: { name: string; value: number; fill: string }[] = [
  { name: 'API Errors', value: 1, fill: '#3b82f6' },
  { name: 'AI Service', value: 1, fill: '#8b5cf6' },
  { name: 'Database', value: 0, fill: '#10b981' },
];

const responseTimeData: { name: string; val: string; width: string; color: string }[] = [
  { name: 'Web App', val: '126 ms', width: '30%', color: 'bg-blue-500' },
  { name: 'API Server', val: '142 ms', width: '35%', color: 'bg-purple-500' },
  { name: 'AI Service', val: '210 ms', width: '55%', color: 'bg-amber-500' },
];

const systemLogs: { time: string; level: string; service: string; msg: string; status: string }[] = [
  { time: 'Today, 4:22 PM', level: 'INFO', service: 'API Server', msg: 'Request processed successfully (POST /api/memory)', status: 'Success' },
  { time: 'Today, 4:18 PM', level: 'WARN', service: 'AI Service', msg: 'High response time detected (2.1s)', status: 'Resolved' },
  { time: 'Today, 4:12 PM', level: 'ERROR', service: 'File Storage', msg: 'Failed to upload file (timeout)', status: 'Monitoring' },
];

// Runtime service status feed and alert history — records.
const serviceStatusData: { icon: any; label: string; color: string }[] = [
  { icon: Globe, label: 'Web Application', color: 'text-blue-500' },
  { icon: Database, label: 'Database', color: 'text-emerald-500' },
  { icon: Brain, label: 'AI Service', color: 'text-purple-500' },
];

const recentAlertsData: { icon: any; bg: string; color: string; title: string; sub: string; time: string }[] = [
  { icon: AlertCircle, bg: 'bg-red-100', color: 'text-red-600', title: 'High CPU Usage', sub: 'API Server CPU usage at 92%', time: '12 min ago' },
  { icon: AlertTriangle, bg: 'bg-amber-100', color: 'text-amber-600', title: 'AI Service Latency', sub: 'Response time above 2s', time: '28 min ago' },
  { icon: CheckCircle2, bg: 'bg-emerald-100', color: 'text-emerald-600', title: 'Database Recovered', sub: 'Database connection restored', time: '1 hour ago' },
];

const SidebarItem = ({ icon: Icon, label, active, badge, href }: any) => (
  <NextLink href={href} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[11px] font-bold">{badge}</span>
    )}
  </NextLink>
);

const MetricCard = ({ icon: Icon, iconColor, iconBg, title, value, trend, trendUp, trendColor }: any) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className={iconColor} strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="text-[20px] font-extrabold text-slate-900 leading-none mb-1">{value}</h3>
        <p className="text-[13px] text-slate-500 font-medium leading-none">{title}</p>
      </div>
    </div>
    {trend && (
      <div className={`flex items-center gap-1 text-[12px] font-bold mt-1 ${trendColor}`}>
        {trendUp ? <span className="text-lg leading-none mb-1">↑</span> : <span className="text-lg leading-none mb-1">↓</span>}
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

// Uptime history heatmap source — deterministic seeded PRNG (mulberry32), so
// server prerender and client hydration compute identical data.
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

const generateHeatmapData = () => {
  const rand = seededRandom(42);
  const data: { row: string; cols: string[] }[] = [];
  const rows = ['Web App', 'API Server', 'Database', 'AI Service', 'Storage'];
  rows.forEach(row => {
    const cols: string[] = [];
    for (let i = 0; i < 21; i++) {
      let status = 'operational';
      if (rand() > 0.95) status = 'down';
      else if (rand() > 0.85) status = 'slow';
      cols.push(status);
    }
    data.push({ row, cols });
  });
  return data;
};

const heatmapData: { row: string; cols: string[] }[] = generateHeatmapData();

const getLevelBadge = (level: any) => {
  switch (level) {
    case 'INFO': return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-600">INFO</span>;
    case 'WARN': return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-600">WARN</span>;
    case 'ERROR': return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-600">ERROR</span>;
    default: return null;
  }
};

const getStatusBadge = (status: any) => {
  let color = '';
  switch (status) {
    case 'Success': color = 'text-emerald-500'; break;
    case 'Resolved': color = 'text-blue-500'; break;
    case 'Monitoring': color = 'text-amber-500'; break;
    default: color = 'text-slate-500';
  }
  return (
    <div className={`flex items-center gap-1.5 text-[12px] font-semibold ${color}`}>
      <div className={`w-1.5 h-1.5 rounded-full bg-current`}></div>
      {status}
    </div>
  );
};

const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'All time', 'Today'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];

const cycleOption = (options: string[], current: string) => {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [chartPeriod, setChartPeriod] = useState(chartPeriodOptions[0]);

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => {
      setActionFeedback(null);
    }, 3500);
  };

  const handleQuickAction = (actionName: string) => {
    setActionFeedback(`Executing ${actionName}... Success!`);
    setTimeout(() => {
      setActionFeedback(null);
    }, 3500);
  };

  const visibleLogs = systemLogs.filter(log => {
    const matchesSearch = log.msg.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          log.service.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesLevel = levelFilter === 'All' || log.level.toLowerCase() === levelFilter.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === visibleLogs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleLogs.map((_, i) => i));
    }
  };

  const toggleSelectRow = (idx: number) => {
    setSelectedIds(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-900 antialiased">
      
      {/* Left Sidebar */}
      <aside className="w-[240px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 z-20 sticky top-0 h-screen">
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
          <SidebarItem icon={BarChart2} label="Analytics" href="/admin/analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" href="/admin/reports" />
          <SidebarItem icon={Bell} label="Notifications" href="/admin/notifications" />
          <SidebarItem icon={ShieldCheck} label="System Health" active href="/admin/system-health" />
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

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 bg-white/70 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/50 max-lg:h-auto max-lg:py-3">
          <div className="relative w-full max-w-[450px] lg:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs, services, errors, or system metrics..." 
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500 border border-slate-200">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-wrap">
            {/* Header Date Picker */}
            <button onClick={() => setDateRange(cycleOption(dateRangeOptions, dateRange))} className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-blue-600" />
              {dateRange}
              <ChevronDown size={14} className="text-slate-400 ml-1" />
            </button>

            <button onClick={() => showFeedback('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
            </button>
            <div onClick={() => showFeedback('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-5">
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
          
          {/* Main Left Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-wrap max-lg:gap-3">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">System Health</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Monitor server health, performance, uptime and system resources across Pathii platform.</p>
                 </div>
               </div>
               <div className="flex flex-col items-end gap-1">
                 <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg font-bold text-[12px] flex items-center gap-1.5 border border-emerald-100">
                   <Activity size={14} /> All systems operational
                 </div>
                </div>
            </div>

            {/* Metrics Row — stats consistent with the seeded monitoring series */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <MetricCard icon={Monitor} iconColor="text-emerald-500" iconBg="bg-emerald-50" title="Uptime" value="99.9%" />
              <MetricCard icon={Clock} iconColor="text-blue-500" iconBg="bg-blue-50" title="Avg Response Time" value="126 ms" />
              <MetricCard icon={Activity} iconColor="text-emerald-500" iconBg="bg-emerald-50" title="Requests/min" value="43" />
              <MetricCard icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50" title="Error Rate" value="0.2%" />
              <MetricCard icon={Cpu} iconColor="text-blue-500" iconBg="bg-blue-50" title="Avg CPU Usage" value="42%" />
              <MetricCard icon={Database} iconColor="text-purple-500" iconBg="bg-purple-50" title="Avg Memory Usage" value="56%" />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* System Performance Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">System Performance</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[12px] font-semibold text-slate-600 transition-colors">
                      {chartPeriod} <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mb-2 text-[11px] font-bold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Response Time (ms)</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Throughput (req/min)</div>
                </div>
                <div className="flex-1 min-h-0">
                  {performanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRt" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="tp" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorTp)" />
                      <Area type="monotone" dataKey="rt" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRt)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  ) : (
                    <EmptyState icon={Activity} title="No performance data yet" subtitle="Performance metrics will appear here." />
                  )}
                </div>
              </div>

              {/* Server Resource Usage Line Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">Server Resource Usage</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[12px] font-semibold text-slate-600 transition-colors">
                      {chartPeriod} <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mb-2 text-[11px] font-bold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div>CPU Usage</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Memory Usage</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Disk Usage</div>
                </div>
                <div className="flex-1 min-h-0">
                  {resourceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={resourceData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => `${val}%`} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="mem" stroke="#a855f7" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="disk" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                  ) : (
                    <EmptyState icon={Cpu} title="No resource data yet" subtitle="Resource usage will appear here." />
                  )}
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-[1.5fr_1fr_1fr] gap-4">
              
              {/* Uptime History (Heatmap) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-bold text-slate-900">Uptime History</h3>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                     <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-emerald-400"></div> Operational</div>
                     <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-400"></div> Slow</div>
                     <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-500"></div> Down</div>
                  </div>
                </div>
                <div className="flex-1 flex gap-2 max-lg:overflow-x-auto">
                   {heatmapData.length > 0 ? (
                   <>
                   {/* Y Axis Labels */}
                   <div className="flex flex-col justify-between text-[10px] font-medium text-slate-400 pb-5">
                      {heatmapData.map(d => <span key={d.row}>{d.row}</span>)}
                   </div>
                   {/* Grid */}
                   <div className="flex-1 flex flex-col justify-between pb-5 relative">
                      {heatmapData.map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-between w-full h-[10px]">
                          {row.cols.map((status: any, cIdx: any) => (
                            <div key={cIdx} className={`w-[8px] h-[8px] rounded-sm ${status === 'operational' ? 'bg-emerald-400' : status === 'slow' ? 'bg-amber-400' : 'bg-red-500'}`}></div>
                          ))}
                        </div>
                      ))}
                   </div>
                   </>
                   ) : (
                     <div className="flex-1">
                       <EmptyState icon={Monitor} title="No uptime data yet" subtitle="Uptime history will appear here once monitoring data flows in." />
                     </div>
                   )}
                </div>
              </div>

              {/* Response Time by Service */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <h3 className="text-[15px] font-bold text-slate-900 mb-4">Response Time by Service</h3>
                <div className="flex-1 flex flex-col justify-between">
                  {responseTimeData.length > 0 ? responseTimeData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold text-slate-600 w-24 truncate">{item.name}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }}></div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-900 w-12 text-right">{item.val}</span>
                    </div>
                  )) : (
                    <EmptyState icon={Clock} title="No response data yet" subtitle="Response times will appear here." />
                  )}
                </div>
              </div>

              {/* Error Rate by Service Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <h3 className="text-[15px] font-bold text-slate-900 mb-2">Error Rate by Service</h3>
                {errorRateData.length > 0 ? (
                <div className="flex-1 flex items-center justify-between">

                  <div className="relative w-[110px] h-[110px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={errorRateData}
                          innerRadius={35}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {errorRateData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[14px] font-extrabold text-slate-900 leading-none">{errorRateData.reduce((sum, e) => sum + e.value, 0)}%</span>
                      <span className="text-[8px] text-slate-500 font-semibold mt-0.5">Total Errors</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1 pl-2">
                    {errorRateData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-bold text-slate-700 truncate max-w-[65px]">{item.name}</span>
                        </div>
                        <span className="text-slate-500 font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>

                </div>
                ) : (
                  <EmptyState icon={AlertTriangle} title="No error data yet" subtitle="Error rates will appear here." />
                )}
              </div>

            </div>

            {/* Recent System Logs Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-[16px] font-bold text-slate-900">Recent System Logs</h3>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-full sm:w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search logs..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    {['All', 'INFO', 'WARN', 'ERROR'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setLevelFilter(lvl)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          levelFilter === lvl
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                  
                  <button onClick={() => showFeedback('Advanced filters: level, service, time range')} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                    <Filter size={14} className="text-slate-400" /> Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-2.5 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={visibleLogs.length > 0 && selectedIds.length === visibleLogs.length}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                        />
                      </th>
                      <th className="py-2.5 px-4">Time</th>
                      <th className="py-2.5 px-4">Level</th>
                      <th className="py-2.5 px-4">Service</th>
                      <th className="py-2.5 px-4">Message</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    {systemLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-2">
                          <EmptyState icon={FileText} title="No system logs yet" subtitle="Log entries will appear here." />
                        </td>
                      </tr>
                    ) : visibleLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                          No logs found matching "{searchQuery}"
                        </td>
                      </tr>
                    ) : (
                      visibleLogs.map((log, index) => (
                        <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                          <td className="py-2.5 px-4">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(index)}
                              onChange={() => toggleSelectRow(index)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 px-4 text-slate-500 font-medium whitespace-nowrap">{log.time}</td>
                          <td className="py-2.5 px-4">{getLevelBadge(log.level)}</td>
                          <td className="py-2.5 px-4 font-semibold text-slate-700 whitespace-nowrap">{log.service}</td>
                          <td className="py-2.5 px-4 text-slate-600 font-medium">{log.msg}</td>
                          <td className="py-2.5 px-4 flex justify-end">{getStatusBadge(log.status)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] font-medium text-slate-500">
                 <span>Showing {visibleLogs.length === 0 ? 0 : 1}–{visibleLogs.length} of {systemLogs.length} logs</span>
                 <div className="flex items-center gap-1">
                   <button 
                     onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                     className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-30"
                     disabled={currentPage === 1}
                   >
                     <ChevronDown size={14} className="rotate-90" />
                   </button>
                   {[1, 2, 3].map(page => (
                     <button
                       key={page}
                       onClick={() => setCurrentPage(page)}
                       className={`w-7 h-7 flex items-center justify-center rounded-lg font-bold transition-all ${
                         currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-100 text-slate-700'
                       }`}
                     >
                       {page}
                     </button>
                   ))}
                   <button
                     onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                     className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-30"
                     disabled={currentPage === 3}
                   >
                     <ChevronDown size={14} className="-rotate-90" />
                   </button>
                 </div>
                 <div className="flex items-center gap-2">
                   <button className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                     10 per page <ChevronDown size={14} className="text-slate-400" />
                   </button>
                 </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Service Status */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[15px] font-bold text-slate-900">Service Status</h3>
                <button onClick={() => showFeedback('All monitored services are shown above')} className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ChevronRight size={14} /></button>
              </div>
              
              <div className="flex flex-col space-y-3.5">
                {serviceStatusData.length > 0 ? serviceStatusData.map((service, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded bg-slate-50 border border-slate-100 flex items-center justify-center ${service.color}`}>
                        <service.icon size={14} />
                      </div>
                      <span className="text-[13px] font-semibold text-slate-700">{service.label}</span>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Operational
                    </div>
                  </div>
                )) : (
                  <EmptyState icon={Server} title="No service data yet" subtitle="Service statuses will appear here." />
                )}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
               <h3 className="text-[15px] font-bold text-slate-900">Recent Alerts</h3>
               <button onClick={() => showFeedback('Showing alerts from the last 24 hours')} className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ChevronRight size={14} /></button>
               </div>
               <div className="space-y-4">
                 {recentAlertsData.length > 0 ? recentAlertsData.map((alert, i) => (
                   <div key={i} className="flex items-start gap-3">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${alert.bg} ${alert.color}`}>
                       <alert.icon size={16} />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-[13px] font-bold text-slate-900 truncate">{alert.title}</p>
                       <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{alert.sub}</p>
                     </div>
                     <span className="text-[10px] text-slate-400 font-semibold flex-shrink-0 whitespace-nowrap mt-1">{alert.time}</span>
                   </div>
                 )) : (
                   <EmptyState icon={AlertCircle} title="No alerts yet" subtitle="Alerts will appear here." />
                 )}
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[15px] font-bold text-slate-900 mb-3">Quick Actions</h3>
               
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { icon: Eye, label: 'View Detailed Logs' },
                   { icon: Server, label: 'View Infrastructure' },
                   { icon: PulseIcon, label: 'Run Health Check' },
                   { icon: BellRing, label: 'Configure Alerts' },
                 ].map((action, i) => (
                   <button 
                     key={i} 
                     onClick={() => handleQuickAction(action.label)}
                     className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-700 rounded-xl transition-all group shadow-sm active:scale-95"
                   >
                     <action.icon size={16} className="text-blue-600 flex-shrink-0" />
                     <span className="text-[11px] font-bold leading-tight text-left">{action.label}</span>
                   </button>
                 ))}
               </div>
            </div>

          </div>

        </div>
      </div>

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