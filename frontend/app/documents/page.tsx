"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreVertical, Plus, ChevronDown, Download, Maximize2, Minus, RotateCcw,
  Sparkles, Folder, File, Image as ImageIcon, Clock,
  FileType2, Maximize, PlaySquare, CloudUpload
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

const EmptyState = ({ icon: Icon, title, subtitle }: any) => (
  <div className="flex flex-col items-center justify-center text-center py-12">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
      <Icon size={22} className="text-slate-400" strokeWidth={2} />
    </div>
    <p className="text-[15px] font-semibold text-slate-700">{title}</p>
    <p className="text-[13px] text-slate-400 mt-1">{subtitle}</p>
  </div>
);

const FilterPill = ({ label, active, onClick }: any) => (
  <button onClick={onClick} className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border shadow-sm ${
    active ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
  }`}>
    {label}
  </button>
);

const StatCard = ({ icon: Icon, count, label, colorClass, iconColorClass }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass} ${iconColorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-[22px] font-extrabold text-slate-900 leading-none mb-1">{count}</h3>
      <p className="text-[12px] font-semibold text-slate-500">{label}</p>
    </div>
  </div>
);

const FileCard = ({ type, title, meta, badge, badgeColor, preview, onOpen, onMore }: any) => {
  if (type === 'folder') {
    return (
      <div onClick={onOpen} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group flex flex-col h-[160px]">
        <div className="flex justify-between items-start mb-auto">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12C4 8.68629 6.68629 6 10 6H17.1716C18.7628 6 20.2889 6.63214 21.4142 7.75736L24 10.3431C24.7502 11.0934 25.7676 11.5147 26.8284 11.5147H38C41.3137 11.5147 44 14.201 44 17.5147V36C44 39.3137 41.3137 42 38 42H10C6.68629 42 4 39.3137 4 36V12Z" fill="#FCD34D"/>
            <path d="M4 16C4 13.7909 5.79086 12 8 12H40C42.2091 12 44 13.7909 44 16V36C44 39.3137 41.3137 42 38 42H10C6.68629 42 4 39.3137 4 36V16Z" fill="#FBBF24"/>
          </svg>
          <button onClick={(e) => { e.stopPropagation(); onMore(); }} className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-700 transition-opacity">
            <MoreVertical size={16} />
          </button>
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-slate-900 leading-tight mb-0.5 truncate">{title}</h4>
          <p className="text-[11px] font-medium text-slate-500">{meta}</p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onOpen} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group flex flex-col h-[200px]">
      <div className="bg-slate-50 rounded-xl flex-1 mb-3 relative overflow-hidden flex items-center justify-center border border-slate-100">
        {/* Mock Preview Content based on type */}
        {preview === 'pdf' && (
           <div className="w-16 h-20 bg-white shadow-sm border border-slate-200 p-2 flex flex-col gap-1">
             <div className="h-1.5 w-3/4 bg-slate-200 rounded"></div>
             <div className="h-1 w-full bg-slate-100 rounded"></div>
             <div className="h-1 w-full bg-slate-100 rounded"></div>
             <div className="h-1 w-5/6 bg-slate-100 rounded"></div>
           </div>
        )}
        {preview === 'doc' && (
           <div className="w-16 h-20 bg-white shadow-sm border border-slate-200 p-2 flex flex-col gap-1">
             <div className="h-1.5 w-full bg-blue-100 rounded"></div>
             <div className="h-1 w-full bg-slate-200 rounded"></div>
             <div className="h-1 w-full bg-slate-200 rounded"></div>
             <div className="h-1 w-4/5 bg-slate-200 rounded"></div>
           </div>
        )}
        {preview === 'xls' && (
           <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 flex flex-col">
             <div className="h-3 w-full bg-emerald-100 border-b border-emerald-200"></div>
             <div className="flex-1 flex gap-0.5 p-0.5">
                <div className="flex-1 bg-slate-100"></div><div className="flex-1 bg-slate-100"></div>
             </div>
           </div>
        )}
        {preview === 'img' && (
           <div className="w-full h-full bg-purple-100 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-indigo-100"></div>
           </div>
        )}
        {preview === 'ppt' && (
           <div className="w-20 h-14 bg-slate-900 rounded-sm shadow-sm flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-10 h-10 bg-orange-500 rounded-full blur-xl opacity-50 translate-x-3 -translate-y-3"></div>
             <span className="text-white text-[8px] font-bold z-10">Pathii</span>
           </div>
        )}
        {preview === 'txt' && (
           <div className="w-16 h-20 bg-white shadow-sm border border-slate-200 p-3 flex flex-col gap-1.5 justify-center">
             <div className="h-1 w-full bg-slate-300 rounded"></div>
             <div className="h-1 w-full bg-slate-300 rounded"></div>
             <div className="h-1 w-2/3 bg-slate-300 rounded"></div>
           </div>
        )}

        <button onClick={(e) => { e.stopPropagation(); onMore(); }} className="absolute top-2 right-2 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-700 transition-opacity bg-white/80 rounded-md p-0.5">
          <MoreVertical size={14} />
        </button>
        <div className={`absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold text-white ${badgeColor} shadow-sm uppercase`}>
          {badge}
        </div>
      </div>
      <div>
        <h4 className="text-[13px] font-bold text-slate-900 leading-tight mb-0.5 truncate">{title}</h4>
        <p className="text-[11px] font-medium text-slate-500">{meta}</p>
      </div>
    </div>
  );
};

const ListItem = ({ name, icon: Icon, iconColorClass, iconBgClass, type, size, modified, onOpen, onDownload, onMore }: any) => (
  <div onClick={onOpen} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-3 w-[40%]">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
        <Icon size={16} />
      </div>
      <span className="text-[14px] font-bold text-slate-900 truncate">{name}</span>
    </div>
    <div className="w-[20%] text-[13px] font-medium text-slate-500">{type}</div>
    <div className="w-[15%] text-[13px] font-medium text-slate-500">{size}</div>
    <div className="w-[20%] text-[13px] font-medium text-slate-500">{modified}</div>
    <div className="w-[5%] flex justify-end gap-2 text-slate-400">
      <button onClick={(e) => { e.stopPropagation(); onDownload(); }} className="hover:text-slate-700 transition-colors"><Download size={16}/></button>
      <button onClick={(e) => { e.stopPropagation(); onMore(); }} className="hover:text-slate-700 transition-colors"><MoreVertical size={16}/></button>
    </div>
  </div>
);

const documentFilters = ['All', 'PDF', 'Docs', 'Images', 'Spreadsheets', 'Presentations', 'Text Files', 'Other'];

const filterBadgeMap: Record<string, string> = {
  PDF: 'PDF',
  Docs: 'DOC',
  Images: 'IMG',
  Spreadsheets: 'XLS',
  Presentations: 'PPT',
  'Text Files': 'TXT',
  Other: 'OTHER',
};

type DocumentItem = {
  id: number;
  type: string;
  title: string;
  meta: string;
  badge?: string;
  badgeColor?: string;
  preview?: string;
};

const documentsData: DocumentItem[] = [];

type RecentDocument = {
  id: number;
  name: string;
  icon: any;
  iconBgClass: string;
  iconColorClass: string;
  type: string;
  badge: string;
  size: string;
  modified: string;
};

const recentDocuments: RecentDocument[] = [];

const downloadCsv = (filename: string, rows: (string | number)[][]) => {
  const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function PathiiDocumentsDashboard() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('All');

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState('pdf');
  const [docsList, setDocsList] = useState(documentsData);

  const handleAction = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    const badgeType = newDocType.toUpperCase();
    const newEntry = {
      id: Date.now(),
      title: newDocTitle.trim(),
      type: 'file',
      preview: newDocType,
      meta: '1.2 MB • Today',
      badge: badgeType,
      badgeColor: badgeType === 'PDF' ? 'bg-red-500' : badgeType === 'DOC' ? 'bg-blue-500' : 'bg-emerald-500'
    };
    setDocsList([newEntry, ...docsList]);
    setNewDocTitle('');
    setIsUploadModalOpen(false);
    handleAction(`Uploaded "${newEntry.title}" successfully!`);
  };

  const visibleDocuments = docsList.filter((doc) => {
    const matchesFilter = activeFilter === 'All' || doc.badge === filterBadgeMap[activeFilter];
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const visibleRecentDocuments = recentDocuments.filter((doc) => {
    const matchesFilter = activeFilter === 'All' || doc.badge === filterBadgeMap[activeFilter];
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pdfCount = docsList.filter((doc) => doc.badge === 'PDF').length;
  const docsCount = docsList.filter((doc) => doc.badge === 'DOC').length;
  const imagesCount = docsList.filter((doc) => doc.badge === 'IMG').length;
  const linksCount = docsList.filter((doc) => doc.badge && !['PDF', 'DOC', 'IMG'].includes(doc.badge)).length;
  const selectedDoc = docsList[0] || null;

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-900 antialiased selection:bg-blue-100">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#F8FAFC] flex flex-col flex-shrink-0 border-r border-slate-200/60 z-20 sticky top-0 h-screen">
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
          <SidebarItem icon={FileText} label="Documents" active href="/documents" />
          <SidebarItem icon={Users} label="People" href="/people" />
          <SidebarItem icon={LinkIcon} label="Integrations" href="/integrations" />
          <SidebarItem icon={BarChart2} label="Insights" href="/insights" />
          <SidebarItem icon={Settings} label="Settings" href="/settings" />
        </nav>

        <div className="p-4 border-t border-slate-200/60 mt-auto">
          <div onClick={() => handleAction('Account settings opened')} className="flex items-center justify-between cursor-pointer hover:bg-slate-100 p-2 rounded-xl transition-colors">
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
        
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 sticky top-0 z-20 bg-[#F4F7F9]/95 backdrop-blur-sm border-b border-slate-200/40">
          <div className="relative w-full max-w-[520px] lg:w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search documents, files, or ask anything..."
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-shrink-0">
            <button onClick={() => handleAction('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <div onClick={() => handleAction('Profile menu opened')} className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[13px] shadow-sm cursor-pointer border border-slate-200">A</div>
          </div>
        </header>

        {actionFeedback && (
          <div className="mx-8 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-bold rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-600" />
              <span>{actionFeedback}</span>
            </div>
            <button onClick={() => setActionFeedback(null)} className="text-emerald-600 hover:text-emerald-900 text-xs font-semibold">✕</button>
          </div>
        )}

        <div className="flex-1 px-8 py-6 flex gap-6 flex-col xl:flex-row pb-20">

          {/* Left Column (Documents Center) */}
          <div className="flex-1 flex flex-col min-w-0 pr-2 pb-4">

            {/* Header Area */}
            <div className="flex items-start justify-between mb-6 max-lg:flex-wrap max-lg:gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-sm">
                     <FileText size={18} />
                   </div>
                   <h2 className="text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight">Documents</h2>
                </div>
                <p className="text-[15px] text-slate-500 font-medium ml-10">Store, organize and find all your files with AI.</p>
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-all shadow-sm"
              >
                <Plus size={18} />
                Upload
                <span className="w-px h-4 bg-blue-400 mx-1"></span>
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap py-1">
              {documentFilters.map((filter) => (
                <FilterPill
                  key={filter}
                  label={filter}
                  active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <StatCard icon={FileText} count={pdfCount} label="PDF Files" colorClass="bg-red-50" iconColorClass="text-red-500" />
              <StatCard icon={File} count={docsCount} label="Documents" colorClass="bg-blue-50" iconColorClass="text-blue-500" />
              <StatCard icon={ImageIcon} count={imagesCount} label="Images" colorClass="bg-emerald-50" iconColorClass="text-emerald-500" />
              <StatCard icon={LinkIcon} count={linksCount} label="Links & Others" colorClass="bg-purple-50" iconColorClass="text-purple-500" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              {visibleDocuments.length > 0 ? visibleDocuments.map((doc) => (
                <FileCard
                  key={doc.id}
                  type={doc.type}
                  title={doc.title}
                  meta={doc.meta}
                  badge={doc.badge}
                  badgeColor={doc.badgeColor}
                  preview={doc.preview}
                  onOpen={() => handleAction(doc.type === 'folder' ? `Opening folder '${doc.title}'` : `Opening '${doc.title}'`)}
                  onMore={() => handleAction(`More options for '${doc.title}'`)}
                />
              )) : (
                <div className="col-span-full bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <EmptyState icon={Folder} title="No documents yet" subtitle="Files you upload will appear here." />
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-[#2563EB]" />
                  <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight">Recent Documents</h3>
                </div>
                <button onClick={() => handleAction('Showing all documents')} className="text-[13px] font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">
                  View all <ChevronRight size={14} />
                </button>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between py-2 px-2 text-[12px] font-bold text-slate-400 border-b border-slate-100 uppercase tracking-wider">
                  <div className="w-[40%]">Name</div>
                  <div className="w-[20%]">Type</div>
                  <div className="w-[15%]">Size</div>
                  <div className="w-[20%]">Modified</div>
                  <div className="w-[5%] text-right">Actions</div>
                </div>
                
                {visibleRecentDocuments.length > 0 ? visibleRecentDocuments.map((doc) => (
                  <ListItem
                    key={doc.id}
                    name={doc.name}
                    icon={doc.icon}
                    iconBgClass={doc.iconBgClass}
                    iconColorClass={doc.iconColorClass}
                    type={doc.type}
                    size={doc.size}
                    modified={doc.modified}
                    onOpen={() => handleAction(`Opening '${doc.name}'`)}
                    onDownload={() => {
                      downloadCsv(`${doc.name}.csv`, [
                        ['Name', 'Type', 'Size', 'Modified'],
                        [doc.name, doc.type, doc.size, doc.modified],
                      ]);
                      handleAction(`Downloaded '${doc.name}' info`);
                    }}
                    onMore={() => handleAction(`More options for '${doc.name}'`)}
                  />
                )) : (
                  <EmptyState icon={Clock} title="No documents yet" subtitle="Documents you open will be listed here." />
                )}
              </div>
            </div>

          </div>

          <div className="w-full xl:w-[380px] bg-white rounded-[24px] border border-slate-200 shadow-sm flex flex-col flex-shrink-0 h-fit">
            
            {selectedDoc ? (
            <>
            {/* File Preview Area */}
            <div className="bg-slate-100 h-[240px] m-2 rounded-2xl relative flex items-center justify-center overflow-hidden border border-slate-200 group">
              <button 
                onClick={() => handleAction('Full-screen preview toggled')}
                className="absolute top-3 right-3 w-8 h-8 bg-slate-900/40 hover:bg-slate-900/60 text-white rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100"
              >
                <Maximize2 size={16} />
              </button>
              
              {/* Mock Document Content */}
              <div className="w-[85%] h-[90%] bg-white rounded-md shadow-md p-6 flex flex-col relative overflow-hidden">
                <h4 className="text-[16px] font-extrabold text-slate-800 mb-2 leading-tight">{selectedDoc.title}</h4>
                <div className="space-y-1.5 w-3/4">
                  <div className="h-1 bg-slate-200 rounded w-full"></div>
                  <div className="h-1 bg-slate-200 rounded w-[90%]"></div>
                  <div className="h-1 bg-slate-200 rounded w-[80%]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-[150%] h-[120px] translate-y-8 translate-x-4">
                  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50C40 20 60 80 100 50C140 20 180 60 200 40V100H0V50Z" fill="#E0E7FF" opacity="0.6"/>
                    <path d="M0 60C30 40 70 90 120 50C160 20 180 70 200 50V100H0V60Z" fill="#818CF8" opacity="0.8"/>
                    <path d="M0 70C50 60 80 100 140 60C170 40 190 80 200 70V100H0V70Z" fill="#4F46E5" />
                  </svg>
                </div>
              </div>

              {/* Float Controls */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-4 text-white shadow-lg">
                <div className="text-[11px] font-semibold opacity-90">1 <ChevronDown size={10} className="inline ml-1" /></div>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center gap-3 opacity-80">
                  <button onClick={() => handleAction('Zoom decreased')} className="hover:opacity-100 transition-opacity"><Minus size={14}/></button>
                  <span className="text-[11px] font-semibold">80%</span>
                  <button onClick={() => handleAction('Zoom increased')} className="hover:opacity-100 transition-opacity"><Plus size={14}/></button>
                </div>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center gap-3 opacity-80">
                  <button onClick={() => handleAction('Maximized preview')} className="hover:opacity-100 transition-opacity"><Maximize size={14}/></button>
                  <button onClick={() => handleAction('Reset view')} className="hover:opacity-100 transition-opacity"><RotateCcw size={14}/></button>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-b border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-extrabold text-slate-900 leading-snug">{selectedDoc.title}</h3>
                    <p className="text-[13px] text-slate-500 font-medium mt-0.5">{selectedDoc.meta}</p>
                  </div>
                </div>
                <button onClick={() => handleAction(`More options for '${selectedDoc.title}'`)} className="text-slate-400 hover:text-slate-600"><MoreVertical size={18}/></button>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleAction(`Opening ${selectedDoc.title}...`)}
                  className="flex-1 bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-bold text-[13px] py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Maximize2 size={16} /> Open
                </button>
                <button 
                  onClick={() => handleAction(`Downloading ${selectedDoc.title}...`)}
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-[13px] py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
            </>
            ) : (
              <div className="m-2 flex flex-col items-center justify-center text-center py-16">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <FileText size={24} className="text-slate-400" strokeWidth={2} />
                </div>
                <p className="text-[15px] font-semibold text-slate-700">No document selected</p>
                <p className="text-[13px] text-slate-400 mt-1">Upload or open a document to preview it here.</p>
              </div>
            )}
          </div>

        </div>

        {/* Upload Document Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <CloudUpload size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-slate-900">Upload Document</h3>
                    <p className="text-[12px] text-slate-500 font-medium">Add a new file to your Pathii library</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddDoc} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Q3 Financial Report.pdf"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1">File Type</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="doc">Word Document</option>
                    <option value="xls">Spreadsheet / Excel</option>
                    <option value="ppt">Presentation</option>
                    <option value="txt">Text File</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50">
                  <FileText className="mx-auto text-blue-500 mb-2" size={32} />
                  <p className="text-[13px] font-semibold text-slate-700">Drag and drop file here or click to browse</p>
                  <p className="text-[11px] text-slate-400 mt-1">PDF, DOC, XLS up to 25MB</p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[13px] font-bold rounded-xl shadow-sm shadow-blue-200 transition-all"
                  >
                    Upload File
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
