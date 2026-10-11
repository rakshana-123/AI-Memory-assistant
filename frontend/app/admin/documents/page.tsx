"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Database, FileText, CalendarCheck,
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck,
  Settings, Search, ChevronDown, MoreVertical, ChevronRight,
  Brain, CheckCircle2, ArrowUpRight, ArrowDownRight, CloudUpload,
  Image as ImageIcon, File, GraduationCap, Briefcase,
  User, Folder, BookOpen, MoreHorizontal, Download, Layers,
  Trash2, Filter, FolderKanban, Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

type TrendPoint = { name: string; docs: number };

const documentTrendsData: TrendPoint[] = [
  { name: 'Oct 1', docs: 1 },
  { name: 'Oct 5', docs: 0 },
  { name: 'Oct 8', docs: 1 },
  { name: 'Oct 11', docs: 1 },
];

type TypeSlice = { name: string; value: number; fill: string; percent: string };

const documentTypesData: TypeSlice[] = [
  { name: 'PDF', value: 1, fill: '#ef4444', percent: '34%' },
  { name: 'Word', value: 1, fill: '#3b82f6', percent: '33%' },
  { name: 'Spreadsheet', value: 1, fill: '#10b981', percent: '33%' },
];

type DocumentRecord = {
  type: string; name: string; uploader: string; initials: string;
  avatarColor: string; category: string; catColor: string;
  size: string; date: string; time: string;
};

const documentsList: DocumentRecord[] = [
  { type: 'pdf', name: 'Project_Proposal.pdf', uploader: 'Sarah Kumar', initials: 'SK', avatarColor: 'bg-purple-100 text-purple-600', category: 'Projects', catColor: 'text-amber-600 bg-amber-100', size: '2.4 MB', date: 'Today', time: '10:24 AM' },
  { type: 'word', name: 'Meeting_Notes.docx', uploader: 'Arun Raj', initials: 'AR', avatarColor: 'bg-blue-100 text-blue-600', category: 'Work', catColor: 'text-blue-600 bg-blue-100', size: '1.8 MB', date: 'Yesterday', time: '04:12 PM' },
  { type: 'spreadsheet', name: 'Budget_Planner.xlsx', uploader: 'Vikram S', initials: 'VS', avatarColor: 'bg-indigo-100 text-indigo-600', category: 'Work', catColor: 'text-blue-600 bg-blue-100', size: '856 KB', date: 'Oct 7', time: '11:03 AM' },
];

type StorageType = { name: string; color: string; gb: number; pct: string };

const storageByType: StorageType[] = [
  { name: 'Documents', color: 'bg-blue-500', gb: 1.6, pct: '67%' },
  { name: 'Images', color: 'bg-amber-500', gb: 0.6, pct: '25%' },
  { name: 'Others', color: 'bg-slate-400', gb: 0.2, pct: '8%' },
];

type Activity = { icon: any; color: string; bg: string; title: string; sub: string; time: string };

const recentDocumentActivity: Activity[] = [
  { icon: CloudUpload, color: 'text-blue-600', bg: 'bg-blue-100', title: 'Document uploaded', sub: 'Project_Proposal.pdf', time: '2 min ago' },
  { icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100', title: 'Document processed', sub: 'Meeting_Notes.docx', time: '18 min ago' },
  { icon: Trash2, color: 'text-rose-600', bg: 'bg-rose-100', title: 'Document deleted', sub: 'Old_Draft.docx', time: '1 hour ago' },
];

const docTypeOptions = ['All Types', 'pdf', 'word', 'spreadsheet', 'image', 'others'];
const docCategoryOptions = ['All Categories', 'Projects', 'Work', 'Personal', 'Academic', 'Research', 'Others'];
const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'All time', 'Today'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];
const userFilterOptions = ['All Users', 'Admins', 'Pro Users', 'Free Users'];
const ageFilterOptions = ['Last 30 days', 'Last 7 days', 'All time'];

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
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1">{typeof value === 'number' ? value.toLocaleString('en-US') : value}</h3>
        <p className="text-[13px] text-slate-500 font-medium leading-none whitespace-nowrap">{title}</p>
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

const getDocIcon = (type: any) => {
  switch (type) {
    case 'pdf': return <div className="w-8 h-8 rounded bg-red-100 text-red-500 flex items-center justify-center"><FileText size={16} /></div>;
    case 'word': return <div className="w-8 h-8 rounded bg-blue-100 text-blue-500 flex items-center justify-center"><FileText size={16} /></div>;
    case 'spreadsheet': return <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-500 flex items-center justify-center"><FileSpreadsheet size={16} /></div>;
    case 'image': return <div className="w-8 h-8 rounded bg-amber-100 text-amber-500 flex items-center justify-center"><ImageIcon size={16} /></div>;
    default: return <div className="w-8 h-8 rounded bg-purple-100 text-purple-500 flex items-center justify-center"><File size={16} /></div>;
  }
};

export default function AdminDashboard() {
  const [headerQuery, setHeaderQuery] = useState('');
  const [tableQuery, setTableQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [chartPeriod, setChartPeriod] = useState(chartPeriodOptions[0]);
  const [userFilter, setUserFilter] = useState(userFilterOptions[0]);
  const [ageFilter, setAgeFilter] = useState(ageFilterOptions[0]);
  const [docsList, setDocsList] = useState(documentsList);

  const totalDocs = docsList.length;
  const pdfCount = docsList.filter((d) => d.type === 'pdf').length;
  const wordCount = docsList.filter((d) => d.type === 'word').length;
  const spreadsheetCount = docsList.filter((d) => d.type === 'spreadsheet').length;
  const imageCount = docsList.filter((d) => d.type === 'image').length;
  const othersCount = docsList.filter((d) => d.type === 'others').length;
  const typesTotal = documentTypesData.reduce((sum, slice) => sum + slice.value, 0);
  const storageUsedGb = storageByType.reduce((sum, type) => sum + type.gb, 0);
  const totalPages = Math.max(1, Math.ceil(docsList.length / 10));

  const categoryMeta: Record<string, { icon: any; color: string; bg: string }> = {
    Academic: { icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
    Work: { icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-100' },
    Personal: { icon: User, color: 'text-rose-500', bg: 'bg-rose-100' },
    Projects: { icon: Folder, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    Research: { icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
    Others: { icon: MoreHorizontal, color: 'text-slate-500', bg: 'bg-slate-100' },
  };
  const categoryCounts = Object.entries(
    docsList.reduce((acc, doc) => {
      acc[doc.category] = (acc[doc.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([label, count]) => ({
    label,
    count,
    ...(categoryMeta[label] ?? { icon: MoreHorizontal, color: 'text-slate-500', bg: 'bg-slate-100' }),
  }));

  const visibleDocuments = docsList.filter((doc) => {
    const header = headerQuery.trim().toLowerCase();
    const table = tableQuery.trim().toLowerCase();
    const matchesSearch =
      (header === '' ||
        doc.name.toLowerCase().includes(header) ||
        doc.uploader.toLowerCase().includes(header) ||
        doc.category.toLowerCase().includes(header)) &&
      (table === '' ||
        doc.name.toLowerCase().includes(table) ||
        doc.uploader.toLowerCase().includes(table) ||
        doc.category.toLowerCase().includes(table));
    return (
      matchesSearch &&
      (typeFilter === 'All Types' || doc.type === typeFilter) &&
      (categoryFilter === 'All Categories' || doc.category === categoryFilter)
    );
  });

  const isFiltered = visibleDocuments.length !== docsList.length;

  const allVisibleSelected =
    visibleDocuments.length > 0 && visibleDocuments.every((doc) => selectedNames.has(doc.name));

  const toggleAllVisible = () => {
    setSelectedNames((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleDocuments.forEach((doc) => next.delete(doc.name));
      } else {
        visibleDocuments.forEach((doc) => next.add(doc.name));
      }
      return next;
    });
  };

  const toggleDocument = (name: string) => {
    setSelectedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleUpload = () => {
    const suffix = docsList.filter((d) => d.name.startsWith('Admin upload')).length + 1;
    const name = suffix === 1 ? 'Admin upload.pdf' : `Admin upload (${suffix}).pdf`;
    setDocsList((prev) => [
      {
        type: 'pdf',
        name,
        uploader: 'Admin',
        initials: 'A',
        avatarColor: 'bg-blue-100 text-blue-600',
        category: 'Work',
        catColor: 'text-blue-600 bg-blue-100',
        size: '—',
        date: 'Today',
        time: 'Just now',
      },
      ...prev,
    ]);
    handleAction(`Uploaded "${name}"`);
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
          <SidebarItem icon={FileText} label="Documents" active href="/admin/documents" />
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
          <div onClick={() => handleAction('Signed in as Administrator')} className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
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

      {}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 bg-white/70 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/50 max-lg:h-auto max-lg:py-3">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={headerQuery}
              onChange={(event) => setHeaderQuery(event.target.value)}
              placeholder="Search documents, users, files, or anything..."
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-wrap">
            {/* Header Date Picker */}
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
          
          {/* Left Main Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-col max-lg:items-start max-lg:gap-4">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Documents Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">View, organize and manage all user documents across Pathii.</p>
                 </div>
               </div>
               <button 
                 onClick={handleUpload}
                 className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm shadow-blue-200 transition-all flex items-center gap-2"
               >
                 <CloudUpload size={18} /> Upload Document
               </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              <StatCard icon={FileText} iconColor="text-blue-600" iconBg="bg-blue-100" title="Total Documents" value={totalDocs} />
              <StatCard icon={FileText} iconColor="text-red-500" iconBg="bg-red-100" title="PDF Files" value={pdfCount} />
              <StatCard icon={FileText} iconColor="text-blue-500" iconBg="bg-blue-100" title="Word Documents" value={wordCount} />
              <StatCard icon={FileSpreadsheet} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="Spreadsheets" value={spreadsheetCount} />
              <StatCard icon={ImageIcon} iconColor="text-amber-500" iconBg="bg-amber-100" title="Images" value={imageCount} />
              <StatCard icon={File} iconColor="text-purple-500" iconBg="bg-purple-100" title="Others" value={othersCount} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[2.5fr_1fr] gap-4">
              {/* Document Trends Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Document Trends</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Documents uploaded over the last 30 days.</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                      {chartPeriod} <ChevronDown size={14} />
                    </button>
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Documents Uploaded
                    </div>
                  </div>
                </div>
                {documentTrendsData.length > 0 ? (
                <div className="flex-1 min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={documentTrendsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="docs" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorDocs)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                ) : (
                  <EmptyState icon={BarChart2} title="No trends yet" subtitle="Document upload activity will appear here." />
                )}
              </div>

              {/* Document Types Donut Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-4">Document Types</h3>
                
                {documentTypesData.length > 0 ? (
                <div className="flex-1 flex flex-col items-center justify-between">
                  <div className="relative w-[140px] h-[140px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={documentTypesData}
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {documentTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">{typesTotal.toLocaleString('en-US')}</span>
                      <span className="text-[9px] text-slate-500 font-semibold mt-1 text-center leading-tight">Total<br/>Documents</span>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1.5">
                    {documentTypesData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
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
                ) : (
                  <EmptyState icon={File} title="No data yet" subtitle="Your document type breakdown will appear here." />
                )}
              </div>
            </div>

            {}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              {/* Filter Row */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3 max-lg:flex-wrap">
                <div className="relative flex-1 max-lg:min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={tableQuery}
                    onChange={(event) => setTableQuery(event.target.value)}
                    placeholder="Search documents..."
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>

                <button
                  onClick={() => setTypeFilter(cycleOption(docTypeOptions, typeFilter))}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors"
                >
                  {typeFilter === 'All Types' ? 'All Types' : typeFilter.toUpperCase()} <ChevronDown size={14} className="text-slate-400" />
                </button>

                <button
                  onClick={() => setCategoryFilter(cycleOption(docCategoryOptions, categoryFilter))}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors"
                >
                  {categoryFilter} <ChevronDown size={14} className="text-slate-400" />
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
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors"
                  >
                    {filter.text} <ChevronDown size={14} className="text-slate-400" />
                  </button>
                ))}

                <button onClick={() => handleAction('Advanced filters: category, type, size and date')} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                  <Filter size={14} className="text-slate-400" /> Filter
                </button>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></th>
                      <th className="py-3 px-4 font-semibold">Name</th>
                      <th className="py-3 px-4 font-semibold">Type</th>
                      <th className="py-3 px-4 font-semibold">Uploaded By</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Size</th>
                      <th className="py-3 px-4 font-semibold">Uploaded On</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {docsList.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-2">
                          <EmptyState icon={Folder} title="No documents yet" subtitle="Documents uploaded by users will appear here." />
                        </td>
                      </tr>
                    ) : visibleDocuments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                          No documents found matching your filters.
                        </td>
                      </tr>
                    ) : (
                    visibleDocuments.map((doc) => (
                      <tr key={doc.name} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4"><input type="checkbox" checked={selectedNames.has(doc.name)} onChange={() => toggleDocument(doc.name)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></td>
                        <td className="py-3 px-4 flex items-center gap-3 font-bold text-slate-900">
                          {getDocIcon(doc.type)}
                          {doc.name}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-medium uppercase text-[11px]">{doc.type}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 font-semibold text-slate-700">
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${doc.avatarColor}`}>{doc.initials}</div>
                             {doc.uploader}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${doc.catColor}`}>{doc.category}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-medium">{doc.size}</td>
                        <td className="py-3 px-4">
                           <div className="flex flex-col">
                              <span className="text-slate-700 font-medium">{doc.date}</span>
                              <span className="text-[11px] text-slate-400">{doc.time}</span>
                           </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => handleAction(`Opened actions for "${doc.name}"`)} className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500 max-lg:flex-wrap max-lg:gap-y-2">
                 <span>
                   {isFiltered
                     ? `Showing ${visibleDocuments.length === 0 ? 0 : 1}–${visibleDocuments.length} of ${visibleDocuments.length} documents`
                     : `Showing ${docsList.length === 0 ? 0 : 1}–${docsList.length} of ${docsList.length} documents`}
                 </span>
                 <div className="flex items-center gap-1 max-lg:flex-wrap">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="rotate-90" /></button>
                   {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pageNum) => (
                     <button key={pageNum} className={`w-8 h-8 flex items-center justify-center rounded-lg ${pageNum === 1 ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 font-semibold text-slate-700'}`}>{pageNum}</button>
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

          {/* Right Column */}
          <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Storage Usage */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-[16px] font-bold text-slate-900">Storage Usage</h3>
                  <span className="text-[13px] font-semibold text-slate-500">{storageUsedGb.toLocaleString('en-US')} GB of 50 GB used</span>
                </div>
                
                <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner bg-slate-100 mb-6"></div>
              </div>

              {storageByType.length > 0 ? (
              <div className="flex flex-col gap-3">
                {storageByType.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div> {item.name}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                      <span>{item.gb.toLocaleString('en-US')} GB</span><span className="text-slate-400 w-8 text-right">{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
              ) : (
                <EmptyState icon={Database} title="No storage used yet" subtitle="Storage breakdown will appear here." />
              )}
            </div>

            {/* Top Document Categories */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Top Document Categories</h3>
                 <button onClick={() => handleAction('All document categories are shown above')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               {categoryCounts.length > 0 ? (
               <div className="space-y-4">
                 {categoryCounts.map((cat) => (
                   <div key={cat.label} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.bg} ${cat.color}`}>
                         <cat.icon size={16} />
                       </div>
                       <span className="text-[13px] font-semibold text-slate-700">{cat.label}</span>
                     </div>
                     <div className="flex items-center gap-1 text-[13px] text-slate-500 font-medium">
                       <span>{cat.count}</span> <span className="text-slate-400">({totalDocs > 0 ? Math.round((cat.count / totalDocs) * 100) : 0}%)</span>
                     </div>
                   </div>
                 ))}
               </div>
               ) : (
                 <EmptyState icon={FolderKanban} title="No categories in use yet" subtitle="Category counts will appear here as documents are uploaded." />
               )}
            </div>

            {/* Recent Document Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Document Activity</h3>
                <button onClick={() => handleAction('Showing recent document activity')} className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {recentDocumentActivity.length > 0 ? recentDocumentActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${act.bg}`}>
                      <act.icon size={16} className={act.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 truncate">{act.title}</p>
                      <p className="text-[12px] text-slate-500 font-medium truncate">{act.sub}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap mt-1">{act.time}</span>
                  </div>
                )) : (
                  <EmptyState icon={Clock} title="No document activity yet" subtitle="Recent document activity will appear here." />
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-4">Quick Actions</h3>
               
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { icon: Download, label: 'Export Documents' },
                   { icon: Layers, label: 'Bulk Actions' },
                   { icon: FolderKanban, label: 'Manage Categories' },
                   { icon: Trash2, label: 'Cleanup Storage' },
                 ].map((action, i) => (
                   <button
                     key={i}
                     onClick={() => {
                       if (action.label === 'Export Documents') {
                         if (docsList.length === 0) {
                           handleAction('No data to export');
                           return;
                         }
                         downloadCsv('pathii-documents.csv', [
                           ['Name', 'Type', 'Uploaded By', 'Category', 'Size', 'Uploaded On'],
                           ...docsList.map((d) => [d.name, d.type.toUpperCase(), d.uploader, d.category, d.size, d.date]),
                         ]);
                         handleAction(`Exported ${docsList.length} documents`);
                       } else {
                         handleAction(`${action.label} completed!`);
                       }
                     }}
                     className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 text-slate-600 rounded-xl transition-all group active:scale-95 shadow-sm"
                   >
                     <action.icon size={16} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
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