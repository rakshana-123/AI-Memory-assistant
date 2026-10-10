"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreVertical, Plus, ChevronDown, Clock, ArrowUp, ArrowDown,
  CheckCircle2, Video, MapPin, Check, Sparkles, Bell as BellIcon
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

const tasksData = [
  {
    id: 1,
    title: 'Prepare project presentation',
    date: 'Today, 2:00 PM',
    category: 'College',
    categoryColor: 'blue',
    priority: 'High',
    priorityColor: 'red',
    icon: 'calendar',
    iconColor: 'pink',
    completed: false
  },
  {
    id: 2,
    title: 'Follow up with Sarah',
    date: 'Tomorrow, 10:00 AM',
    category: 'Meeting',
    categoryColor: 'purple',
    priority: 'Medium',
    priorityColor: 'orange',
    icon: 'document',
    iconColor: 'purple',
    completed: false
  },
  {
    id: 3,
    title: 'Review research paper',
    date: 'Oct 16, 2024',
    category: 'Research',
    categoryColor: 'green',
    priority: 'Medium',
    priorityColor: 'orange',
    icon: 'excel',
    iconColor: 'green',
    completed: false
  },
  {
    id: 4,
    title: 'Book travel tickets',
    date: 'Oct 10, 2024',
    category: 'Personal',
    categoryColor: 'red',
    priority: 'Low',
    priorityColor: 'blue',
    icon: 'document',
    iconColor: 'cyan',
    completed: true
  },
  {
    id: 5,
    title: 'Organize project files',
    date: 'Oct 17, 2024',
    category: 'Work',
    categoryColor: 'blue',
    priority: 'Low',
    priorityColor: 'blue',
    icon: 'folder',
    iconColor: 'purple',
    completed: false
  }
];

const timelineData = [
  { time: '09:00 AM', title: 'Team Standup', location: 'Google Meet', type: 'video', status: 'Join', statusType: 'primary', color: 'bg-blue-500' },
  { time: '11:00 AM', title: 'Client Call', location: 'Zoom Meeting', type: 'video', status: 'Join', statusType: 'secondary', color: 'bg-purple-500' },
  { time: '02:00 PM', title: 'Project Review', location: 'Meeting Room A', type: 'location', status: 'In 1h', statusType: 'success', color: 'bg-green-500' },
  { time: '04:00 PM', title: 'Research Discussion', location: 'Google Meet', type: 'video', status: 'In 3h', statusType: 'warning', color: 'bg-orange-500' },
  { time: '07:00 PM', title: 'Plan Tomorrow', location: 'Personal', type: 'document', status: 'Later', statusType: 'neutral', color: 'bg-slate-400' },
];

const CategoryTag = ({ text, color }: any) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-rose-50 text-rose-600',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${(styles as any)[color] || styles.blue}`}>
      {text}
    </span>
  );
};

const PriorityBadge = ({ text, color }: any) => {
  const styles = {
    red: 'bg-rose-50 text-rose-600',
    orange: 'bg-orange-50 text-orange-500',
    blue: 'bg-blue-50 text-blue-600',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${(styles as any)[color] || styles.blue}`}>
      {text}
    </span>
  );
};

const getIcon = (type: any, color: any) => {
  const baseClasses = "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0";
  const colors = {
    pink: 'bg-pink-50 text-pink-500',
    purple: 'bg-purple-50 text-purple-500',
    green: 'bg-green-50 text-green-500',
    cyan: 'bg-cyan-50 text-cyan-500',
  };
  const colorClass = (colors as any)[color] || colors.pink;

  return (
    <div className={`${baseClasses} ${colorClass}`}>
      {type === 'calendar' && <CalendarIcon size={16} />}
      {(type === 'document' || type === 'folder') && <FileText size={16} />}
      {type === 'excel' && <FileText size={16} />} 
    </div>
  );
};

export default function PathiiTasksDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [tasks, setTasks] = useState(tasksData);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === 'All' ||
      activeFilter === 'Draggable style' ||
      (activeFilter === 'Events' && task.icon === 'calendar') ||
      (activeFilter === 'Reminders' && task.icon !== 'calendar');
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
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
          <SidebarItem icon={CheckSquare} label="Tasks & Schedule" active href="/tasks" />
          <SidebarItem icon={CalendarIcon} label="Calendar" href="/calendar" />
          <SidebarItem icon={FileText} label="Documents" href="/documents" />
          <SidebarItem icon={Users} label="People" href="/people" />
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
          <div className="relative w-full max-w-[480px] lg:w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search tasks, events or ask anything..."
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

        {/* Content Body */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6 max-lg:flex-col">
          
          {/* Left Column (Main) */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar pr-2">
            
            {/* Page Title & Button */}
            <div className="flex items-center justify-between mb-6 mt-2 max-lg:flex-col max-lg:items-start max-lg:gap-4">
              <div>
                <h2 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight mb-1">Tasks & Schedule</h2>
                <p className="text-[15px] text-slate-500 font-medium">Turn your thoughts into actions. Stay organized.</p>
              </div>
              <div className="flex shadow-sm rounded-lg overflow-hidden">
                <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2.5 text-[14px] font-semibold flex items-center gap-2 transition-colors border-r border-blue-600/50">
                  <Plus size={18} /> Add Task
                </button>
                <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-3 py-2.5 transition-colors">
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Total Tasks */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[#2563EB]">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white">
                    <Check size={18} strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-slate-900 leading-none mb-1">8</h3>
                  <p className="text-[13px] text-slate-500 font-medium mb-2">Total Tasks</p>
                  <p className="text-[12px] font-bold text-green-600 flex items-center gap-1">
                    <ArrowUp size={12} strokeWidth={3} /> 2 new
                  </p>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0 text-rose-500">
                  <CalendarIcon size={24} />
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-slate-900 leading-none mb-1">3</h3>
                  <p className="text-[13px] text-slate-500 font-medium mb-2">Upcoming Events</p>
                  <p className="text-[12px] font-bold text-rose-500 flex items-center gap-1">
                    <ArrowDown size={12} strokeWidth={3} /> Today
                  </p>
                </div>
              </div>

              {/* Pending Tasks */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-500">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-slate-900 leading-none mb-1">5</h3>
                  <p className="text-[13px] text-slate-500 font-medium mb-2">Pending Tasks</p>
                  <p className="text-[12px] font-bold text-orange-500">Need attention</p>
                </div>
              </div>

              {/* Completed */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-500">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-slate-900 leading-none mb-1">3</h3>
                  <p className="text-[13px] text-slate-500 font-medium mb-2">Completed</p>
                  <p className="text-[12px] font-bold text-green-500">This week</p>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between mb-4 max-lg:flex-col max-lg:items-start max-lg:gap-4">
              <div className="flex items-center gap-2 max-lg:flex-wrap">
                {['All', 'Events', 'Reminders', 'Draggable style'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                      activeFilter === filter
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                <Clock size={14} className="text-slate-500" />
                Due Date
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>

            {/* Task List */}
            <div className="flex flex-col gap-3 mb-8">
              {visibleTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-slate-100 group hover:border-[#2563EB]/30 transition-colors max-lg:flex-wrap max-lg:gap-y-3">
                  <div className="flex items-center gap-4 max-lg:min-w-0">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-[22px] h-[22px] rounded-full border-[2px] flex items-center justify-center transition-colors ${task.completed ? 'bg-[#2563EB] border-[#2563EB]' : 'border-slate-300 group-hover:border-[#2563EB]'}`}
                    >
                      {task.completed && <Check size={14} strokeWidth={3} className="text-white" />}
                    </button>
                    
                    {/* Icon */}
                    {getIcon(task.icon, task.iconColor)}

                    {/* Title & Date */}
                    <div className="max-lg:min-w-0">
                      <h4 className="text-[15px] font-bold text-slate-900 mb-0.5">{task.title}</h4>
                      <p className="text-[13px] text-slate-500 font-medium flex items-center gap-1.5">
                        <Clock size={12} /> {task.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 max-lg:gap-3">
                    <CategoryTag text={task.category} color={task.categoryColor} />
                    <div className="w-[80px] flex justify-end">
                      <PriorityBadge text={task.priority} color={task.priorityColor} />
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
              {/* Quick Add */}
              <div>
                <h3 className="text-[18px] font-bold text-slate-900 mb-4">Quick Add</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] group-hover:scale-110 transition-transform">
                      <div className="w-6 h-6 rounded-full border-[2.5px] border-current flex items-center justify-center">
                         <Check size={14} strokeWidth={3} />
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Task</span>
                  </button>
                  
                  <button className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                      <CalendarIcon size={22} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Event</span>
                  </button>

                  <button className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                      <BellIcon size={22} fill="currentColor" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Reminder</span>
                  </button>

                  <button className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                      <FileText size={22} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700">Note</span>
                  </button>
                </div>
              </div>

              {/* AI Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles size={20} className="text-[#8B5CF6]" /> AI Suggestions
                  </h3>
                  <button className="text-[#2563EB] text-[13px] font-bold flex items-center gap-1 hover:underline">
                    See all <ChevronRight size={14} strokeWidth={3} />
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white flex-shrink-0">
                        <Check size={18} strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">Create a task from your last voice note</h4>
                        <p className="text-[13px] text-slate-500 italic">"Prepare meeting agenda"</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-600" />
                  </div>
                  
                  <div className="w-full h-px bg-slate-100 my-1"></div>

                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                        <CalendarIcon size={20} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">Add this to calendar</h4>
                        <p className="text-[13px] text-slate-500 italic">"Team sync tomorrow at 10 AM"</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-600" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="w-[420px] bg-white rounded-[32px] border border-slate-200 shadow-sm flex flex-col flex-shrink-0 h-full overflow-y-auto custom-scrollbar max-lg:w-full">
            <div className="p-8">
              
              {/* Calendar Widget */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[20px] font-bold text-slate-900">October 2024</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><ChevronRight size={20} className="rotate-180" /></button>
                    <button className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-600"><ChevronRight size={20} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-y-4 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-[12px] font-semibold text-slate-500 mb-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty Days */}
                  <div className="text-center text-[14px] font-medium text-slate-300 py-1">29</div>
                  <div className="text-center text-[14px] font-medium text-slate-300 py-1">30</div>
                  
                  {/* First week */}
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    1
                    <div className="flex gap-0.5 mt-1"><div className="w-1 h-1 rounded-full bg-orange-400"></div></div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    2
                    <div className="flex gap-0.5 mt-1"><div className="w-1 h-1 rounded-full bg-[#2563EB]"></div></div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    3
                    <div className="flex gap-0.5 mt-1"><div className="w-1 h-1 rounded-full bg-[#2563EB]"></div></div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    4
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    5
                  </div>

                  {/* Second week */}
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">6</div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">7</div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    8
                    <div className="flex gap-0.5 mt-1"><div className="w-1 h-1 rounded-full bg-orange-400"></div></div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    9
                    <div className="flex gap-0.5 mt-1">
                      <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                      <div className="w-1 h-1 rounded-full bg-[#2563EB]"></div>
                    </div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    10
                    <div className="flex gap-0.5 mt-1">
                      <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                      <div className="w-1 h-1 rounded-full bg-[#2563EB]"></div>
                    </div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    11
                    <div className="flex gap-0.5 mt-1"><div className="w-1 h-1 rounded-full bg-orange-400"></div></div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">12</div>

                  {/* Third week */}
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">13</div>
                  <div className="text-center text-[14px] font-bold text-white bg-[#2563EB] rounded-full w-8 h-8 mx-auto flex flex-col items-center justify-center relative">
                    14
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    15
                    <div className="flex gap-0.5 mt-1">
                      <div className="w-1 h-1 rounded-full bg-green-500"></div>
                      <div className="w-1 h-1 rounded-full bg-[#2563EB]"></div>
                    </div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    16
                    <div className="flex gap-0.5 mt-1"><div className="w-1 h-1 rounded-full bg-pink-400"></div></div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    17
                    <div className="flex gap-0.5 mt-1"><div className="w-1 h-1 rounded-full bg-green-500"></div></div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                    18
                    <div className="flex gap-0.5 mt-1">
                       <div className="w-1 h-1 rounded-full bg-orange-400"></div>
                       <div className="w-1 h-1 rounded-full bg-[#2563EB]"></div>
                    </div>
                  </div>
                  <div className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">19</div>

                  {/* Rest of the month */}
                  {[20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(d => (
                    <div key={d} className="text-center text-[14px] font-bold text-slate-700 py-1 flex flex-col items-center">
                      {d}
                    </div>
                  ))}
                  <div className="text-center text-[14px] font-medium text-slate-300 py-1">1</div>
                  <div className="text-center text-[14px] font-medium text-slate-300 py-1">2</div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[18px] font-bold text-slate-900">Today's Schedule</h3>
                  <span className="text-[13px] font-semibold text-[#2563EB]">Mon, Oct 14, 2024</span>
                </div>

                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[78px] top-2 bottom-4 w-px bg-slate-200"></div>

                  <div className="space-y-8 relative">
                    {timelineData.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-[64px] text-right pt-0.5">
                          <span className="text-[13px] font-semibold text-slate-500">{item.time}</span>
                        </div>
                        
                        <div className="relative pt-1.5 z-10">
                          <div className={`w-[11px] h-[11px] rounded-full ${item.color} ring-[6px] ring-white`}></div>
                        </div>

                        <div className="flex-1 flex items-start justify-between bg-white pl-2">
                          <div>
                            <h4 className="text-[15px] font-bold text-slate-900 mb-1">{item.title}</h4>
                            <p className="text-[13px] text-slate-500 font-medium flex items-center gap-1.5">
                              {item.type === 'video' && <Video size={14} className="text-slate-400" />}
                              {item.type === 'location' && <MapPin size={14} className="text-slate-400" />}
                              {item.type === 'document' && <FileText size={14} className="text-slate-400" />}
                              {item.location}
                            </p>
                          </div>
                          
                          {/* Dynamic Status Button */}
                          <div>
                            {item.statusType === 'primary' && (
                              <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors">
                                {item.status}
                              </button>
                            )}
                            {item.statusType === 'secondary' && (
                              <button className="bg-blue-50 text-[#2563EB] hover:bg-blue-100 px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors">
                                {item.status}
                              </button>
                            )}
                            {item.statusType === 'success' && (
                              <div className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[13px] font-bold">
                                {item.status}
                              </div>
                            )}
                            {item.statusType === 'warning' && (
                              <div className="bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full text-[13px] font-bold">
                                {item.status}
                              </div>
                            )}
                            {item.statusType === 'neutral' && (
                              <div className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-[13px] font-bold">
                                {item.status}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
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
