"use client";
import NextLink from "next/link";
import React from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, ArrowUpRight,
  MoreVertical, ChevronRight, Brain, Mic, Image as ImageIcon,
  Eye, Download, Trash2, Calendar, File, MoreHorizontal, Link2, CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Area Chart (Stacked) source — empty until real data exists
type TrendPoint = { name: string; voice: number; notes: number; docs: number; images: number; links: number };

const memoryTrendsData: TrendPoint[] = [];

type BreakdownSlice = { name: string; value: number; fill: string; percent: string };

const memoryBreakdownData: BreakdownSlice[] = [];

type MemoryRecord = {
  type: string; typeIcon: any; typeColor: string; typeBg: string;
  title: string; user: string; date: string; time: string; size: string;
};

const recentMemories: MemoryRecord[] = [];

type Activity = { icon: any; color: string; bg: string; title: string; sub: string; time: string };

const recentActivity: Activity[] = [];

type StorageType = { color: string; label: string; val: number; pct: string };

const storageByType: StorageType[] = [];

const memoryTypeOptions = ['All Types', 'Voice Note', 'Document', 'Image', 'Link'];
const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'All time', 'Today'];
const userFilterOptions = ['All Users', 'Admins', 'Pro Users', 'Free Users'];
const ageFilterOptions = ['Last 7 days', 'Last 30 days', 'All time'];

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

const EmptyState = ({ icon: Icon, title, subtitle }: any) => (
  <div className="flex flex-col items-center justify-center text-center py-12">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
      <Icon size={22} className="text-slate-400" strokeWidth={2} />
    </div>
    <p className="text-[15px] font-semibold text-slate-700">{title}</p>
    <p className="text-[13px] text-slate-400 mt-1">{subtitle}</p>
  </div>
);

export default function MemoryManagementDashboard() {
  const [headerQuery, setHeaderQuery] = React.useState('');
  const [tableQuery, setTableQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('All Types');
  const [selectedTitles, setSelectedTitles] = React.useState<Set<string>>(new Set());
  const [memories, setMemories] = React.useState(recentMemories);
  const [dateRange, setDateRange] = React.useState(dateRangeOptions[0]);
  const [userFilter, setUserFilter] = React.useState(userFilterOptions[0]);
  const [ageFilter, setAgeFilter] = React.useState(ageFilterOptions[0]);
  const [toast, setToast] = React.useState<string | null>(null);

  const totalMemories = memories.length;
  const voiceNoteCount = memories.filter((m) => m.type === 'Voice Note').length;
  const documentCount = memories.filter((m) => m.type === 'Document').length;
  const imageCount = memories.filter((m) => m.type === 'Image').length;
  const linkCount = memories.filter((m) => m.type === 'Link').length;
  const breakdownTotal = memoryBreakdownData.reduce((sum, slice) => sum + slice.value, 0);
  const storageUsedGb = storageByType.reduce((sum, type) => sum + type.val, 0);
  const totalPages = Math.max(1, Math.ceil(memories.length / 5));

  const memoryStats = [
    { title: 'Total Memories', value: totalMemories, icon: Mic, iconColor: 'text-blue-500', iconBg: 'bg-blue-100' },
    { title: 'Voice Notes', value: voiceNoteCount, icon: FileText, iconColor: 'text-purple-500', iconBg: 'bg-purple-100' },
    { title: 'Documents', value: documentCount, icon: File, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-100' },
    { title: 'Images', value: imageCount, icon: ImageIcon, iconColor: 'text-amber-500', iconBg: 'bg-amber-100' },
    { title: 'Links & Others', value: linkCount, icon: Link2, iconColor: 'text-pink-500', iconBg: 'bg-pink-100' },
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const exportMemories = () => {
    if (memories.length === 0) {
      showToast('No data to export');
      return;
    }
    downloadCsv('pathii-memories.csv', [
      ['Type', 'Title / Content', 'User', 'Created At', 'Size'],
      ...memories.map((m) => [m.type, m.title, m.user, `${m.date} ${m.time}`, m.size]),
    ]);
    showToast(`Exported ${memories.length} rows`);
  };

  const handleCleanup = () => {
    if (memories.length === 0) {
      showToast('No memories to clean up');
      return;
    }
    const oldest = memories[memories.length - 1];
    setMemories((prev) => prev.slice(0, -1));
    showToast(`Cleaned up "${oldest.title}" (oldest memory)`);
  };

  const visibleMemories = memories.filter((memory) => {
    const header = headerQuery.trim().toLowerCase();
    const table = tableQuery.trim().toLowerCase();
    const matchesSearch =
      (header === '' ||
        memory.title.toLowerCase().includes(header) ||
        memory.user.toLowerCase().includes(header) ||
        memory.type.toLowerCase().includes(header)) &&
      (table === '' ||
        memory.title.toLowerCase().includes(table) ||
        memory.user.toLowerCase().includes(table) ||
        memory.type.toLowerCase().includes(table));
    return matchesSearch && (typeFilter === 'All Types' || memory.type === typeFilter);
  });

  const isFiltered = visibleMemories.length !== memories.length;

  const allVisibleSelected =
    visibleMemories.length > 0 && visibleMemories.every((memory) => selectedTitles.has(memory.title));

  const toggleAllVisible = () => {
    setSelectedTitles((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleMemories.forEach((memory) => next.delete(memory.title));
      } else {
        visibleMemories.forEach((memory) => next.add(memory.title));
      }
      return next;
    });
  };

  const toggleMemory = (title: string) => {
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
            <p className="text-[12px] text-slate-500 font-medium">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
          <SidebarItem icon={LayoutDashboard} label="Overview" href="/admin" />
          <SidebarItem icon={Users} label="Users" href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" active href="/admin/memories" />
          <SidebarItem icon={FileText} label="Documents" href="/admin/documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" href="/admin/tasks" />
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

      { }
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={headerQuery}
              onChange={(event) => setHeaderQuery(event.target.value)}
              placeholder="Search memories, users, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-shrink-0">
            <button onClick={() => showToast('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
            </button>
            <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px] shadow-sm border border-slate-200">A</div>
                <span className="text-[13px] font-bold text-slate-700 flex items-center gap-1">Admin <ChevronDown size={14} className="text-slate-400"/></span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar flex gap-6 max-lg:flex-col">
          
          {/* Left Main Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title & Date Picker Row */}
            <div className="flex items-center justify-between max-lg:flex-col max-lg:items-stretch max-lg:gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex-1 mr-4 max-lg:mr-0">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Database size={24} strokeWidth={2.5} />
                   </div>
                   <div>
                     <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Memory Management</h2>
                     <p className="text-[14px] text-slate-500 font-medium">View, organize and manage all user memories across the system.</p>
                   </div>
                </div>

                <button onClick={() => setDateRange(cycleOption(dateRangeOptions, dateRange))} className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors w-full max-w-[260px] lg:w-[260px] h-[64px] max-lg:max-w-full">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {dateRange}
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
               {memoryStats.map((stat, i) => (
                 <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.iconBg}`}>
                       <stat.icon size={16} className={stat.iconColor} />
                    </div>
                    <div>
                        <p className="text-[12px] text-slate-500 font-medium mb-1">{stat.title}</p>
                        <h3 className="text-[24px] font-extrabold text-slate-900 leading-none mb-3">{stat.value.toLocaleString('en-US')}</h3>
                    </div>
                    {stat.value > 0 && (
                    <div className={`flex items-center gap-1 text-[12px] font-semibold text-emerald-600`}>
                      <ArrowUpRight size={14} />
                      <span>vs last month</span>
                    </div>
                    )}
                 </div>
               ))}
            </div>

            {}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Memory Trends</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Total memories created over the last 30 days.</p>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] font-semibold text-slate-600">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Voice</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Notes</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Documents</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Images</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div> Links</div>
                  </div>
                </div>
                {memoryTrendsData.length > 0 ? (
                <div className="h-[200px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={memoryTrendsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 400]} ticks={[0, 100, 200, 300, 400]} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="voice" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                      <Area type="monotone" dataKey="notes" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} strokeWidth={2} />
                      <Area type="monotone" dataKey="docs" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                      <Area type="monotone" dataKey="images" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
                      <Area type="monotone" dataKey="links" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                ) : (
                  <EmptyState icon={BarChart2} title="No trends yet" subtitle="Memory creation activity will appear here." />
                )}
            </div>

            {}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">

              {/* Memory Sources */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-1">Memory Sources</h3>
                <p className="text-[13px] text-slate-500 font-medium mb-5">Where your memories come from.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { label: 'Voice', count: voiceNoteCount, icon: Mic, iconColor: 'text-blue-500', iconBg: 'bg-blue-100' },
                    { label: 'Documents', count: documentCount, icon: FileText, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-100' },
                    { label: 'Images', count: imageCount, icon: ImageIcon, iconColor: 'text-amber-500', iconBg: 'bg-amber-100' },
                    { label: 'Links', count: linkCount, icon: Link2, iconColor: 'text-pink-500', iconBg: 'bg-pink-100' },
                    { label: 'Other', count: 0, icon: MoreHorizontal, iconColor: 'text-slate-500', iconBg: 'bg-slate-100' },
                  ].map((src) => (
                    <div key={src.label} className="border border-slate-100 rounded-xl p-3 flex flex-col items-start bg-slate-50/50">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${src.iconBg}`}>
                          <src.icon size={16} className={src.iconColor} />
                        </div>
                        <p className="text-[12px] font-bold text-slate-900 mb-1">{src.label}</p>
                        <p className="text-[14px] font-extrabold text-slate-900 leading-none mb-1">{src.count.toLocaleString('en-US')}</p>
                        <p className="text-[11px] text-slate-500 font-medium mb-2">{totalMemories > 0 ? `${Math.round((src.count / totalMemories) * 100)}%` : '0%'}</p>
                        {src.count > 0 && (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <ArrowUpRight size={12} /> active
                        </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-5">
                  <Database size={18} className="text-blue-600" />
                  <h3 className="text-[16px] font-bold text-slate-900">Quick Actions</h3>
                </div>
                
                <div className="space-y-2.5">
                  {[
                    { icon: Eye, label: 'View All Memories' },
                    { icon: Download, label: 'Export Memories' },
                    { icon: Database, label: 'Manage Storage' },
                    { icon: Trash2, label: 'Cleanup Old Memories' },
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (action.label === 'Export Memories') exportMemories();
                        else if (action.label === 'Cleanup Old Memories') handleCleanup();
                        else if (action.label === 'Manage Storage') showToast('Storage: 0 GB of 100 GB used');
                        else showToast('Showing recent memories — use search and filters to narrow down');
                      }}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 rounded-xl transition-colors group">
                      <div className="flex items-center gap-3">
                        <action.icon size={16} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
                        <span className="text-[13px] font-bold">{action.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                 <div className="flex items-center justify-between mb-5 max-lg:flex-col max-lg:items-start max-lg:gap-3">
                   <h3 className="text-[16px] font-bold text-slate-900">Recent Memories</h3>

                   <div className="flex items-center gap-3 max-lg:flex-wrap">
                     <div className="relative w-full max-w-[220px] lg:w-[220px] max-lg:min-w-[180px]">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                       <input
                         type="text"
                         value={tableQuery}
                         onChange={(event) => setTableQuery(event.target.value)}
                         placeholder="Search memories..."
                         className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                       />
                     </div>

                     <button
                       onClick={() => setTypeFilter(cycleOption(memoryTypeOptions, typeFilter))}
                       className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                     >
                       {typeFilter} <ChevronDown size={14} className="text-slate-400" />
                     </button>

                     {[
                       { key: 'users', text: userFilter },
                       { key: 'age', text: ageFilter },
                     ].map((filter) => (
                       <button
                         key={filter.key}
                         onClick={() =>
                           filter.key === 'users'
                             ? setUserFilter(cycleOption(userFilterOptions, userFilter))
                             : setAgeFilter(cycleOption(ageFilterOptions, ageFilter))
                         }
                         className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                       >
                         {filter.text} <ChevronDown size={14} className="text-slate-400" />
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                         <th className="pb-3 w-8 pl-2"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                         <th className="pb-3 font-semibold">Type</th>
                         <th className="pb-3 font-semibold">Title / Content</th>
                         <th className="pb-3 font-semibold">User</th>
                         <th className="pb-3 font-semibold">Created At</th>
                         <th className="pb-3 font-semibold">Size</th>
                         <th className="pb-3 font-semibold text-center w-16">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="text-[13px]">
                       {memories.length === 0 ? (
                         <tr>
                           <td colSpan={7} className="py-2">
                             <EmptyState icon={Database} title="No memories yet" subtitle="Memories captured by users will appear here." />
                           </td>
                         </tr>
                       ) : visibleMemories.length === 0 ? (
                         <tr>
                           <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                             No memories found matching your filters.
                           </td>
                         </tr>
                       ) : (
                       visibleMemories.map((mem) => (
                         <tr key={mem.title} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                           <td className="py-3 pl-2"><input type="checkbox" checked={selectedTitles.has(mem.title)} onChange={() => toggleMemory(mem.title)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
                           <td className="py-3">
                             <div className="flex items-center gap-2">
                               <div className={`w-6 h-6 rounded-md flex items-center justify-center ${mem.typeBg}`}>
                                 <mem.typeIcon size={12} className={mem.typeColor} />
                               </div>
                               <span className={`font-bold text-[12px] ${mem.typeColor}`}>{mem.type}</span>
                             </div>
                           </td>
                           <td className="py-3 font-bold text-slate-900">{mem.title}</td>
                           <td className="py-3 text-slate-500 font-medium">{mem.user}</td>
                           <td className="py-3 text-slate-500 font-medium">
                             {mem.date} <span className="text-slate-400 mx-1">•</span> {mem.time}
                           </td>
                           <td className="py-3 text-slate-500 font-medium">{mem.size}</td>
                           <td className="py-3 text-center">
                             <button onClick={() => showToast(`Opened actions for "${mem.title}"`)} className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                           </td>
                         </tr>
                       ))
                       )}
                     </tbody>
                   </table>
                 </div>
                 
                 <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                    <span className="text-[12px] text-slate-500 font-medium">
                      {isFiltered
                        ? `Showing ${visibleMemories.length === 0 ? 0 : 1}–${visibleMemories.length} of ${visibleMemories.length} memories`
                        : `Showing ${memories.length === 0 ? 0 : 1}–${memories.length} of ${memories.length} memories`}
                    </span>
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100"><ChevronRight size={14} className="rotate-180" /></button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNum) => (
                        <button key={pageNum} className={`w-7 h-7 rounded flex items-center justify-center font-bold text-[12px] ${pageNum === 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{pageNum}</button>
                      ))}
                      {totalPages > 5 && (
                        <>
                          <span className="w-7 h-7 flex items-center justify-center text-slate-400">...</span>
                          <button className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-[12px]">{totalPages}</button>
                        </>
                      )}
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100"><ChevronRight size={14} /></button>
                    </div>
                 </div>
            </div>

          </div>

          {}
          <div className="w-[320px] flex-shrink-0 flex flex-col gap-6 max-lg:w-full">
            
            {/* Storage Usage */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-bold text-slate-900">Storage Usage</h3>
                  <span className="text-[12px] font-medium text-slate-500">{storageUsedGb.toLocaleString('en-US')} GB of 100 GB used</span>
                </div>

                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-6 relative"></div>

                <div className="space-y-3.5">
                  {storageByType.length > 0 ? storageByType.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[13px]">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-bold text-slate-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-medium w-12 text-right">{item.val.toLocaleString('en-US')} GB</span>
                        <span className="text-slate-400 font-medium w-8 text-right">{item.pct}</span>
                      </div>
                    </div>
                  )) : (
                    <EmptyState icon={Database} title="No storage used yet" subtitle="Storage breakdown will appear here." />
                  )}
                </div>
            </div>

            {/* Memory Types Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-6">Memory Types Breakdown</h3>

               {memoryBreakdownData.length > 0 ? (
               <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-4">
                  <div className="relative w-[140px] h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={memoryBreakdownData}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {memoryBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">{breakdownTotal.toLocaleString('en-US')}</span>
                      <span className="text-[10px] text-slate-500 font-semibold mt-1">Total Memories</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 flex-1 ml-4 max-lg:ml-0 max-lg:w-full">
                    {memoryBreakdownData.map((item, i) => (
                      <div key={i} className="flex flex-col text-[11px]">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-bold text-slate-900">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-3.5">
                           <span className="text-slate-500 font-medium">{item.value.toLocaleString('en-US')} ({item.percent})</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               ) : (
                 <EmptyState icon={Database} title="No data yet" subtitle="Your memory type breakdown will appear here." />
               )}
            </div>

            {/* Recent Memory Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Memory Activity</h3>
                <button onClick={() => showToast('Showing all recent memory activity')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-5">
                {recentActivity.length > 0 ? recentActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${act.bg}`}>
                      <act.icon size={16} className={act.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 truncate leading-tight mb-0.5">{act.title}</p>
                      <p className="text-[12px] text-slate-500 font-medium truncate">{act.sub}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap mt-1">{act.time}</span>
                  </div>
                )) : (
                  <EmptyState icon={Clock} title="No memory activity yet" subtitle="Recent memory activity will appear here." />
                )}
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
