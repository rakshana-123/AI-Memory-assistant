"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  Globe, Clock, CalendarDays, Brain, AudioWaveform, Tag, ShieldCheck,
  Lock, Cpu, Shield, User, Pencil, Crown, Moon, Sun, Monitor, ChevronDown,
  CheckCircle2
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

const Toggle = ({ active, onClick }: any) => (
  <div onClick={onClick} className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer flex-shrink-0 ${active ? 'bg-blue-500' : 'bg-slate-200'}`}>
    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </div>
);

const SettingsRow = ({ icon: Icon, title, subtitle, action, iconColor = "text-slate-500" }: any) => (
  <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
    <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
      <Icon size={20} strokeWidth={2} />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[14px] font-bold text-slate-900 leading-tight mb-0.5 truncate">{title}</h4>
      <p className="text-[13px] text-slate-500 font-medium truncate">{subtitle}</p>
    </div>
    <div className="flex-shrink-0 ml-4">
      {action}
    </div>
  </div>
);

const DropdownSelect = ({ value, onClick }: any) => (
  <div onClick={onClick} className="flex items-center justify-between w-64 max-lg:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-600 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
    <span className="truncate">{value}</span>
    <ChevronDown size={14} className="text-slate-400 flex-shrink-0 ml-2" />
  </div>
);

const settingsTabs = ['General', 'AI & Memory', 'Privacy & Security', 'Integrations', 'Notifications', 'Appearance', 'Plan & Billing'];

const themeOptions = [
  { label: 'Light', icon: Sun },
  { label: 'Dark', icon: Moon },
  { label: 'System', icon: Monitor },
];

export default function PathiiSettingsDashboard() {
  const [activeTab, setActiveTab] = useState('General');
  const [activeTheme, setActiveTheme] = useState('Light');
  const [toast, setToast] = useState<string | null>(null);
  const [dropdownIndexes, setDropdownIndexes] = useState({ language: 0, timezone: 0, dateFormat: 0, startWeek: 0 });
  const [toggleStates, setToggleStates] = useState({
    autoTranscribe: true,
    aiSummary: true,
    extractEntities: true,
    e2eEncryption: true,
    localProcessing: true,
    twoFactor: false,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const languageOptions = ['English', 'Hindi', 'Tamil', 'French'];
  const timezoneOptions = ['(GMT+05:30) India Standard Time', '(GMT+00:00) UTC', '(GMT-05:00) Eastern Time'];
  const dateFormatOptions = ['DD / MM / YYYY', 'MM / DD / YYYY', 'YYYY / MM / DD'];
  const startWeekOptions = ['Monday', 'Sunday'];

  const cycleDropdown = (key: keyof typeof dropdownIndexes, options: string[], label: string) => {
    setDropdownIndexes((prev) => {
      const next = (prev[key] + 1) % options.length;
      return { ...prev, [key]: next };
    });
    const nextIdx = (dropdownIndexes[key] + 1) % options.length;
    showToast(`${label}: ${options[nextIdx]}`);
  };

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

  const handleManageData = () => {
    downloadCsv('pathii-my-data.csv', [
      ['Setting', 'Value'],
      ['Language', languageOptions[dropdownIndexes.language]],
      ['Time Zone', timezoneOptions[dropdownIndexes.timezone]],
      ['Date Format', dateFormatOptions[dropdownIndexes.dateFormat]],
      ['Start Week On', startWeekOptions[dropdownIndexes.startWeek]],
      ['Theme', activeTheme],
      ['Auto-transcribe voice notes', toggleStates.autoTranscribe ? 'On' : 'Off'],
      ['Generate AI summary', toggleStates.aiSummary ? 'On' : 'Off'],
      ['Extract tasks, events and people', toggleStates.extractEntities ? 'On' : 'Off'],
      ['End-to-end encryption', toggleStates.e2eEncryption ? 'On' : 'Off'],
      ['Local data processing', toggleStates.localProcessing ? 'On' : 'Off'],
      ['Two-factor authentication', toggleStates.twoFactor ? 'On' : 'Off'],
      ['Storage Used', '2.4 GB of 10 GB'],
      ['Plan', 'Free Plan'],
    ]);
    showToast('Exported your data');
  };

  const flipToggle = (key: keyof typeof toggleStates) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 'General' (the default) and non-sectioned tabs show every section so the
  // default desktop layout is unchanged; the three sectioned tabs focus theirs.
  const sectionedTabs = ['General', 'AI & Memory', 'Privacy & Security'];
  const showSection = (section: string) =>
    activeTab === 'General' || !sectionedTabs.includes(activeTab) || activeTab === section;

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
          <SidebarItem icon={LinkIcon} label="Integrations" href="/integrations" />
          <SidebarItem icon={BarChart2} label="Insights" href="/insights" />
          <SidebarItem icon={Settings} label="Settings" active href="/settings" />
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

      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F7F9]">
        
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0">
          <div className="relative w-full max-w-[520px] lg:w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search settings, preferences, or help..."
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 border border-slate-200 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-shrink-0">
            <button onClick={() => showToast('Notifications opened — 2 new alerts')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#F43F5E] border-2 border-[#F4F7F9] rounded-full flex items-center justify-center text-[8px] font-bold text-white">2</span>
            </button>
            <img onClick={() => showToast('Profile menu opened')} src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-9 h-9 rounded-full object-cover shadow-sm cursor-pointer border border-slate-200" />
          </div>
        </header>

        {/* Scrollable Layout Container */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6 max-lg:flex-col">
          
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto custom-scrollbar pr-2 pb-2">
            
            {/* Header & Tabs */}
            <div className="mb-6 flex-shrink-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                   <Settings size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-[24px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">Settings</h2>
                  <p className="text-[14px] text-slate-500 font-medium">Customize Pathii to make it work the way you do.</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 text-[13px] rounded-full shadow-sm ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white font-bold'
                        : 'bg-white border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* General Settings Section */}
            {showSection('General') && (
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 mb-6 flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <Settings size={20} className="text-blue-600" />
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight">General Settings</h3>
                  <p className="text-[13px] text-slate-500 font-medium">Basic preferences for your Pathii experience.</p>
                </div>
              </div>
              <div className="pl-[2rem]">
                <SettingsRow
                  icon={Globe} title="Language" subtitle=""
                  action={<DropdownSelect value={languageOptions[dropdownIndexes.language]} onClick={() => cycleDropdown('language', languageOptions, 'Language')} />}
                />
                <SettingsRow
                  icon={Clock} title="Time Zone" subtitle=""
                  action={<DropdownSelect value={timezoneOptions[dropdownIndexes.timezone]} onClick={() => cycleDropdown('timezone', timezoneOptions, 'Time zone')} />}
                />
                <SettingsRow
                  icon={CalendarIcon} title="Date Format" subtitle=""
                  action={<DropdownSelect value={dateFormatOptions[dropdownIndexes.dateFormat]} onClick={() => cycleDropdown('dateFormat', dateFormatOptions, 'Date format')} />}
                />
                <SettingsRow
                  icon={CalendarDays} title="Start Week On" subtitle=""
                  action={<DropdownSelect value={startWeekOptions[dropdownIndexes.startWeek]} onClick={() => cycleDropdown('startWeek', startWeekOptions, 'Start week on')} />}
                />
              </div>
            </div>
            )}

            {/* AI & Memory Settings Section */}
            {showSection('AI & Memory') && (
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 mb-6 flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <Brain size={20} className="text-purple-600" />
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight">AI & Memory Settings</h3>
                  <p className="text-[13px] text-slate-500 font-medium">Control how Pathii captures, processes and organizes your information.</p>
                </div>
              </div>
              <div className="pl-[2rem]">
                <SettingsRow
                  icon={AudioWaveform} title="Auto-transcribe voice notes" subtitle="Convert voice to text automatically"
                  action={<Toggle active={toggleStates.autoTranscribe} onClick={() => flipToggle('autoTranscribe')} />}
                />
                <SettingsRow
                  icon={FileText} title="Generate AI summary" subtitle="Create short summaries for memories"
                  action={<Toggle active={toggleStates.aiSummary} onClick={() => flipToggle('aiSummary')} />}
                />
                <SettingsRow
                  icon={CheckSquare} title="Extract tasks, events and people" subtitle="Automatically find tasks, events and people from your content"
                  action={<Toggle active={toggleStates.extractEntities} onClick={() => flipToggle('extractEntities')} />}
                />
                <SettingsRow
                  icon={Tag} title="Default memory tags" subtitle=""
                  action={
                    <div className="w-80 max-lg:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-500 font-medium truncate">
                      Personal, Work, Ideas, Learning, Projects
                    </div>
                  }
                />
              </div>
            </div>
            )}

            {/* Privacy & Security Section */}
            {showSection('Privacy & Security') && (
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} className="text-blue-600" />
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight">Privacy & Security</h3>
                  <p className="text-[13px] text-slate-500 font-medium">Keep your data safe and in your control.</p>
                </div>
              </div>
              <div className="pl-[2rem]">
                <SettingsRow
                  icon={Lock} title="End-to-end encryption" subtitle="Encrypt your data for maximum security"
                  action={<Toggle active={toggleStates.e2eEncryption} onClick={() => flipToggle('e2eEncryption')} />}
                />
                <SettingsRow
                  icon={Cpu} title="Local data processing (where possible)" subtitle="Process sensitive data on your device"
                  action={<Toggle active={toggleStates.localProcessing} onClick={() => flipToggle('localProcessing')} />}
                />
                <SettingsRow
                  icon={Shield} title="Two-factor authentication" subtitle="Add an extra layer of security to your account"
                  action={<Toggle active={toggleStates.twoFactor} onClick={() => flipToggle('twoFactor')} />}
                />
                <SettingsRow
                  icon={Database} title="Manage data" subtitle="Export or delete your data"
                  action={<button onClick={handleManageData} className="px-4 py-1.5 bg-white border border-blue-200 text-blue-600 text-[13px] font-bold rounded-lg shadow-sm hover:bg-blue-50 transition-colors">Manage Data</button>}
                />
              </div>
            </div>
            )}

          </div>

          <div className="w-[360px] flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full max-lg:w-full">
            
            {/* Your Account Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative">
              <div className="flex items-center gap-2 mb-5">
                <ShieldCheck size={18} className="text-blue-600" />
                <h3 className="text-[16px] font-extrabold text-slate-900">Your Account</h3>
              </div>
              
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Alex" className="w-16 h-16 rounded-full object-cover shadow-sm" />
                  <div>
                    <h4 className="text-[16px] font-bold text-slate-900 leading-tight mb-1">Alex</h4>
                    <p className="text-[13px] text-slate-500 font-medium">alex@example.com</p>
                    <p className="text-[13px] text-slate-500 font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <button onClick={() => showToast('Editing your profile')} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:bg-slate-100 transition-colors shadow-sm">
                  <Pencil size={14} /> Edit
                </button>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-[16px] p-4 flex items-center justify-between border border-orange-100/50">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-amber-500"><Crown size={20} fill="currentColor" /></div>
                  <div>
                    <h5 className="text-[14px] font-bold text-slate-900 leading-tight mb-0.5">Free Plan</h5>
                    <p className="text-[12px] text-slate-500 font-medium">Upgrade to unlock more features</p>
                  </div>
                </div>
                <button onClick={() => showToast('Upgrade options opened — Pro and Team plans available')} className="px-4 py-2 bg-blue-600 text-white text-[13px] font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* Storage Usage Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Database size={18} className="text-blue-600" />
                  <h3 className="text-[16px] font-extrabold text-slate-900">Storage Usage</h3>
                </div>
                <span className="text-[13px] font-medium text-slate-500">2.4 GB of 10 GB used</span>
              </div>

              <div className="w-full h-3 rounded-full overflow-hidden flex mb-5 shadow-inner">
                <div className="bg-blue-500 w-[50%]"></div>
                <div className="bg-purple-500 w-[25%]"></div>
                <div className="bg-emerald-500 w-[17%]"></div>
                <div className="bg-amber-500 w-[8%]"></div>
                <div className="bg-slate-100 flex-1"></div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Voice Notes
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 font-medium">
                    <span className="w-12 text-right">1.2 GB</span>
                    <span className="w-8 text-right text-slate-400">50%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Documents
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 font-medium">
                    <span className="w-12 text-right">600 MB</span>
                    <span className="w-8 text-right text-slate-400">25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Images
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 font-medium">
                    <span className="w-12 text-right">400 MB</span>
                    <span className="w-8 text-right text-slate-400">17%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Others
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 font-medium">
                    <span className="w-12 text-right">200 MB</span>
                    <span className="w-8 text-right text-slate-400">8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 flex items-center justify-between">
              <div className="flex items-start gap-3">
                 <div className="mt-0.5 text-amber-500"><Crown size={20} fill="currentColor" /></div>
                 <div>
                   <h4 className="text-[15px] font-bold text-slate-900 leading-tight mb-1">Subscription</h4>
                   <h5 className="text-[13px] font-bold text-slate-700 leading-tight mb-0.5">Free Plan</h5>
                   <p className="text-[12px] text-slate-500 font-medium">10 GB storage • Basic AI features</p>
                 </div>
              </div>
              <button onClick={() => showToast('Upgrade options opened — Pro and Team plans available')} className="px-4 py-2 bg-white border border-blue-200 text-blue-600 text-[13px] font-bold rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                Upgrade Plan
              </button>
            </div>

            {/* Appearance Card */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1">
                <Moon size={18} className="text-blue-600" />
                <h3 className="text-[16px] font-extrabold text-slate-900">Appearance</h3>
              </div>
              <p className="text-[13px] text-slate-500 font-medium mb-5">Choose your preferred theme and display options.</p>

              {/* Theme Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {themeOptions.map((themeOption) => {
                  const ThemeOptionIcon = themeOption.icon;
                  const isActive = activeTheme === themeOption.label;
                  return (
                    <button
                      key={themeOption.label}
                      onClick={() => setActiveTheme(themeOption.label)}
                      className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl shadow-sm ${
                        isActive
                          ? 'border-2 border-blue-500 bg-blue-50/30 text-blue-600'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors'
                      }`}
                    >
                      <ThemeOptionIcon size={24} />
                      <span className={`text-[13px] ${isActive ? 'font-bold' : 'font-semibold text-slate-700'}`}>{themeOption.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Accent Color */}
              <div>
                <h4 className="text-[14px] font-bold text-slate-900 mb-3">Accent Color</h4>
                <div className="flex items-center justify-between">
                  {/* Active Blue */}
                  <div onClick={() => showToast('Accent color: Blue')} className="w-8 h-8 rounded-full flex items-center justify-center border-[3px] border-blue-200 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                  </div>
                  {/* Purple */}
                  <div onClick={() => showToast('Accent color: Purple')} className="w-7 h-7 rounded-full bg-purple-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Green */}
                  <div onClick={() => showToast('Accent color: Green')} className="w-7 h-7 rounded-full bg-emerald-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Yellow/Orange */}
                  <div onClick={() => showToast('Accent color: Yellow/Orange')} className="w-7 h-7 rounded-full bg-amber-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Red/Pink */}
                  <div onClick={() => showToast('Accent color: Red/Pink')} className="w-7 h-7 rounded-full bg-rose-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Gradient */}
                  <div onClick={() => showToast('Accent color: Gradient')} className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-amber-500 cursor-pointer hover:scale-110 transition-transform"></div>
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

      <style dangerouslySetInnerHTML={{__html: `
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
