import React from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link as LinkIcon, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight, 
  Brain, ArrowUpRight, ArrowDownRight, Filter, ShieldAlert,
  Calendar, Mail, HardDrive, Hash, Github, Video, Phone, Layout, Notebook,
  CheckCircle2, AlertTriangle, XCircle, Key, Eye, Lock, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const usageTrendData = [
  { name: 'Oct 1', calls: 5000 }, { name: 'Oct 5', calls: 11000 },
  { name: 'Oct 10', calls: 10000 }, { name: 'Oct 15', calls: 13000 },
  { name: 'Oct 20', calls: 11000 }, { name: 'Oct 25', calls: 16000 },
  { name: 'Oct 31', calls: 19000 },
];

const usageByIntegrationData = [
  { name: 'Google', value: 2696, fill: '#3b82f6', percent: '32%' },
  { name: 'Notion', value: 1516, fill: '#8b5cf6', percent: '18%' },
  { name: 'Slack', value: 1264, fill: '#10b981', percent: '15%' },
  { name: 'GitHub', value: 1011, fill: '#f59e0b', percent: '12%' },
  { name: 'Outlook', value: 842, fill: '#f43f5e', percent: '10%' },
  { name: 'Others', value: 1097, fill: '#64748b', percent: '13%' },
];

const integrationTableData = [
  { name: 'Google Calendar', icon: Calendar, iconBg: 'bg-white border shadow-sm text-blue-500', category: 'Calendar', catBg: 'bg-amber-100 text-amber-600', activeUsers: '2,481', apiCalls: '18,452', lastSynced: 'Oct 31, 2024 10:24 AM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Gmail', icon: Mail, iconBg: 'bg-white border shadow-sm text-red-500', category: 'Email', catBg: 'bg-purple-100 text-purple-600', activeUsers: '2,312', apiCalls: '14,985', lastSynced: 'Oct 31, 2024 09:12 AM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Google Drive', icon: HardDrive, iconBg: 'bg-white border shadow-sm text-emerald-500', category: 'Storage', catBg: 'bg-blue-100 text-blue-600', activeUsers: '1,986', apiCalls: '12,421', lastSynced: 'Oct 30, 2024 08:56 PM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Notion', icon: Notebook, iconBg: 'bg-black text-white', category: 'Productivity', catBg: 'bg-amber-100 text-amber-600', activeUsers: '1,542', apiCalls: '9,864', lastSynced: 'Oct 30, 2024 06:22 PM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Slack', icon: Hash, iconBg: 'bg-white border shadow-sm text-purple-600', category: 'Communication', catBg: 'bg-pink-100 text-pink-600', activeUsers: '1,248', apiCalls: '8,210', lastSynced: 'Oct 30, 2024 04:15 PM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'GitHub', icon: Github, iconBg: 'bg-black text-white', category: 'Development', catBg: 'bg-blue-100 text-blue-600', activeUsers: '986', apiCalls: '6,452', lastSynced: 'Oct 29, 2024 11:38 AM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Outlook', icon: Mail, iconBg: 'bg-blue-500 text-white', category: 'Email', catBg: 'bg-blue-100 text-blue-600', activeUsers: '642', apiCalls: '4,216', lastSynced: 'Oct 29, 2024 09:45 AM', status: 'Degraded', statusBg: 'bg-amber-100 text-amber-600' },
  { name: 'Zoom', icon: Video, iconBg: 'bg-blue-500 text-white', category: 'Meeting', catBg: 'bg-blue-100 text-blue-600', activeUsers: '428', apiCalls: '3,184', lastSynced: 'Oct 28, 2024 07:21 PM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'WhatsApp', icon: Phone, iconBg: 'bg-emerald-500 text-white', category: 'Communication', catBg: 'bg-pink-100 text-pink-600', activeUsers: '356', apiCalls: '2,842', lastSynced: 'Oct 28, 2024 05:14 PM', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Trello', icon: Layout, iconBg: 'bg-blue-600 text-white', category: 'Project Management', catBg: 'bg-indigo-100 text-indigo-600', activeUsers: '204', apiCalls: '1,562', lastSynced: 'Oct 27, 2024 03:36 PM', status: 'Error', statusBg: 'bg-rose-100 text-rose-600' },
];

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
  <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-[#F43F5E] text-white text-[11px] font-bold">{badge}</span>
    )}
  </div>
);

const StatCard = ({ icon: Icon, iconColor, iconBg, title, value, trend, trendUp, isErrorTrend }) => (
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
    <div className={`flex items-center gap-1 text-[12px] font-semibold ${trendUp ? 'text-emerald-600' : (isErrorTrend ? 'text-rose-600' : 'text-rose-600')}`}>
      {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      <span>{trend}</span>
      <span className="text-slate-400 font-medium ml-1">vs last month</span>
    </div>
  </div>
);

export default function IntegrationsDashboard() {
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
            <p className="text-[12px] text-slate-500 font-medium">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
          <SidebarItem icon={LayoutDashboard} label="Overview" />
          <SidebarItem icon={Users} label="Users" />
          <SidebarItem icon={Database} label="Memories" />
          <SidebarItem icon={FileText} label="Documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" />
          <SidebarItem icon={Cpu} label="AI Usage" />
          <SidebarItem icon={LinkIcon} label="Integrations" active />
          <SidebarItem icon={BarChart2} label="Analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" />
          <SidebarItem icon={Bell} label="Notifications" badge="3" />
          <SidebarItem icon={ShieldCheck} label="System Health" />
          <SidebarItem icon={Settings} label="Settings" />
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

      {}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search integrations, users, or anything..." 
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

        {}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar flex gap-6">
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <LinkIcon size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Integrations Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">Manage connected apps, monitor usage and control integrations across Pathii.</p>
                 </div>
               </div>
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm shadow-blue-200 transition-colors flex items-center gap-2">
                 <Plus size={18} /> Add New Integration
               </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-5 gap-4">
              <StatCard icon={LinkIcon} iconColor="text-purple-600" iconBg="bg-purple-100" title="Total Integrations" value="12" trend="20%" trendUp={true} />
              <StatCard icon={Users} iconColor="text-blue-600" iconBg="bg-blue-100" title="Active Connections" value="8,426" trend="18%" trendUp={true} />
              <StatCard icon={Plus} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="New Connections" value="2,156" trend="32%" trendUp={true} />
              <StatCard icon={LinkIcon} iconColor="text-rose-500" iconBg="bg-rose-100" title="Disconnected" value="428" trend="6%" trendUp={false} isErrorTrend={true} />
              <StatCard icon={ShieldCheck} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="Success Rate" value="99.2%" trend="1%" trendUp={true} />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              {/* Usage Trend Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Integration Usage Trend</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Total API calls to connected apps over the last 30 days.</p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                    This Month <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex-1 min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageTrendData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => val === 0 ? '0' : `${val/1000}K`} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Usage by Integration Donut Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-4">Usage by Integration</h3>
                
                <div className="flex-1 flex items-center justify-between">
                  <div className="relative w-[140px] h-[140px] -ml-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageByIntegrationData}
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {usageByIntegrationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-1">
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">8,426</span>
                      <span className="text-[9px] text-slate-500 font-semibold mt-1 text-center leading-tight">Total<br/>Connections</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1 pr-2">
                    {usageByIntegrationData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-semibold text-slate-700">{item.name}</span>
                        </div>
                        <span className="text-slate-400 font-medium">({item.percent})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search integrations..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>
                
                {['All Status', 'All Categories', 'All Users'].map((filter, i) => (
                  <button key={i} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                    {filter} <ChevronDown size={14} className="text-slate-400" />
                  </button>
                ))}
                
                <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                  <Filter size={14} className="text-slate-400" /> Filter
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 bg-slate-50/50">
                      <th className="py-3 px-4 w-10"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></th>
                      <th className="py-3 px-4 font-semibold">Integration</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Active Users</th>
                      <th className="py-3 px-4 font-semibold">API Calls (30d)</th>
                      <th className="py-3 px-4 font-semibold">Last Synced</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {integrationTableData.map((row, index) => (
                      <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></td>
                        <td className="py-3 px-4 flex items-center gap-3 font-bold text-slate-900">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${row.iconBg}`}>
                            <row.icon size={14} />
                          </div>
                          {row.name}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${row.catBg}`}>{row.category}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-semibold">{row.activeUsers}</td>
                        <td className="py-3 px-4 text-slate-600 font-semibold">{row.apiCalls}</td>
                        <td className="py-3 px-4 text-slate-500 font-medium whitespace-nowrap">{row.lastSynced}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-max ${row.statusBg}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-emerald-500' : (row.status === 'Degraded' ? 'bg-amber-500' : 'bg-rose-500')}`}></div>
                             {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500">
                 <span>Showing 1–10 of 12 integrations</span>
                 <div className="flex items-center gap-1">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="rotate-90" /></button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">1</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">2</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">3</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">4</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">5</button>
                   <span className="px-1 text-slate-400">...</span>
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

          {}
          <div className="w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Integration Status */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Integration Status</h3>
                 <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               <div className="space-y-4">
                 {[
                   { name: 'Google Workspace', calls: '2,864', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Calendar, iconBg: 'text-blue-500' },
                   { name: 'Notion', calls: '1,542', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Notebook, iconBg: 'text-slate-800' },
                   { name: 'Slack', calls: '1,248', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Hash, iconBg: 'text-purple-600' },
                   { name: 'GitHub', calls: '986', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Github, iconBg: 'text-slate-800' },
                   { name: 'Outlook', calls: '642', status: 'Degraded', statusBg: 'bg-amber-100 text-amber-600', icon: Mail, iconBg: 'text-blue-500' },
                   { name: 'Zoom', calls: '428', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Video, iconBg: 'text-blue-500' },
                   { name: 'WhatsApp', calls: '356', status: 'Active', statusBg: 'bg-emerald-100 text-emerald-600', icon: Phone, iconBg: 'text-emerald-500' },
                   { name: 'Trello', calls: '204', status: 'Error', statusBg: 'bg-rose-100 text-rose-600', icon: Layout, iconBg: 'text-blue-600' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={`w-6 h-6 rounded flex items-center justify-center ${item.iconBg}`}>
                         <item.icon size={16} />
                       </div>
                       <span className="text-[13px] font-semibold text-slate-700">{item.name}</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <span className="text-[12px] text-slate-400 font-medium">{item.calls}</span>
                       <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold w-16 text-center ${item.statusBg}`}>{item.status}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Recent Integration Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Integration Activity</h3>
                <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Google Calendar connected', sub: 'Sarah Kumar', time: '2 min ago', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50 border shadow-sm', badge: CheckCircle2, badgeColor: 'text-emerald-500' },
                  { title: 'Notion sync completed', sub: 'Priya Nair', time: '8 min ago', icon: Notebook, color: 'text-slate-800', bg: 'bg-slate-100 border shadow-sm', badge: CheckCircle2, badgeColor: 'text-emerald-500' },
                  { title: 'Slack disconnected', sub: 'Vikram S', time: '15 min ago', icon: Hash, color: 'text-purple-600', bg: 'bg-purple-50 border shadow-sm', badge: XCircle, badgeColor: 'text-rose-500' },
                  { title: 'GitHub connected', sub: 'Arun Raj', time: '28 min ago', icon: Github, color: 'text-slate-800', bg: 'bg-slate-100 border shadow-sm', badge: CheckCircle2, badgeColor: 'text-emerald-500' },
                  { title: 'Outlook sync failed', sub: 'Meena R', time: '42 min ago', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50 border shadow-sm', badge: AlertTriangle, badgeColor: 'text-amber-500' },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 relative z-10 ${act.bg}`}>
                      <act.icon size={14} className={act.color} />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[1px]">
                         <act.badge size={12} className={act.badgeColor} />
                      </div>
                    </div>
                    {i !== 4 && <div className="absolute left-4 top-8 w-px h-6 bg-slate-200"></div>}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 truncate">{act.title}</p>
                      <p className="text-[12px] text-blue-600 font-semibold truncate hover:underline cursor-pointer">{act.sub}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 whitespace-nowrap mt-1">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-4">Quick Actions</h3>
               
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { icon: ShieldCheck, label: 'Manage Permissions' },
                   { icon: Eye, label: 'View API Logs' },
                   { icon: BarChart2, label: 'Set Usage Limits' },
                   { icon: RefreshCw, label: 'Sync All Integrations' },
                 ].map((action, i) => (
                   <button key={i} className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 text-slate-700 rounded-xl transition-all group">
                     <action.icon size={16} className="text-blue-600 group-hover:text-blue-700 flex-shrink-0" />
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