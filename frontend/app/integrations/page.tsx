"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  MoreHorizontal, Plus, ChevronDown, ChevronLeft, ArrowRight, X, Sparkles,
  Cloud, Mail, Video, MessageCircle, Play, Music, CheckCircle2, Clock
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

const AppLogos = {
  GoogleCalendar: () => (
    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden flex-shrink-0">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-3 bg-blue-500 w-full"></div>
        <div className="flex-1 flex items-center justify-center bg-white">
          <span className="text-blue-600 font-bold text-[14px]">31</span>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-bl-sm opacity-20"></div>
    </div>
  ),
  Gmail: () => (
    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center relative flex-shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V6.4L12 13.4L22 6.4V19Z" fill="#EA4335"/>
        <path d="M2 6.4V5C2 3.89543 2.89543 3 4 3H5L12 7.9L19 3H20C21.1046 3 22 3.89543 22 5V6.4L12 13.4L2 6.4Z" fill="#F0B000"/>
        <path d="M22 6.4V19C22 20.1046 21.1046 21 20 21H19V7.9L22 6.4Z" fill="#34A853"/>
        <path d="M2 6.4V19C2 20.1046 2.89543 21 4 21H5V7.9L2 6.4Z" fill="#4285F4"/>
      </svg>
    </div>
  ),
  GoogleDrive: () => (
    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.1 4.5H15.9L23.4 17.5H15.6L8.1 4.5Z" fill="#FFC107"/>
        <path d="M4.2 21.5L0.3 14.75L8.1 1.25L12 8L4.2 21.5Z" fill="#03A9F4"/>
        <path d="M23.4 17.5L15.6 4.5L11.7 11.25L19.5 24.25H23.4L23.4 17.5Z" fill="#4CAF50"/>
      </svg>
    </div>
  ),
  Notion: () => (
    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
      <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white font-serif font-bold text-[14px]">N</div>
    </div>
  ),
  Slack: () => (
    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 2C9.88071 2 11 3.11929 11 4.5V8.5H7.5C6.11929 8.5 5 7.38071 5 6C5 4.61929 6.11929 3.5 7.5 3.5H8.5V2Z" fill="#E01E5A"/>
        <path d="M2 15.5C2 14.1193 3.11929 13 4.5 13H8.5V16.5C8.5 17.8807 7.38071 19 6 19C4.61929 19 3.5 17.8807 3.5 16.5V15.5H2Z" fill="#36C5F0"/>
        <path d="M15.5 22C14.1193 22 13 20.8807 13 19.5V15.5H16.5C17.8807 15.5 19 16.6193 19 18C19 19.3807 17.8807 20.5 16.5 20.5H15.5V22Z" fill="#2EB67D"/>
        <path d="M22 8.5C22 9.88071 20.8807 11 19.5 11H15.5V7.5C15.5 6.11929 16.6193 5 18 5C19.3807 5 20.5 6.11929 20.5 7.5V8.5H22Z" fill="#ECB22E"/>
        <path d="M13 8.5H15.5V11H13V8.5Z" fill="#E01E5A"/>
        <path d="M8.5 13H11V15.5H8.5V13Z" fill="#36C5F0"/>
        <path d="M13 15.5H15.5V19.5C15.5 20.8807 14.3807 22 13 22V15.5Z" fill="#2EB67D"/>
        <path d="M8.5 8.5H11V4.5C11 3.11929 9.88071 2 8.5 2V8.5Z" fill="#ECB22E"/>
      </svg>
    </div>
  ),
  GitHub: () => (
    <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
      <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </div>
    </div>
  ),
  Generic: ({ icon: Icon, color, bg }: any) => (
    <div className={`w-10 h-10 ${bg} rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0`}>
       <Icon className={color} size={20} />
    </div>
  )
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

const Toggle = ({ isOn, onClick }: any) => (
  <div onClick={onClick} className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${isOn ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${isOn ? 'left-[18px]' : 'left-0.5'}`} />
  </div>
);

type ConnectedApp = { id: number; name: string; desc: string; account: string; icon: string };

const connectedAppsData: ConnectedApp[] = [];

const availableAppsData = [
  { id: 7, name: 'Microsoft OneDrive', desc: 'Sync your files', iconProps: { icon: Cloud, bg: 'bg-blue-50', color: 'text-blue-500' } },
  { id: 8, name: 'Microsoft Outlook', desc: 'Save important emails', iconProps: { icon: Mail, bg: 'bg-blue-600', color: 'text-white' } },
  { id: 9, name: 'Zoom', desc: 'Save meeting notes', iconProps: { icon: Video, bg: 'bg-blue-500', color: 'text-white' } },
  { id: 10, name: 'WhatsApp', desc: 'Save important chats', iconProps: { icon: MessageCircle, bg: 'bg-green-500', color: 'text-white' } },
  { id: 11, name: 'Trello', desc: 'Track your tasks', iconProps: { icon: CheckSquare, bg: 'bg-blue-600', color: 'text-white' } },
  { id: 12, name: 'Linear', desc: 'Manage your projects', iconProps: { icon: Clock, bg: 'bg-purple-600', color: 'text-white' } },
  { id: 13, name: 'YouTube', desc: 'Save video insights', iconProps: { icon: Play, bg: 'bg-red-500', color: 'text-white' } },
  { id: 14, name: 'Spotify', desc: 'Save what you listen to', iconProps: { icon: Music, bg: 'bg-green-500', color: 'text-white' } },
];

type SyncedItem = { id: number; name: string; time: string; icon: any; color: string; bg: string };

const recentlySynced: SyncedItem[] = [];

export default function PathiiIntegrationsDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableSearch, setAvailableSearch] = useState('');
  const [connectedToggles, setConnectedToggles] = useState<{ [key: number]: boolean }>({});
  const [calendarSettings, setCalendarSettings] = useState({ syncEvents: true, createTasks: true, reminders: true, eventDetails: true });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleConnectedApp = (id: number) => {
    setConnectedToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCalendarSetting = (key: keyof typeof calendarSettings) => {
    setCalendarSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleConnectedApps = connectedAppsData.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const visibleAvailableApps = availableAppsData.filter((app) =>
    app.name.toLowerCase().includes(availableSearch.trim().toLowerCase())
  );

  const selectedApp = visibleConnectedApps[0] || null;
  const SelectedAppLogo = selectedApp ? ((AppLogos as any)[selectedApp.icon] || AppLogos.GoogleCalendar) : null;

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
          <SidebarItem icon={Users} label="People" href="/people" />
          <SidebarItem icon={LinkIcon} label="Integrations" active href="/integrations" />
          <SidebarItem icon={BarChart2} label="Insights" href="/insights" />
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
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-full max-w-[520px] lg:w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search integrations, apps, or anything..."
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

        {/* Layout Container */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6 max-lg:flex-col">
          
          {/* Left Main Panel */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar pr-2 pb-2">
            
            {/* Hero Header */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex items-center gap-5 mb-8 flex-shrink-0">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2563EB] flex-shrink-0">
                 <LinkIcon size={32} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">Integrations</h2>
                <p className="text-[15px] text-slate-500 font-medium">Connect your favorite tools to make Pathii even more powerful.</p>
              </div>
            </div>

            {/* Connected Apps */}
            <div className="mb-8 flex-shrink-0">
              <div className="flex items-center justify-between mb-4 px-1">
                <div>
                  <h3 className="text-[18px] font-extrabold text-slate-900 leading-tight mb-0.5">Connected Apps</h3>
                  <p className="text-[13px] text-slate-500 font-medium">Manage your connected integrations and sync your data.</p>
                </div>
                <button onClick={() => showToast('Showing all connected apps')} className="text-[13px] font-bold text-[#2563EB] flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {visibleConnectedApps.length > 0 ? visibleConnectedApps.map((app) => {
                   const AppIconComponent = (AppLogos as any)[app.icon];
                   return (
                     <div key={app.id} className="bg-white rounded-[20px] p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
                        <div className="flex items-start justify-between mb-3">
                           <AppIconComponent />
                           <Toggle isOn={connectedToggles[app.id]} onClick={() => toggleConnectedApp(app.id)} />
                        </div>
                        <h4 className="text-[15px] font-bold text-slate-900 leading-tight mb-1">{app.name}</h4>
                        <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-4 h-8">{app.desc}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                           <div className="flex items-center gap-1.5 text-[12px] text-slate-600 font-medium truncate pr-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                             <span className="truncate">{app.account}</span>
                           </div>
                           <div className="flex items-center gap-2 flex-shrink-0">
                             <button onClick={() => showToast(`Managing ${app.name} integration`)} className="text-[12px] font-bold text-[#2563EB] hover:underline px-1">Manage</button>
                             <button onClick={() => showToast(`More options for ${app.name}`)} className="text-slate-400 hover:text-slate-600">
                               <MoreHorizontal size={16} />
                             </button>
                           </div>
                        </div>
                     </div>
                   );
                 }) : (
                   <div className="bg-white rounded-[20px] p-5 border border-slate-200 shadow-sm sm:col-span-2 lg:col-span-3">
                     <EmptyState icon={LinkIcon} title="No connected apps yet" subtitle="Apps you connect will appear here." />
                   </div>
                 )}
              </div>
            </div>

            {/* Available Integrations */}
            <div className="flex-shrink-0">
               <div className="flex items-center justify-between mb-4 px-1 max-lg:flex-wrap max-lg:gap-3">
                  <div>
                    <h3 className="text-[18px] font-extrabold text-slate-900 leading-tight mb-0.5">Available Integrations</h3>
                    <p className="text-[13px] text-slate-500 font-medium">Connect more tools to enhance your memory assistant.</p>
                  </div>
                  <div className="relative w-full max-w-[256px] lg:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      value={availableSearch}
                      onChange={(event) => setAvailableSearch(event.target.value)}
                      placeholder="Search integrations..."
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-slate-400 font-medium text-slate-700"
                    />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
                  {visibleAvailableApps.map((app) => (
                    <div key={app.id} className="bg-white rounded-[20px] p-5 border border-slate-200 shadow-sm flex flex-col">
                       <div className="flex items-center gap-3 mb-3">
                         <AppLogos.Generic {...app.iconProps} />
                         <h4 className="text-[14px] font-bold text-slate-900 leading-tight">{app.name}</h4>
                       </div>
                       <p className="text-[12px] text-slate-500 font-medium mb-4 flex-1">{app.desc}</p>
                       <button onClick={() => showToast(`Connected to ${app.name}`)} className="w-full py-2 bg-white border border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] text-slate-600 rounded-xl text-[13px] font-bold transition-colors">
                         Connect
                       </button>
                    </div>
                  ))}
               </div>
            </div>

          </div>

          {/* Right Inspector Panel */}
          <div className="w-[340px] flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full max-lg:w-full">

            {selectedApp ? (
            <>
            {/* Selected Integration Detail Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <SelectedAppLogo />
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[12px] font-bold border border-emerald-100">Connected</span>
              </div>
              <h3 className="text-[20px] font-extrabold text-slate-900 leading-tight mb-1">{selectedApp.name}</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-6">{selectedApp.desc}</p>

              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2 text-[13px] text-slate-700 font-medium">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                   {selectedApp.account}
                 </div>
                 <button onClick={() => showToast(`Managing ${selectedApp.account} account`)} className="px-3 py-1.5 border border-[#2563EB] text-[#2563EB] hover:bg-blue-50 rounded-lg text-[12px] font-bold transition-colors">
                   Manage Account
                 </button>
              </div>

              {/* Settings Toggles */}
              <div className="space-y-4 pt-5 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <CalendarIcon size={16} className="text-rose-500" />
                     <span className="text-[14px] font-semibold text-slate-700">Sync events</span>
                   </div>
                   <Toggle isOn={calendarSettings.syncEvents} onClick={() => toggleCalendarSetting('syncEvents')} />
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <CheckSquare size={16} className="text-[#2563EB]" />
                     <span className="text-[14px] font-semibold text-slate-700">Create tasks from events</span>
                   </div>
                   <Toggle isOn={calendarSettings.createTasks} onClick={() => toggleCalendarSetting('createTasks')} />
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <Bell size={16} className="text-amber-500" />
                     <span className="text-[14px] font-semibold text-slate-700">Send reminders</span>
                   </div>
                   <Toggle isOn={calendarSettings.reminders} onClick={() => toggleCalendarSetting('reminders')} />
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <FileText size={16} className="text-indigo-500" />
                     <span className="text-[14px] font-semibold text-slate-700">Include event details in memories</span>
                   </div>
                   <Toggle isOn={calendarSettings.eventDetails} onClick={() => toggleCalendarSetting('eventDetails')} />
                 </div>
              </div>
            </div>
            </>
            ) : (
              <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
                <EmptyState icon={LinkIcon} title="No integration selected" subtitle="Connect an app to manage its settings here." />
              </div>
            )}

            {/* Recently Synced Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-bold text-slate-900">Recently Synced</h3>
                <button onClick={() => showToast('Showing full sync history')} className="text-[12px] font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={14} />
                </button>
              </div>

              {recentlySynced.length > 0 ? (
              <div className="space-y-4">
                 {recentlySynced.map((item) => (
                   <div key={item.id} className="flex items-start gap-3">
                     <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                       <item.icon size={16} />
                     </div>
                     <div>
                       <h4 className="text-[14px] font-bold text-slate-900 leading-tight mb-0.5">{item.name}</h4>
                       <p className="text-[12px] text-slate-500 font-medium">{item.time}</p>
                     </div>
                   </div>
                 ))}
              </div>
              ) : (
                <EmptyState icon={Clock} title="No sync history yet" subtitle="Items synced from your apps will appear here." />
              )}
            </div>

            {/* AI Suggestion Card */}
            <div className="bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] rounded-[24px] border border-[#E0E7FF] shadow-sm p-6 relative">
              <button onClick={() => showToast('Suggestion dismissed')} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-[#6366F1]" />
                <h3 className="text-[15px] font-bold text-slate-900">AI Suggestion</h3>
              </div>

              <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-4">
                Connect your calendar and Pathii can turn upcoming events into tasks automatically.
              </p>

              <button onClick={() => showToast('Creating tasks from upcoming events…')} className="px-4 py-2 border border-[#2563EB] text-[#2563EB] bg-white hover:bg-blue-50 rounded-xl text-[13px] font-bold transition-colors shadow-sm">
                Create Tasks
              </button>
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
