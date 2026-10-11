"use client";
import NextLink from "next/link";
import React from 'react';
import {
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar,
  FileText, Users, Link, BarChart2, Settings, ChevronRight,
  MoreVertical, TrendingUp, TrendingDown,
  ArrowRight, Circle, CheckCircle2
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
  <NextLink href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#E5EFFF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <Icon size={20} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
    <span className="text-[14.5px]">{label}</span>
  </NextLink>
);

const StatCard = ({ icon: Icon, iconBg, iconColor, value, label, trend, trendUp }: any) => (
  <div className="bg-white p-5 rounded-[20px] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex items-center gap-5">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon size={26} className={iconColor} strokeWidth={2.5} />
    </div>
    <div className="flex flex-col">
      <h3 className="text-[26px] font-bold text-slate-900 leading-none">{value}</h3>
      <p className="text-[13px] text-slate-500 mt-1.5 mb-1.5 font-medium">{label}</p>
      {trend && (
        <div className={`flex items-center gap-1 text-[12px] font-semibold ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trendUp ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
          <span>{trend}</span>
        </div>
      )}
    </div>
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

const MemoryItem = ({ icon: Icon, iconBg, iconColor, title, subtitle, time, actionIcon: ActionIcon, isPlay, onRowClick, onActionClick }: any) => (
  <div onClick={onRowClick} className="flex items-center justify-between py-3.5 border-b border-slate-100/60 last:border-0 hover:bg-slate-50/50 -mx-4 px-4 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={22} className={iconColor} strokeWidth={2} />
      </div>
      <div>
        <p className="text-[14.5px] font-semibold text-slate-900 leading-tight">{title}</p>
        <p className="text-[13px] text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-[13px] text-slate-400 font-medium">{time}</span>
      <button onClick={(e) => { e.stopPropagation(); onActionClick(); }} className={`flex items-center justify-center transition-colors ${isPlay ? 'w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>
        <ActionIcon size={isPlay ? 14 : 18} fill={isPlay ? "currentColor" : "none"} strokeWidth={isPlay ? 0 : 2} />
      </button>
    </div>
  </div>
);

const TaskItem = ({ title, subtitle, priority, priorityColor, onRowClick, onMoreClick }: any) => (
  <div onClick={onRowClick} className="flex items-center justify-between py-3.5 border-b border-slate-100/60 last:border-0 hover:bg-slate-50/50 -mx-4 px-4 transition-colors cursor-pointer">
    <div className="flex items-center gap-4">
      <Circle size={22} className="text-slate-300 flex-shrink-0" strokeWidth={2} />
      <div>
        <p className="text-[14.5px] font-semibold text-slate-900 leading-tight">{title}</p>
        <p className="text-[13px] text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${priorityColor}`}>
        {priority}
      </span>
      <button onClick={(e) => { e.stopPropagation(); onMoreClick(); }} className="text-slate-400 hover:text-slate-600">
        <MoreVertical size={18} />
      </button>
    </div>
  </div>
);

const CalendarItem = ({ date, month, title, time, dotColor, onRowClick }: any) => (
  <div onClick={onRowClick} className="flex items-center gap-4 py-3.5 border-b border-slate-100/60 last:border-0 hover:bg-slate-50/50 -mx-4 px-4 transition-colors cursor-pointer">
    <div className="flex flex-col items-center justify-center min-w-[40px]">
      <span className="text-[18px] font-bold text-slate-900 leading-none mb-1">{date}</span>
      <span className="text-[11px] font-bold text-slate-500 uppercase">{month}</span>
    </div>
    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dotColor }}></div>
    <div className="flex-1 ml-1">
      <p className="text-[14.5px] font-semibold text-slate-900 leading-tight">{title}</p>
      <p className="text-[13px] text-slate-500 mt-0.5">{time}</p>
    </div>
  </div>
);

const recentMemories: {
  icon: any;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
  actionIcon: any;
  isPlay?: boolean;
}[] = [];

const upcomingTasks: {
  title: string;
  subtitle: string;
  priority: string;
  priorityColor: string;
}[] = [];

const upcomingEvents: {
  date: string;
  month: string;
  title: string;
  time: string;
  dotColor: string;
}[] = [];

export default function PathiiDashboard() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredMemories = recentMemories.filter((memory) =>
    memory.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-900 antialiased selection:bg-blue-100">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#F4F7F9] flex flex-col z-20 flex-shrink-0 py-6 px-4 sticky top-0 h-screen border-r border-slate-200/60">
        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="text-[#2563EB]">
            <BrainLogo className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight">Pathii</h1>
            <p className="text-[12px] text-slate-500 font-medium">AI Memory Assistant</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pr-2 space-y-0.5">
          <SidebarItem icon={Home} label="Dashboard" active href="/" />
          <SidebarItem icon={Mic} label="Voice Capture" href="/voice-capture" />
          <SidebarItem icon={Database} label="Memories" href="/memories" />
          <SidebarItem icon={CheckSquare} label="Tasks" href="/tasks" />
          <SidebarItem icon={Calendar} label="Calendar" href="/calendar" />
          <SidebarItem icon={FileText} label="Documents" href="/documents" />
          <SidebarItem icon={Users} label="People" href="/people" />
          <SidebarItem icon={Link} label="Integrations" href="/integrations" />
          <SidebarItem icon={BarChart2} label="Insights" href="/insights" />
          <SidebarItem icon={Settings} label="Settings" href="/settings" />
        </nav>

          {/* User Profile */}
        <div className="mt-4 flex flex-col gap-2">
          <NextLink href="/settings" className="flex items-center justify-between cursor-pointer hover:bg-slate-200/50 p-2 rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[14px]">A</div>
              <div>
                <p className="text-[14px] font-bold text-slate-900">Alex</p>
                <p className="text-[12px] text-slate-500 font-medium">Free Plan</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </NextLink>
          <NextLink href="/admin" className="text-[11.5px] font-bold text-[#2563EB] bg-[#EBF3FF] hover:bg-blue-100 py-1.5 px-3 rounded-xl text-center transition-colors">
            Switch to Admin Panel →
          </NextLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F7F9] relative rounded-tl-[40px] border-l border-slate-200/50 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
        
        {/* Header */}
        <header className="h-[90px] px-8 flex items-center justify-between z-20 sticky top-0 bg-[#F4F7F9]/95 backdrop-blur-sm border-b border-slate-200/40">
          <div className="relative w-full max-w-[400px] lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search memories, tasks, documents..."
              className="w-full pl-11 pr-14 py-3 bg-white rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow shadow-[0_2px_8px_rgba(0,0,0,0.04)] placeholder:text-slate-400 font-medium text-slate-700"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-2 py-1 rounded-md text-[11px] font-semibold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <button onClick={() => showToast('Notifications opened')} className="relative p-2.5 rounded-full hover:bg-white/80 transition-colors text-slate-600 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <Bell size={20} />
            </button>
            <NextLink href="/settings">
              <div className="w-[42px] h-[42px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer">A</div>
            </NextLink>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-8 pt-6 pb-20">
          
          {/* Hero Banner */}
          <div className="relative w-full rounded-[24px] bg-gradient-to-br from-[#FAFCFF] to-[#F1F6FF] mb-6 overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-white">
            
            {/* Background Graphic SVG */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="xMaxYMax slice" xmlns="http://www.w3.org/2000/svg">
                {/* Sun */}
                <circle cx="85%" cy="80" r="45" fill="#FDE68A" fillOpacity="0.8" filter="blur(2px)" />
                {/* Back Mountains */}
                <path d="M400,200 L1000,200 L1000,100 C850,50 750,150 600,120 C450,90 450,180 400,200 Z" fill="#D3E4FF" fillOpacity="0.4"/>
                {/* Middle Mountains */}
                <path d="M500,200 L1000,200 L1000,130 C800,100 700,180 550,150 C400,120 400,200 500,200 Z" fill="#ADC8FF" fillOpacity="0.5"/>
                {/* Front Mountains */}
                <path d="M600,200 L1000,200 L1000,160 C850,130 750,190 650,170 C550,150 500,200 600,200 Z" fill="#84A9FF" fillOpacity="0.4"/>
              </svg>
            </div>

            {/* Left Content */}
            <div className="relative z-10 flex flex-col justify-center h-full">
              <h2 className="text-[32px] font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                Good Morning, Alex <span className="text-[28px] origin-bottom-right rotate-[10deg] inline-block">👋</span>
              </h2>
              <p className="text-slate-500 mt-2 text-[15px] font-medium">Here's what's happening with your memories today.</p>
            </div>
            
            {/* Right Content */}
            <div className="relative z-10 text-right self-end lg:self-start mt-2">
              <p className="text-slate-500 italic mt-3 text-[14px]">"Capture today.<br/>Remember tomorrow."</p>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <NextLink href="/memories" className="transition-transform hover:-translate-y-0.5">
              <StatCard
                icon={BrainLogo} iconBg="bg-[#EBF3FF]" iconColor="text-[#2563EB]"
                value={0} label="Total Memories"
              />
            </NextLink>
            <NextLink href="/tasks" className="transition-transform hover:-translate-y-0.5">
              <StatCard
                icon={CheckSquare} iconBg="bg-[#E6F8F0]" iconColor="text-[#10B981]"
                value={0} label="Active Tasks"
              />
            </NextLink>
            <NextLink href="/calendar" className="transition-transform hover:-translate-y-0.5">
              <StatCard
                icon={Calendar} iconBg="bg-[#FFEBEF]" iconColor="text-[#F43F5E]"
                value={0} label="Upcoming Events"
              />
            </NextLink>
            <NextLink href="/people" className="transition-transform hover:-translate-y-0.5">
              <StatCard
                icon={Users} iconBg="bg-[#F3E8FF]" iconColor="text-[#8B5CF6]"
                value={0} label="Important People"
              />
            </NextLink>
          </div>

          {/* Main Content Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              
              {/* Recent Memories */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Recent Memories</h3>
                  <NextLink href="/memories" className="text-[#2563EB] text-[13px] font-semibold hover:text-blue-700 flex items-center gap-1 group">
                    View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </NextLink>
                </div>
                <div className="flex flex-col">
                  {filteredMemories.length > 0 ? (
                    filteredMemories.map((memory) => (
                      <MemoryItem
                        key={memory.title}
                        icon={memory.icon}
                        iconBg={memory.iconBg}
                        iconColor={memory.iconColor}
                        title={memory.title}
                        subtitle={memory.subtitle}
                        time={memory.time}
                        actionIcon={memory.actionIcon}
                        isPlay={memory.isPlay}
                        onRowClick={() => showToast(`Opening '${memory.title}'`)}
                        onActionClick={() => showToast(memory.isPlay ? `Playing '${memory.title}'` : `More options for '${memory.title}'`)}
                      />
                    ))
                  ) : (
                    <EmptyState icon={Database} title="No memories yet" subtitle="Memories you capture will appear here." />
                  )}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Upcoming Tasks</h3>
                  <NextLink href="/tasks" className="text-[#2563EB] text-[13px] font-semibold hover:text-blue-700 flex items-center gap-1 group">
                    View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </NextLink>
                </div>
                <div className="flex flex-col">
                  {upcomingTasks.length > 0 ? (
                    upcomingTasks.map((task) => (
                      <TaskItem
                        key={task.title}
                        title={task.title}
                        subtitle={task.subtitle}
                        priority={task.priority}
                        priorityColor={task.priorityColor}
                        onRowClick={() => showToast(`Opening task '${task.title}'`)}
                        onMoreClick={() => showToast(`More options for '${task.title}'`)}
                      />
                    ))
                  ) : (
                    <EmptyState icon={CheckSquare} title="No tasks yet" subtitle="Tasks you create will appear here." />
                  )}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              
              {/* Voice Capture Box */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col min-h-[420px] lg:h-[420px]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="text-[#2563EB] bg-[#EBF3FF] p-1.5 rounded-lg">
                    <BrainLogo className="w-4 h-4" />
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900">Voice Capture</h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative">
                  {/* Glowing Mic Element */}
                  <div className="relative flex items-center justify-center mb-8">
                    {/* Outer Rings */}
                    <div className="absolute w-[180px] h-[180px] bg-[#F1F6FF] rounded-full"></div>
                    <div className="absolute w-[130px] h-[130px] bg-[#E1EDFF] rounded-full"></div>
                    {/* Core Mic Button - Claymorphism Style */}
                    <NextLink href="/voice-capture" className="relative z-10 w-[85px] h-[85px] bg-[#598CFF] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[8px_10px_20px_rgba(37,99,235,0.25),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-6px_-6px_12px_rgba(29,78,216,0.5)] active:shadow-[inset_8px_8px_16px_rgba(29,78,216,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.4)] border-none outline-none">
                      <Mic size={34} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" strokeWidth={2} />
                    </NextLink>
                  </div>
                  <h4 className="text-slate-900 font-bold text-[16px] mb-1.5 whitespace-nowrap text-center">Tap to start recording</h4>
                  <p className="text-slate-500 text-[13px] font-medium text-center">Capture your thoughts, ideas, or tasks</p>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <NextLink href="/documents" className="flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all text-[13px] font-semibold text-slate-700">
                    <FileText size={16} className="text-[#3B82F6]" /> Note
                  </NextLink>
                  <NextLink href="/tasks" className="flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all text-[13px] font-semibold text-slate-700">
                    <CheckSquare size={16} className="text-[#10B981]" /> Task
                  </NextLink>
                  <NextLink href="/calendar" className="flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all text-[13px] font-semibold text-slate-700">
                    <Calendar size={16} className="text-[#F43F5E]" /> Event
                  </NextLink>
                </div>
              </div>

              {/* Calendar Snippet */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Calendar</h3>
                  <NextLink href="/calendar" className="text-[#2563EB] text-[13px] font-semibold hover:text-blue-700 flex items-center gap-1 group">
                    View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </NextLink>
                </div>
                <div className="flex flex-col">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <CalendarItem
                        key={event.title}
                        date={event.date}
                        month={event.month}
                        dotColor={event.dotColor}
                        title={event.title}
                        time={event.time}
                        onRowClick={() => showToast(`Opening event '${event.title}'`)}
                      />
                    ))
                  ) : (
                    <EmptyState icon={Calendar} title="No events yet" subtitle="Events you add will appear here." />
                  )}
                </div>
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
    </div>
  );
}
