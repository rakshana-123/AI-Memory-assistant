"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, MoreVertical, Plus, ChevronRight, 
  Brain, CheckCircle2, ArrowUpRight, ArrowDownRight, CloudUpload,
  Image as ImageIcon, FileCode2, File, GraduationCap, Briefcase, 
  User, Folder, BookOpen, MoreHorizontal, Download, Layers, 
  Trash2, Filter, Upload, Share2, FolderKanban
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const documentTrendsData = [
  { name: 'Oct 1', docs: 50 }, { name: 'Oct 5', docs: 45 },
  { name: 'Oct 10', docs: 95 }, { name: 'Oct 15', docs: 140 },
  { name: 'Oct 20', docs: 110 }, { name: 'Oct 25', docs: 160 },
  { name: 'Oct 31', docs: 180 },
];

const documentTypesData = [
  { name: 'PDF', value: 1124, fill: '#ef4444', percent: '35%' },
  { name: 'Word', value: 856, fill: '#3b82f6', percent: '27%' },
  { name: 'Spreadsheet', value: 428, fill: '#10b981', percent: '13%' },
  { name: 'Image', value: 562, fill: '#f59e0b', percent: '18%' },
  { name: 'Others', value: 228, fill: '#8b5cf6', percent: '7%' },
];

const documentsList = [
  { type: 'pdf', name: 'Project Proposal.pdf', uploader: 'Sarah Kumar', uploaderAvatar: 'https://i.pravatar.cc/150?img=1', category: 'Projects', catColor: 'text-amber-600 bg-amber-100', size: '2.4 MB', date: 'Oct 30, 2024', time: '10:24 AM' },
  { type: 'word', name: 'Meeting Notes.docx', uploader: 'Arun Raj', uploaderAvatar: 'https://i.pravatar.cc/150?img=11', category: 'Work', catColor: 'text-blue-600 bg-blue-100', size: '1.8 MB', date: 'Oct 29, 2024', time: '04:12 PM' },
  { type: 'image', name: 'IMG_2456.jpg', uploader: 'Priya Nair', uploaderAvatar: 'https://i.pravatar.cc/150?img=5', category: 'Personal', catColor: 'text-orange-500 bg-orange-100', size: '1.2 MB', date: 'Oct 29, 2024', time: '02:36 PM' },
  { type: 'spreadsheet', name: 'Budget_Planner.xlsx', uploader: 'Vikram S', initials: 'VS', avatarColor: 'bg-indigo-100 text-indigo-600', category: 'Work', catColor: 'text-blue-600 bg-blue-100', size: '856 KB', date: 'Oct 28, 2024', time: '11:03 AM' },
  { type: 'pdf', name: 'Research_Paper.pdf', uploader: 'Meena R', uploaderAvatar: 'https://i.pravatar.cc/150?img=9', category: 'Academic', catColor: 'text-indigo-600 bg-indigo-100', size: '3.6 MB', date: 'Oct 27, 2024', time: '09:17 AM' },
  { type: 'others', name: 'Presentation.pptx', uploader: 'Karthik P', uploaderAvatar: 'https://i.pravatar.cc/150?img=12', category: 'Projects', catColor: 'text-amber-600 bg-amber-100', size: '5.2 MB', date: 'Oct 26, 2024', time: '01:24 PM' },
  { type: 'pdf', name: 'Syllabus.pdf', uploader: 'Ananya S', initials: 'AS', avatarColor: 'bg-blue-100 text-blue-600', category: 'Academic', catColor: 'text-indigo-600 bg-indigo-100', size: '1.1 MB', date: 'Oct 25, 2024', time: '11:48 AM' },
  { type: 'image', name: 'Diagram.png', uploader: 'Rakesh M', uploaderAvatar: 'https://i.pravatar.cc/150?img=15', category: 'Research', catColor: 'text-purple-600 bg-purple-100', size: '632 KB', date: 'Oct 24, 2024', time: '03:15 PM' },
  { type: 'word', name: 'Documentation.docx', uploader: 'Sneha B', uploaderAvatar: 'https://i.pravatar.cc/150?img=20', category: 'Projects', catColor: 'text-amber-600 bg-amber-100', size: '2.0 MB', date: 'Oct 23, 2024', time: '10:05 AM' },
  { type: 'pdf', name: 'User_Manual.pdf', uploader: 'John Doe', initials: 'JD', avatarColor: 'bg-rose-100 text-rose-600', category: 'Others', catColor: 'text-slate-600 bg-slate-100', size: '4.1 MB', date: 'Oct 22, 2024', time: '06:21 PM' },
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
          <SidebarItem icon={LayoutDashboard} label="Overview" href="/admin" />
          <SidebarItem icon={Users} label="Users" href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" href="/admin/memories" />
          <SidebarItem icon={FileText} label="Documents" active href="/admin/documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" href="/admin/tasks" />
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

      {}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search documents, users, files, or anything..." 
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Header Date Picker */}
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
          
          {/* Left Main Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Documents Management</h2>
                   <p className="text-[14px] text-slate-500 font-medium">View, organize and manage all user documents across Pathii.</p>
                 </div>
               </div>
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-[13px] shadow-sm shadow-blue-200 transition-colors flex items-center gap-2">
                 <CloudUpload size={18} /> Upload Document
               </button>
            </div>

            {}
            <div className="grid grid-cols-6 gap-4">
              <StatCard icon={FileText} iconColor="text-blue-600" iconBg="bg-blue-100" title="Total Documents" value="3,198" trend="16%" trendUp={true} />
              <StatCard icon={FileText} iconColor="text-red-500" iconBg="bg-red-100" title="PDF Files" value="1,124" trend="20%" trendUp={true} />
              <StatCard icon={FileText} iconColor="text-blue-500" iconBg="bg-blue-100" title="Word Documents" value="856" trend="12%" trendUp={true} />
              <StatCard icon={FileSpreadsheet} iconColor="text-emerald-500" iconBg="bg-emerald-100" title="Spreadsheets" value="428" trend="8%" trendUp={true} />
              <StatCard icon={ImageIcon} iconColor="text-amber-500" iconBg="bg-amber-100" title="Images" value="562" trend="18%" trendUp={true} />
              <StatCard icon={File} iconColor="text-purple-500" iconBg="bg-purple-100" title="Others" value="228" trend="10%" trendUp={true} />
            </div>

            {}
            <div className="grid grid-cols-[2.5fr_1fr] gap-4">
              {/* Document Trends Area Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Document Trends</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Documents uploaded over the last 30 days.</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 transition-colors">
                      This Month <ChevronDown size={14} />
                    </button>
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Documents Uploaded
                    </div>
                  </div>
                </div>
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
              </div>

              {/* Document Types Donut Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-4">Document Types</h3>
                
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
                      <span className="text-[18px] font-extrabold text-slate-900 leading-none">3,198</span>
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
              </div>
            </div>

            {}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              
              {/* Filter Row */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search documents..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  />
                </div>
                
                {['All Types', 'All Categories', 'All Users', 'Last 30 days'].map((filter, i) => (
                  <button key={i} className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                    {filter} <ChevronDown size={14} className="text-slate-400" />
                  </button>
                ))}
                
                <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[13px] font-semibold text-slate-600 flex items-center gap-2 transition-colors">
                  <Filter size={14} className="text-slate-400" /> Filter
                </button>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[12px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-4 w-10"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></th>
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
                    {documentsList.map((doc, index) => (
                      <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" /></td>
                        <td className="py-3 px-4 flex items-center gap-3 font-bold text-slate-900">
                          {getDocIcon(doc.type)}
                          {doc.name}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-medium uppercase text-[11px]">{doc.type}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 font-semibold text-slate-700">
                             {doc.uploaderAvatar ? (
                               <img src={doc.uploaderAvatar} alt={doc.uploader} className="w-6 h-6 rounded-full object-cover" />
                             ) : (
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${doc.avatarColor}`}>{doc.initials}</div>
                             )}
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
                          <button className="text-slate-400 hover:text-slate-600 p-1"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-medium text-slate-500">
                 <span>Showing 1–10 of 3,198 documents</span>
                 <div className="flex items-center gap-1">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><ChevronDown size={14} className="rotate-90" /></button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">1</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">2</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">3</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">4</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">5</button>
                   <span className="px-1 text-slate-400">...</span>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 font-semibold text-slate-700">320</button>
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
            
            {/* Storage Usage */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-[16px] font-bold text-slate-900">Storage Usage</h3>
                  <span className="text-[13px] font-semibold text-slate-500">12.6 GB of 50 GB used</span>
                </div>
                
                <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner mb-6">
                  <div className="bg-red-400 w-[33%]"></div>
                  <div className="bg-amber-400 w-[25%]"></div>
                  <div className="bg-blue-400 w-[22%]"></div>
                  <div className="bg-emerald-400 w-[13%]"></div>
                  <div className="bg-purple-400 w-[7%]"></div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { name: 'PDF Files', val: '4.2 GB', pct: '33%', color: 'bg-red-500' },
                  { name: 'Images', val: '3.1 GB', pct: '25%', color: 'bg-amber-500' },
                  { name: 'Word Documents', val: '2.8 GB', pct: '22%', color: 'bg-blue-500' },
                  { name: 'Spreadsheets', val: '1.6 GB', pct: '13%', color: 'bg-emerald-500' },
                  { name: 'Others', val: '0.9 GB', pct: '7%', color: 'bg-purple-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div> {item.name}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                      <span>{item.val}</span><span className="text-slate-400 w-8 text-right">{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Document Categories */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-[16px] font-bold text-slate-900">Top Document Categories</h3>
                 <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
               </div>
               <div className="space-y-4">
                 {[
                   { icon: GraduationCap, label: 'Academic', color: 'text-blue-600', bg: 'bg-blue-100', count: '684', pct: '(21%)' },
                   { icon: Briefcase, label: 'Work', color: 'text-amber-500', bg: 'bg-amber-100', count: '542', pct: '(17%)' },
                   { icon: User, label: 'Personal', color: 'text-rose-500', bg: 'bg-rose-100', count: '498', pct: '(16%)' },
                   { icon: Folder, label: 'Projects', color: 'text-emerald-500', bg: 'bg-emerald-100', count: '436', pct: '(14%)' },
                   { icon: BookOpen, label: 'Research', color: 'text-purple-600', bg: 'bg-purple-100', count: '398', pct: '(12%)' },
                   { icon: MoreHorizontal, label: 'Others', color: 'text-slate-500', bg: 'bg-slate-100', count: '640', pct: '(20%)' },
                 ].map((cat, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.bg} ${cat.color}`}>
                         <cat.icon size={16} />
                       </div>
                       <span className="text-[13px] font-semibold text-slate-700">{cat.label}</span>
                     </div>
                     <div className="flex items-center gap-1 text-[13px] text-slate-500 font-medium">
                       <span>{cat.count}</span> <span className="text-slate-400">{cat.pct}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Recent Document Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-bold text-slate-900">Recent Document Activity</h3>
                <button className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ArrowUpRight size={14} /></button>
              </div>

              <div className="space-y-4">
                {[
                  { icon: FileText, color: 'text-red-500', bg: 'bg-red-100', title: 'New PDF uploaded', sub: 'project-report.pdf', time: '2 min ago' },
                  { icon: Share2, color: 'text-blue-600', bg: 'bg-blue-100', title: 'Document shared', sub: 'Marketing_Strategy.docx', time: '8 min ago' },
                  { icon: ImageIcon, color: 'text-amber-500', bg: 'bg-amber-100', title: 'New image uploaded', sub: 'IMG_2456.jpg', time: '15 min ago' },
                  { icon: Trash2, color: 'text-rose-600', bg: 'bg-rose-100', title: 'Document deleted', sub: 'old_notes.pdf', time: '28 min ago' },
                  { icon: FileSpreadsheet, color: 'text-emerald-500', bg: 'bg-emerald-100', title: 'New spreadsheet uploaded', sub: 'budget_planner.xlsx', time: '42 min ago' },
                ].map((act, i) => (
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
                ))}
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