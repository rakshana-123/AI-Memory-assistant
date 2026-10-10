"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreVertical, Plus, ChevronDown, Clock, ArrowUp, ArrowDown,
  CheckCircle2, Video, MapPin, Check, Sparkles, ImageIcon,
  Play, Pause, MoreHorizontal, Edit3, Type, List, Tag, Map, Link2, X, File, FileCode
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

const WaveformMini = ({ active = false, className="" }) => {
  const bars = [4, 8, 12, 16, 10, 14, 20, 16, 12, 8, 14, 18, 24, 16, 12, 8, 6, 10, 14, 12, 8, 4, 6];
  return (
    <div className={`flex items-center gap-[2px] h-6 ${className}`}>
      {bars.map((height, i) => (
        <div 
          key={i} 
          className={`w-[3px] rounded-full ${active ? 'bg-[#2563EB]' : 'bg-[#60A5FA]'}`}
          style={{ height: `${Math.max(4, height * 0.7)}px`, opacity: active ? 1 : 0.8 }}
        />
      ))}
      <div className="flex items-center gap-[2px] opacity-30 ml-1">
         {[8, 12, 6, 4, 8, 10, 6, 4].map((height, i) => (
            <div key={`inactive-${i}`} className="w-[3px] rounded-full bg-slate-400" style={{ height: `${height * 0.7}px` }} />
         ))}
      </div>
    </div>
  );
};

const WaveformLarge = () => {
  const bars = [
    6, 10, 16, 24, 18, 12, 20, 32, 40, 28, 20, 16, 24, 36, 48, 42, 30, 22, 16, 10, 14, 24, 30, 26, 18, 12, 8, 14, 20, 28, 22, 14, 8, 6
  ];
  return (
    <div className="flex items-center gap-[3px] h-12 w-full">
      {bars.map((height, i) => (
        <div 
          key={i} 
          className={`w-[4px] rounded-full ${i < 15 ? 'bg-[#2563EB]' : 'bg-[#BFDBFE]'}`}
          style={{ height: `${height}px` }}
        />
      ))}
       <div className="flex items-center gap-[3px] opacity-40 ml-1 flex-1 overflow-hidden">
         {bars.reverse().map((height, i) => (
            <div key={`inactive-${i}`} className="w-[4px] rounded-full bg-slate-400 flex-shrink-0" style={{ height: `${height * 0.6}px` }} />
         ))}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, href }: any) => (
  <NextLink href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-100 font-medium'}`}>
    <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
    <span className="text-[14px]">{label}</span>
  </NextLink>
);

const TagPill = ({ text, colorType }: any) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-rose-50 text-rose-600',
    yellow: 'bg-amber-50 text-amber-600',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold ${(colors as any)[colorType] || colors.blue}`}>
      {text}
    </span>
  );
};

const MapPreview = () => (
  <div className="w-full h-20 bg-[#E2E8F0] rounded-xl relative overflow-hidden border border-slate-200">
    <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-300"></div>
    <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 drop-shadow-md">
      <MapPin size={24} className="text-rose-500 fill-rose-500" />
    </div>
  </div>
);

const DocPreview = () => (
  <div className="w-full h-20 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-200 flex items-center justify-center gap-3">
     <div className="w-12 h-16 bg-white shadow-sm border border-slate-200 rounded p-1.5 flex flex-col gap-1">
        <div className="w-full h-1 bg-slate-200 rounded-full"></div>
        <div className="w-3/4 h-1 bg-slate-200 rounded-full"></div>
        <div className="w-full h-1 bg-slate-200 rounded-full mt-1"></div>
        <div className="w-full h-1 bg-slate-200 rounded-full"></div>
        <div className="w-1/2 h-1 bg-slate-200 rounded-full"></div>
     </div>
     <div className="w-12 h-16 bg-white shadow-sm border border-slate-200 rounded p-1.5 flex flex-col gap-1">
        <div className="w-full h-1 bg-slate-200 rounded-full"></div>
        <div className="w-full h-1 bg-slate-200 rounded-full"></div>
        <div className="w-2/3 h-1 bg-slate-200 rounded-full mt-1"></div>
     </div>
  </div>
)

const memoriesData = [
  {
    id: 1,
    type: 'voice',
    title: 'Project idea discussion',
    meta: 'Voice • Today, 10:42 AM',
    duration: '02:14',
    tags: [{text: 'Idea', color: 'blue'}, {text: 'AI', color: 'purple'}],
    active: true,
    icon: Mic,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50'
  },
  {
    id: 2,
    type: 'document',
    title: 'Research paper notes',
    meta: 'Document • Yesterday, 4:20 PM',
    tags: [{text: 'Research', color: 'green'}, {text: 'PDF', color: 'red'}],
    active: false,
    icon: FileText,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    id: 3,
    type: 'image',
    title: 'Trip to Kyoto',
    meta: 'Image • Oct 9, 2024',
    tags: [{text: 'Personal', color: 'purple'}, {text: 'Travel', color: 'blue'}],
    active: false,
    icon: ImageIcon,
    iconColor: 'text-transparent',
    iconBg: 'bg-transparent',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80'
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Meeting with Sarah',
    meta: 'Conversation • Oct 8, 2024',
    tags: [{text: 'Meeting', color: 'purple'}, {text: 'Team', color: 'blue'}],
    active: false,
    icon: CalendarIcon,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-50'
  },
  {
    id: 5,
    type: 'note',
    title: 'Book recommendations',
    meta: 'Note • Oct 7, 2024',
    snippet: 'Some great books for productivity and AI...',
    tags: [{text: 'Learning', color: 'yellow'}, {text: 'Books', color: 'blue'}],
    active: false,
    icon: FileText,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50'
  },
  {
    id: 6,
    type: 'location',
    title: 'Client office location',
    meta: 'Location • Oct 6, 2024',
    tags: [{text: 'Work', color: 'blue'}, {text: 'Client', color: 'green'}],
    active: false,
    icon: MapPin,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50'
  },
  {
    id: 7,
    type: 'link',
    title: 'Interesting article',
    meta: 'Link • Oct 5, 2024',
    url: 'https://www.example.com/article',
    tags: [{text: 'Reference', color: 'purple'}, {text: 'Article', color: 'blue'}],
    active: false,
    icon: Link2,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50'
  },
  {
    id: 8,
    type: 'voice',
    title: 'Ideas for next sprint',
    meta: 'Voice • Oct 4, 2024',
    duration: '01:32',
    tags: [{text: 'Work', color: 'blue'}, {text: 'Product', color: 'green'}],
    active: false,
    icon: Mic,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50'
  }
];

export default function PathiiMemoriesDashboard() {
  return (
    <div className="flex h-screen bg-[#F4F7F9] font-sans overflow-hidden text-slate-900 antialiased selection:bg-blue-100">
      
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
          <SidebarItem icon={Database} label="Memories" active href="/memories" />
          <SidebarItem icon={CheckSquare} label="Tasks & Schedule" href="/tasks" />
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

      {}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F7F9]">
        
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search memories, notes, documents, or ask anything..." 
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#F43F5E] border-2 border-[#F4F7F9] rounded-full flex items-center justify-center text-[8px] font-bold text-white">1</span>
            </button>
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-9 h-9 rounded-full object-cover shadow-sm cursor-pointer border border-slate-200" />
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6">
          
          {}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            
            {/* Page Title & Controls */}
            <div className="flex items-start justify-between mb-6 mt-2 flex-shrink-0">
              <div>
                <h2 className="text-[32px] font-bold text-slate-900 tracking-tight leading-tight mb-2">Memories</h2>
                <p className="text-[15px] text-slate-500 font-medium">All your thoughts, notes, files and moments in one place.</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex shadow-sm rounded-lg overflow-hidden">
                  <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 text-[14px] font-semibold flex items-center gap-2 transition-colors border-r border-blue-600/50">
                    <Plus size={18} /> Add Memory
                  </button>
                  <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-3 py-2 transition-colors">
                    <ChevronDown size={18} />
                  </button>
                </div>
                <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800 text-[13px] font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                  <ArrowUp size={14} className="text-slate-400" /> Newest first <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-6 flex-shrink-0 overflow-x-auto pb-1 scrollbar-hide">
              {['All', 'Voice', 'Notes', 'Documents', 'Images', 'Links', 'Locations', 'People'].map((filter, i) => (
                <button 
                  key={filter} 
                  className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap ${
                    i === 0 
                      ? 'bg-[#2563EB] text-white shadow-sm' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Grid Container (2 Columns) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-2 gap-4 pb-4">
                {memoriesData.map((card) => (
                  <div 
                    key={card.id} 
                    className={`bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all ${card.active ? 'border-[#2563EB] ring-1 ring-[#2563EB] shadow-md' : 'border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'}`}
                  >
                    {/* Top Image for specific cards */}
                    {card.type === 'image' && (
                      <div className="w-full h-32 bg-slate-100 flex-shrink-0">
                         <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {card.type !== 'image' && (
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                              <card.icon size={20} className={card.iconColor} />
                            </div>
                          )}
                          <div>
                            <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-0.5">{card.title}</h3>
                            <p className="text-[13px] text-slate-500 font-medium">{card.meta}</p>
                          </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 p-1">
                          <MoreVertical size={18} />
                        </button>
                      </div>

                      {/* Card Content Previews */}
                      {card.type === 'voice' && (
                        <div className="flex items-center gap-3 my-3">
                          <WaveformMini active={card.active} className="flex-1" />
                          <span className="text-[12px] font-semibold text-slate-400 whitespace-nowrap">{card.duration}</span>
                        </div>
                      )}

                      {card.type === 'document' && (
                        <div className="my-3">
                          <DocPreview />
                        </div>
                      )}

                      {card.type === 'note' && (
                        <p className="text-[13px] text-slate-500 my-2 line-clamp-2 leading-relaxed">
                          {card.snippet}
                        </p>
                      )}

                      {card.type === 'location' && (
                        <div className="my-3">
                          <MapPreview />
                        </div>
                      )}

                      {card.type === 'link' && (
                        <div className="bg-slate-50 rounded-lg p-2.5 my-3 border border-slate-100 truncate">
                          <span className="text-[13px] text-blue-500">{card.url}</span>
                        </div>
                      )}

                      {/* Bottom Tags */}
                      <div className="flex items-center gap-2 mt-auto pt-3">
                        {card.tags.map((tag, idx) => (
                          <TagPill key={idx} text={tag.text} colorType={tag.color} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="w-[400px] bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col flex-shrink-0 h-full overflow-hidden">
            <div className="p-6 overflow-y-auto custom-scrollbar h-full flex flex-col">
              
              {/* Header Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
                  <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center text-blue-500">
                    <Mic size={14} />
                  </div>
                  <span>Voice</span>
                  <span className="text-slate-300">•</span>
                  <span>Oct 12, 2024 • 10:42 AM</span>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-5">Project idea discussion</h2>

              {/* Large Waveform Player */}
              <div className="w-full relative mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <button className="w-10 h-10 rounded-full bg-[#2563EB] hover:bg-blue-700 transition-colors flex items-center justify-center text-white shadow-md flex-shrink-0">
                    <Play size={18} fill="currentColor" className="ml-1" />
                  </button>
                  <WaveformLarge />
                </div>
                <div className="flex items-center justify-between pl-14">
                  <span className="text-[13px] font-bold text-slate-500">0:00 / 2:14</span>
                  <button className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors px-3 py-1 rounded-full text-[12px] font-bold text-slate-700">
                    1x <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
                {['Transcript', 'Summary', 'AI Insights', 'Related'].map((tab, i) => (
                  <button 
                    key={tab} 
                    className={`pb-3 text-[14px] font-semibold transition-colors relative ${i === 0 ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {tab}
                    {i === 0 && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2563EB] rounded-t-full"></div>}
                  </button>
                ))}
              </div>

              {/* Transcript */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                    <FileText size={18} className="text-slate-700" /> Transcript
                  </h3>
                  <button className="flex items-center gap-1 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 px-2 py-1 rounded-md transition-colors border border-transparent hover:border-slate-200">
                    <Edit3 size={14} /> Edit
                  </button>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100">
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    Okay, so the idea is to build an AI memory assistant that can save notes, documents, and important conversations. It should also integrate with calendar and email, and help me remember tasks automatically. We can start with a web app and later add a mobile app and a wearable device...
                  </p>
                </div>
              </div>

              {/* AI Summary */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles size={18} className="text-purple-600" /> AI Summary
                  </h3>
                </div>
                <div className="bg-[#F5F3FF] rounded-2xl p-5 border border-purple-100 text-purple-900 text-[14px] leading-relaxed">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Discussed building an AI memory assistant.</li>
                    <li>Key features: note saving, document storage, conversation memory, calendar and email integration.</li>
                    <li>Goal: automatically remember and suggest tasks.</li>
                  </ul>
                </div>
              </div>

              {/* Extracted Items */}
              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <CheckSquare size={18} className="text-slate-700" /> Extracted Items
                </h3>
                <div className="flex flex-col gap-3">
                  {/* Task */}
                  <div className="flex items-center justify-between group bg-white p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-green-500">
                         <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 leading-snug">Build AI memory assistant</p>
                        <p className="text-[12px] text-slate-500">Task</p>
                      </div>
                    </div>
                    <button className="text-[12px] font-bold text-[#2563EB] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  {/* Event */}
                  <div className="flex items-center justify-between group bg-white p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-rose-500">
                         <CalendarIcon size={18} />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 leading-snug">Plan feature list</p>
                        <p className="text-[12px] text-slate-500">Event</p>
                      </div>
                    </div>
                    <button className="text-[12px] font-bold text-[#2563EB] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  {/* Note */}
                  <div className="flex items-center justify-between group bg-white p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-amber-500">
                         <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 leading-snug">Research calendar integration</p>
                        <p className="text-[12px] text-slate-500">Note</p>
                      </div>
                    </div>
                    <button className="text-[12px] font-bold text-[#2563EB] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                   <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                     <Tag size={18} className="text-slate-700" /> Tags
                   </h3>
                   <button className="text-[12px] font-semibold text-slate-500 hover:text-[#2563EB]">Edit</button>
                </div>
                
                <div className="flex items-center flex-wrap gap-2">
                  <TagPill text="Idea" colorType="blue" />
                  <TagPill text="AI" colorType="purple" />
                  <TagPill text="Project" colorType="blue" />
                  <TagPill text="Productivity" colorType="red" />
                  <button className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 transition-colors shadow-sm">
                    <Plus size={14} />
                  </button>
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