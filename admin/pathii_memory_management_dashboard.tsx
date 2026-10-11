import React from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, ArrowUpRight, ArrowDownRight, 
  MoreVertical, ChevronRight, Brain, Mic, Image as ImageIcon, 
  Eye, Download, Trash2, Calendar, File, MoreHorizontal, Link2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Mock Data for Area Chart (Stacked)
const memoryTrendsData = [
  { name: 'Oct 1', voice: 50, notes: 30, docs: 20, images: 10, links: 5 },
  { name: 'Oct 5', voice: 60, notes: 35, docs: 25, images: 15, links: 8 },
  { name: 'Oct 10', voice: 55, notes: 40, docs: 30, images: 20, links: 10 },
  { name: 'Oct 15', voice: 70, notes: 45, docs: 28, images: 25, links: 12 },
  { name: 'Oct 20', voice: 65, notes: 50, docs: 35, images: 22, links: 15 },
  { name: 'Oct 25', voice: 80, notes: 55, docs: 40, images: 30, links: 18 },
  { name: 'Oct 31', voice: 90, notes: 60, docs: 45, images: 35, links: 20 },
];

const memoryBreakdownData = [
  { name: 'Voice Notes', value: 5243, fill: '#3b82f6', percent: '42%' },
  { name: 'Documents', value: 3198, fill: '#10b981', percent: '26%' },
  { name: 'Images', value: 2176, fill: '#f59e0b', percent: '17%' },
  { name: 'Links & Others', value: 865, fill: '#f43f5e', percent: '7%' },
];

const recentMemories = [
  { type: 'Voice Note', typeIcon: Mic, typeColor: 'text-blue-500', typeBg: 'bg-blue-100', title: 'Project discussion with team', user: 'sarahkumar@example.com', date: 'Oct 30, 2024', time: '10:24 AM', size: '2.4 MB' },
  { type: 'Document', typeIcon: FileText, typeColor: 'text-purple-500', typeBg: 'bg-purple-100', title: 'Research_Paper.pdf', user: 'arunraj@example.com', date: 'Oct 29, 2024', time: '04:12 PM', size: '4.8 MB' },
  { type: 'Image', typeIcon: ImageIcon, typeColor: 'text-emerald-500', typeBg: 'bg-emerald-100', title: 'IMG_2456.jpg', user: 'priya@example.com', date: 'Oct 29, 2024', time: '02:36 PM', size: '1.2 MB' },
  { type: 'Link', typeIcon: Link2, typeColor: 'text-pink-500', typeBg: 'bg-pink-100', title: 'https://example.com', user: 'vikram@example.com', date: 'Oct 28, 2024', time: '11:03 AM', size: '256 KB' },
  { type: 'Document', typeIcon: FileText, typeColor: 'text-purple-500', typeBg: 'bg-purple-100', title: 'Meeting notes.docx', user: 'meena@example.com', date: 'Oct 27, 2024', time: '09:17 AM', size: '3.6 MB' },
];

const recentActivity = [
  { icon: Mic, color: 'text-blue-600', bg: 'bg-blue-100', title: 'New voice note uploaded', sub: 'user123@example.com', time: '2 min ago' },
  { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100', title: 'Document processed', sub: 'project-report.pdf', time: '8 min ago' },
  { icon: ImageIcon, color: 'text-amber-500', bg: 'bg-amber-100', title: 'New image saved', sub: 'IMG_2456.jpg', time: '15 min ago' },
  { icon: Link2, color: 'text-pink-600', bg: 'bg-pink-100', title: 'Link added', sub: 'https://example.com', time: '28 min ago' },
  { icon: Database, color: 'text-slate-600', bg: 'bg-slate-100', title: 'Memory updated by admin', sub: 'task-summary', time: '42 min ago' },
];

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
  <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px] font-bold">{badge}</span>
    )}
  </div>
);

export default function MemoryManagementDashboard() {
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
          <SidebarItem icon={Database} label="Memories" active />
          <SidebarItem icon={FileText} label="Documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" />
          <SidebarItem icon={Cpu} label="AI Usage" />
          <SidebarItem icon={Link} label="Integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" />
          <SidebarItem icon={Bell} label="Notifications" />
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

      { }
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search memories, users, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">3</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200" />
                <span className="text-[13px] font-bold text-slate-700 flex items-center gap-1">Admin <ChevronDown size={14} className="text-slate-400"/></span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar flex gap-6">
          
          {/* Left Main Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title & Date Picker Row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex-1 mr-4">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Database size={24} strokeWidth={2.5} />
                   </div>
                   <div>
                     <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Memory Management</h2>
                     <p className="text-[14px] text-slate-500 font-medium">View, organize and manage all user memories across the system.</p>
                   </div>
                </div>
                
                <button className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors w-[260px] h-[64px]">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    Oct 1, 2024 - Oct 31, 2024
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
            </div>

            {}
            <div className="grid grid-cols-5 gap-4">
               {[
                 { title: 'Total Memories', value: '12,482', icon: Mic, iconColor: 'text-blue-500', iconBg: 'bg-blue-100', trend: '18%', up: true },
                 { title: 'Voice Notes', value: '5,243', icon: FileText, iconColor: 'text-purple-500', iconBg: 'bg-purple-100', trend: '22%', up: true },
                 { title: 'Documents', value: '3,198', icon: File, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-100', trend: '16%', up: true },
                 { title: 'Images', value: '2,176', icon: ImageIcon, iconColor: 'text-amber-500', iconBg: 'bg-amber-100', trend: '14%', up: true },
                 { title: 'Links & Others', value: '865', icon: Link2, iconColor: 'text-pink-500', iconBg: 'bg-pink-100', trend: '9%', up: true },
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.iconBg}`}>
                       <stat.icon size={16} className={stat.iconColor} />
                    </div>
                    <div>
                        <p className="text-[12px] text-slate-500 font-medium mb-1">{stat.title}</p>
                        <h3 className="text-[24px] font-extrabold text-slate-900 leading-none mb-3">{stat.value}</h3>
                    </div>
                    <div className={`flex items-center gap-1 text-[12px] font-semibold ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      <span>{stat.trend}</span>
                      <span className="text-slate-400 font-medium ml-1">vs last month</span>
                    </div>
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
            </div>

            {}
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              
              {/* Memory Sources */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-1">Memory Sources</h3>
                <p className="text-[13px] text-slate-500 font-medium mb-5">Where your memories come from.</p>
                
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { label: 'Voice', val: '5,243', pct: '42%', icon: Mic, iconColor: 'text-blue-500', iconBg: 'bg-blue-100', trend: '22%' },
                    { label: 'Documents', val: '3,198', pct: '26%', icon: FileText, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-100', trend: '16%' },
                    { label: 'Images', val: '2,176', pct: '17%', icon: ImageIcon, iconColor: 'text-amber-500', iconBg: 'bg-amber-100', trend: '14%' },
                    { label: 'Links', val: '865', pct: '7%', icon: Link2, iconColor: 'text-pink-500', iconBg: 'bg-pink-100', trend: '9%' },
                    { label: 'Other', val: '1,000', pct: '8%', icon: MoreHorizontal, iconColor: 'text-slate-500', iconBg: 'bg-slate-100', trend: '6%' },
                  ].map((src, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl p-3 flex flex-col items-start bg-slate-50/50">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${src.iconBg}`}>
                          <src.icon size={16} className={src.iconColor} />
                        </div>
                        <p className="text-[12px] font-bold text-slate-900 mb-1">{src.label}</p>
                        <p className="text-[14px] font-extrabold text-slate-900 leading-none mb-1">{src.val}</p>
                        <p className="text-[11px] text-slate-500 font-medium mb-2">{src.pct}</p>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <ArrowUpRight size={12} /> {src.trend}
                        </div>
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
                    <button key={i} className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 rounded-xl transition-colors group">
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
                 <div className="flex items-center justify-between mb-5">
                   <h3 className="text-[16px] font-bold text-slate-900">Recent Memories</h3>
                   
                   <div className="flex items-center gap-3">
                     <div className="relative w-[220px]">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                       <input 
                         type="text" 
                         placeholder="Search memories..." 
                         className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                       />
                     </div>
                     
                     {['All Types', 'All Users', 'Last 7 days'].map((filter, i) => (
                       <button key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                         {filter} <ChevronDown size={14} className="text-slate-400" />
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                         <th className="pb-3 w-8 pl-2"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                         <th className="pb-3 font-semibold">Type</th>
                         <th className="pb-3 font-semibold">Title / Content</th>
                         <th className="pb-3 font-semibold">User</th>
                         <th className="pb-3 font-semibold">Created At</th>
                         <th className="pb-3 font-semibold">Size</th>
                         <th className="pb-3 font-semibold text-center w-16">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="text-[13px]">
                       {recentMemories.map((mem, index) => (
                         <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                           <td className="py-3 pl-2"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
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
                             <button className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
                 
                 <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                    <span className="text-[12px] text-slate-500 font-medium">Showing 1–5 of 12,482 memories</span>
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100"><ChevronRight size={14} className="rotate-180" /></button>
                      <button className="w-7 h-7 rounded flex items-center justify-center bg-blue-600 text-white font-bold text-[12px]">1</button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-[12px]">2</button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-[12px]">3</button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-[12px]">4</button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-[12px]">5</button>
                      <span className="w-7 h-7 flex items-center justify-center text-slate-400">...</span>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100"><ChevronRight size={14} /></button>
                    </div>
                 </div>
            </div>

          </div>

          {}
          <div className="w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Storage Usage */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-bold text-slate-900">Storage Usage</h3>
                  <span className="text-[12px] font-medium text-slate-500">24.8 GB of 100 GB used</span>
                </div>

                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-6 relative">
                    <div className="absolute top-0 left-0 h-full w-[25%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                <div className="space-y-3.5">
                  {[
                    { color: 'bg-blue-500', label: 'Voice Notes', val: '8.4 GB', pct: '34%' },
                    { color: 'bg-purple-500', label: 'Documents', val: '7.1 GB', pct: '29%' },
                    { color: 'bg-amber-500', label: 'Images', val: '5.2 GB', pct: '21%' },
                    { color: 'bg-pink-500', label: 'Links & Others', val: '4.1 GB', pct: '16%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[13px]">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-bold text-slate-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-medium w-12 text-right">{item.val}</span>
                        <span className="text-slate-400 font-medium w-8 text-right">{item.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Memory Types Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[16px] font-bold text-slate-900 mb-6">Memory Types Breakdown</h3>
               
               <div className="flex items-center justify-between">
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
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">12,482</span>
                      <span className="text-[10px] text-slate-500 font-semibold mt-1">Total Memories</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 flex-1 ml-4">
                    {memoryBreakdownData.map((item, i) => (
                      <div key={i} className="flex flex-col text-[11px]">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="font-bold text-slate-900">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-3.5">
                           <span className="text-slate-500 font-medium">{item.value.toLocaleString()} ({item.percent})</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Recent Memory Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Memory Activity</h3>
                <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-5">
                {recentActivity.map((act, i) => (
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
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

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