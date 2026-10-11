"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  ChevronDown, ArrowRight, X, Sparkles, CheckCircle2,
  Clock, Link2, ChevronLeft, MoreHorizontal, Lightbulb
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const BrainLogo = ({ className = "w-6 h-6", size = 24, color = "currentColor" }: any) => {
  const pixelSize = typeof className === 'string' && className.includes('w-8') ? 32 : typeof className === 'string' && className.includes('w-4') ? 16 : size;
  return (
    <svg 
      width={pixelSize} 
      height={pixelSize} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ width: pixelSize, height: pixelSize, maxWidth: '100%', flexShrink: 0 }}
    >
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
};

const SidebarItem = ({ icon: Icon, label, active, href }: any) => (
  <NextLink href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-100 font-medium'}`}>
    <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
    <span className="text-[14px]">{label}</span>
  </NextLink>
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

type TrendPoint = { name: string; voice: number; notes: number; docs: number; images: number };

const trendsData: TrendPoint[] = [
  { name: 'Oct 5', voice: 1, notes: 0, docs: 0, images: 0 },
  { name: 'Oct 8', voice: 0, notes: 0, docs: 1, images: 0 },
  { name: 'Oct 10', voice: 0, notes: 1, docs: 0, images: 0 },
  { name: 'Oct 11', voice: 1, notes: 0, docs: 0, images: 0 },
];

type TypeSlice = { name: string; value: number; fill: string };

const memoryTypesData: TypeSlice[] = [
  { name: 'Voice', value: 1, fill: '#3B82F6' },
  { name: 'Notes', value: 1, fill: '#A855F7' },
  { name: 'Documents', value: 1, fill: '#10B981' },
];

const focusTimeData: TypeSlice[] = [
  { name: 'Deep Work', value: 3, fill: '#3B82F6' },
  { name: 'Meetings', value: 2, fill: '#A855F7' },
  { name: 'Planning', value: 1, fill: '#10B981' },
];

type Topic = { name: string; count: number; max: number; color: string };

const topTopics: Topic[] = [
  { name: 'Work', count: 2, max: 3, color: 'bg-blue-500' },
  { name: 'Ideas', count: 1, max: 3, color: 'bg-purple-500' },
  { name: 'Learning', count: 1, max: 3, color: 'bg-emerald-500' },
];

type HeatCell = { hour: number; intensity: number };

// Deterministic activity pattern (no Math.random / Date — hydration-safe)
const heatmapData: HeatCell[][] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) =>
  Array.from({ length: 24 }, (_, hour) => {
    const weekday = dayIndex < 5;
    let intensity = 0;
    if (weekday) {
      if (hour >= 9 && hour <= 11) intensity = 2;
      else if (hour >= 14 && hour <= 16) intensity = 1;
      else if (hour === 20) intensity = 1;
    } else if (hour >= 10 && hour <= 15) {
      intensity = 1;
    }
    return { hour, intensity };
  })
);

type AiInsight = { title: string; desc: string; icon: any; iconBg: string; iconColor: string };

const aiInsightsData: AiInsight[] = [
  {
    title: 'Voice captures are your richest memories',
    desc: 'Your latest voice note produced a task, an event and a note — more extracted items than any other type.',
    icon: Mic,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Most of your tasks are still open',
    desc: '2 of 3 tasks are pending — the high-priority one is due today at 2:00 PM.',
    icon: CheckSquare,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    title: 'Sarah Chen is your top contact',
    desc: '3 interactions with Sarah captured this week — more than anyone else.',
    icon: Users,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
];

type RecentInsight = { title: string; subtitle: string; date: string; icon: any; iconBg: string; iconColor: string };

const recentInsightsData: RecentInsight[] = [
  { title: 'Meeting summary with Sarah', subtitle: 'Key points and action items', date: 'Today', icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { title: 'Book recommendations', subtitle: 'Reading list saved as a note', date: 'Yesterday', icon: Lightbulb, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { title: 'Research paper takeaways', subtitle: 'Main findings saved as a document', date: 'Oct 8', icon: Lightbulb, iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
];

const getIntensityColor = (intensity: any) => {
  switch(intensity) {
    case 1: return 'bg-blue-200';
    case 2: return 'bg-blue-400';
    case 3: return 'bg-blue-500';
    case 4: return 'bg-blue-600';
    default: return 'bg-blue-50';
  }
};

export default function PathiiInsightsDashboard() {
  const [toast, setToast] = useState<string | null>(null);
  const [dateRangeIndex, setDateRangeIndex] = useState(0);
  const [aiInsightsRangeIndex, setAiInsightsRangeIndex] = useState(1);
  const [focusRangeIndex, setFocusRangeIndex] = useState(1);

  const dateRanges = ['Last 7 days', 'Last 30 days', 'All time'];
  const rangeOptions = ['This Week', 'This Month', 'This Year'];

  const totalMemories = memoryTypesData.reduce((sum, type) => sum + type.value, 0);
  const tasksCreated = 3;
  const peopleInteracted = 3;
  const eventsScheduled = 3;
  const totalFocusHours = focusTimeData.reduce((sum, type) => sum + type.value, 0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const cycleOption = (options: string[], currentIndex: number, setCurrentIndex: (i: number) => void, label: string) => {
    const next = (currentIndex + 1) % options.length;
    setCurrentIndex(next);
    showToast(`${label}: ${options[next]}`);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-900 antialiased selection:bg-blue-100">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#F8FAFC] flex flex-col flex-shrink-0 border-r border-slate-200/60 sticky top-0 h-screen z-20">
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
          <SidebarItem icon={Users} label="People" href="/people" />
          <SidebarItem icon={LinkIcon} label="Integrations" href="/integrations" />
          <SidebarItem icon={BarChart2} label="Insights" active href="/insights" />
          <SidebarItem icon={Settings} label="Settings" href="/settings" />
        </nav>

        <div className="p-4 border-t border-slate-200/60 mt-auto">
          <div onClick={() => showToast('Account settings opened')} className="flex items-center justify-between cursor-pointer hover:bg-slate-100 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[14px]">A</div>
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
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 sticky top-0 z-20 bg-[#F4F7F9]/95 backdrop-blur-sm border-b border-slate-200/40">
          <div className="relative w-full max-w-[520px] lg:w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search your insights, stats, memories, or ask anything..."
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-shrink-0">
            <button onClick={() => showToast('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <div onClick={() => showToast('Profile menu opened')} className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[13px] shadow-sm cursor-pointer border border-slate-200">A</div>
          </div>
        </header>

        {/* Scrollable Layout Container */}
        <div className="flex-1 px-8 py-6 flex gap-6 flex-col xl:flex-row pb-20">
          
          {/* Main Left Column */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Header & Date Picker */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#2563EB] flex-shrink-0">
                   <BarChart2 size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-[24px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">Insights</h2>
                  <p className="text-[14px] text-slate-500 font-medium">Understand your memories, productivity and patterns with AI.</p>
                </div>
              </div>
              
              <button 
                onClick={() => cycleOption(dateRanges, dateRangeIndex, setDateRangeIndex, 'Date range')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <CalendarIcon size={16} className="text-blue-500" />
                {dateRanges[dateRangeIndex]}
                <ChevronDown size={14} className="text-slate-400 ml-1" />
              </button>
            </div>

            {}
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 flex-shrink-0 max-lg:grid-cols-1">
              {/* Stat 1 */}
              <div className="bg-white p-5 rounded-[20px] border border-slate-200 shadow-sm flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                   <FileText size={20} />
                 </div>
                 <div>
                   <h3 className="text-[22px] font-extrabold text-slate-900 leading-none mb-1">{totalMemories}</h3>
                   <p className="text-[13px] text-slate-500 font-medium mb-2">Total Memories</p>
                   {totalMemories > 0 && <p className="text-[12px] font-bold text-emerald-600 flex items-center gap-1 whitespace-nowrap">↑ <span className="font-medium text-slate-400">vs last month</span></p>}
                 </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-5 rounded-[20px] border border-slate-200 shadow-sm flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                   <CheckSquare size={20} />
                 </div>
                 <div>
                   <h3 className="text-[22px] font-extrabold text-slate-900 leading-none mb-1">{tasksCreated}</h3>
                   <p className="text-[13px] text-slate-500 font-medium mb-2">Tasks Created</p>
                   {tasksCreated > 0 && <p className="text-[12px] font-bold text-emerald-600 flex items-center gap-1 whitespace-nowrap">↑ <span className="font-medium text-slate-400">vs last month</span></p>}
                 </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-5 rounded-[20px] border border-slate-200 shadow-sm flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
                   <Users size={20} />
                 </div>
                 <div>
                   <h3 className="text-[22px] font-extrabold text-slate-900 leading-none mb-1">{peopleInteracted}</h3>
                   <p className="text-[13px] text-slate-500 font-medium mb-2">People Interacted</p>
                   {peopleInteracted > 0 && <p className="text-[12px] font-bold text-emerald-600 flex items-center gap-1 whitespace-nowrap">↑ <span className="font-medium text-slate-400">vs last month</span></p>}
                 </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-5 rounded-[20px] border border-slate-200 shadow-sm flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                   <CalendarIcon size={20} />
                 </div>
                 <div>
                   <h3 className="text-[22px] font-extrabold text-slate-900 leading-none mb-1">{eventsScheduled}</h3>
                   <p className="text-[13px] text-slate-500 font-medium mb-2">Events Scheduled</p>
                   {eventsScheduled > 0 && <p className="text-[12px] font-bold text-emerald-600 flex items-center gap-1 whitespace-nowrap">↑ <span className="font-medium text-slate-400">vs last month</span></p>}
                 </div>
              </div>
            </div>

            {}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 mb-6 flex-shrink-0">
              <div className="flex items-center justify-between mb-6 max-lg:flex-wrap max-lg:gap-3">
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight mb-0.5">Memory Trends</h3>
                  <p className="text-[13px] text-slate-500 font-medium">Your activity over the last 30 days.</p>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-semibold text-slate-600 max-lg:flex-wrap">
                  <span onClick={() => showToast('Filtering trends to Voice captures')} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></div>Voice</span>
                  <span onClick={() => showToast('Filtering trends to Notes')} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></div>Notes</span>
                  <span onClick={() => showToast('Filtering trends to Documents')} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>Documents</span>
                  <span onClick={() => showToast('Filtering trends to Images')} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>Images</span>
                </div>
              </div>
              {trendsData.length > 0 ? (
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }} dy={10} minTickGap={20} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }} dx={-10} />
                    <RechartsTooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="voice" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="notes" stackId="a" fill="#A855F7" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="docs" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="images" stackId="a" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              ) : (
                <EmptyState icon={BarChart2} title="No trends yet" subtitle="Your capture activity will appear here." />
              )}
            </div>

            {}
            <div className="flex gap-6 mb-6 flex-shrink-0 max-lg:flex-col">

              {/* Memory Types */}
              <div className="flex-1 bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
                <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight mb-4">Memory Types</h3>
                {memoryTypesData.length > 0 ? (
                <div className="flex items-center gap-6 max-lg:flex-col">
                  {/* Donut Chart */}
                  <div className="w-[140px] h-[140px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={memoryTypesData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {memoryTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[22px] font-extrabold text-slate-900 leading-none">{totalMemories}</span>
                      <span className="text-[11px] text-slate-500 font-medium">Memories</span>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex-1 space-y-2.5">
                    {memoryTypesData.map((type) => (
                      <div key={type.name} onClick={() => showToast(`Filtering memories by type '${type.name}'`)} className="flex items-center justify-between text-[13px]">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: type.fill }}></div>
                          {type.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{type.value}</span>
                          <span className="text-slate-400 w-9 text-right">({totalMemories > 0 ? Math.round((type.value / totalMemories) * 100) : 0}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                ) : (
                  <EmptyState icon={Database} title="No data yet" subtitle="Your memory type breakdown will appear here." />
                )}
              </div>

              {/* Top Topics */}
              <div className="flex-1 bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
                <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight mb-4">Top Topics</h3>
                {topTopics.length > 0 ? (
                <div className="space-y-4 pt-1">
                  {topTopics.map((topic) => (
                    <div key={topic.name} onClick={() => showToast(`Topic '${topic.name}': ${topic.count} memories this month`)} className="flex items-center text-[13px]">
                      <span className="w-24 text-slate-700 font-semibold">{topic.name}</span>
                      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden mx-4">
                        <div 
                          className={`h-full rounded-full ${topic.color}`} 
                          style={{ width: `${(topic.count / topic.max) * 100}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-right font-bold text-slate-500">{topic.count}</span>
                    </div>
                  ))}
                </div>
                ) : (
                  <EmptyState icon={Lightbulb} title="No topics yet" subtitle="Topics from your memories will appear here." />
                )}
              </div>
            </div>

            {}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 flex-shrink-0">
               <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight mb-0.5">Productivity Heatmap</h3>
                  <p className="text-[13px] text-slate-500 font-medium">Your most active days and times.</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <span>Less Activity</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-blue-50"></div>
                    <div className="w-3 h-3 rounded-sm bg-blue-200"></div>
                    <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
                    <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                    <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
                  </div>
                  <span>More Activity</span>
                </div>
              </div>

              {heatmapData.length > 0 ? (
              <div className="flex">
                {/* Y-axis labels (Days) */}
                <div className="flex flex-col gap-1.5 pr-3 pt-1 text-[11px] font-medium text-slate-400 justify-between h-[126px]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className="leading-none">{day}</span>
                  ))}
                </div>
                
                {/* Heatmap Grid Container */}
                <div className="flex-1">
                  <div className="grid grid-rows-7 grid-flow-col gap-1">
                    {heatmapData.map((dayData, dayIndex) => (
                      dayData.map((hourData, hourIndex) => (
                        <div 
                          key={`${dayIndex}-${hourIndex}`} 
                          onClick={() => showToast(`${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIndex]} at ${hourData.hour}:00 — ${hourData.intensity >= 3 ? 'peak activity' : hourData.intensity > 0 ? 'some activity' : 'quiet'}`)}
                          className={`w-full aspect-square rounded-[3px] ${getIntensityColor(hourData.intensity)} hover:ring-1 ring-slate-400 transition-all cursor-pointer`}
                          title={`${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIndex]} at ${hourData.hour}:00`}
                        ></div>
                      ))
                    ))}
                  </div>
                  
                  {/* X-axis labels (Time) */}
                  <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2 px-1">
                    <span>12 AM</span>
                    <span>4 AM</span>
                    <span>8 AM</span>
                    <span>12 PM</span>
                    <span>4 PM</span>
                    <span>8 PM</span>
                  </div>
                </div>
              </div>
              ) : (
                <EmptyState icon={Clock} title="No activity yet" subtitle="Your most active days and times will appear here." />
              )}
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div className="w-full xl:w-[360px] flex flex-col gap-6 flex-shrink-0 h-fit sticky top-24">
            
            {/* AI Insights Card */}
            <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-5 relative z-10">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#6366F1]" />
                  <h3 className="text-[16px] font-extrabold text-slate-900">AI Insights</h3>
                </div>
                <button 
                  onClick={() => cycleOption(rangeOptions, aiInsightsRangeIndex, setAiInsightsRangeIndex, 'AI Insights period')}
                  className="flex items-center gap-1 text-[12px] font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg shadow-sm"
                >
                  {rangeOptions[aiInsightsRangeIndex]} <ChevronDown size={14} />
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                {aiInsightsData.length > 0 ? aiInsightsData.map((insight) => (
                  <div key={insight.title} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <insight.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-900 leading-tight mb-1">{insight.title}</h4>
                      <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{insight.desc}</p>
                    </div>
                  </div>
                )) : (
                  <EmptyState icon={Sparkles} title="No insights yet" subtitle="Insights will appear as you capture memories." />
                )}
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-100/40 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-[#3B82F6]" />
                  <h3 className="text-[16px] font-extrabold text-slate-900">Focus Time</h3>
                </div>
                <button 
                  onClick={() => cycleOption(rangeOptions, focusRangeIndex, setFocusRangeIndex, 'Focus time period')}
                  className="flex items-center gap-1 text-[12px] font-bold text-slate-500 hover:text-slate-700"
                >
                  {rangeOptions[focusRangeIndex]} <ChevronDown size={14} />
                </button>
              </div>

              {focusTimeData.length > 0 ? (
              <div className="flex items-center gap-6 max-lg:flex-col">
                {/* Donut Chart */}
                <div className="w-[120px] h-[120px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={focusTimeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {focusTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-1">
                    <span className="text-[20px] font-extrabold text-slate-900 leading-none">{totalFocusHours}h</span>
                    <span className="text-[10px] text-slate-500 font-medium mt-0.5">Focus Time</span>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex-1 space-y-2">
                  {focusTimeData.map((item) => (
                    <div key={item.name} onClick={() => showToast(`${item.name}: ${item.value}h of focus time`)} className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        {item.name}
                      </div>
                      <div className="text-slate-500 font-medium">
                        {item.value}h <span className="text-slate-400">({totalFocusHours > 0 ? Math.round((item.value / totalFocusHours) * 100) : 0}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              ) : (
                <EmptyState icon={Clock} title="No focus data yet" subtitle="Your focus time breakdown will appear here." />
              )}
            </div>

            {}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-500" />
                  <h3 className="text-[16px] font-extrabold text-slate-900">Recent Insights</h3>
                </div>
                <button onClick={() => showToast('Showing all recent insights')} className="text-[12px] font-bold text-[#2563EB] flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {recentInsightsData.length > 0 ? recentInsightsData.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <item.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className="text-[14px] font-bold text-slate-900 leading-tight truncate">{item.title}</h4>
                        <span className="text-[11px] text-slate-400 font-medium flex-shrink-0 ml-2">{item.date}</span>
                      </div>
                      <p className="text-[12px] text-slate-500 font-medium truncate">{item.subtitle}</p>
                    </div>
                  </div>
                )) : (
                  <EmptyState icon={Lightbulb} title="No recent insights" subtitle="Generated insights will appear here." />
                )}
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
