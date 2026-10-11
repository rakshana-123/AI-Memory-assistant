"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight, 
  Brain, CheckCircle2, ArrowUpRight, ArrowDownRight,
  CheckSquare, Calendar, Clock, XCircle, Filter,
  Download, Layers, FolderKanban, Trash2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

type TrendPoint = { name: string; tasks: number; events: number };

const trendsData: TrendPoint[] = [];

type StatusSlice = { name: string; value: number; fill: string };

const statusData: StatusSlice[] = [];

type EventTypeSlice = { name: string; value: number; fill: string };

const eventTypesData: EventTypeSlice[] = [];

type TaskRow = {
  title: string; icon: any; iconBg: string; type: string; typeColor: string;
  status: string; statusColor: string; initials: string; avatarColor: string;
  assignedName: string; date: string; time: string; createdInitials?: string;
  createdAvatarColor?: string; createdName: string;
};

const tableData: TaskRow[] = [];

type UpcomingEvent = { day: string; mth: string; title: string; time: string; icon: any; color: string };

const upcomingEvents: UpcomingEvent[] = [];

type Activity = { icon: any; color: string; bg: string; title: string; desc: string; time: string };

const recentActivity: Activity[] = [];

const taskTypeOptions = ['All Types', 'Task', 'Event'];
const taskStatusOptions = ['All Status', 'Pending', 'Upcoming', 'Completed', 'Overdue'];
const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'All time', 'Today'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];
const userFilterOptions = ['All Users', 'Admins', 'Team Leads', 'Pro Users'];

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
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div>
        <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1">{typeof value === 'number' ? value.toLocaleString('en-US') : value}</h3>
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

export default function AdminDashboard() {
  const [headerQuery, setHeaderQuery] = useState('');
  const [tableQuery, setTableQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedTitles, setSelectedTitles] = useState<Set<string>>(new Set());
  const [rows, setRows] = useState(tableData);
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [chartPeriod, setChartPeriod] = useState(chartPeriodOptions[0]);
  const [userFilter, setUserFilter] = useState(userFilterOptions[0]);
  const [toast, setToast] = useState<string | null>(null);

  const totalTasks = rows.filter((r) => r.type === 'Task').length;
  const totalEvents = rows.filter((r) => r.type === 'Event').length;
  const completedCount = rows.filter((r) => r.status === 'Completed').length;
  const pendingCount = rows.filter((r) => r.status === 'Pending').length;
  const overdueCount = rows.filter((r) => r.status === 'Overdue').length;
  const statusTotal = statusData.reduce((sum, slice) => sum + slice.value, 0);
  const eventTypesTotal = eventTypesData.reduce((sum, slice) => sum + slice.value, 0);
  const totalPages = Math.max(1, Math.ceil(rows.length / 10));

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = () => {
    const suffix = rows.filter((r) => r.title.startsWith('Admin follow-up')).length + 1;
    const title = suffix === 1 ? 'Admin follow-up' : `Admin follow-up (${suffix})`;
    setRows((prev) => [
      {
        title,
        icon: CheckSquare,
        iconBg: 'bg-purple-100 text-purple-600',
        type: 'Task',
        typeColor: 'text-purple-700 bg-purple-100',
        status: 'Pending',
        statusColor: 'text-amber-700 bg-amber-100',
        initials: 'A',
        avatarColor: 'bg-blue-100 text-blue-600',
        assignedName: 'Admin',
        date: 'Today',
        time: 'Now',
        createdInitials: 'A',
        createdAvatarColor: 'bg-blue-100 text-blue-600',
        createdName: 'Admin',
      },
      ...prev,
    ]);
    showToast(`Task "${title}" created and assigned to Admin`);
  };

  const exportRows = () => {
    if (rows.length === 0) {
      showToast('No data to export');
      return;
    }
    downloadCsv('pathii-tasks-events.csv', [
      ['Title', 'Type', 'Status', 'Assigned To', 'Due Date', 'Created By'],
      ...rows.map((r) => [r.title, r.type, r.status, r.assignedName, `${r.date} ${r.time}`, r.createdName]),
    ]);
    showToast(`Exported ${rows.length} rows`);
  };

  const handleCleanup = () => {
    const completed = rows.filter((r) => r.status === 'Completed');
    if (completed.length === 0) {
      showToast('No completed items to clean up');
      return;
    }
    setRows((prev) => prev.filter((r) => r.status !== 'Completed'));
    showToast(`Cleaned up ${completed.length} completed item${completed.length > 1 ? 's' : ''}`);
  };

  const visibleRows = rows.filter((row) => {
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Tasks' && row.type === 'Task') ||
      (activeTab === 'Events' && row.type === 'Event');
    const header = headerQuery.trim().toLowerCase();
    const table = tableQuery.trim().toLowerCase();
    const matchesSearch =
      (header === '' ||
        row.title.toLowerCase().includes(header) ||
        row.assignedName.toLowerCase().includes(header) ||
        row.createdName.toLowerCase().includes(header)) &&
      (table === '' ||
        row.title.toLowerCase().includes(table) ||
        row.assignedName.toLowerCase().includes(table) ||
        row.createdName.toLowerCase().includes(table));
    return (
      matchesTab &&
      matchesSearch &&
      (typeFilter === 'All Types' || row.type === typeFilter) &&
      (statusFilter === 'All Status' || row.status === statusFilter)
    );
  });

  const isFiltered = visibleRows.length !== rows.length;

  const allVisibleSelected =
    visibleRows.length > 0 && visibleRows.every((row) => selectedTitles.has(row.title));

  const toggleAllVisible = () => {
    setSelectedTitles((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleRows.forEach((row) => next.delete(row.title));
      } else {
        visibleRows.forEach((row) => next.add(row.title));
      }
      return next;
    });
  };

  const toggleRow = (title: string) => {
    setSelectedTitles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
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
            <p className="text-[12px] text-slate-500 font-medium leading-none mt-0.5">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
          <SidebarItem icon={LayoutDashboard} label="Overview" href="/admin" />
          <SidebarItem icon={Users} label="Users" href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" href="/admin/memories" />
          <SidebarItem icon={FileText} label="Documents" href="/admin/documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" active href="/admin/tasks" />
          <SidebarItem icon={Cpu} label="AI Usage" href="/admin/ai-usage" />
          <SidebarItem icon={Link} label="Integrations" href="/admin/integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" href="/admin/analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" href="/admin/reports" />
          <SidebarItem icon={Bell} label="Notifications" href="/admin/notifications" />
          <SidebarItem icon={ShieldCheck} label="System Health" href="/admin/system-health" />
          <SidebarItem icon={Settings} label="Settings" href="/admin/settings" />
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[13px]">A</div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Admin</p>
                <p className="text-[12px] text-slate-500 font-medium leading-none">Administrator</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 border-b border-slate-200/50 bg-[#F4F7F9] max-lg:h-auto max-lg:flex-wrap max-lg:py-3 max-lg:gap-3">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={headerQuery}
              onChange={(event) => setHeaderQuery(event.target.value)}
              placeholder="Search tasks, events, users, or anything..."
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

            <button onClick={() => showToast('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
            </button>
            <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px] shadow-sm border border-slate-200">A</div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-slate-700">Admin <ChevronDown size={14} className="text-slate-400" /></div>
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar flex gap-6 max-lg:flex-col">
          
          {/* Left Main Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Page Header */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-col max-lg:items-start max-lg:gap-4">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarCheck size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Tasks & Events Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Monitor, organize and manage all user tasks and events across Pathii.</p>
                 </div>
               </div>
               <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm shadow-blue-200 transition-colors flex items-center gap-2">
                 <Plus size={18} /> Create Task / Event
               </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard icon={CheckSquare} iconColor="text-purple-600" iconBg="bg-purple-100" title="Total Tasks" value={totalTasks} />
              <StatCard icon={Calendar} iconColor="text-blue-600" iconBg="bg-blue-100" title="Total Events" value={totalEvents} />
              <StatCard icon={CheckCircle2} iconColor="text-emerald-600" iconBg="bg-emerald-100" title="Completed" value={completedCount} />
              <StatCard icon={Clock} iconColor="text-orange-500" iconBg="bg-orange-100" title="Pending" value={pendingCount} />
              <StatCard icon={XCircle} iconColor="text-red-500" iconBg="bg-red-100" title="Overdue" value={overdueCount} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
              
              {/* Tasks & Events Trend Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Tasks & Events Trend</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Tasks and events created over the last 30 days.</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                      {chartPeriod} <ChevronDown size={14} />
                    </button>
                    <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600">
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Tasks</div>
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Events</div>
                    </div>
                  </div>
                </div>
                {trendsData.length > 0 ? (
                <div className="flex-1 min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTasks)" />
                      <Area type="monotone" dataKey="events" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorEvents)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                ) : (
                  <EmptyState icon={BarChart2} title="No trends yet" subtitle="Task and event activity will appear here." />
                )}
              </div>

              {/* Task Status Donut Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900">Task Status</h3>
                <p className="text-[13px] text-slate-500 font-medium mb-4">Current status of all tasks.</p>
                
                {statusData.length > 0 ? (
                <div className="flex-1 flex items-center justify-between pl-2 pr-4 max-lg:flex-col max-lg:items-start max-lg:gap-4">
                  <div className="relative w-[130px] h-[130px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          innerRadius={42}
                          outerRadius={65}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[20px] font-extrabold text-slate-900 leading-none">{statusTotal.toLocaleString('en-US')}</span>
                      <span className="text-[10px] text-slate-500 font-semibold mt-1">Total Tasks</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {statusData.map((item, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="text-[12px] font-semibold text-slate-700">{item.name}</span>
                        </div>
                        <div className="flex items-center justify-between pl-4 text-[12px]">
                           <span className="text-slate-500 font-medium">{item.value.toLocaleString('en-US')}</span>
                           <span className="text-slate-400 font-medium">({statusTotal > 0 ? Math.round((item.value / statusTotal) * 100) : 0}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                ) : (
                  <EmptyState icon={CheckSquare} title="No data yet" subtitle="Task status breakdown will appear here." />
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              {/* Filter Bar */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3 max-lg:flex-wrap">
                <div className="relative flex-1 max-w-[300px] max-lg:min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={tableQuery}
                    onChange={(event) => setTableQuery(event.target.value)}
                    placeholder="Search tasks or events..."
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>

                <button
                  onClick={() => setTypeFilter(cycleOption(taskTypeOptions, typeFilter))}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors"
                >
                  {typeFilter} <ChevronDown size={14} className="text-slate-400" />
                </button>

                <button
                  onClick={() => setStatusFilter(cycleOption(taskStatusOptions, statusFilter))}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors"
                >
                  {statusFilter} <ChevronDown size={14} className="text-slate-400" />
                </button>

                <button
                  onClick={() => setUserFilter(cycleOption(userFilterOptions, userFilter))}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors"
                >
                  {userFilter} <ChevronDown size={14} className="text-slate-400" />
                </button>

                <button onClick={() => setDateRange(cycleOption(dateRangeOptions, dateRange))} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors ml-auto">
                  {dateRange} <ChevronDown size={14} className="text-slate-400" />
                </button>

                <button onClick={() => showToast('Advanced filters: assignee, priority, due date')} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                  <Filter size={14} className="text-slate-400" /> Filter
                </button>
              </div>

              {/* Tabs */}
              <div className="px-4 pt-3 flex gap-6 border-b border-slate-100 max-lg:flex-wrap">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`pb-3 border-b-2 text-[13px] font-bold ${activeTab === 'All' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md mr-1.5">All ({rows.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('Tasks')}
                  className={`pb-3 border-b-2 text-[13px] font-bold ${activeTab === 'Tasks' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  Tasks ({totalTasks})
                </button>
                <button
                  onClick={() => setActiveTab('Events')}
                  className={`pb-3 border-b-2 text-[13px] font-bold ${activeTab === 'Events' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  Events ({totalEvents})
                </button>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></th>
                      <th className="py-3 px-4 font-semibold">Title</th>
                      <th className="py-3 px-4 font-semibold">Type</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Assigned To</th>
                      <th className="py-3 px-4 font-semibold">Due Date / Time</th>
                      <th className="py-3 px-4 font-semibold">Created By</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-2">
                          <EmptyState icon={CheckSquare} title="No tasks or events yet" subtitle="Items you create will appear here." />
                        </td>
                      </tr>
                    ) : visibleRows.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                          No items found matching your filters.
                        </td>
                      </tr>
                    ) : (
                    visibleRows.map((row) => (
                      <tr key={row.title} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4"><input type="checkbox" checked={selectedTitles.has(row.title)} onChange={() => toggleRow(row.title)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></td>
                        <td className="py-3 px-4 flex items-center gap-3 font-bold text-slate-900">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${row.iconBg}`}>
                            <row.icon size={16} />
                          </div>
                          <span className="truncate max-w-[200px]">{row.title}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded flex items-center gap-1.5 w-fit text-[11px] font-bold ${row.typeColor}`}>
                             {row.type === 'Task' ? <CheckSquare size={12}/> : <Calendar size={12}/>} {row.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${row.statusColor.replace('bg-', 'border-').replace('100', '200')} ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 font-semibold text-slate-700">
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${row.avatarColor}`}>{row.initials}</div>
                             <span className="whitespace-nowrap">{row.assignedName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                           <div className="flex flex-col whitespace-nowrap">
                              <span className="text-slate-700 font-medium">{row.date}</span>
                              <span className="text-[11px] text-slate-400">{row.time}</span>
                           </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 font-semibold text-slate-700">
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${row.createdAvatarColor ?? row.avatarColor}`}>{row.createdInitials ?? row.initials}</div>
                             <span className="whitespace-nowrap">{row.createdName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => showToast(`Opened actions for "${row.title}"`)} className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500">
                 <span>
                   {isFiltered
                     ? `Showing ${visibleRows.length === 0 ? 0 : 1}–${visibleRows.length} of ${visibleRows.length} items`
                     : `Showing ${rows.length === 0 ? 0 : 1}–${rows.length} of ${rows.length} items`}
                 </span>
                 <div className="flex items-center gap-1">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="rotate-90" /></button>
                   {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNum) => (
                     <button key={pageNum} className={`w-8 h-8 flex items-center justify-center rounded-lg ${pageNum === 1 ? 'bg-blue-600 text-white font-bold shadow-sm' : 'hover:bg-slate-100 font-semibold text-slate-700'}`}>{pageNum}</button>
                   ))}
                   {totalPages > 5 && (
                     <>
                       <span className="px-1 text-slate-400">...</span>
                       <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">{totalPages}</button>
                     </>
                   )}
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="-rotate-90" /></button>
                 </div>
                 <div className="flex items-center gap-2">
                   <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                     10 per page <ChevronDown size={14} className="text-slate-400" />
                   </button>
                 </div>
              </div>
            </div>

          </div>

          <div className="w-[320px] flex-shrink-0 flex flex-col gap-6 max-lg:w-full">
            
            {/* Upcoming Events */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Upcoming Events <span className="text-slate-400 font-medium text-[13px] font-normal">(Next 7 Days)</span></h3>
                 <button onClick={() => showToast('Showing all upcoming events for the next 7 days')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               
               <div className="space-y-4">
                 {upcomingEvents.length > 0 ? upcomingEvents.map((event, i) => (
                   <div key={i} className="flex items-center gap-3 group cursor-pointer">
                     <div className="flex flex-col items-center justify-center w-10 h-11 bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0 group-hover:border-blue-200 transition-colors">
                       <span className="text-[10px] font-bold text-slate-500 uppercase leading-none mt-1">{event.mth}</span>
                       <span className="text-[16px] font-extrabold text-slate-900 leading-tight">{event.day}</span>
                     </div>
                     <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${event.color}`}>
                       <event.icon size={16} />
                     </div>
                     <div>
                       <p className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{event.title}</p>
                       <p className="text-[12px] text-slate-500 font-medium">{event.time}</p>
                     </div>
                   </div>
                 )) : (
                   <EmptyState icon={Calendar} title="No upcoming events" subtitle="Events scheduled for the next 7 days will appear here." />
                 )}
               </div>
            </div>

            {/* Event Types Donut */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Event Types</h3>
                 <button onClick={() => showToast('All event types are shown above')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
              
              {eventTypesData.length > 0 ? (
              <div className="flex items-center gap-4">
                <div className="relative w-[110px] h-[110px] flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventTypesData}
                        innerRadius={35}
                        outerRadius={55}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {eventTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[18px] font-extrabold text-slate-900 leading-none">{eventTypesTotal.toLocaleString('en-US')}</span>
                    <span className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-tight text-center">Total Events</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  {eventTypesData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-semibold text-slate-700 truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                         <span className="text-slate-500 font-medium">{item.value}</span>
                         <span className="text-slate-400 font-medium w-7 text-right">({eventTypesTotal > 0 ? Math.round((item.value / eventTypesTotal) * 100) : 0}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              ) : (
                <EmptyState icon={Calendar} title="No data yet" subtitle="Event type breakdown will appear here." />
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Activity</h3>
                <button onClick={() => showToast('Showing all recent activity')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {recentActivity.length > 0 ? recentActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${act.bg}`}>
                      <act.icon size={16} className={act.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 truncate">{act.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{act.desc}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap mt-1">{act.time}</span>
                  </div>
                )) : (
                  <EmptyState icon={Clock} title="No activity yet" subtitle="Recent task and event activity will appear here." />
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-4">Quick Actions</h3>
               
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { icon: Download, label: 'Export Tasks & Events' },
                   { icon: Layers, label: 'Bulk Actions' },
                   { icon: FolderKanban, label: 'Manage Categories' },
                   { icon: Trash2, label: 'Cleanup Old Items' },
                 ].map((action, i) => (
                   <button
                     key={i}
                     onClick={() => {
                       if (action.label === 'Export Tasks & Events') exportRows();
                       else if (action.label === 'Bulk Actions') showToast(`Bulk actions: ${selectedTitles.size} item${selectedTitles.size === 1 ? '' : 's'} selected`);
                       else if (action.label === 'Manage Categories') showToast('6 categories: Work, Personal, Academic, Projects, Research, Others');
                       else handleCleanup();
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

      {/* Global Styles */}
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