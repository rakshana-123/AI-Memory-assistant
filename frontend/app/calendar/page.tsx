"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreVertical, Plus, ChevronDown, ChevronLeft, MapPin, CheckCircle2,
  Video, Clock, RefreshCw, Sparkles
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

const calendarEvents = {
  1: [{ type: 'dot', color: 'blue', title: 'Team Standup', time: '9:00 AM' }],
  2: [{ type: 'border-pill', color: 'purple', title: 'Client Call', time: '2:00 PM' }],
  7: [{ type: 'solid-pill', color: 'rose', title: 'Research', time: '11:00 AM' }],
  9: [{ type: 'solid-pill', color: 'amber', title: 'Design Review', time: '3:00 PM' }],
  10: [{ type: 'dot', color: 'emerald', title: 'Project Review', time: '10:00 AM' }],
  11: [{ type: 'border-pill', color: 'blue', title: 'Client Call', time: '2:00 PM' }],
  14: [{ type: 'dot', color: 'emerald', title: 'Team Sync', time: '4:00 PM' }],
  16: [{ type: 'dot', color: 'purple', title: 'Workshop', time: '10:00 AM' }],
  18: [{ type: 'dot', color: 'blue', title: 'Presentation', time: '1:00 PM' }],
  21: [{ type: 'solid-pill', color: 'rose', title: 'Plan Sprint', time: '11:00 AM' }],
  23: [{ type: 'dot', color: 'emerald', title: 'Research', time: '3:00 PM' }],
  25: [{ type: 'solid-pill', color: 'amber', title: 'Doctor Appointment', time: '10:00 AM' }],
  29: [{ type: 'dot', color: 'blue', title: 'Review Notes', time: '2:00 PM' }],
  31: [{ type: 'solid-pill', color: 'purple', title: 'Team Meeting', time: '4:00 PM' }],
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* Helper function to generate calendar days array */
const generateDays = () => {
  const days = [];
  // Previous month padding (Sept 29, 30)
  days.push({ day: 29, isCurrentMonth: false });
  days.push({ day: 30, isCurrentMonth: false });
  
  // Current month (Oct 1-31)
  for (let i = 1; i <= 31; i++) {
    days.push({ day: i, isCurrentMonth: true, isToday: i === 10 });
  }
  
  // Next month padding (Nov 1, 2)
  days.push({ day: 1, isCurrentMonth: false });
  days.push({ day: 2, isCurrentMonth: false });
  
  return days;
};

const EventItem = ({ event }: any) => {
  const colorMap = {
    blue: { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-500' },
    purple: { dot: 'bg-purple-500', text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-500' },
    rose: { dot: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-500' },
    emerald: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-500' },
    amber: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-500' },
  };

  const style = (colorMap as any)[event.color];

  if (event.type === 'dot') {
    return (
      <div className="flex items-center gap-1.5 px-1.5 py-1 w-full truncate">
        <div className={`w-1.5 h-1.5 rounded-full ${style.dot} flex-shrink-0`} />
        <div className="flex flex-col overflow-hidden">
           <span className="text-[12px] font-semibold text-slate-700 leading-tight truncate">{event.title}</span>
           <span className="text-[10px] text-slate-400 font-medium leading-none">{event.time}</span>
        </div>
      </div>
    );
  }

  if (event.type === 'border-pill') {
    return (
      <div className={`flex flex-col px-2 py-1 mx-1 rounded bg-slate-50 border-l-2 ${style.border} mb-1 w-[calc(100%-8px)] truncate`}>
         <span className={`text-[11px] font-bold ${style.text} leading-tight truncate`}>{event.title}</span>
         <span className="text-[10px] text-slate-500 font-medium leading-none">{event.time}</span>
      </div>
    );
  }

  if (event.type === 'solid-pill') {
    return (
      <div className={`flex flex-col px-2 py-1 mx-1 rounded ${style.bg} mb-1 w-[calc(100%-8px)] truncate`}>
         <span className={`text-[11px] font-bold ${style.text} leading-tight truncate`}>{event.title}</span>
         <span className={`text-[10px] ${style.text} opacity-80 font-medium leading-none`}>{event.time}</span>
      </div>
    );
  }

  return null;
};

const TimelineItem = ({ time, title, subtitle, Icon, dotColor, action }: any) => (
  <div className="flex gap-4 relative">
    {/* Time Column */}
    <div className="w-16 flex-shrink-0 text-right pt-0.5">
      <span className="text-[12px] font-medium text-slate-500">{time}</span>
    </div>
    
    {/* Dot & Line */}
    <div className="relative flex flex-col items-center">
      <div className={`w-3 h-3 rounded-full z-10 border-2 border-white shadow-sm ${dotColor}`} />
    </div>

    {/* Content */}
    <div className="flex-1 pb-6 pt-0 flex justify-between items-start">
      <div>
        <h4 className="text-[14px] font-bold text-slate-900 leading-tight mb-1">{title}</h4>
        <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium">
          <Icon size={14} className="text-slate-400" />
          <span>{subtitle}</span>
        </div>
      </div>
      
      {/* Action Button */}
      {action === 'Join' && (
        <button className="bg-[#2563EB] hover:bg-blue-700 text-white text-[12px] font-bold px-3 py-1.5 rounded-full transition-colors shadow-sm">
          Join
        </button>
      )}
      {action === 'In 1h' && (
        <span className="bg-emerald-50 text-emerald-600 text-[12px] font-bold px-3 py-1.5 rounded-full border border-emerald-100">
          In 1h
        </span>
      )}
      {action === 'In 3h' && (
        <span className="bg-amber-50 text-amber-600 text-[12px] font-bold px-3 py-1.5 rounded-full border border-amber-100">
          In 3h
        </span>
      )}
    </div>
  </div>
);


export default function PathiiCalendarDashboard() {
  const days = generateDays();

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
          <SidebarItem icon={CalendarIcon} label="Calendar" active href="/calendar" />
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

      { }
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F7F9]">
        
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-full max-w-[520px] lg:w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search your memories, tasks, documents..."
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-shrink-0">
            <button className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#F43F5E] border-2 border-[#F4F7F9] rounded-full flex items-center justify-center text-[8px] font-bold text-white">2</span>
            </button>
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-9 h-9 rounded-full object-cover shadow-sm cursor-pointer border border-slate-200" />
          </div>
        </header>

        {/* Two Column Layout Container */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6 max-lg:flex-col">
          
          {}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            
            {/* Header Hero */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex items-center justify-between mb-6 flex-shrink-0 max-lg:flex-col max-lg:items-start max-lg:gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#2563EB] mb-2">
                   <CalendarIcon size={20} />
                   <span className="font-bold text-[14px]">Calendar</span>
                </div>
                <h2 className="text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">Your Schedule</h2>
                <p className="text-[15px] text-slate-500 font-medium">Stay on top of your meetings, tasks and important events.</p>
              </div>
              <div className="bg-slate-100 p-1 rounded-full flex items-center">
                 <button className="px-5 py-2 rounded-full bg-[#2563EB] text-white text-[13px] font-bold shadow-sm">Month</button>
                 <button className="px-5 py-2 rounded-full text-slate-600 hover:text-slate-900 text-[13px] font-semibold transition-colors">Week</button>
                 <button className="px-5 py-2 rounded-full text-slate-600 hover:text-slate-900 text-[13px] font-semibold transition-colors">Day</button>
              </div>
            </div>

            {/* Calendar Main Component */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
              
              {/* Calendar Controls */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between max-lg:flex-wrap max-lg:gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
                      <ChevronLeft size={20} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <h3 className="text-[18px] font-bold text-slate-900">October 2024</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 text-[13px] font-bold rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                    Today
                  </button>
                  <button className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                    <CalendarIcon size={18} />
                  </button>
                </div>
              </div>

              {/* Grid Header (Days) */}
              <div className="grid grid-cols-7 border-b border-slate-100">
                {daysOfWeek.map((day) => (
                  <div key={day} className="py-3 text-center text-[12px] font-bold text-slate-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-slate-50 gap-px border-l border-slate-100 overflow-y-auto custom-scrollbar">
                {days.map((d, index) => {
                  const events = (calendarEvents as any)[d.day] || [];
                  // Only show events if it's the current month (or adjust logic if you want prev month events shown)
                  const displayEvents = d.isCurrentMonth ? events : [];

                  return (
                    <div 
                      key={index} 
                      className={`bg-white p-1.5 min-h-[90px] flex flex-col relative group ${!d.isCurrentMonth ? 'text-slate-400 bg-slate-50/50' : 'text-slate-700'}`}
                    >
                      <div className="flex justify-start mb-1 px-1">
                        <span className={`text-[13px] font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                          d.isToday ? 'bg-[#2563EB] text-white shadow-sm' : ''
                        }`}>
                          {d.day}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col gap-[2px] overflow-hidden">
                        {displayEvents.map((event: any, i: any) => (
                          <EventItem key={i} event={event} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {}
            <div className="flex gap-4 mt-6 flex-shrink-0 max-lg:flex-col">
              {/* Total Events */}
              <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon size={24} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-500 mb-0.5">Total Events</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[24px] font-extrabold text-slate-900 leading-none">12</span>
                    <span className="text-[12px] font-bold text-emerald-500 flex items-center gap-0.5"><ArrowUpIcon size={12} /> 20%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">vs last month</p>
                </div>
              </div>

              {/* Upcoming */}
              <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-500 mb-0.5">Upcoming</p>
                  <span className="text-[24px] font-extrabold text-slate-900 leading-none block">4</span>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">in next 7 days</p>
                </div>
              </div>

              {/* Completed */}
              <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-500 mb-0.5">Completed</p>
                  <span className="text-[24px] font-extrabold text-slate-900 leading-none block">8</span>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">this month</p>
                </div>
              </div>
            </div>

          </div>

          {}
          <div className="w-[340px] flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full max-lg:w-full">
            
            {/* Today's Schedule Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight">Today's Schedule</h3>
                <span className="text-[13px] font-semibold text-slate-500">Oct 10, 2024</span>
              </div>

              {/* Timeline Container */}
              <div className="relative pl-1">
                {/* Vertical Line */}
                <div className="absolute left-[70px] top-2 bottom-6 w-px bg-slate-200 z-0"></div>
                
                <div className="flex flex-col z-10 relative">
                  <TimelineItem 
                    time="09:00 AM" title="Team Standup" subtitle="Google Meet" Icon={Video} dotColor="bg-blue-500" action="Join" 
                  />
                  <TimelineItem 
                    time="11:00 AM" title="Client Call" subtitle="Zoom Meeting" Icon={Video} dotColor="bg-purple-500" action="Join" 
                  />
                  <TimelineItem 
                    time="02:00 PM" title="Project Review" subtitle="Meeting Room A" Icon={MapPin} dotColor="bg-emerald-500" action="In 1h" 
                  />
                  <TimelineItem 
                    time="04:00 PM" title="Research Discussion" subtitle="Google Meet" Icon={Video} dotColor="bg-amber-500" action="In 3h" 
                  />
                </div>
              </div>
            </div>

            {/* Next Event Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={16} className="text-[#2563EB]" />
                  <h3 className="text-[14px] font-bold text-slate-900">Next Event</h3>
                </div>
                <button className="text-[12px] font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">
                  View all <ChevronRight size={14} />
                </button>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm mt-0.5">
                      <CalendarIcon size={16} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900 leading-snug">Project Review</h4>
                      <p className="text-[12px] text-slate-500 font-medium">10:00 AM – 11:00 AM</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={16}/></button>
                </div>
                
                <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium mt-3 ml-11">
                  <MapPin size={14} className="text-slate-400" />
                  <span>Meeting Room A</span>
                </div>

                <button className="mt-4 w-full bg-white border border-blue-200 text-[#2563EB] hover:bg-blue-50 font-bold text-[13px] py-2 rounded-lg transition-colors shadow-sm">
                  Open in Calendar
                </button>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight mb-5">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors border border-blue-100/50">
                    <CalendarIcon size={20} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">Add Event</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors border border-emerald-100/50">
                    <CheckSquare size={20} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">Add Task</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 transition-colors border border-purple-100/50">
                    <Search size={20} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">Search</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-100 transition-colors border border-sky-100/50">
                    <RefreshCw size={20} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">Sync</span>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[24px] border border-blue-100/50 p-6 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="url(#paint0_linear)" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4F46E5" />
                      <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-2 relative z-10 text-[#4338CA]">
                <Sparkles size={18} />
                <h4 className="text-[14px] font-bold">Better planning, bigger dreams</h4>
              </div>
              <p className="text-[12px] text-slate-600 font-medium relative z-10 leading-relaxed pr-4">
                Your calendar, your way. Pathii helps you balance today and tomorrow.
              </p>
            </div>

          </div>

        </div>
      </main>

      {}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
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

// Helper Arrow Icon for metrics
const ArrowUpIcon = ({ size }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);
