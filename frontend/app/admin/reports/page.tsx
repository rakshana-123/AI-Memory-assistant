"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight, 
  Brain, ArrowUpRight, Clock, Download, FileSpreadsheet, 
  FileBox, FileClock, Filter, Settings2, FileBarChart, CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const trendData = [
  { name: 'Oct 1', value: 8 }, { name: 'Oct 5', value: 12 },
  { name: 'Oct 10', value: 18 }, { name: 'Oct 15', value: 14 },
  { name: 'Oct 20', value: 24 }, { name: 'Oct 25', value: 22 },
  { name: 'Oct 31', value: 35 },
];

const reportTypesData = [
  { name: 'User Activity', value: 6, fill: '#3b82f6', percent: '25%' },
  { name: 'Memory Usage', value: 5, fill: '#f59e0b', percent: '21%' },
  { name: 'AI Usage', value: 4, fill: '#10b981', percent: '17%' },
  { name: 'Document Analytics', value: 3, fill: '#ef4444', percent: '13%' },
  { name: 'Task & Event', value: 3, fill: '#ec4899', percent: '13%' },
  { name: 'System Reports', value: 3, fill: '#8b5cf6', percent: '13%' },
];

const successRateData = [
  { name: 'Successful', value: 98.2, fill: '#10b981' },
  { name: 'Partial', value: 1.7, fill: '#f59e0b' },
  { name: 'Failed', value: 0.1, fill: '#ef4444' },
];

const topReportsList = [
  { rank: 1, name: 'User Activity Report', icon: FileBarChart, uses: 128, color: 'bg-blue-500', width: 'w-[100%]' },
  { rank: 2, name: 'AI Usage Report', icon: FileText, uses: 96, color: 'bg-purple-500', width: 'w-[75%]' },
  { rank: 3, name: 'Memory Usage Report', icon: FileBox, uses: 84, color: 'bg-emerald-500', width: 'w-[65%]' },
  { rank: 4, name: 'Document Analytics', icon: FileSpreadsheet, uses: 62, color: 'bg-amber-500', width: 'w-[45%]' },
  { rank: 5, name: 'Task & Event Report', icon: FileClock, uses: 48, color: 'bg-pink-500', width: 'w-[35%]' },
];

const tableData = [
  { name: 'Monthly User Activity Report', type: 'User Activity', creator: 'Sarah Kumar', avatar: 'https://i.pravatar.cc/150?img=1', created: 'Oct 31, 2024', time: '09:12 AM', range: 'Oct 1 - Oct 31, 2024', status: 'Completed' },
  { name: 'AI Usage Analysis', type: 'AI Usage', creator: 'Vikram S', avatar: 'https://i.pravatar.cc/150?img=11', created: 'Oct 30, 2024', time: '04:25 PM', range: 'Oct 1 - Oct 30, 2024', status: 'Completed' },
  { name: 'Memory Storage Report', type: 'Memory Usage', creator: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=5', created: 'Oct 29, 2024', time: '11:48 AM', range: 'Oct 1 - Oct 29, 2024', status: 'Completed' },
  { name: 'Document Type Analysis', type: 'Document Analytics', creator: 'Arun Raj', avatar: 'https://i.pravatar.cc/150?img=15', created: 'Oct 28, 2024', time: '02:36 PM', range: 'Oct 1 - Oct 28, 2024', status: 'Processing' },
  { name: 'Weekly Productivity Report', type: 'Task & Event', creator: 'Meena R', avatar: 'https://i.pravatar.cc/150?img=9', created: 'Oct 27, 2024', time: '09:15 AM', range: 'Oct 20 - Oct 26, 2024', status: 'Completed' },
  { name: 'System Performance Report', type: 'System Health', creator: 'Admin', avatar: 'https://i.pravatar.cc/150?img=68', created: 'Oct 26, 2024', time: '01:24 PM', range: 'Oct 1 - Oct 26, 2024', status: 'Completed' },
  { name: 'Integration Usage Report', type: 'Integrations', creator: 'Karthik P', avatar: 'https://i.pravatar.cc/150?img=12', created: 'Oct 25, 2024', time: '03:11 PM', range: 'Oct 1 - Oct 25, 2024', status: 'Failed' },
  { name: 'Custom Report - Research', type: 'Custom', creator: 'Sneha B', avatar: 'https://i.pravatar.cc/150?img=20', created: 'Oct 24, 2024', time: '10:05 AM', range: 'Oct 1 - Oct 24, 2024', status: 'Completed' },
];

const SidebarItem = ({ icon: Icon, label, active, badge, href }: any) => (
  <NextLink href={href} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3 relative">
      {active && <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#2563EB] rounded-r-md"></div>}
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-[#F43F5E] text-white text-[11px] font-bold">{badge}</span>
    )}
  </NextLink>
);

const StatCard = ({ icon: Icon, iconColor, iconBg, title, value, trend }: any) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div className="min-w-0">
        <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1 truncate">{value}</h3>
        <p className="text-[12px] text-slate-500 font-medium leading-tight truncate">{title}</p>
      </div>
    </div>
    <div className="flex items-center gap-1 text-[12px] font-semibold text-emerald-600">
      <ArrowUpRight size={14} />
      <span>{trend}</span>
      <span className="text-slate-400 font-medium ml-1">vs last month</span>
    </div>
  </div>
);

const CustomToggle = ({ active }: any) => (
  <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${active ? 'right-0.5' : 'left-0.5'}`}></div>
  </div>
);

const StatusPill = ({ status }: any) => {
  const styles: Record<string, string> = {
    Completed: 'bg-emerald-100 text-emerald-700',
    Processing: 'bg-blue-100 text-blue-700',
    Failed: 'bg-rose-100 text-rose-700',
  };
  const dotColors: Record<string, string> = {
    Completed: 'bg-emerald-500',
    Processing: 'bg-blue-500',
    Failed: 'bg-rose-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold ${styles[status]}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`}></div>
      {status}
    </span>
  );
};

const dateRangeOptions = ['Oct 1, 2024 - Oct 31, 2024', 'Sep 1, 2024 - Sep 30, 2024', 'Last 7 days', 'Today'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];

const cycleOption = (options: string[], current: string) => {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [chartPeriod, setChartPeriod] = useState(chartPeriodOptions[0]);

  const handleAction = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const visibleReports = tableData.filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          row.creator.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                          row.type.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesType = typeFilter === 'All' || row.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All' || row.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === visibleReports.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleReports.map((_, i) => i));
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
      <aside className="w-[240px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 z-20 sticky top-0 h-screen">
        <div className="flex items-center gap-3 pt-6 pb-8 px-6">
          <div className="text-[#2563EB]">
             <Brain size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold text-slate-900 leading-tight tracking-tight">Pathii</h1>
            <p className="text-[12px] text-blue-500 font-medium">Admin Dashboard</p>
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
          <SidebarItem icon={FileBarChart} label="Reports" active href="/admin/reports" />
          <div className="my-3 border-t border-slate-100 mx-2"></div>
          <SidebarItem icon={Bell} label="Notifications" badge="3" href="/admin/notifications" />
          <SidebarItem icon={ShieldCheck} label="System Health" href="/admin/system-health" />
          <SidebarItem icon={Settings} label="Settings" href="/admin/settings" />
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto flex flex-col gap-2">
          <NextLink href="/admin/settings" className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=68" alt="Admin" className="w-9 h-9 rounded-full object-cover shadow-sm" />
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

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 bg-white/70 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/50 max-lg:h-auto max-lg:py-3">
          <div className="relative w-full max-w-[480px] lg:w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, users, documents, or generate custom report..." 
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

            <button onClick={() => handleAction('You have 3 unread notifications')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">3</span>
            </button>
            <div onClick={() => handleAction('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-5">
              <img src="https://i.pravatar.cc/150?img=68" alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200" />
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
          
          {/* Central Main Area */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-wrap max-lg:gap-3">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200">
                    <FileBarChart size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Reports</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Generate, schedule and manage detailed reports across Pathii platform.</p>
                 </div>
               </div>
               <button 
                 onClick={() => handleAction('Generating new system report...')}
                 className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm shadow-blue-200 transition-all flex items-center gap-2"
               >
                 <Plus size={18} /> Generate Report
               </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              <StatCard icon={FileBarChart} iconColor="text-blue-600" iconBg="bg-blue-100" title="Total Reports" value="24" trend="33%" />
              <StatCard icon={Clock} iconColor="text-emerald-600" iconBg="bg-emerald-100" title="Scheduled Reports" value="18" trend="28%" />
              <StatCard icon={Users} iconColor="text-purple-600" iconBg="bg-purple-100" title="Users in Reports" value="8,426" trend="18%" />
              <StatCard icon={FileText} iconColor="text-amber-500" iconBg="bg-amber-100" title="Documents Analyzed" value="3,198" trend="24%" />
              <StatCard icon={Brain} iconColor="text-pink-600" iconBg="bg-pink-100" title="AI Interactions" value="12,845" trend="28%" />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Trend Chart (Span 2) */}
              <div className="col-span-1 lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Report Generation Trend</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Reports generated over the last 30 days.</p>
                  </div>
                  <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600">
                    {chartPeriod} <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex-1 -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} ticks={[0, 10, 20, 30, 40]} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reports by Type Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <h3 className="text-[16px] font-bold text-slate-900 mb-4">Reports by Type</h3>
                <div className="flex flex-1 items-center gap-4 max-lg:overflow-x-auto">
                  <div className="relative w-[130px] h-[130px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportTypesData}
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="none"
                        >
                          {reportTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[22px] font-extrabold text-slate-900 leading-none">24</span>
                      <span className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-tight">Total Reports</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2.5 pt-2">
                    {reportTypesData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-semibold text-slate-700 truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-2 shrink-0">
                           <span className="text-slate-500 font-medium">{item.value}</span>
                           <span className="text-slate-400 font-medium w-8 text-right">({item.percent})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[260px]">
              
              {/* Top Reports by Usage */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                 <h3 className="text-[16px] font-bold text-slate-900 mb-5">Top Reports by Usage</h3>
                 <div className="flex flex-col justify-between flex-1 gap-2">
                   {topReportsList.map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <span className="w-4 text-[11px] font-bold text-slate-400">{item.rank}</span>
                       <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-blue-600">
                         <item.icon size={14} />
                       </div>
                       <span className="flex-1 text-[13px] font-semibold text-slate-700 truncate">{item.name}</span>
                       <span className="text-[12px] font-medium text-slate-500 w-12 text-right">{item.uses} uses</span>
                       <div className="w-[80px] h-3 bg-slate-100 rounded-full overflow-hidden flex justify-end">
                          <div className={`h-full rounded-full ${item.color} ${item.width}`}></div>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Report Success Rate */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center relative p-5">
                 <h3 className="text-[16px] font-bold text-slate-900 self-start mb-4">Report Success Rate</h3>
                 <div className="flex items-center gap-6 w-full px-2">
                   <div className="relative w-[130px] h-[130px] flex-shrink-0">
                     <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                         <Pie
                           data={successRateData}
                           innerRadius={45}
                           outerRadius={65}
                           paddingAngle={2}
                           dataKey="value"
                           stroke="none"
                         >
                           {successRateData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.fill} />
                           ))}
                         </Pie>
                       </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-[20px] font-extrabold text-slate-900 leading-none">98.2%</span>
                       <span className="text-[10px] text-slate-500 font-semibold mt-1">Success Rate</span>
                     </div>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                      {successRateData.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 mb-0.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                            {item.name}
                          </div>
                          <span className="text-[11px] text-slate-500 ml-4.5 font-medium">{item.value === 98.2 ? '118 (98.2%)' : item.value === 1.7 ? '2 (1.7%)' : '1 (0.1%)'}</span>
                        </div>
                      ))}
                   </div>
                 </div>
              </div>

              {/* Scheduled Reports */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                 <div className="flex items-center justify-between mb-5">
                   <h3 className="text-[16px] font-bold text-slate-900">Scheduled Reports</h3>
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                       <Clock size={16} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[14px] font-bold text-slate-900 leading-none">18</span>
                       <span className="text-[10px] text-slate-500 font-medium">Active Schedules</span>
                     </div>
                   </div>
                 </div>

                 <div className="flex flex-col justify-between flex-1 gap-2">
                   {[
                     { name: 'Daily User Summary', sub: 'Daily at 8:00 AM' },
                     { name: 'Weekly AI Usage Report', sub: 'Every Monday' },
                     { name: 'Monthly Analytics Report', sub: '1st of every month' },
                     { name: 'System Health Report', sub: 'Daily at 12:00 AM' },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                       <div className="flex items-start gap-2">
                          <div className="mt-1 text-emerald-500"><ArrowUpRight size={14} className="rotate-45" /></div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-slate-700 leading-snug">{item.name}</span>
                            <span className="text-[11px] text-slate-500 font-medium">{item.sub}</span>
                          </div>
                       </div>
                       <CustomToggle active={true} />
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              {/* Filter Bar */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-[16px] font-bold text-slate-900 mr-4">All Reports</h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search reports..." 
                      className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-700"
                    />
                  </div>
                  
                  {['All', 'Completed', 'Processing', 'Failed'].map((status, i) => (
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
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10">
                        <input 
                          type="checkbox" 
                          checked={visibleReports.length > 0 && selectedIds.length === visibleReports.length}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                        />
                      </th>
                      <th className="py-3 px-4 font-semibold">Report Name</th>
                      <th className="py-3 px-4 font-semibold">Type</th>
                      <th className="py-3 px-4 font-semibold">Generated By</th>
                      <th className="py-3 px-4 font-semibold">Created On</th>
                      <th className="py-3 px-4 font-semibold">Date Range</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {visibleReports.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400 text-[13px] font-medium">
                          No reports found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      visibleReports.map((row, index) => (
                        <tr key={index} className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${selectedIds.includes(index) ? 'bg-blue-50/40' : ''}`}>
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(index)}
                              onChange={() => toggleSelectRow(index)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                            />
                          </td>
                          <td onClick={() => handleAction(`Opened report "${row.name}"`)} className="py-3 px-4 flex items-center gap-2 font-bold text-blue-700 cursor-pointer hover:underline">
                            <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <FileText size={14} />
                            </div>
                            {row.name}
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-medium text-[12px]">{row.type}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 font-semibold text-slate-700 text-[12px]">
                               <img src={row.avatar} alt={row.creator} className="w-6 h-6 rounded-full object-cover shadow-sm" />
                               {row.creator}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                             <div className="flex flex-col">
                                <span className="text-slate-700 font-medium text-[12px]">{row.created}</span>
                                <span className="text-[11px] text-slate-400">{row.time}</span>
                             </div>
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-medium text-[12px]">{row.range}</td>
                          <td className="py-3 px-4">
                             <StatusPill status={row.status} />
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

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500 flex-wrap gap-3">
                 <span>Showing {visibleReports.length === 0 ? 0 : 1}–{visibleReports.length} of {tableData.length} reports</span>
                 <div className="flex items-center gap-1">
                   <button 
                     onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-30"
                     disabled={currentPage === 1}
                   >
                     <ChevronDown size={14} className="rotate-90" />
                   </button>
                   {[1, 2, 3, 4].map(page => (
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
                     onClick={() => setCurrentPage(prev => Math.min(4, prev + 1))}
                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 disabled:opacity-30"
                     disabled={currentPage === 4}
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

          {/* Right Fixed Sidebar */}
          <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Popular Report Templates */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Popular Report Templates</h3>
                 <button onClick={() => handleAction('All report templates are shown above')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               <div className="space-y-4">
                 {[
                   { name: 'User Activity Report', sub: 'Active users, signups, engagement', icon: FileBarChart, color: 'text-blue-500', bg: 'bg-blue-100' },
                   { name: 'Memory Usage Report', sub: 'Notes, files, images, voice data', icon: FileBox, color: 'text-amber-500', bg: 'bg-amber-100' },
                   { name: 'AI Usage Report', sub: 'Model usage, cost, success rate', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-100' },
                   { name: 'Document Analytics Report', sub: 'File types, storage, OCR usage', icon: FileSpreadsheet, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                   { name: 'Task & Event Report', sub: 'Productivity and completion rate', icon: CalendarCheck, color: 'text-purple-500', bg: 'bg-purple-100' },
                   { name: 'System Health Report', sub: 'Server performance and uptime', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
                 ].map((tmpl, i) => (
                   <div key={i} className="flex items-center justify-between group">
                     <div className="flex items-start gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 ${tmpl.bg} ${tmpl.color}`}>
                         <tmpl.icon size={16} />
                       </div>
                       <div className="flex flex-col min-w-0 pr-2">
                         <span className="text-[13px] font-bold text-slate-800 leading-tight truncate">{tmpl.name}</span>
                         <span className="text-[11px] text-slate-500 font-medium truncate">{tmpl.sub}</span>
                       </div>
                     </div>
                     <button 
                       onClick={() => handleAction(`Generating ${tmpl.name}...`)}
                       className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shrink-0 active:scale-95 shadow-sm"
                     >
                       Generate
                     </button>
                   </div>
                 ))}
               </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Reports</h3>
                <button onClick={() => handleAction('Showing recent reports')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Monthly User Activity Report', by: 'Sarah Kumar', time: '2 min ago', color: 'text-blue-500', bg: 'bg-blue-100' },
                  { title: 'AI Usage Analysis', by: 'Vikram S', time: '12 min ago', color: 'text-purple-500', bg: 'bg-purple-100' },
                  { title: 'Memory Storage Report', by: 'Priya Nair', time: '28 min ago', color: 'text-amber-500', bg: 'bg-amber-100' },
                  { title: 'Document Type Analysis', by: 'Arun Raj', time: '1 hour ago', color: 'text-emerald-500', bg: 'bg-emerald-100' },
                  { title: 'Weekly Productivity Report', by: 'Meena R', time: '2 hours ago', color: 'text-pink-500', bg: 'bg-pink-100' },
                ].map((rep, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${rep.bg}`}>
                      <FileText size={16} className={rep.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 leading-tight truncate">{rep.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium truncate">Generated by {rep.by}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap mt-1">{rep.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-4">Quick Actions</h3>
               
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { icon: Plus, label: 'Generate Custom Report' },
                   { icon: CalendarCheck, label: 'Schedule a Report' },
                   { icon: Download, label: 'Export Reports' },
                   { icon: Settings2, label: 'Manage Templates' },
                 ].map((action, i) => (
                   <button 
                     key={i} 
                     onClick={() => handleAction(`${action.label} initiated successfully!`)}
                     className="flex items-center gap-2 px-3 py-3.5 bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-700 text-slate-700 rounded-xl transition-all group active:scale-95 shadow-sm"
                   >
                     <action.icon size={18} className="text-blue-600 flex-shrink-0" />
                     <span className="text-[12px] font-bold leading-tight text-left">{action.label}</span>
                   </button>
                 ))}
               </div>
            </div>

          </div>

        </div>
      </main>

      {/* Global Styles for Custom Scrollbar */}
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