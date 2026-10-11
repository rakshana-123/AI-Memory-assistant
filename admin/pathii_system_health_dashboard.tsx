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

// --- MOCK DATA ---

const performanceData = [
  { name: 'Oct 1', rt: 250, tp: 300 },
  { name: 'Oct 5', rt: 350, tp: 480 },
  { name: 'Oct 10', rt: 280, tp: 400 },
  { name: 'Oct 15', rt: 300, tp: 450 },
  { name: 'Oct 20', rt: 420, tp: 600 },
  { name: 'Oct 25', rt: 320, tp: 500 },
  { name: 'Oct 31', rt: 380, tp: 650 },
];

const resourceData = [
  { name: 'Oct 1', cpu: 45, mem: 60, disk: 30 },
  { name: 'Oct 5', cpu: 55, mem: 65, disk: 32 },
  { name: 'Oct 10', cpu: 48, mem: 62, disk: 35 },
  { name: 'Oct 15', cpu: 60, mem: 70, disk: 38 },
  { name: 'Oct 20', cpu: 75, mem: 80, disk: 40 },
  { name: 'Oct 25', cpu: 65, mem: 75, disk: 42 },
  { name: 'Oct 31', cpu: 70, mem: 78, disk: 45 },
];

const errorRateData = [
  { name: 'API Errors', value: 38, fill: '#3b82f6' },
  { name: 'AI Service', value: 24, fill: '#8b5cf6' },
  { name: 'Database', value: 16, fill: '#10b981' },
  { name: 'Auth Errors', value: 10, fill: '#f59e0b' },
  { name: 'File Storage', value: 8, fill: '#ec4899' },
  { name: 'Others', value: 4, fill: '#64748b' },
];

const responseTimeData = [
  { name: 'Web Application', val: '210 ms', width: '40%', color: 'bg-blue-500' },
  { name: 'API Server', val: '284 ms', width: '55%', color: 'bg-purple-500' },
  { name: 'Database', val: '320 ms', width: '65%', color: 'bg-emerald-500' },
  { name: 'AI Service', val: '420 ms', width: '85%', color: 'bg-amber-500' },
  { name: 'File Storage', val: '180 ms', width: '35%', color: 'bg-pink-500' },
  { name: 'Integrations', val: '260 ms', width: '50%', color: 'bg-indigo-500' },
];

const systemLogs = [
  { time: 'Oct 31, 04:22 PM', level: 'INFO', service: 'API Server', msg: 'Request processed successfully (POST /api/memory)', status: 'Success' },
  { time: 'Oct 31, 04:21 PM', level: 'WARN', service: 'AI Service', msg: 'High response time detected (1.8s)', status: 'Resolved' },
  { time: 'Oct 31, 04:20 PM', level: 'INFO', service: 'Database', msg: 'Database connection restored', status: 'Success' },
  { time: 'Oct 31, 04:18 PM', level: 'ERROR', service: 'File Storage', msg: 'Failed to upload file (timeout)', status: 'Resolved' },
  { time: 'Oct 31, 04:15 PM', level: 'INFO', service: 'Auth Service', msg: 'User login successful (user_id: 2481)', status: 'Success' },
  { time: 'Oct 31, 04:12 PM', level: 'WARN', service: 'Integration', msg: 'Notion API rate limit approaching', status: 'Resolved' },
  { time: 'Oct 31, 04:10 PM', level: 'INFO', service: 'Web App', msg: 'New user registration (user_id: 2842)', status: 'Success' },
  { time: 'Oct 31, 04:08 PM', level: 'ERROR', service: 'AI Service', msg: 'Model API timeout (OpenAI)', status: 'Resolved' },
  { time: 'Oct 31, 04:05 PM', level: 'INFO', service: 'Email Service', msg: 'Welcome email sent to user', status: 'Success' },
  { time: 'Oct 31, 04:02 PM', level: 'WARN', service: 'Database', msg: 'High memory usage (78%)', status: 'Monitoring' },
];

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
  <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[11px] font-bold">{badge}</span>
    )}
  </div>
);

const MetricCard = ({ icon: Icon, iconColor, iconBg, title, value, trend, trendUp, trendColor }) => (
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
    <div className={`flex items-center gap-1 text-[12px] font-bold mt-1 ${trendColor}`}>
      {trendUp ? <span className="text-lg leading-none mb-1">↑</span> : <span className="text-lg leading-none mb-1">↓</span>}
      <span>{trend}</span>
      <span className="text-slate-400 font-medium ml-1">vs last month</span>
    </div>
  </div>
);

// Generates fake heatmap data
const generateHeatmapData = () => {
  const data = [];
  const rows = ['Web App', 'API Server', 'Database', 'AI Service', 'Storage', 'Integrations'];
  rows.forEach(row => {
    const cols = [];
    for (let i = 0; i < 35; i++) {
      let status = 'operational';
      if (Math.random() > 0.95) status = 'down';
      else if (Math.random() > 0.85) status = 'slow';
      cols.push(status);
    }
    data.push({ row, cols });
  });
  return data;
};
const heatmapData = generateHeatmapData();

const getLevelBadge = (level) => {
  switch (level) {
    case 'INFO': return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-600">INFO</span>;
    case 'WARN': return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-600">WARN</span>;
    case 'ERROR': return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-600">ERROR</span>;
    default: return null;
  }
};

const getStatusBadge = (status) => {
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

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-[#F4F7F9] font-sans overflow-hidden text-slate-900 antialiased">
      
      {/* Left Sidebar */}
      <aside className="w-[240px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 z-10">
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
          <SidebarItem icon={Link} label="Integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" />
          <SidebarItem icon={Bell} label="Notifications" badge="3" />
          <SidebarItem icon={ShieldCheck} label="System Health" active />
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

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 bg-[#F4F7F9]">
          <div className="relative w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs, services, errors, or system metrics..." 
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500 border border-slate-200">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Header Date Picker */}
            <button className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-blue-600" />
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

        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar flex gap-6">
          
          {/* Main Left Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
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
                 <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-bold text-[12px] flex items-center gap-1.5 border border-emerald-200">
                   <CheckCircle2 size={14} /> All Systems Operational
                 </div>
                 <span className="text-[11px] text-slate-400 font-medium">Last updated: Oct 31, 2024 04:25 PM</span>
               </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-6 gap-4">
              <MetricCard icon={Monitor} iconColor="text-emerald-500" iconBg="bg-emerald-50" title="Uptime" value="99.98%" trend="0.02%" trendUp={true} trendColor="text-emerald-500" />
              <MetricCard icon={Clock} iconColor="text-blue-500" iconBg="bg-blue-50" title="Avg Response Time" value="284 ms" trend="32%" trendUp={false} trendColor="text-emerald-500" />
              <MetricCard icon={Activity} iconColor="text-emerald-500" iconBg="bg-emerald-50" title="Requests/min" value="12.4K" trend="18%" trendUp={true} trendColor="text-emerald-500" />
              <MetricCard icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50" title="Error Rate" value="0.12%" trend="48%" trendUp={false} trendColor="text-red-500" />
              <MetricCard icon={Cpu} iconColor="text-blue-500" iconBg="bg-blue-50" title="Avg CPU Usage" value="65%" trend="12%" trendUp={true} trendColor="text-emerald-500" />
              <MetricCard icon={Database} iconColor="text-purple-500" iconBg="bg-purple-50" title="Avg Memory Usage" value="72%" trend="15%" trendUp={false} trendColor="text-emerald-500" />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              {/* System Performance Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">System Performance</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[12px] font-semibold text-slate-600 transition-colors">
                      This Month <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mb-2 text-[11px] font-bold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Response Time (ms)</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Throughput (req/min)</div>
                </div>
                <div className="flex-1 min-h-0">
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
                </div>
              </div>

              {/* Server Resource Usage Line Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">Server Resource Usage</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[12px] font-semibold text-slate-600 transition-colors">
                      This Month <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mb-2 text-[11px] font-bold text-slate-600">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div>CPU Usage</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Memory Usage</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Disk Usage</div>
                </div>
                <div className="flex-1 min-h-0">
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
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4">
              
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
                <div className="flex-1 flex gap-2">
                   {/* Y Axis Labels */}
                   <div className="flex flex-col justify-between text-[10px] font-medium text-slate-400 pb-5">
                      {heatmapData.map(d => <span key={d.row}>{d.row}</span>)}
                   </div>
                   {/* Grid */}
                   <div className="flex-1 flex flex-col justify-between pb-5 relative">
                      {heatmapData.map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-between w-full h-[10px]">
                          {row.cols.map((status, cIdx) => (
                            <div key={cIdx} className={`w-[8px] h-[8px] rounded-sm ${status === 'operational' ? 'bg-emerald-400' : status === 'slow' ? 'bg-amber-400' : 'bg-red-500'}`}></div>
                          ))}
                        </div>
                      ))}
                      {/* X Axis Labels (Approximate) */}
                      <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] font-medium text-slate-400">
                         <span>Oct 1</span><span>Oct 7</span><span>Oct 14</span><span>Oct 21</span><span>Oct 28</span><span>Oct 31</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Response Time by Service */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <h3 className="text-[15px] font-bold text-slate-900 mb-4">Response Time by Service</h3>
                <div className="flex-1 flex flex-col justify-between">
                  {responseTimeData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold text-slate-600 w-24 truncate">{item.name}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }}></div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-900 w-12 text-right">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Rate by Service Donut */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[240px]">
                <h3 className="text-[15px] font-bold text-slate-900 mb-2">Error Rate by Service</h3>
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
                      <span className="text-[14px] font-extrabold text-slate-900 leading-none">0.12%</span>
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
              </div>

            </div>

            {/* Recent System Logs Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-slate-900">Recent System Logs</h3>
                
                <div className="flex items-center gap-3">
                  <div className="relative w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search logs..." 
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                    />
                  </div>
                  
                  {['All Services', 'All Levels', 'Last 24 Hours'].map((filter, i) => (
                    <button key={i} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                      {filter} <ChevronDown size={14} className="text-slate-400" />
                    </button>
                  ))}
                  
                  <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[12px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                    <Filter size={14} className="text-slate-400" /> Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-2.5 px-4 w-10"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer" /></th>
                      <th className="py-2.5 px-4">Time</th>
                      <th className="py-2.5 px-4">Level</th>
                      <th className="py-2.5 px-4">Service</th>
                      <th className="py-2.5 px-4">Message</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    {systemLogs.map((log, index) => (
                      <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-2.5 px-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer" /></td>
                        <td className="py-2.5 px-4 text-slate-500 font-medium">{log.time}</td>
                        <td className="py-2.5 px-4">{getLevelBadge(log.level)}</td>
                        <td className="py-2.5 px-4 font-semibold text-slate-700">{log.service}</td>
                        <td className="py-2.5 px-4 text-slate-600 font-medium">{log.msg}</td>
                        <td className="py-2.5 px-4 flex justify-end">{getStatusBadge(log.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[12px] font-medium text-slate-500">
                 <span>Showing 1–10 of 1,248 logs</span>
                 <div className="flex items-center gap-1">
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="rotate-90" /></button>
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">1</button>
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">2</button>
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">3</button>
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">4</button>
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">5</button>
                   <span className="px-1 text-slate-400">...</span>
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">125</button>
                   <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="-rotate-90" /></button>
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
          <div className="w-[300px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Service Status */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[15px] font-bold text-slate-900">Service Status</h3>
                <button className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ChevronRight size={14} /></button>
              </div>
              
              <div className="flex flex-col space-y-3.5">
                {[
                  { icon: Globe, label: 'Web Application', color: 'text-blue-500' },
                  { icon: Code2, label: 'API Server', color: 'text-blue-500' },
                  { icon: Database, label: 'Database (MongoDB)', color: 'text-emerald-500' },
                  { icon: Brain, label: 'AI Service (LLM)', color: 'text-purple-500' },
                  { icon: HardDrive, label: 'File Storage', color: 'text-amber-500' },
                  { icon: Lock, label: 'Authentication', color: 'text-rose-500' },
                  { icon: Mail, label: 'Email Service', color: 'text-blue-400' },
                  { icon: Link2, label: 'Third-party Integrations', color: 'text-indigo-500' },
                ].map((service, i) => (
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
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[15px] font-bold text-slate-900">Recent Alerts</h3>
                 <button className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ChevronRight size={14} /></button>
               </div>
               <div className="space-y-4">
                 {[
                   { icon: AlertCircle, bg: 'bg-red-100', color: 'text-red-600', title: 'High CPU Usage', sub: 'API Server CPU usage at 92%', time: '12 min ago' },
                   { icon: AlertTriangle, bg: 'bg-amber-100', color: 'text-amber-600', title: 'AI Service Latency', sub: 'Response time above 2s', time: '28 min ago' },
                   { icon: CheckCircle2, bg: 'bg-emerald-100', color: 'text-emerald-600', title: 'Database Recovered', sub: 'Database connection restored', time: '45 min ago' },
                   { icon: FileWarning, bg: 'bg-red-100', color: 'text-red-600', title: 'File Upload Failures', sub: 'Multiple upload failures detected', time: '1 hour ago' },
                   { icon: AlertTriangle, bg: 'bg-amber-100', color: 'text-amber-600', title: 'High Memory Usage', sub: 'Memory usage at 78%', time: '2 hours ago' },
                 ].map((alert, i) => (
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
                 ))}
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
                   <button key={i} className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-700 rounded-xl transition-all group shadow-sm">
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