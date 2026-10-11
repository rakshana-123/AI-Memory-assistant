import React from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreVertical, Plus, ChevronDown, Download, Maximize2, Minus, RotateCcw, 
  Sparkles, Folder, File, Image as ImageIcon, FileSpreadsheet, Tag, Clock,
  CheckCircle2, FileType2, Maximize, PlaySquare
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

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-100 font-medium'}`}>
    <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
    <span className="text-[14px]">{label}</span>
  </div>
);

const FilterPill = ({ label, active }) => (
  <button className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border shadow-sm ${
    active ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
  }`}>
    {label}
  </button>
);

const StatCard = ({ icon: Icon, count, label, colorClass, iconColorClass }) => (
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

const FileCard = ({ type, title, meta, badge, badgeColor, preview }) => {
  if (type === 'folder') {
    return (
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group flex flex-col h-[160px]">
        <div className="flex justify-between items-start mb-auto">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12C4 8.68629 6.68629 6 10 6H17.1716C18.7628 6 20.2889 6.63214 21.4142 7.75736L24 10.3431C24.7502 11.0934 25.7676 11.5147 26.8284 11.5147H38C41.3137 11.5147 44 14.201 44 17.5147V36C44 39.3137 41.3137 42 38 42H10C6.68629 42 4 39.3137 4 36V12Z" fill="#FCD34D"/>
            <path d="M4 16C4 13.7909 5.79086 12 8 12H40C42.2091 12 44 13.7909 44 16V36C44 39.3137 41.3137 42 38 42H10C6.68629 42 4 39.3137 4 36V16Z" fill="#FBBF24"/>
          </svg>
          <button className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-700 transition-opacity">
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
    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group flex flex-col h-[200px]">
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

        <button className="absolute top-2 right-2 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-700 transition-opacity bg-white/80 rounded-md p-0.5">
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

const ListItem = ({ name, icon: Icon, iconColorClass, iconBgClass, type, size, modified }) => (
  <div className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border-b border-slate-100 last:border-0">
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
      <button className="hover:text-slate-700 transition-colors"><Download size={16}/></button>
      <button className="hover:text-slate-700 transition-colors"><MoreVertical size={16}/></button>
    </div>
  </div>
);

export default function PathiiDocumentsDashboard() {
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
          <SidebarItem icon={Home} label="Dashboard" />
          <SidebarItem icon={Mic} label="Voice Capture" />
          <SidebarItem icon={Database} label="Memories" />
          <SidebarItem icon={CheckSquare} label="Tasks & Schedule" />
          <SidebarItem icon={CalendarIcon} label="Calendar" />
          <SidebarItem icon={FileText} label="Documents" active />
          <SidebarItem icon={Users} label="People" />
          <SidebarItem icon={LinkIcon} label="Integrations" />
          <SidebarItem icon={BarChart2} label="Insights" />
          <SidebarItem icon={Settings} label="Settings" />
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
        
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search documents, files, or ask anything..." 
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1.5 w-3.5 h-3.5 bg-[#F43F5E] border-2 border-[#F4F7F9] rounded-full flex items-center justify-center text-[8px] font-bold text-white">2</span>
            </button>
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-9 h-9 rounded-full object-cover shadow-sm cursor-pointer border border-slate-200" />
          </div>
        </header>

        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6">
          
          {/* Left Column (Documents Center) */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
            
            {/* Header Area */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-sm">
                     <FileText size={18} />
                   </div>
                   <h2 className="text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight">Documents</h2>
                </div>
                <p className="text-[15px] text-slate-500 font-medium ml-10">Store, organize and find all your files with AI.</p>
              </div>
              <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm">
                <Plus size={18} />
                Upload
                <span className="w-px h-4 bg-blue-400 mx-1"></span>
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide py-1">
              <FilterPill label="All" active />
              <FilterPill label="PDF" />
              <FilterPill label="Docs" />
              <FilterPill label="Images" />
              <FilterPill label="Spreadsheets" />
              <FilterPill label="Presentations" />
              <FilterPill label="Text Files" />
              <FilterPill label="Other" />
            </div>

            <div className="flex gap-4 mb-8">
              <StatCard icon={FileText} count="12" label="PDF Files" colorClass="bg-red-50" iconColorClass="text-red-500" />
              <StatCard icon={File} count="18" label="Documents" colorClass="bg-blue-50" iconColorClass="text-blue-500" />
              <StatCard icon={ImageIcon} count="9" label="Images" colorClass="bg-emerald-50" iconColorClass="text-emerald-500" />
              <StatCard icon={LinkIcon} count="6" label="Links & Others" colorClass="bg-purple-50" iconColorClass="text-purple-500" />
            </div>

            <div className="grid grid-cols-5 gap-4 mb-10">
              <FileCard type="folder" title="Project Reports" meta="12 files" />
              <FileCard type="folder" title="Research Papers" meta="8 files" />
              <FileCard type="folder" title="Meeting Notes" meta="15 files" />
              <FileCard type="file" title="AI Research Paper.pdf" meta="Oct 10, 2024" badge="PDF" badgeColor="bg-red-500" preview="pdf" />
              <FileCard type="file" title="Project Plan.docx" meta="Oct 8, 2024" badge="DOC" badgeColor="bg-blue-500" preview="doc" />
              
              <FileCard type="file" title="Budget Sheet.xlsx" meta="Oct 7, 2024" badge="XLS" badgeColor="bg-emerald-500" preview="xls" />
              <FileCard type="file" title="Whiteboard Notes.png" meta="Oct 6, 2024" badge="IMG" badgeColor="bg-purple-500" preview="img" />
              <FileCard type="file" title="Client Proposal.pdf" meta="Oct 5, 2024" badge="PDF" badgeColor="bg-red-500" preview="pdf" />
              <FileCard type="file" title="Pitch Deck.pptx" meta="Oct 1, 2024" badge="PPT" badgeColor="bg-orange-500" preview="ppt" />
              <FileCard type="file" title="Ideas.txt" meta="Sep 28, 2024" badge="TXT" badgeColor="bg-slate-500" preview="txt" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-[#2563EB]" />
                  <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight">Recent Documents</h3>
                </div>
                <button className="text-[13px] font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">
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
                
                <ListItem name="AI Research Paper.pdf" icon={FileText} iconBgClass="bg-red-100" iconColorClass="text-red-500" type="PDF" size="2.4 MB" modified="Today, 10:42 AM" />
                <ListItem name="Project Plan.docx" icon={File} iconBgClass="bg-blue-100" iconColorClass="text-blue-500" type="Document" size="1.1 MB" modified="Oct 8, 2024" />
                <ListItem name="Budget Sheet.xlsx" icon={FileSpreadsheet} iconBgClass="bg-emerald-100" iconColorClass="text-emerald-500" type="Spreadsheet" size="900 KB" modified="Oct 7, 2024" />
                <ListItem name="Whiteboard Notes.png" icon={ImageIcon} iconBgClass="bg-purple-100" iconColorClass="text-purple-500" type="Image" size="1.8 MB" modified="Oct 6, 2024" />
                <ListItem name="Client Proposal.pdf" icon={FileText} iconBgClass="bg-red-100" iconColorClass="text-red-500" type="PDF" size="3.2 MB" modified="Oct 5, 2024" />
              </div>
            </div>

          </div>

          <div className="w-[380px] bg-white rounded-[24px] border border-slate-200 shadow-sm flex flex-col flex-shrink-0 overflow-y-auto custom-scrollbar h-full">
            
            {/* File Preview Area */}
            <div className="bg-slate-100 h-[240px] m-2 rounded-2xl relative flex items-center justify-center overflow-hidden border border-slate-200 group">
              <button className="absolute top-3 right-3 w-8 h-8 bg-slate-900/40 hover:bg-slate-900/60 text-white rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100">
                <Maximize2 size={16} />
              </button>
              
              {/* Mock Document Content */}
              <div className="w-[85%] h-[90%] bg-white rounded-md shadow-md p-6 flex flex-col relative overflow-hidden">
                <h4 className="text-[16px] font-extrabold text-slate-800 mb-2 leading-tight">AI Research Paper</h4>
                <p className="text-[8px] text-slate-400 mb-4 uppercase tracking-widest font-semibold">Exploring the Future of Personal AI Assistants</p>
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
                <div className="text-[11px] font-semibold opacity-90">1 <span className="opacity-50">/ 12</span> <ChevronDown size={10} className="inline ml-1" /></div>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center gap-3 opacity-80">
                  <button className="hover:opacity-100 transition-opacity"><Minus size={14}/></button>
                  <span className="text-[11px] font-semibold">80%</span>
                  <button className="hover:opacity-100 transition-opacity"><Plus size={14}/></button>
                </div>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center gap-3 opacity-80">
                  <button className="hover:opacity-100 transition-opacity"><Maximize size={14}/></button>
                  <button className="hover:opacity-100 transition-opacity"><RotateCcw size={14}/></button>
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
                    <h3 className="text-[18px] font-extrabold text-slate-900 leading-snug">AI Research Paper.pdf</h3>
                    <p className="text-[13px] text-slate-500 font-medium mt-0.5">2.4 MB • Oct 10, 2024</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18}/></button>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[13px] py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Maximize2 size={16} /> Open
                </button>
                <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[13px] py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Download size={16} /> Download
                </button>
              </div>
            </div>

            <div className="px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-[#6366F1]" />
                <h4 className="text-[14px] font-bold text-slate-900">AI Summary</h4>
              </div>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-4">
                This paper discusses the role of AI in personal memory assistants, focusing on how multimodal inputs (text, voice, images) can improve information retrieval and productivity.
              </p>
              <div>
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wide mb-2 block">Key Topics</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[12px] font-semibold">AI</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[12px] font-semibold">Memory</span>
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-[12px] font-semibold">Productivity</span>
                  <span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-[12px] font-semibold">RAG</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[12px] font-semibold">Personal Assistant</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare size={16} className="text-slate-700" />
                <h4 className="text-[14px] font-bold text-slate-900">Extracted Items</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between group">
                  <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                       <CheckCircle2 size={16} />
                     </div>
                     <div>
                       <p className="text-[13px] font-bold text-slate-900 leading-tight">Create research summary</p>
                       <p className="text-[11px] text-slate-500 font-medium">Task</p>
                     </div>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={12} /> Add
                  </button>
                </div>

                <div className="flex items-start justify-between group">
                  <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                       <CalendarIcon size={16} />
                     </div>
                     <div>
                       <p className="text-[13px] font-bold text-slate-900 leading-tight">Follow up with team</p>
                       <p className="text-[11px] text-slate-500 font-medium">Event</p>
                     </div>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={12} /> Add
                  </button>
                </div>

                <div className="flex items-start justify-between group">
                  <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                       <FileText size={16} />
                     </div>
                     <div>
                       <p className="text-[13px] font-bold text-slate-900 leading-tight">Key findings</p>
                       <p className="text-[11px] text-slate-500 font-medium">Note</p>
                     </div>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={12} /> Add
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 pb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-slate-700" />
                  <h4 className="text-[14px] font-bold text-slate-900">Tags</h4>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold cursor-pointer hover:bg-blue-100 transition-colors">Research</span>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold cursor-pointer hover:bg-blue-100 transition-colors">AI</span>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-bold cursor-pointer hover:bg-blue-100 transition-colors">Paper</span>
                <button className="w-7 h-7 bg-white border border-slate-200 text-slate-400 rounded-lg flex items-center justify-center hover:bg-slate-50 hover:text-slate-600 transition-colors shadow-sm">
                  <Plus size={14} />
                </button>
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