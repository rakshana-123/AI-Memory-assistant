"use client";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Database, FileText, CalendarCheck,
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck,
  Settings, Search, ChevronDown, MoreVertical, Plus,
  Brain, ArrowUpRight, ArrowDownRight, Filter, Send, Eye,
  MousePointerClick, Mail, CheckCircle2,
  Smartphone, MessageSquare, Megaphone, LayoutTemplate, Download,
  CalendarDays, Zap
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const statCardsData = [
  { title: 'Total Notifications', value: '3,842', trend: '28%', trendUp: true, icon: Send, color: 'text-purple-600', bg: 'bg-purple-100' },
  { title: 'Users Reached', value: '2,156', trend: '18%', trendUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Delivery Rate', value: '98.4%', trend: '2%', trendUp: true, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { title: 'Read Rate', value: '76.2%', trend: '6%', trendUp: true, icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
  { title: 'Click Rate', value: '24.8%', trend: '4%', trendUp: true, icon: MousePointerClick, color: 'text-rose-600', bg: 'bg-rose-100' },
];

const notificationActivityData = [
  { name: 'Oct 1', sent: 84, delivered: 82, read: 63 },
  { name: 'Oct 5', sent: 112, delivered: 108, read: 84 },
  { name: 'Oct 10', sent: 96, delivered: 94, read: 71 },
  { name: 'Oct 15', sent: 148, delivered: 143, read: 112 },
  { name: 'Oct 20', sent: 132, delivered: 129, read: 101 },
  { name: 'Oct 25', sent: 176, delivered: 171, read: 135 },
  { name: 'Oct 31', sent: 198, delivered: 194, read: 152 },
];

const notificationsByTypeData = [
  { name: 'System', value: 1232, percent: '32%', fill: '#3b82f6' },
  { name: 'Tasks & Events', value: 692, percent: '18%', fill: '#8b5cf6' },
  { name: 'AI Usage', value: 576, percent: '15%', fill: '#10b981' },
  { name: 'Memories', value: 538, percent: '14%', fill: '#22c55e' },
  { name: 'Documents', value: 384, percent: '10%', fill: '#f59e0b' },
  { name: 'Promotions', value: 269, percent: '7%', fill: '#ec4899' },
  { name: 'Security', value: 151, percent: '4%', fill: '#ef4444' },
];

const deliveryChannelsData = [
  { name: 'In-App', percent: '45%', width: '45%', color: 'bg-blue-500', icon: Bell, iconColor: 'text-blue-600', iconBg: 'bg-blue-100' },
  { name: 'Email', percent: '28%', width: '28%', color: 'bg-purple-500', icon: Mail, iconColor: 'text-purple-600', iconBg: 'bg-purple-100' },
  { name: 'Push', percent: '18%', width: '18%', color: 'bg-teal-500', icon: Smartphone, iconColor: 'text-teal-600', iconBg: 'bg-teal-100' },
  { name: 'SMS', percent: '6%', width: '6%', color: 'bg-amber-500', icon: MessageSquare, iconColor: 'text-amber-600', iconBg: 'bg-amber-100' },
  { name: 'Others', percent: '3%', width: '3%', color: 'bg-pink-500', icon: Megaphone, iconColor: 'text-pink-600', iconBg: 'bg-pink-100' },
];

const notificationStatusData = [
  { name: 'Delivered', value: 3782, percent: '98.4%', fill: '#10b981' },
  { name: 'Pending', value: 38, percent: '1.0%', fill: '#f59e0b' },
  { name: 'Failed', value: 22, percent: '0.6%', fill: '#ef4444' },
];

const notificationsData = [
  { id: 1, title: 'Scheduled Maintenance', type: 'System', channel: 'Email, In-App', channelIcon: Mail, audience: 'All Users', status: 'Delivered', sentAt: 'Oct 30, 2024, 9:00 AM', readRate: 94 },
  { id: 2, title: 'Task Reminder', type: 'Tasks & Events', channel: 'Push', channelIcon: Smartphone, audience: 'Team Leads', status: 'Delivered', sentAt: 'Oct 30, 2024, 8:30 AM', readRate: 88 },
  { id: 3, title: 'Weekly Report', type: 'Documents', channel: 'Email', channelIcon: Mail, audience: 'All Users', status: 'Delivered', sentAt: 'Oct 29, 2024, 6:00 PM', readRate: 81 },
  { id: 4, title: 'AI Usage Limit Warning', type: 'AI Usage', channel: 'In-App', channelIcon: Bell, audience: 'Pro Users', status: 'Pending', sentAt: 'Oct 29, 2024, 4:15 PM', readRate: null },
  { id: 5, title: 'New Feature Announcement', type: 'Promotions', channel: 'Email, Push', channelIcon: Mail, audience: 'Free Users', status: 'Delivered', sentAt: 'Oct 28, 2024, 10:00 AM', readRate: 76 },
  { id: 6, title: 'Security Alert', type: 'Security', channel: 'Email', channelIcon: Mail, audience: 'Admins', status: 'Failed', sentAt: 'Oct 28, 2024, 8:45 AM', readRate: null },
  { id: 7, title: 'Memory Backup Complete', type: 'Memories', channel: 'Email', channelIcon: Mail, audience: 'All Users', status: 'Delivered', sentAt: 'Oct 27, 2024, 11:00 PM', readRate: 92 },
  { id: 8, title: 'Task Reminder', type: 'Tasks & Events', channel: 'Push', channelIcon: Smartphone, audience: 'All Users', status: 'Delivered', sentAt: 'Oct 27, 2024, 9:00 AM', readRate: 85 },
  { id: 9, title: 'System Update Available', type: 'System', channel: 'In-App', channelIcon: Bell, audience: 'All Users', status: 'Delivered', sentAt: 'Oct 26, 2024, 2:00 PM', readRate: 90 },
  { id: 10, title: 'Storage Limit Warning', type: 'Documents', channel: 'Email', channelIcon: Mail, audience: 'Free Users', status: 'Pending', sentAt: 'Oct 26, 2024, 1:30 PM', readRate: null },
];

const recentNotifications = [
  { title: 'Scheduled Maintenance', sub: 'System · All Users', time: '12 min ago', icon: Bell, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Weekly Report Ready', sub: 'Documents · All Users', time: '28 min ago', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
  { title: 'Security Alert', sub: 'Security · Admins', time: '45 min ago', icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-100' },
  { title: 'Task Reminder Sent', sub: 'Tasks & Events · Team Leads', time: '1 hr ago', icon: CalendarCheck, color: 'text-amber-500', bg: 'bg-amber-100' },
  { title: 'AI Usage Limit Warning', sub: 'AI Usage · Pro Users', time: '2 hr ago', icon: Cpu, color: 'text-teal-600', bg: 'bg-teal-100' },
];

const SidebarItem = ({ icon: Icon, label, active, badge, href }: any) => (
  <NextLink href={href} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${active ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-500'}`}>{badge}</span>
    )}
  </NextLink>
);

const TypeBadge = ({ type }: any) => {
  const styles: any = {
    'System': 'bg-blue-100 text-blue-600',
    'Tasks & Events': 'bg-purple-100 text-purple-600',
    'AI Usage': 'bg-teal-100 text-teal-600',
    'Memories': 'bg-emerald-100 text-emerald-600',
    'Documents': 'bg-amber-100 text-amber-600',
    'Promotions': 'bg-pink-100 text-pink-600',
    'Security': 'bg-rose-100 text-rose-600',
  };
  return <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${styles[type]}`}>{type}</span>;
};

const StatusBadge = ({ status }: any) => {
  const styles: any = {
    'Delivered': { cls: 'text-emerald-600', dot: 'bg-emerald-500' },
    'Pending': { cls: 'text-amber-600', dot: 'bg-amber-500' },
    'Failed': { cls: 'text-rose-600', dot: 'bg-rose-500' },
  };
  const s = styles[status];
  return (
    <div className={`inline-flex items-center gap-1.5 font-semibold text-[12px] ${s.cls}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></div>
      {status}
    </div>
  );
};

const dateRangeOptions = ['Oct 1, 2024 - Oct 31, 2024', 'Sep 1, 2024 - Sep 30, 2024', 'Last 7 days', 'Today'];
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

export default function NotificationsManagementDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [notifications, setNotifications] = useState(notificationsData);
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [chartPeriod, setChartPeriod] = useState(chartPeriodOptions[0]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addNotification = (title: string) => {
    const nextId = notifications.reduce((max, n) => Math.max(max, n.id), 0) + 1;
    setNotifications((prev) => [
      { id: nextId, title, type: 'System', channel: 'In-App', channelIcon: Bell, audience: 'All Users', status: 'Pending', sentAt: 'Just now', readRate: null },
      ...prev,
    ]);
    showToast(`Notification "${title}" sent to All Users`);
  };

  const exportNotifications = () => {
    downloadCsv('pathii-notifications.csv', [
      ['ID', 'Title', 'Type', 'Channel', 'Audience', 'Status', 'Sent At', 'Read Rate %'],
      ...notifications.map((n) => [n.id, n.title, n.type, n.channel, n.audience, n.status, n.sentAt, n.readRate ?? '—']),
    ]);
    showToast(`Exported ${notifications.length} rows`);
  };

  const visibleNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      notif.type.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      notif.audience.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      notif.channel.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesTab = activeTab === 'All' || notif.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === visibleNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleNotifications.map((n) => n.id));
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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
          <SidebarItem icon={Cpu} label="AI Usage" href="/admin/ai-usage" />
          <SidebarItem icon={Link} label="Integrations" href="/admin/integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" href="/admin/analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" href="/admin/reports" />
          <SidebarItem icon={Bell} label="Notifications" active badge="3" href="/admin/notifications" />
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
            <ChevronDown size={16} className="text-slate-400" />
          </NextLink>
          <NextLink href="/" className="text-[11.5px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-1.5 px-3 rounded-xl text-center transition-colors">
            ← Back to User View
          </NextLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 border-b border-slate-200/50 bg-white/50 backdrop-blur-sm">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications, users, or settings..."
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDateRange(cycleOption(dateRangeOptions, dateRange))} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarDays size={15} className="text-slate-400" />
              {dateRange}
            </button>
            <button onClick={() => showToast('You have 3 unread notifications')} className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#F43F5E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">3</span>
            </button>
            <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1.5 pl-2 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-8 h-8 rounded-full object-cover shadow-sm" />
              <span className="text-[13px] font-bold text-slate-700">Admin</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar flex gap-6 flex-col lg:flex-row">

          <div className="flex-1 flex flex-col gap-6 min-w-0">

            {/* Title Section */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-lg:flex-wrap max-lg:gap-3">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bell size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Notifications Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Send, manage and monitor notifications across all Pathii users and modules.</p>
                 </div>
               </div>
               <button onClick={() => addNotification('Platform Announcement')} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[14px] font-semibold transition-colors shadow-sm">
                 <Plus size={18} /> Send Notification
               </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {statCardsData.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                      <stat.icon size={20} className={stat.color} />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-slate-900 leading-none mb-1">{stat.value}</h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-none">{stat.title}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-[12px] font-semibold ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{stat.trend}</span>
                    <span className="text-slate-400 font-medium ml-1">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
              {/* Notification Activity Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Notification Activity</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Notifications sent over the last 30 days.</p>
                  </div>
                  <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    {chartPeriod} <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-4 text-[12px] font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Sent</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div> Delivered</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Read</div>
                </div>
                <div className="flex-1 min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={notificationActivityData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSentN" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDeliveredN" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorReadN" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSentN)" />
                      <Area type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorDeliveredN)" />
                      <Area type="monotone" dataKey="read" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorReadN)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Notifications by Type Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Notifications by Type</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Distribution across all modules.</p>
                  </div>
                  <button onClick={() => setChartPeriod(cycleOption(chartPeriodOptions, chartPeriod))} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    {chartPeriod} <ChevronDown size={14} />
                  </button>
                </div>

                <div className="flex-1 flex items-center justify-between px-2 gap-2">
                  <div className="relative w-[160px] h-[160px] flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={notificationsByTypeData}
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {notificationsByTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[20px] font-extrabold text-slate-900 leading-none">3,842</span>
                      <span className="text-[11px] text-slate-500 font-semibold mt-1">Total</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {notificationsByTypeData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-semibold text-slate-700 truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                           <span className="text-slate-500 font-medium w-8 text-right">{item.value}</span>
                           <span className="text-slate-400 font-medium w-8 text-right">{item.percent}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs & Filters */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {['All', 'Delivered', 'Pending', 'Failed'].map((tab, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${activeTab === tab ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, type or audience..." 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-400" 
                  />
                </div>

                <button onClick={() => addNotification('Quick Update')} className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-xl text-[13px] font-semibold text-white transition-colors shadow-sm">
                  <Plus size={15} /> Add Notification
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10">
                        <input 
                          type="checkbox" 
                          checked={visibleNotifications.length > 0 && selectedIds.length === visibleNotifications.length}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                        />
                      </th>
                      <th className="py-3 px-2 font-semibold">Title</th>
                      <th className="py-3 px-2 font-semibold">Type</th>
                      <th className="py-3 px-2 font-semibold">Channel</th>
                      <th className="py-3 px-2 font-semibold">Audience</th>
                      <th className="py-3 px-2 font-semibold">Status</th>
                      <th className="py-3 px-2 font-semibold">Sent At</th>
                      <th className="py-3 px-2 font-semibold">Read Rate</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {visibleNotifications.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-slate-400 text-[13px] font-medium">
                          No notifications found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      visibleNotifications.map((notif) => (
                        <tr key={notif.id} className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${selectedIds.includes(notif.id) ? 'bg-blue-50/40' : ''}`}>
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(notif.id)}
                              onChange={() => toggleSelectRow(notif.id)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                            />
                          </td>
                          <td className="py-3 px-2 font-bold text-slate-900">{notif.title}</td>
                          <td className="py-3 px-2"><TypeBadge type={notif.type} /></td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                              <notif.channelIcon size={13} className="text-slate-400 flex-shrink-0" /> {notif.channel}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-slate-500 font-medium">{notif.audience}</td>
                          <td className="py-3 px-2"><StatusBadge status={notif.status} /></td>
                          <td className="py-3 px-2 text-slate-500 font-medium whitespace-nowrap">{notif.sentAt}</td>
                          <td className="py-3 px-2">
                            {notif.readRate !== null ? (
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden flex items-center">
                                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${notif.readRate}%` }}></div>
                                </div>
                                <span className="text-[12px] font-medium text-slate-500">{notif.readRate}%</span>
                              </div>
                            ) : (
                              <span className="text-slate-400 font-medium">—</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button onClick={() => showToast(`Opened actions for "${notif.title}"`)} className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100"><MoreVertical size={16} /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="py-3 px-5 border-t border-slate-100 flex items-center justify-between text-[13px] bg-slate-50/30 flex-wrap gap-3">
                <span className="text-slate-500 font-medium">Showing {visibleNotifications.length === 0 ? 0 : 1}–{visibleNotifications.length} of {notifications.length} notifications</span>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50">&lt;</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white font-bold">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">3</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">4</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">5</button>
                  <span className="text-slate-400">...</span>
                  <button className="w-8 h-7 flex items-center justify-center rounded border border-transparent text-slate-600 hover:bg-slate-50 font-medium">385</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50">&gt;</button>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-600 font-medium hover:bg-slate-50">
                  10 per page <ChevronDown size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-6">

            {/* Delivery Channels */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-[16px] font-bold text-slate-900 mb-1">Delivery Channels</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-5">Where notifications were delivered.</p>
              <div className="space-y-4">
                {deliveryChannelsData.map((channel, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${channel.iconBg}`}>
                      <channel.icon size={13} className={channel.iconColor} />
                    </div>
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <span className="w-12 text-[12px] font-semibold text-slate-700 flex-shrink-0">{channel.name}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex items-center">
                        <div className={`h-full rounded-full ${channel.color}`} style={{ width: channel.width }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-right text-[12px] font-medium text-slate-500">{channel.percent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Status */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Notification Status</h3>
              <div className="flex items-center justify-between">
                <div className="relative w-[140px] h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={notificationStatusData}
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                      >
                        {notificationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[18px] font-extrabold text-slate-900 leading-none">3,842</span>
                    <span className="text-[10px] text-slate-500 font-semibold mt-1">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 flex-1 ml-4">
                    {notificationStatusData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-semibold text-slate-700">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-slate-500 font-medium">{item.value}</span>
                           <span className="text-slate-400 font-medium w-10 text-right">({item.percent})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[16px] font-bold text-slate-900">Recent Notifications</h3>
                  <button onClick={() => showToast('All recent notifications are listed in the table')} className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
                </div>
                <div className="space-y-4">
                  {recentNotifications.map((act, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${act.bg}`}>
                        <act.icon size={12} className={act.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-slate-900 truncate">{act.title}</p>
                        <p className="text-[12px] text-slate-500 font-medium truncate">{act.sub}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap pt-0.5">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={18} className="text-blue-600" />
                  <h3 className="text-[16px] font-bold text-slate-900">Quick Actions</h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: Megaphone, label: 'Send Notification', iconColor: 'text-blue-600', iconBg: 'bg-blue-100' },
                    { icon: LayoutTemplate, label: 'Manage Templates', iconColor: 'text-purple-600', iconBg: 'bg-purple-100' },
                    { icon: Settings, label: 'Notification Settings', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-100' },
                    { icon: Download, label: 'Export Logs', iconColor: 'text-amber-600', iconBg: 'bg-amber-100' },
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (action.label === 'Send Notification') addNotification('Platform Announcement');
                        else if (action.label === 'Manage Templates') showToast('12 notification templates available (welcome, reminder, maintenance)');
                        else if (action.label === 'Notification Settings') router.push('/admin/settings');
                        else exportNotifications();
                      }}
                      className="flex flex-col items-start gap-2 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl transition-colors text-left">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.iconBg}`}>
                        <action.icon size={15} className={action.iconColor} />
                      </div>
                      <span className="text-[12px] font-semibold text-slate-700 leading-tight">{action.label}</span>
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
