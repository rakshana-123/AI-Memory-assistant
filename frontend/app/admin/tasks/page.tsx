"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight, 
  Brain, CheckCircle2, ArrowUpRight, ArrowDownRight,
  CheckSquare, Calendar, Clock, XCircle, Filter,
  Phone, Video, BellRing, Edit3, Trash2, Download, Layers, FolderKanban
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const trendsData = [
  { name: 'Oct 1', tasks: 50, events: 20 }, { name: 'Oct 5', tasks: 95, events: 45 },
  { name: 'Oct 10', tasks: 80, events: 50 }, { name: 'Oct 15', tasks: 150, events: 80 },
  { name: 'Oct 20', tasks: 120, events: 70 }, { name: 'Oct 25', tasks: 160, events: 90 },
  { name: 'Oct 31', tasks: 130, events: 100 },
];

const statusData = [
  { name: 'Completed', value: 2461, fill: '#10b981' },
  { name: 'Pending', value: 694, fill: '#f59e0b' },
  { name: 'Overdue', value: 210, fill: '#ef4444' },
];

const eventTypesData = [
  { name: 'Meetings', value: 642, fill: '#3b82f6' },
  { name: 'Calls', value: 428, fill: '#8b5cf6' },
  { name: 'Reminders', value: 304, fill: '#10b981' },
  { name: 'Deadlines', value: 268, fill: '#f59e0b' },
  { name: 'Others', value: 200, fill: '#ef4444' },
];

const tableData = [
  { title: 'Complete project proposal', icon: CheckSquare, iconBg: 'bg-purple-100 text-purple-600', type: 'Task', typeColor: 'text-purple-700 bg-purple-100', status: 'Pending', statusColor: 'text-amber-700 bg-amber-100', assignedAvatar: 'https://i.pravatar.cc/150?img=1', assignedName: 'Sarah Kumar', date: 'Oct 28, 2024', time: '11:59 PM', createdAvatar: 'https://i.pravatar.cc/150?img=11', createdName: 'Arun Raj' },
  { title: 'Team meeting', icon: Calendar, iconBg: 'bg-blue-100 text-blue-600', type: 'Event', typeColor: 'text-blue-700 bg-blue-100', status: 'Upcoming', statusColor: 'text-sky-700 bg-sky-100', assignedAvatar: 'https://i.pravatar.cc/150?img=5', assignedName: 'Priya Nair', date: 'Oct 28, 2024', time: '10:00 AM', createdAvatar: 'https://i.pravatar.cc/150?img=1', createdName: 'Sarah Kumar' },
  { title: 'Client call with ABC Corp', icon: Phone, iconBg: 'bg-emerald-100 text-emerald-600', type: 'Event', typeColor: 'text-blue-700 bg-blue-100', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100', initials: 'VS', avatarColor: 'bg-indigo-100 text-indigo-600', assignedName: 'Vikram S', date: 'Oct 27, 2024', time: '02:00 PM', createdAvatar: 'https://i.pravatar.cc/150?img=5', createdName: 'Priya Nair' },
  { title: 'Prepare research report', icon: FileText, iconBg: 'bg-purple-100 text-purple-600', type: 'Task', typeColor: 'text-purple-700 bg-purple-100', status: 'Overdue', statusColor: 'text-rose-700 bg-rose-100', assignedAvatar: 'https://i.pravatar.cc/150?img=9', assignedName: 'Meena R', date: 'Oct 25, 2024', time: '11:59 PM', createdAvatar: 'https://i.pravatar.cc/150?img=12', createdName: 'Karthik P' },
  { title: 'Webinar session', icon: Video, iconBg: 'bg-rose-100 text-rose-600', type: 'Event', typeColor: 'text-blue-700 bg-blue-100', status: 'Upcoming', statusColor: 'text-sky-700 bg-sky-100', assignedAvatar: 'https://i.pravatar.cc/150?img=15', assignedName: 'Rakesh M', initials: 'VS', createdAvatarColor: 'bg-blue-100 text-blue-600', createdName: 'Vikram S' , date: 'Oct 31, 2024', time: '04:00 PM'},
  { title: 'Update documentation', icon: CheckSquare, iconBg: 'bg-amber-100 text-amber-600', type: 'Task', typeColor: 'text-purple-700 bg-purple-100', status: 'Completed', statusColor: 'text-emerald-700 bg-emerald-100', initials: 'AS', avatarColor: 'bg-blue-100 text-blue-600', assignedName: 'Ananya S', date: 'Oct 24, 2024', time: '11:59 PM', createdAvatar: 'https://i.pravatar.cc/150?img=9', createdName: 'Meena R' },
  { title: 'Product demo', icon: Users, iconBg: 'bg-blue-100 text-blue-600', type: 'Event', typeColor: 'text-blue-700 bg-blue-100', status: 'Upcoming', statusColor: 'text-sky-700 bg-sky-100', initials: 'JD', avatarColor: 'bg-rose-100 text-rose-600', assignedName: 'John Doe', date: 'Oct 29, 2024', time: '03:00 PM', createdAvatar: 'https://i.pravatar.cc/150?img=1', createdName: 'Sarah Kumar' },
  { title: 'Fix bugs in module', icon: CheckSquare, iconBg: 'bg-purple-100 text-purple-600', type: 'Task', typeColor: 'text-purple-700 bg-purple-100', status: 'Pending', statusColor: 'text-amber-700 bg-amber-100', assignedAvatar: 'https://i.pravatar.cc/150?img=20', assignedName: 'Sneha B', date: 'Oct 30, 2024', time: '11:59 PM', createdAvatar: 'https://i.pravatar.cc/150?img=11', createdName: 'Arun Raj' },
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
    <div className={`flex items-center gap-1 text-[12px] font-semibold ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
      {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      <span>{trend}</span>
      <span className="text-slate-400 font-medium ml-1">vs last month</span>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-[#F4F7F9] font-sans overflow-hidden text-slate-900 antialiased">
      
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
          <SidebarItem icon={Bell} label="Notifications" badge="3" href="/admin/notifications" />
          <SidebarItem icon={ShieldCheck} label="System Health" href="/admin/system-health" />
          <SidebarItem icon={Settings} label="Settings" href="/admin/settings" />
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-9 h-9 rounded-full object-cover" />
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
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 border-b border-slate-200/50 bg-[#F4F7F9]">
          <div className="relative w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks, events, users, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-slate-400" />
              Oct 1, 2024 - Oct 31, 2024
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

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar flex gap-6">
          
          {/* Left Main Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Page Header */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarCheck size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Tasks & Events Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Monitor, organize and manage all user tasks and events across Pathii.</p>
                 </div>
               </div>
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm shadow-blue-200 transition-colors flex items-center gap-2">
                 <Plus size={18} /> Create Task / Event
               </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <StatCard icon={CheckSquare} iconColor="text-purple-600" iconBg="bg-purple-100" title="Total Tasks" value="3,215" trend="18%" trendUp={true} />
              <StatCard icon={Calendar} iconColor="text-blue-600" iconBg="bg-blue-100" title="Total Events" value="1,842" trend="24%" trendUp={true} />
              <StatCard icon={CheckCircle2} iconColor="text-emerald-600" iconBg="bg-emerald-100" title="Completed" value="2,461" trend="28%" trendUp={true} />
              <StatCard icon={Clock} iconColor="text-orange-500" iconBg="bg-orange-100" title="Pending" value="694" trend="12%" trendUp={false} />
              <StatCard icon={XCircle} iconColor="text-red-500" iconBg="bg-red-100" title="Overdue" value="210" trend="6%" trendUp={false} />
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-4">
              
              {/* Tasks & Events Trend Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Tasks & Events Trend</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Tasks and events created over the last 30 days.</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                      This Month <ChevronDown size={14} />
                    </button>
                    <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600">
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Tasks</div>
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Events</div>
                    </div>
                  </div>
                </div>
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
              </div>

              {/* Task Status Donut Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900">Task Status</h3>
                <p className="text-[13px] text-slate-500 font-medium mb-4">Current status of all tasks.</p>
                
                <div className="flex-1 flex items-center justify-between pl-2 pr-4">
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
                      <span className="text-[20px] font-extrabold text-slate-900 leading-none">3,215</span>
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
                           <span className="text-slate-400 font-medium">({item.name === 'Completed' ? '77%' : item.name === 'Pending' ? '22%' : '7%'})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              {/* Filter Bar */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="relative flex-1 max-w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search tasks or events..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>
                
                {['All Types', 'All Status', 'All Users'].map((filter, i) => (
                  <button key={i} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                    {filter} <ChevronDown size={14} className="text-slate-400" />
                  </button>
                ))}

                <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors ml-auto">
                  Oct 1, 2024 - Oct 31, 2024 <ChevronDown size={14} className="text-slate-400" />
                </button>
                
                <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                  <Filter size={14} className="text-slate-400" /> Filter
                </button>
              </div>

              {/* Tabs */}
              <div className="px-4 pt-3 flex gap-6 border-b border-slate-100">
                <button className="pb-3 border-b-2 border-blue-600 text-blue-600 text-[13px] font-bold">
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md mr-1.5">All (5,057)</span>
                </button>
                <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 text-[13px] font-bold">
                  Tasks (3,215)
                </button>
                <button className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 text-[13px] font-bold">
                  Events (1,842)
                </button>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></th>
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
                    {tableData.map((row, index) => (
                      <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></td>
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
                             {row.assignedAvatar ? (
                               <img src={row.assignedAvatar} alt={row.assignedName} className="w-6 h-6 rounded-full object-cover" />
                             ) : (
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${row.avatarColor}`}>{row.initials}</div>
                             )}
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
                             {row.createdAvatar ? (
                               <img src={row.createdAvatar} alt={row.createdName} className="w-6 h-6 rounded-full object-cover" />
                             ) : (
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${row.createdAvatarColor}`}>{row.initials}</div>
                             )}
                             <span className="whitespace-nowrap">{row.createdName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500">
                 <span>Showing 1–8 of 5,057 items</span>
                 <div className="flex items-center gap-1">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="rotate-90" /></button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-sm">1</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">2</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">3</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">4</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">5</button>
                   <span className="px-1 text-slate-400">...</span>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">632</button>
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

          <div className="w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Upcoming Events */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Upcoming Events <span className="text-slate-400 font-medium text-[13px] font-normal">(Next 7 Days)</span></h3>
                 <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               
               <div className="space-y-4">
                 {[
                   { day: '28', mth: 'Oct', title: 'Team Meeting', time: '10:00 AM - 11:00 AM', icon: Users, color: 'text-blue-600 bg-blue-50' },
                   { day: '29', mth: 'Oct', title: 'Project Review', time: '02:00 PM - 03:00 PM', icon: FileText, color: 'text-purple-600 bg-purple-50' },
                   { day: '30', mth: 'Oct', title: 'Client Call', time: '11:00 AM - 12:00 PM', icon: Phone, color: 'text-emerald-600 bg-emerald-50' },
                   { day: '31', mth: 'Oct', title: 'Webinar Session', time: '04:00 PM - 05:00 PM', icon: Video, color: 'text-rose-600 bg-rose-50' },
                 ].map((event, i) => (
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
                 ))}
               </div>
            </div>

            {/* Event Types Donut */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Event Types</h3>
                 <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
              
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
                    <span className="text-[18px] font-extrabold text-slate-900 leading-none">1,842</span>
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
                         <span className="text-slate-400 font-medium w-7 text-right">({item.name === 'Meetings' ? '35%' : item.name === 'Calls' ? '23%' : item.name === 'Reminders' ? '17%' : item.name === 'Deadlines' ? '15%' : '10%'})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Activity</h3>
                <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {[
                  { icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-100', title: 'Task completed', desc: 'Sarah Kumar marked "UI Design" as completed', time: '2 min ago' },
                  { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100', title: 'New event created', desc: 'Arun Raj created "Project Review"', time: '8 min ago' },
                  { icon: Edit3, color: 'text-amber-500', bg: 'bg-amber-100', title: 'Task updated', desc: 'Priya Nair updated "Research Report"', time: '15 min ago' },
                  { icon: Trash2, color: 'text-rose-600', bg: 'bg-rose-100', title: 'Event deleted', desc: 'Karthik P deleted "Old Meeting"', time: '28 min ago' },
                  { icon: BellRing, color: 'text-orange-500', bg: 'bg-orange-100', title: 'Reminder set', desc: 'Meena R set reminder for "Client Call"', time: '42 min ago' },
                ].map((act, i) => (
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
                ))}
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
                   <button key={i} className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 text-slate-600 rounded-xl transition-all group">
                     <action.icon size={16} className="text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                     <span className="text-[12px] font-semibold leading-tight text-left">{action.label}</span>
                   </button>
                 ))}
               </div>
            </div>

          </div>

        </div>
      </main>

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94A3B8;
        }
      `}} />
    </div>
  );
}