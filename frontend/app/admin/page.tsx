"use client";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';
import React from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, ArrowUpRight, ArrowDownRight, 
  MoreVertical, ChevronRight, Brain, Clock, CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

type GrowthPoint = { name: string; newUsers: number; activeUsers: number };

const userGrowthData: GrowthPoint[] = [
  { name: 'Oct 1', newUsers: 1, activeUsers: 1 },
  { name: 'Oct 5', newUsers: 0, activeUsers: 2 },
  { name: 'Oct 8', newUsers: 1, activeUsers: 2 },
  { name: 'Oct 11', newUsers: 0, activeUsers: 3 },
];

type MemorySlice = { name: string; value: number; fill: string; percent: string };

const memoryActivityData: MemorySlice[] = [
  { name: 'Voice Notes', value: 1, fill: '#3b82f6', percent: '33%' },
  { name: 'Documents', value: 1, fill: '#10b981', percent: '33%' },
  { name: 'Links & Others', value: 1, fill: '#f43f5e', percent: '34%' },
];

type AiPoint = { time: string; req: number };

const aiProcessingData: AiPoint[] = [
  { time: 'Oct 1', req: 3 }, { time: 'Oct 5', req: 5 },
  { time: 'Oct 8', req: 4 }, { time: 'Oct 11', req: 6 },
];

type RecentUser = {
  name: string; email: string; plan: string; planColor: string;
  joined: string; status: string; statusColor: string;
  initials: string; bg: string;
};

const recentUsers: RecentUser[] = [
  { name: 'Sarah Kumar', email: 'sarah@example.com', plan: 'Pro', planColor: 'text-purple-600 bg-purple-100', joined: 'This week', status: 'Active', statusColor: 'text-emerald-600 bg-emerald-100', initials: 'SK', bg: 'bg-purple-100 text-purple-600' },
  { name: 'Arun Raj', email: 'arun@example.com', plan: 'Free', planColor: 'text-blue-600 bg-blue-100', joined: 'This week', status: 'Active', statusColor: 'text-emerald-600 bg-emerald-100', initials: 'AR', bg: 'bg-blue-100 text-blue-600' },
  { name: 'Priya Nair', email: 'priya@example.com', plan: 'Pro', planColor: 'text-purple-600 bg-purple-100', joined: 'Last week', status: 'Active', statusColor: 'text-emerald-600 bg-emerald-100', initials: 'PN', bg: 'bg-emerald-100 text-emerald-600' },
];

type SystemService = { name: string; status: string };

const systemHealth: SystemService[] = [
  { name: 'API Server', status: 'Operational' },
  { name: 'Database', status: 'Operational' },
  { name: 'AI Services', status: 'Operational' },
];

type FeatureUsage = { label: string; width: string; color: string };

const topFeaturesUsage: FeatureUsage[] = [
  { label: 'AI Chat Assistant', width: '50%', color: 'bg-blue-500' },
  { label: 'Summarization', width: '30%', color: 'bg-purple-500' },
  { label: 'Voice Processing', width: '20%', color: 'bg-emerald-500' },
];

type StorageType = { name: string; color: string; gb: number; pct: string };

const storageByType: StorageType[] = [
  { name: 'Documents', color: 'bg-blue-500', gb: 1.2, pct: '45%' },
  { name: 'Images', color: 'bg-purple-500', gb: 0.7, pct: '26%' },
  { name: 'Voice Notes', color: 'bg-emerald-500', gb: 0.5, pct: '19%' },
  { name: 'Others', color: 'bg-slate-400', gb: 0.2, pct: '10%' },
];

type Activity = { icon: any; color: string; bg: string; title: string; sub: string; time: string };

const recentActivities: Activity[] = [
  { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', title: 'New user registered', sub: 'arun@example.com', time: '2 min ago' },
  { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100', title: 'Document processed', sub: 'Project_Proposal.pdf', time: '18 min ago' },
  { icon: Cpu, color: 'text-emerald-600', bg: 'bg-emerald-100', title: 'AI summary generated', sub: 'Meeting notes summarized', time: '1 hour ago' },
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

const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'All time', 'Today'];
const chartPeriodOptions = ['This Month', 'Last Month', 'Last 7 days', 'Today'];

const cycleOption = (options: string[], current: string) => {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
};

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);
  const [dateRange, setDateRange] = React.useState(dateRangeOptions[0]);
  const [chartPeriod, setChartPeriod] = React.useState(chartPeriodOptions[0]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const visibleUsers = recentUsers.filter((user) => {
    const query = searchQuery.trim().toLowerCase();
    return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
  });

  const totalUsers = recentUsers.length;
  const totalMemories = memoryActivityData.reduce((sum, slice) => sum + slice.value, 0);
  const totalDocuments = 3;
  const tasksAndEvents = 3;
  const systemUptime = '99.9%';
  const aiRequestsThisMonth = aiProcessingData.reduce((sum, point) => sum + point.req, 0);
  const storageUsedGb = storageByType.reduce((sum, type) => sum + type.gb, 0);

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
          <SidebarItem icon={LayoutDashboard} label="Overview" active href="/admin" />
          <SidebarItem icon={Users} label="Users" href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" href="/admin/memories" />
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
          <NextLink 
            href="/"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[12px] font-bold transition-all border border-slate-200"
          >
            <span>← Back to User View</span>
          </NextLink>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 bg-white/70 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/50">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search users, memories, documents, or anything..." 
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
            <div onClick={() => showToast('Signed in as Administrator')} className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px] shadow-sm cursor-pointer border border-slate-200">A</div>
          </div>
        </header>

        <div className="flex-1 px-4 lg:px-8 py-6 pb-20 flex gap-6 flex-col xl:flex-row">
          
          {/* Left Main Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart2 size={24} strokeWidth={2.5} />
               </div>
               <div>
                 <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Admin Dashboard</h2>
                 <p className="text-[14px] text-slate-500 font-medium">Manage users, monitor activity, and keep Pathii running smoothly.</p>
               </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              <StatCard icon={Users} iconColor="text-blue-600" iconBg="bg-blue-100" title="Total Users" value={totalUsers} trend={totalUsers > 0 ? '+2' : undefined} trendUp={true} />
              <StatCard icon={Database} iconColor="text-purple-600" iconBg="bg-purple-100" title="Total Memories" value={totalMemories} trend={totalMemories > 0 ? '+1' : undefined} trendUp={true} />
              <StatCard icon={FileText} iconColor="text-blue-500" iconBg="bg-blue-50" title="Documents" value={totalDocuments} />
              <StatCard icon={CalendarCheck} iconColor="text-rose-600" iconBg="bg-rose-100" title="Tasks & Events" value={tasksAndEvents} />
              <StatCard icon={ShieldCheck} iconColor="text-emerald-600" iconBg="bg-emerald-100" title="System Uptime" value={systemUptime} />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-4">
              {/* User Growth Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">User Growth</h3>
                    <p className="text-[13px] text-slate-500 font-medium">New users and active users over time.</p>
                  </div>
                  <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    {chartPeriod} <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-4 text-[12px] font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> New Users</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Active Users</div>
                </div>
                {userGrowthData.length > 0 ? (
                <div className="flex-1 min-h-[200px]">
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
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
                      <Area type="monotone" dataKey="activeUsers" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                ) : (
                  <EmptyState icon={BarChart2} title="No growth data yet" subtitle="User growth will appear here as users register." />
                )}
              </div>

              {/* Memory Activity Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Memory Activity</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Types of memories created.</p>
                  </div>
                  <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    {chartPeriod} <ChevronDown size={14} />
                  </button>
                </div>

                {memoryActivityData.length > 0 ? (
                <div className="flex-1 flex items-center justify-between px-2 max-lg:flex-col max-lg:gap-4">
                  <div className="relative w-[160px] h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={memoryActivityData}
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {memoryActivityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[20px] font-extrabold text-slate-900 leading-none">{totalMemories.toLocaleString('en-US')}</span>
                      <span className="text-[11px] text-slate-500 font-semibold mt-1">Total Memories</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 flex-1 ml-6 max-lg:ml-0 max-lg:w-full">
                    {memoryActivityData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-semibold text-slate-700">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-slate-500 font-medium w-8 text-right">{item.value}</span>
                           <span className="text-slate-400 font-medium w-8 text-right">{item.percent}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                ) : (
                  <EmptyState icon={Database} title="No memories yet" subtitle="Memory activity will appear here as users capture." />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Top Features Usage */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-[16px] font-bold text-slate-900 mb-1">Top Features Usage</h3>
                <p className="text-[13px] text-slate-500 font-medium mb-6">Most used features across all users.</p>
                
                <div className="space-y-4">
                  {topFeaturesUsage.length > 0 ? topFeaturesUsage.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-32 text-[12px] font-semibold text-slate-700">{feature.label}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex items-center">
                        <div className={`h-full rounded-full ${feature.color}`} style={{ width: feature.width }}></div>
                      </div>
                      <span className="w-8 text-right text-[12px] font-medium text-slate-500">{feature.width}</span>
                    </div>
                  )) : (
                    <EmptyState icon={BarChart2} title="No feature usage yet" subtitle="Usage across features will appear here." />
                  )}
                </div>
              </div>

              {/* Storage Usage */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <h3 className="text-[16px] font-bold text-slate-900">Storage Usage</h3>
                    <span className="text-[13px] font-semibold text-blue-600">{storageUsedGb.toLocaleString('en-US')} GB of 1 TB used</span>
                  </div>
                  <p className="text-[13px] text-slate-500 font-medium mb-5">Total storage used by all users.</p>
                  
                  <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner bg-slate-100 mb-6"></div>
                </div>

                {storageByType.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-4 gap-x-8 mt-auto">
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
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
              {/* Recent Users Table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                     <Users size={18} className="text-blue-600" />
                     <h3 className="text-[16px] font-bold text-slate-900">Recent Users</h3>
                   </div>
                   <NextLink href="/admin/users" className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">
                     View all <ArrowUpRight size={14} />
                   </NextLink>
                 </div>

                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                         <th className="pb-3 font-semibold">Name</th>
                         <th className="pb-3 font-semibold">Email</th>
                         <th className="pb-3 font-semibold">Plan</th>
                         <th className="pb-3 font-semibold">Joined On</th>
                         <th className="pb-3 font-semibold">Status</th>
                         <th className="pb-3 font-semibold text-right">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="text-[13px]">
                       {recentUsers.length === 0 ? (
                         <tr>
                           <td colSpan={6} className="py-2">
                             <EmptyState icon={Users} title="No users yet" subtitle="Users you add will appear here." />
                           </td>
                         </tr>
                       ) : visibleUsers.length === 0 ? (
                         <tr>
                           <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                             No users found matching "{searchQuery}"
                           </td>
                         </tr>
                       ) : (
                         visibleUsers.map((user) => (
                           <tr key={user.email} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                             <td className="py-3 flex items-center gap-3 font-bold text-slate-900 whitespace-nowrap">
                               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${user.bg}`}>{user.initials}</div>
                               {user.name}
                             </td>
                             <td className="py-3 text-slate-500 font-medium whitespace-nowrap">{user.email}</td>
                             <td className="py-3 whitespace-nowrap">
                               <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${user.planColor}`}>{user.plan}</span>
                             </td>
                             <td className="py-3 text-slate-500 font-medium whitespace-nowrap">{user.joined}</td>
                             <td className="py-3 whitespace-nowrap">
                               <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${user.statusColor}`}>{user.status}</span>
                             </td>
                             <td className="py-3 text-right">
                               <NextLink href="/admin/users" className="text-slate-400 hover:text-slate-600 p-1 inline-block"><MoreVertical size={16} /></NextLink>
                             </td>
                           </tr>
                         ))
                       )}
                     </tbody>
                   </table>
                 </div>
              </div>

              {/* System Health */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarCheck size={18} className="text-emerald-600" />
                    <h3 className="text-[16px] font-bold text-slate-900">System Health</h3>
                  </div>
                  <p className="text-[13px] text-slate-500 font-medium mb-4">Live status of monitored services.</p>

                  <div className="space-y-3 mb-4">
                    {systemHealth.length > 0 ? systemHealth.map((sys, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          <span className="text-[13px] font-semibold text-slate-700">{sys.name}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold text-emerald-600 bg-emerald-50">{sys.status}</span>
                      </div>
                    )) : (
                      <EmptyState icon={ShieldCheck} title="No health checks yet" subtitle="Service status will appear here once checks report in." />
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[20px] font-extrabold text-slate-900 leading-none mb-1">{systemUptime}</span>
                    <span className="text-[11px] font-semibold text-slate-500">Uptime</span>
                  </div>
                  <div className="w-24 h-8 relative">
                     {/* SVG Sparkline Mock */}
                     <svg viewBox="0 0 100 30" className="w-full h-full stroke-emerald-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M0,25 Q10,20 20,25 T40,15 T60,20 T80,5 T100,10" />
                     </svg>
                     <p className="absolute -bottom-4 right-0 text-[10px] text-slate-400 font-medium">Last 30 days</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Date Picker Button */}
            <button onClick={() => setDateRange(cycleOption(dateRangeOptions, dateRange))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <CalendarCheck size={16} className="text-slate-400" />
                {dateRange}
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Activities</h3>
                <NextLink href="/admin/analytics" className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">
                  View all <ArrowUpRight size={14} />
                </NextLink>
              </div>

              <div className="space-y-4">
                {recentActivities.length > 0 ? recentActivities.map((act, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${act.bg}`}>
                      <act.icon size={14} className={act.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 truncate">{act.title}</p>
                      <p className="text-[12px] text-slate-500 font-medium truncate">{act.sub}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap mt-1">{act.time}</span>
                  </div>
                )) : (
                  <EmptyState icon={Clock} title="No recent activities yet" subtitle="Platform activity will appear here." />
                )}
              </div>
            </div>

            {/* AI Processing */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={18} className="text-blue-600" />
                <h3 className="text-[16px] font-bold text-slate-900">AI Processing</h3>
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-[20px] font-extrabold text-slate-900 leading-none">{aiRequestsThisMonth.toLocaleString('en-US')}</h4>
                  <p className="text-[12px] text-slate-500 font-medium">AI requests this month</p>
                </div>
              </div>
              
              {aiRequestsThisMonth > 0 && (
              <div className="flex items-center gap-1 text-[12px] font-semibold text-emerald-600 mb-4 pl-11">
                <ArrowUpRight size={14} /> <span>+18%</span> <span className="text-slate-400 font-medium">vs last month</span>
              </div>
              )}

              {aiProcessingData.length > 0 ? (
              <div className="h-16 w-full -ml-2 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={aiProcessingData}>
                    <defs>
                      <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="req" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAi)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              ) : (
                <EmptyState icon={Cpu} title="No AI usage yet" subtitle="AI request activity will appear here." />
              )}

              <div className="flex items-center justify-between text-[12px] font-semibold">
                <span className="text-slate-500">Avg. response time</span>
                <span className="text-slate-900 text-[14px] font-bold">2.1s</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <div className="flex items-center gap-2 mb-4">
                 <AlertCircle size={18} className="text-blue-600" />
                 <h3 className="text-[16px] font-bold text-slate-900">Quick Actions</h3>
               </div>
               
               <div className="space-y-2">
                 <button onClick={() => router.push('/admin/users')} className="w-full flex items-center justify-between p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                   <div className="flex items-center gap-3">
                     <Users size={16} />
                     <span className="text-[13px] font-bold">Add User</span>
                   </div>
                   <ChevronRight size={16} className="opacity-70" />
                 </button>

                 {[
                   { icon: Database, label: 'Manage Storage', href: '/admin/settings' },
                   { icon: BarChart2, label: 'View Reports', href: '/admin/reports' },
                   { icon: Bell, label: 'Send Announcement', href: '/admin/notifications' },
                   { icon: Link, label: 'Manage Integrations', href: '/admin/integrations' },
                 ].map((action, i) => (
                   <button key={i} onClick={() => router.push(action.href)} className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-colors">
                     <div className="flex items-center gap-3">
                       <action.icon size={16} className="text-slate-500" />
                       <span className="text-[13px] font-semibold">{action.label}</span>
                     </div>
                     <ChevronRight size={16} className="text-slate-400" />
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