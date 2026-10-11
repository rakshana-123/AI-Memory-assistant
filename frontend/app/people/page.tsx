"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreHorizontal, Plus, ChevronDown, ChevronLeft, MapPin, CheckCircle2,
  Video, Clock, RefreshCw, Sparkles, Mail, Phone, Edit2, UserPlus, File, MessageSquare, Calendar
} from 'lucide-react';

const BrainLogo = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    <path d="M12 4.5V19.5" />
    <path d="M9.5 12H12" />
    <path d="M14.5 12H12" />
    <path d="M10.5 8H12" />
    <path d="M13.5 8H12" />
    <path d="M10.5 16H12" />
    <path d="M13.5 16H12" />
  </svg>
);

const SidebarItem = ({ icon: Icon, label, active, href }: any) => (
  <NextLink href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-100 font-medium'}`}>
    <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
    <span className="text-[14px]">{label}</span>
  </NextLink>
);

const peopleData = [
  { id: 1, name: 'Sarah', role: 'College Friend', type: 'image', img: 'https://i.pravatar.cc/150?img=47', tags: [{label: 'Friend', color: 'blue'}, {label: 'College', color: 'purple'}] },
  { id: 2, name: 'Arun', role: 'Project Partner', type: 'image', img: 'https://i.pravatar.cc/150?img=11', tags: [{label: 'Team', color: 'emerald'}, {label: 'Work', color: 'blue'}] },
  { id: 3, name: 'Rakshana', role: 'Co-founder', type: 'initials', initials: 'RK', bg: 'bg-purple-100 text-purple-600', tags: [{label: 'Partner', color: 'rose'}, {label: 'Work', color: 'blue'}] },
  { id: 4, name: 'Vikram', role: 'Mentor', type: 'image', img: 'https://i.pravatar.cc/150?img=12', tags: [{label: 'Mentor', color: 'amber'}, {label: 'Work', color: 'blue'}] },
  { id: 5, name: 'John Doe', role: 'Client', type: 'initials', initials: 'JD', bg: 'bg-rose-100 text-rose-600', tags: [{label: 'Client', color: 'emerald'}, {label: 'Work', color: 'blue'}] },
  { id: 6, name: 'Priya', role: 'Classmate', type: 'image', img: 'https://i.pravatar.cc/150?img=42', tags: [{label: 'Classmate', color: 'purple'}, {label: 'College', color: 'purple'}] },
  { id: 7, name: 'Karthik', role: 'Teammate', type: 'initials', initials: 'KS', bg: 'bg-emerald-100 text-emerald-600', tags: [{label: 'Team', color: 'emerald'}, {label: 'Project', color: 'blue'}] },
  { id: 8, name: 'Meena', role: 'Internship Guide', type: 'image', img: 'https://i.pravatar.cc/150?img=45', tags: [{label: 'Guide', color: 'amber'}, {label: 'Internship', color: 'rose'}] },
  { id: 9, name: 'Ananya', role: 'Friend', type: 'initials', initials: 'AS', bg: 'bg-purple-100 text-purple-600', tags: [{label: 'Friend', color: 'blue'}, {label: 'Personal', color: 'rose'}] },
];

const upcomingEvents = [
  { id: 1, name: 'Project Review with Arun', time: 'Today, 2:00 PM', img: 'https://i.pravatar.cc/150?img=11', type: 'Meeting', badgeColor: 'bg-blue-50 text-blue-600' },
  { id: 2, name: 'Product Discussion with Rakshana', time: 'Tomorrow, 10:00 AM', initials: 'RK', bg: 'bg-purple-100 text-purple-600', type: 'Meeting', badgeColor: 'bg-blue-50 text-blue-600' },
  { id: 3, name: 'Team Sync with Priya', time: 'Oct 16, 2024, 4:00 PM', img: 'https://i.pravatar.cc/150?img=42', type: 'Meeting', badgeColor: 'bg-blue-50 text-blue-600' },
  { id: 4, name: 'Mentor Call with Vikram', time: 'Oct 18, 2024, 11:00 AM', img: 'https://i.pravatar.cc/150?img=12', type: 'Call', badgeColor: 'bg-emerald-50 text-emerald-600' },
];

const filterTabs = ['All', 'Friends', 'Family', 'Team', 'Work', 'Clients', 'Classmates', 'Others'];

const tabToTagMap: Record<string, string> = {
  Friends: 'Friend',
  Family: 'Family',
  Team: 'Team',
  Work: 'Work',
  Clients: 'Client',
  Classmates: 'Classmate',
  Others: 'Other',
};

const Tag = ({ label, color }: any) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${(styles as any)[color] || styles.blue}`}>
      {label}
    </span>
  );
};

const Avatar = ({ person, size = 'md' }: any) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-[12px]',
    md: 'w-12 h-12 text-[16px]',
    lg: 'w-20 h-20 text-[24px]',
  };
  
  if (person.img) {
    return <img src={person.img} alt={person.name || 'Avatar'} className={`${(sizeClasses as any)[size]} rounded-full object-cover shadow-sm`} />;
  }
  return (
    <div className={`${(sizeClasses as any)[size]} rounded-full flex items-center justify-center font-bold shadow-sm ${person.bg}`}>
      {person.initials}
    </div>
  );
};

export default function PathiiPeopleDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const visiblePeople = peopleData.filter((person) => {
    const matchesFilter =
      activeTab === 'All' ||
      person.tags.some((tag) => tag.label === tabToTagMap[activeTab]);
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen lg:h-screen bg-[#F4F7F9] font-sans lg:overflow-hidden text-slate-900 antialiased selection:bg-blue-100">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#F8FAFC] flex flex-col flex-shrink-0 border-r border-slate-200/60 z-10">
        <div className="flex items-center gap-3 pt-6 pb-8 px-6">
          <div className="text-[#2563EB]">
            <BrainLogo className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight">Pathii</h1>
            <p className="text-[12px] text-slate-500 font-medium">AI Memory Assistant</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
          <SidebarItem icon={Home} label="Dashboard" href="/" />
          <SidebarItem icon={Mic} label="Voice Capture" href="/voice-capture" />
          <SidebarItem icon={Database} label="Memories" href="/memories" />
          <SidebarItem icon={CheckSquare} label="Tasks & Schedule" href="/tasks" />
          <SidebarItem icon={CalendarIcon} label="Calendar" href="/calendar" />
          <SidebarItem icon={FileText} label="Documents" href="/documents" />
          <SidebarItem icon={Users} label="People" active href="/people" />
          <SidebarItem icon={LinkIcon} label="Integrations" href="/integrations" />
          <SidebarItem icon={BarChart2} label="Insights" href="/insights" />
          <SidebarItem icon={Settings} label="Settings" href="/settings" />
        </nav>

        <div className="p-4 border-t border-slate-200/60 mt-auto">
          <div className="flex items-center justify-between cursor-pointer hover:bg-slate-100 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=11" alt="Alex" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Alex</p>
                <p className="text-[12px] text-slate-500 font-medium leading-none">Free Plan</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F7F9]">
        
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-full max-w-[520px] lg:w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search people, conversations, meetings, or notes..."
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-shrink-0">
            <button className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#F43F5E] border-2 border-[#F4F7F9] rounded-full flex items-center justify-center text-[8px] font-bold text-white">1</span>
            </button>
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-9 h-9 rounded-full object-cover shadow-sm cursor-pointer border border-slate-200" />
          </div>
        </header>

        {/* Layout Container */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6 max-lg:flex-col">

          {/* Left Main Panel */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar pr-2 pb-2">

            {/* Hero Header */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex items-center justify-between mb-6 flex-shrink-0 max-lg:flex-wrap max-lg:gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2563EB]">
                   <Users size={28} />
                </div>
                <div>
                  <h2 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">People</h2>
                  <p className="text-[14px] text-slate-500 font-medium">Your important people, conversations and relationships in one place.</p>
                </div>
              </div>
              <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm flex items-center gap-2">
                <Plus size={18} />
                Add Person
              </button>
            </div>

            {/* Filters Row */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0 max-lg:flex-col max-lg:items-start max-lg:gap-4">
               <div className="flex flex-wrap gap-2">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-[13px] font-bold transition-colors shadow-sm ${
                        activeTab === tab
                        ? 'bg-[#2563EB] text-white border border-[#2563EB]'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      >
                      {tab}
                    </button>
                  ))}
               </div>
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                  <span className="flex items-center gap-1"><ArrowUpIcon size={14} className="transform rotate-180 text-slate-400" /> A-Z</span>
                  <ChevronDown size={14} className="text-slate-400" />
               </button>
            </div>

            {/* Grid of People */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
               {visiblePeople.map((person) => (
                 <div key={person.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group">
                    <button className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                       <Avatar person={person} size="md" />
                       <div>
                         <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-0.5">{person.name}</h3>
                         <p className="text-[12px] text-slate-500 font-medium">{person.role}</p>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {person.tags.map((tag, idx) => (
                         <Tag key={idx} label={tag.label} color={tag.color} />
                       ))}
                    </div>
                 </div>
               ))}
            </div>

            {/* Bottom Row */}
            <div className="flex gap-6 flex-shrink-0 max-lg:flex-col">
               
               {/* Upcoming with People */}
               <div className="flex-1 bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={18} className="text-[#2563EB]" />
                      <h3 className="text-[16px] font-bold text-slate-900">Upcoming with People</h3>
                    </div>
                    <button className="text-[13px] font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {upcomingEvents.map((ev, idx) => (
                      <div key={idx} className="flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                           <Avatar person={ev} size="sm" />
                           <div>
                             <h4 className="text-[14px] font-bold text-slate-900 leading-tight">{ev.name}</h4>
                             <div className="flex items-center gap-1 text-[12px] text-slate-500 mt-0.5 font-medium">
                               <CalendarIcon size={12} className="text-slate-400" />
                               {ev.time}
                             </div>
                           </div>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${ev.badgeColor}`}>
                             {ev.type}
                           </span>
                           <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                             <MoreHorizontal size={16} />
                           </button>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Quick Add Actions */}
               <div className="flex-1 bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 mb-5">
                    <Plus size={18} className="text-[#2563EB]" />
                    <h3 className="text-[16px] font-bold text-slate-900">Quick Add</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                     
                     <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                           <UserPlus size={18} />
                         </div>
                         <div>
                           <h4 className="text-[14px] font-bold text-slate-900 leading-tight">Add Contact</h4>
                           <p className="text-[12px] text-slate-500 font-medium">Save a new person</p>
                         </div>
                       </div>
                       <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                     </div>

                     <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                           <Calendar size={18} />
                         </div>
                         <div>
                           <h4 className="text-[14px] font-bold text-slate-900 leading-tight">Add Meeting</h4>
                           <p className="text-[12px] text-slate-500 font-medium">Schedule a meeting</p>
                         </div>
                       </div>
                       <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                     </div>

                     <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                           <FileText size={18} />
                         </div>
                         <div>
                           <h4 className="text-[14px] font-bold text-slate-900 leading-tight">Add Note</h4>
                           <p className="text-[12px] text-slate-500 font-medium">Write a note about this person</p>
                         </div>
                       </div>
                       <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                     </div>

                     <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                           <File size={18} />
                         </div>
                         <div>
                           <h4 className="text-[14px] font-bold text-slate-900 leading-tight">Add Document</h4>
                           <p className="text-[12px] text-slate-500 font-medium">Attach a file or reference</p>
                         </div>
                       </div>
                       <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                     </div>

                  </div>
               </div>

            </div>
          </div>

          {/* Right Inspector Panel */}
          <div className="w-[340px] flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full max-lg:w-full">
            
            {/* Profile Detail Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative">
              <button className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-colors border border-slate-100">
                <Edit2 size={12} /> Edit
              </button>
              
              <div className="flex items-start gap-4 mb-5">
                <Avatar person={peopleData[0]} size="lg" />
                <div className="pt-2">
                  <h3 className="text-[20px] font-extrabold text-slate-900 leading-tight mb-1">Sarah</h3>
                  <p className="text-[13px] text-slate-500 font-medium">College Friend</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-[13px] text-slate-600 font-medium">
                  <Mail size={16} className="text-slate-400" />
                  <span>sarah@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-slate-600 font-medium">
                  <Phone size={16} className="text-slate-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-slate-600 font-medium">
                  <MapPin size={16} className="text-slate-400" />
                  <span>Chennai, India</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100">
                 <Tag label="Friend" color="blue" />
                 <Tag label="College" color="purple" />
                 <Tag label="Project" color="blue" />
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#6366F1]">
                  <Sparkles size={18} />
                  <h3 className="text-[15px] font-bold text-slate-900">AI Summary</h3>
                </div>
                <button className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors border border-slate-100">
                  <Edit2 size={10} /> Edit
                </button>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 text-[13px] text-slate-600 leading-relaxed">
                Sarah is a close friend from college. We often discuss project ideas, share study notes and plan events together. She is also interested in AI and design.
              </div>
            </div>

            {/* Recent Interactions Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#2563EB]" />
                  <h3 className="text-[15px] font-bold text-slate-900">Recent Interactions</h3>
                </div>
                <button className="text-[12px] font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">
                  View all <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mic size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900">Voice Note</h4>
                      <p className="text-[12px] text-slate-500 font-medium">Project idea discussion</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">Oct 10, 2024</span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900">Document</h4>
                      <p className="text-[12px] text-slate-500 font-medium">Shared design reference</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">Oct 8, 2024</span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900">Meeting</h4>
                      <p className="text-[12px] text-slate-500 font-medium">College event planning</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">Oct 5, 2024</span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900">Chat Note</h4>
                      <p className="text-[12px] text-slate-500 font-medium">Discussed internship opportunities</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">Oct 1, 2024</span>
                </div>
              </div>
            </div>

            {/* Related Items Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <LinkIcon size={16} className="text-slate-500" />
                <h3 className="text-[15px] font-bold text-slate-900">Related Items</h3>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                      <BrainLogo className="w-4 h-4" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Memories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-slate-900">12</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-slate-900">5</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Tasks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-slate-900">3</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Calendar Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-slate-900">4</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Global Styles for Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
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

// Arrow Icon helper
const ArrowUpIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);
