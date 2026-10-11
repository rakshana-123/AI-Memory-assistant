"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreVertical, Play, ChevronDown, Plus, 
  Grid, List as ListIcon, X, CheckCircle2, MapPin, AlignLeft,
  Edit2, ArrowDownUp, Image as ImageIcon
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

const PdfIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#F43F5E"/>
    <path d="M7 11V15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 11H9.5C10.3284 11 11 11.6716 11 12.5V12.5C11 13.3284 10.3284 14 9.5 14H7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 15V11C14 11 15 11.5 15 13C15 14.5 14 15 13 15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 15V11H19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 13H18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ExcelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#10B981"/>
    <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

type ClassicMemory = {
  id: number;
  type: string;
  title: string;
  date: string;
  tags: string[];
  duration?: string;
  docType?: string;
  imgUrl?: string;
  map?: boolean;
  color?: string;
};

const memoriesData: ClassicMemory[] = [];

const getTagStyles = (tag: any) => {
  const styles = {
    'Voice': 'bg-[#EBF3FF] text-[#2563EB]',
    'Idea': 'bg-[#E6F8F0] text-[#10B981]',
    'Document': 'bg-[#F1F5F9] text-[#64748B]',
    'Study': 'bg-[#EBF3FF] text-[#2563EB]',
    'Image': 'bg-[#EEF2FF] text-[#6366F1]',
    'Travel': 'bg-[#E6F8F0] text-[#10B981]',
    'Note': 'bg-[#FFF7ED] text-[#EA580C]',
    'Personal': 'bg-[#F3E8FF] text-[#8B5CF6]',
    'Meeting': 'bg-[#F3E8FF] text-[#8B5CF6]',
    'Work': 'bg-[#EBF3FF] text-[#2563EB]',
    'Location': 'bg-[#EBF3FF] text-[#2563EB]',
    'Client': 'bg-[#E6F8F0] text-[#10B981]',
    'Link': 'bg-[#EBF3FF] text-[#2563EB]',
    'AI': 'bg-[#EBF3FF] text-[#2563EB]',
    'Task': 'bg-[#FFF7ED] text-[#EA580C]',
    'Finance': 'bg-[#E6F8F0] text-[#10B981]',
    'Planning': 'bg-[#EBF3FF] text-[#2563EB]',
    'Development': 'bg-[#FFE4E6] text-[#E11D48]',
    'Project': 'bg-[#EBF3FF] text-[#2563EB]',
  };
  return (styles as any)[tag] || 'bg-slate-100 text-slate-600';
};

const memoryTypeMeta: Record<string, { label: string; icon: any }> = {
  voice: { label: 'Voice', icon: Mic },
  'voice-simple': { label: 'Voice', icon: Mic },
  note: { label: 'Note', icon: AlignLeft },
  document: { label: 'Document', icon: FileText },
  image: { label: 'Image', icon: ImageIcon },
  location: { label: 'Location', icon: MapPin },
  link: { label: 'Link', icon: LinkIcon },
};

const MemoryCard = ({ data, isActive, onCardClick, onPlayClick, onMoreClick }: any) => {
  const renderCardVisual = () => {
    switch(data.type) {
      case 'voice':
        return (
          <div className="h-[120px] bg-[#F4F8FF] rounded-2xl p-4 flex items-center justify-center relative border border-slate-50">
            <div className="flex items-center gap-3 w-full px-2">
              <button onClick={(e) => { e.stopPropagation(); onPlayClick(); }} className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#2563EB]">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </button>
              <div className="flex-1 flex items-center gap-[3px] justify-center h-8">
                {[3,6,4,10,14,8,4,6,12,16,10,6,4,8,4,10,14,8,4].map((h, i) => (
                  <div key={i} className="w-[3px] bg-[#2563EB] rounded-full opacity-60" style={{ height: `${h}px` }}></div>
                ))}
              </div>
              <span className="text-[12px] font-semibold text-[#2563EB]">{data.duration}</span>
            </div>
          </div>
        );
      case 'document':
        const isPdf = data.docType === 'pdf';
        return (
          <div className="h-[120px] bg-[#F8FAFC] border border-slate-100 rounded-2xl flex items-center justify-center">
            <div className="w-[150px] h-[76px] bg-white rounded-xl shadow-sm border border-slate-100 flex items-center p-3 gap-4">
              {isPdf ? <PdfIcon /> : <ExcelIcon />}
              <div className="flex-1 flex flex-col gap-2">
                <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
                <div className="w-3/4 h-1.5 bg-slate-200 rounded-full"></div>
                <div className="w-5/6 h-1.5 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="h-[120px] rounded-2xl overflow-hidden relative">
            <img src={data.imgUrl} alt={data.title} className="w-full h-full object-cover" />
          </div>
        );
      case 'location':
        if(data.map) {
          return (
             <div className="h-[120px] rounded-2xl overflow-hidden relative bg-slate-100 border border-slate-100">
               {/* Simulated Map Background */}
               <div className="absolute inset-0 opacity-40 bg-slate-200"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-8 h-8 bg-[#2563EB] rounded-full border-2 border-white flex items-center justify-center text-white shadow-md">
                   <MapPin size={16} fill="currentColor" />
                 </div>
               </div>
             </div>
          )
        }
        return (
          <div className="h-[120px] rounded-2xl overflow-hidden relative">
            <img src={data.imgUrl} alt={data.title} className="w-full h-full object-cover" />
          </div>
        );
      case 'note':
        const isGreen = data.color === 'green';
        const bgCls = isGreen ? 'bg-[#F0FDF4]' : 'bg-[#FAF5FF]';
        const iconBg = isGreen ? 'bg-[#10B981]' : 'bg-[#8B5CF6]';
        const textCls = isGreen ? 'text-white' : 'text-white';
        return (
          <div className={`h-[120px] ${bgCls} border ${isGreen ? 'border-green-50' : 'border-purple-50'} rounded-2xl p-4 flex items-center justify-center`}>
            <div className={`w-12 h-12 rounded-2xl ${iconBg} shadow-sm flex items-center justify-center ${textCls}`}>
              <AlignLeft size={24} />
            </div>
          </div>
        );
      case 'link':
        return (
          <div className="h-[120px] bg-[#FAF5FF] border border-purple-50 rounded-2xl flex items-center justify-center">
            <div className="w-12 h-12 bg-[#8B5CF6] rounded-2xl shadow-sm flex items-center justify-center text-white">
              <LinkIcon size={24} strokeWidth={2.5} />
            </div>
          </div>
        );
      case 'voice-simple':
        return (
          <div className="h-[120px] bg-[#FFF1F2] border border-rose-50 rounded-2xl flex items-center justify-center">
             <div className="w-12 h-12 bg-[#F43F5E] rounded-2xl shadow-sm flex items-center justify-center text-white">
              <Mic size={24} fill="currentColor" strokeWidth={1.5} />
            </div>
          </div>
        );
      default:
        return <div className="h-[120px] bg-slate-100 rounded-2xl"></div>;
    }
  };

  return (
    <div onClick={onCardClick} className={`bg-white rounded-[20px] p-3 shadow-sm border transition-all cursor-pointer group ${isActive ? 'border-[#2563EB] ring-1 ring-[#2563EB]' : 'border-slate-200 hover:shadow-md hover:border-slate-300'}`}>
      <div className="relative mb-3">
        {renderCardVisual()}
        <button onClick={(e) => { e.stopPropagation(); onMoreClick(); }} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-slate-100">
          <MoreVertical size={16} />
        </button>
      </div>
      <div className="px-1 pb-1">
        <h4 className="text-[15px] font-bold text-slate-900 leading-tight mb-1 truncate">{data.title}</h4>
        <p className="text-[13px] text-slate-500 mb-3">{data.date}</p>
        <div className="flex flex-wrap gap-1.5">
          {data.tags.map((tag: any, idx: any) => (
            <span key={idx} className={`inline-flex items-center text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${getTagStyles(tag)}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function PathiiMemoriesDashboard() {
  const [activeTab, setActiveTab] = useState('Transcript');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [memories, setMemories] = useState(memoriesData);
  const [sortOrder, setSortOrder] = useState('Newest first');
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleNewMemory = () => {
    const nextId = memories.reduce((max, m) => Math.max(max, m.id), 0) + 1;
    const newMemory = {
      id: nextId,
      type: 'note',
      title: 'New memory',
      date: 'Just now',
      tags: ['Note', 'Personal'],
      color: 'green',
    };
    setMemories(prev => [newMemory, ...prev]);
    setSelectedId(nextId);
    showToast('Memory created');
  };

  const filterTypes: Record<string, string[]> = {
    Voice: ['voice', 'voice-simple'],
    Notes: ['note'],
    Documents: ['document'],
    Images: ['image'],
    Links: ['link'],
    Locations: ['location'],
    People: [],
  };
  const filteredMemories = memories.filter((data) => {
    const matchesFilter =
      activeFilter === 'All' || (filterTypes[activeFilter] || []).includes(data.type);
    const matchesSearch = data.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selectedMemory = memories.find(m => m.id === selectedId) || memories[0] || null;
  const selectedTypeMeta = selectedMemory
    ? memoryTypeMeta[selectedMemory.type] || { label: 'Memory', icon: Database }
    : null;
  const TypeIcon = selectedTypeMeta?.icon;
  const selectedIsVoice = selectedMemory?.type === 'voice' || selectedMemory?.type === 'voice-simple';

  return (
    <div className="flex min-h-screen lg:h-screen bg-[#F4F7F9] font-sans lg:overflow-hidden text-slate-900 antialiased selection:bg-blue-100">
      
      {/* Sidebar - perfectly flush layout */}
      <aside className="w-[260px] bg-[#F8FAFC] flex flex-col flex-shrink-0 border-r border-slate-200/60 z-10">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 pt-6 pb-8 px-6">
          <div className="text-[#2563EB]">
            <BrainLogo className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight">Pathii</h1>
            <p className="text-[12px] text-slate-500 font-medium">AI Memory Assistant</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
          <SidebarItem icon={Home} label="Dashboard" href="/" />
          <SidebarItem icon={Mic} label="Voice Capture" href="/voice-capture" />
          <SidebarItem icon={Database} label="Memories" active href="/memories" />
          <SidebarItem icon={CheckSquare} label="Tasks & Schedule" href="/tasks" />
          <SidebarItem icon={Calendar} label="Calendar" href="/calendar" />
          <SidebarItem icon={FileText} label="Documents" href="/documents" />
          <SidebarItem icon={Users} label="People" href="/people" />
          <SidebarItem icon={LinkIcon} label="Integrations" href="/integrations" />
          <SidebarItem icon={BarChart2} label="Insights" href="/insights" />
          <SidebarItem icon={Settings} label="Settings" href="/settings" />
        </nav>

        {/* User Profile */}
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

      {}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F7F9]">
        
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-full max-w-[480px] lg:w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search memories, people, locations, or content..."
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

        {}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6 max-lg:flex-col">
          
          {/* Left Column: Grid Section */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            
            {/* Title & Actions */}
            <div className="flex items-center justify-between mb-6 max-lg:flex-col max-lg:items-start max-lg:gap-4">
              <div>
                <h2 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight mb-1">Memories</h2>
                <p className="text-[14.5px] text-slate-500 font-medium">All your thoughts, ideas, files, and conversations in one place.</p>
              </div>
              <div className="flex shadow-sm rounded-lg overflow-hidden">
                <button 
                  onClick={handleNewMemory}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2.5 text-[14px] font-semibold flex items-center gap-2 transition-colors border-r border-blue-600/50"
                >
                  <Plus size={18} /> New Memory
                </button>
                <button 
                  onClick={() => showToast('Choose memory type: voice, note, document, image or link')}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white px-3 py-2.5 transition-colors"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex items-center justify-between mb-6 max-lg:flex-col max-lg:items-start max-lg:gap-4">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide max-lg:flex-wrap">
                {['All', 'Notes', 'Voice', 'Images', 'Documents', 'Links', 'Locations', 'People'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap ${
                      activeFilter === filter
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 pl-4">
                <button 
                  onClick={() => {
                    const next = sortOrder === 'Newest first' ? 'Oldest first' : 'Newest first';
                    setSortOrder(next);
                    showToast(`Sorted: ${next}`);
                  }}
                  className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
                >
                  <ArrowDownUp size={14} className="text-slate-500" />
                  {sortOrder}
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                  <button onClick={() => showToast('Grid view active')} className="p-1.5 bg-[#EBF3FF] text-[#2563EB] rounded-md"><Grid size={16} /></button>
                  <button onClick={() => showToast('List view active')} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"><ListIcon size={16} /></button>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
                {filteredMemories.length > 0 ? filteredMemories.map((data) => (
                  <MemoryCard
                    key={data.id}
                    data={data}
                    isActive={selectedMemory?.id === data.id}
                    onCardClick={() => {
                      setSelectedId(data.id);
                      showToast(`Opening '${data.title}'`);
                    }}
                    onPlayClick={() => showToast(`Playing '${data.title}'`)}
                    onMoreClick={() => showToast(`More options for '${data.title}'`)}
                  />
                )) : (
                  <div className="md:col-span-2 lg:col-span-3">
                    <EmptyState icon={Database} title="No memories yet" subtitle="Memories you create will appear here." />
                  </div>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="w-[400px] bg-white rounded-[24px] border border-slate-200 shadow-sm flex flex-col flex-shrink-0 h-full overflow-hidden max-lg:w-full">
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {selectedMemory ? (
              <>
              {/* Header Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-[13px] font-medium text-slate-500">
                  <span className="flex items-center gap-1.5 bg-[#EBF3FF] text-[#2563EB] px-2.5 py-1 rounded-md font-bold">
                    {TypeIcon && <TypeIcon size={14} />} {selectedTypeMeta?.label}
                  </span>
                  {selectedMemory.date}
                </div>
                <button onClick={() => showToast('Details panel closed')} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-[22px] font-bold text-slate-900 leading-tight mb-5 tracking-tight">{selectedMemory.title}</h2>

              {/* Audio Player Component (voice memories only) */}
              {selectedIsVoice && (
              <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-4 mb-6 border border-slate-100">
                <button
                  onClick={() => {
                    setIsPlayerPlaying(!isPlayerPlaying);
                    showToast(isPlayerPlaying ? 'Paused' : `Playing '${selectedMemory.title}'`);
                  }}
                  className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0 text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  <Play size={18} fill="currentColor" className="ml-1" />
                </button>
                <div className="flex-1 flex items-center gap-[2.5px]">
                  {[4,6,10,14,8,4,8,12,18,24,18,12,8,4,6,8,14,20,14,8,4,6,4,6,10,6].map((h, i) => (
                    <div key={i} className={`w-[3px] rounded-full ${i < 12 ? 'bg-[#2563EB]' : 'bg-slate-200'}`} style={{ height: `${h}px` }}></div>
                  ))}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[12px] font-semibold text-slate-500">00:00 / {selectedMemory.duration ?? '0:00'}</span>
                  <div className="bg-slate-200 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-md">1x</div>
                </div>
              </div>
              )}

              {/* Tabs aligned precisely with flex container and bottom border */}
              <div className="flex gap-6 border-b border-slate-200 mb-6">
                {['Transcript', 'Summary', 'AI Insights', 'Related'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[14px] font-semibold transition-colors border-b-2 -mb-[1px] ${
                      activeTab === tab 
                        ? 'border-[#2563EB] text-[#2563EB]' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Transcript Text */}
              <div className="mb-8">
                <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
                  So I was thinking we can build a personal AI memory assistant that helps users save their notes, documents, and conversations. It should also connect with calendar and email, and give reminders. We can start with a web app and later add a mobile app and a wearable device...
                </p>
                <div className="flex justify-end">
                  <button onClick={() => showToast('Transcript editing enabled')} className="flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                    <Edit2 size={14} /> Edit Transcript
                  </button>
                </div>
              </div>

              {/* Extracted Items */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-bold text-slate-900">Extracted Items</h3>
                  <button onClick={() => showToast('New extracted item editor opened')} className="flex items-center gap-1 text-[#2563EB] text-[13px] font-semibold hover:bg-blue-50 px-2 py-1 rounded-md transition-colors">
                    <Plus size={14} /> Add
                  </button>
                </div>
                
                <div className="space-y-3">
                  {/* Task Item */}
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-[#10B981] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E6F8F0] flex items-center justify-center text-[#10B981]">
                        <CheckCircle2 size={18} fill="#10B981" className="text-white" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-slate-900">Build AI memory assistant</p>
                        <p className="text-[12px] text-[#10B981] font-medium">Task</p>
                      </div>
                    </div>
                    {/* Perfect alignment checkbox */}
                    <button onClick={() => showToast('Task "Build AI memory assistant" completed')} className="w-5 h-5 rounded-md border-2 border-slate-200 mr-1 group-hover:border-[#10B981] transition-colors"></button>
                  </div>

                  {/* Event Item */}
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-[#F43F5E] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FFE4E6] flex items-center justify-center text-[#F43F5E]">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-slate-900">Discuss with team next week</p>
                        <p className="text-[12px] text-[#F43F5E] font-medium">Event</p>
                      </div>
                    </div>
                    <button onClick={() => showToast('Event "Discuss with team next week" added to calendar')} className="w-5 h-5 rounded-md border-2 border-slate-200 mr-1 group-hover:border-[#F43F5E] transition-colors"></button>
                  </div>

                  {/* Note Item */}
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-[#2563EB] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#2563EB]">
                        <FileText size={18} fill="currentColor" className="text-[#EBF3FF]" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-slate-900">Feature ideas and requirements</p>
                        <p className="text-[12px] text-[#2563EB] font-medium">Note</p>
                      </div>
                    </div>
                    <button onClick={() => showToast('Note "Feature ideas and requirements" saved')} className="w-5 h-5 rounded-md border-2 border-slate-200 mr-1 group-hover:border-[#2563EB] transition-colors"></button>
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[16px] font-bold text-slate-900">Tags</h3>
                  <button onClick={() => showToast('Tag editor opened')} className="text-[#2563EB] text-[13px] font-semibold hover:underline">
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedMemory.tags.map((tag, idx) => (
                    <span key={idx} className={`inline-flex items-center text-[12px] font-semibold px-3 py-1 rounded-full ${getTagStyles(tag)}`}>
                      {tag}
                    </span>
                  ))}
                  <button onClick={() => showToast('Add a tag to this memory')} className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              </>
              ) : (
                <EmptyState icon={FileText} title="No memory selected" subtitle="Add a memory to see its details here." />
              )}

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