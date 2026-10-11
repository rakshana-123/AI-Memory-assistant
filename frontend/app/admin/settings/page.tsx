"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Database, FileText, CalendarCheck, 
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck, 
  Settings, Search, ChevronDown, ChevronRight, Brain, 
  UploadCloud, Sun, Moon, Monitor, Shield, Users as UsersIcon, 
  Settings as SettingsIcon, Database as DatabaseIcon, 
  Bell as BellIcon, Palette, Sliders, Check, Lock, Clock, 
  AlertTriangle, UserPlus, UserCheck, ShieldAlert, Zap, 
  HardDrive, File, Trash2, Smartphone, Mail, Globe, 
  AlertCircle, RefreshCw, Save, Image as ImageIcon
} from 'lucide-react';

const Toggle = ({ checked, onChange }: any) => (
  <div 
    onClick={onChange}
    className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${checked ? 'bg-blue-600' : 'bg-slate-300'}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
  </div>
);

const FormGroup = ({ label, description, children, layout = 'vertical' }: any) => (
  <div className={`flex ${layout === 'horizontal' ? 'flex-row items-center justify-between' : 'flex-col gap-1.5'} mb-4 last:mb-0`}>
    <div className="flex flex-col">
      <label className="text-[13px] font-bold text-slate-800 leading-tight">{label}</label>
      {description && <span className="text-[11px] text-slate-500 font-medium mt-0.5">{description}</span>}
    </div>
    <div className={layout === 'horizontal' ? 'flex-shrink-0 ml-4' : 'mt-1'}>
      {children}
    </div>
  </div>
);

const Input = ({ type = "text", value, placeholder, suffix, className = "", defaultValue }: any) => (
  <div className={`relative flex items-center w-full bg-white border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all ${className}`}>
    <input 
      type={type} 
      defaultValue={defaultValue ?? value}
      placeholder={placeholder}
      className="w-full px-3 py-1.5 text-[13px] font-semibold text-slate-700 focus:outline-none placeholder:text-slate-400 placeholder:font-medium"
    />
    {suffix && (
      <span className="px-3 py-1.5 text-[12px] font-bold text-slate-400 border-l border-slate-200 bg-slate-50/50 flex-shrink-0">
        {suffix}
      </span>
    )}
  </div>
);

const Select = ({ value, options, className = "" }: any) => (
  <div className={`relative flex items-center w-full bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 transition-colors ${className}`}>
    <select className="w-full appearance-none pl-3 pr-8 py-1.5 text-[13px] font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer">
      <option>{value}</option>
      {/* Mock options for display */}
    </select>
    <ChevronDown size={14} className="absolute right-3 text-slate-400 pointer-events-none" />
  </div>
);

const SectionCard = ({ title, description, children, className = "" }: any) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col ${className}`}>
    <div className="mb-5">
      <h3 className="text-[16px] font-bold text-slate-900 leading-tight mb-1">{title}</h3>
      <p className="text-[12.5px] text-slate-500 font-medium">{description}</p>
    </div>
    <div className="flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

export default function AdminSettingsDashboard() {
  const initialToggles = {
    tfa: true,
    pwdPolicy: true,
    loginNotif: true,
    newReg: true,
    emailVerify: true,
    userApproval: false,
    vision: true,
    docAnalysis: true,
    webSearch: false,
    autoDelete: true,
    inAppNotif: true,
    emailNotif: true,
    pushNotif: true,
    sysAlerts: true,
    marketing: false,
    weeklyDigest: true,
    maintenance: false,
    debug: false,
    autoBackup: true
  };

  const [toggles, setToggles] = useState(initialToggles);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const handleToggle = (key: any) => {
    setToggles(prev => ({ ...prev, [key]: !(prev as any)[key] }));
  };

  const handleSave = () => {
    setSavedToast('All settings saved successfully!');
    setTimeout(() => setSavedToast(null), 3000);
  };

  const handleReset = () => {
    setToggles(initialToggles);
    setSavedToast('Settings restored to system defaults.');
    setTimeout(() => setSavedToast(null), 3000);
  };

  const showSettingsToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans text-slate-900 antialiased">
      
      {/* Left Sidebar */}
      <aside className="w-[260px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 sticky top-0 h-screen z-20">
        <div className="flex items-center gap-3 pt-6 pb-8 px-6">
          <div className="text-[#2563EB]">
             <Brain size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold text-slate-900 leading-tight tracking-tight">Pathii</h1>
            <p className="text-[12px] text-slate-500 font-medium">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar">
          {([
            { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
            { icon: Users, label: 'Users', href: '/admin/users' },
            { icon: Database, label: 'Memories', href: '/admin/memories' },
            { icon: FileText, label: 'Documents', href: '/admin/documents' },
            { icon: CalendarCheck, label: 'Tasks & Events', href: '/admin/tasks' },
            { icon: Cpu, label: 'AI Usage', href: '/admin/ai-usage' },
            { icon: Link, label: 'Integrations', href: '/admin/integrations' },
            { icon: BarChart2, label: 'Analytics', href: '/admin/analytics' },
            { icon: FileSpreadsheet, label: 'Reports', href: '/admin/reports' },
            { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
            { icon: ShieldCheck, label: 'System Health', href: '/admin/system-health' },
            { icon: Settings, label: 'Settings', active: true, href: '/admin/settings' },
          ] as { icon: any; label: string; href: string; active?: boolean; badge?: string }[]).map((item, idx) => (
            <NextLink key={idx} href={item.href}>
              <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${item.active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={item.active ? 'text-[#2563EB]' : 'text-slate-500'} />
                  <span className="text-[14px]">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[11px] font-bold">{item.badge}</span>
                )}
              </div>
            </NextLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto flex flex-col gap-2">
          <div onClick={() => showSettingsToast('Signed in as Administrator')} className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[13px]">A</div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Admin</p>
                <p className="text-[12px] text-slate-500 font-medium leading-none">Administrator</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </div>
          <NextLink 
            href="/"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[12px] font-bold transition-all border border-slate-200"
          >
            <span>← Back to User View</span>
          </NextLink>
        </div>
      </aside>

      {/* Main Content Area Container */}
      <main className="flex-1 flex flex-col min-w-0 relative pb-28">
        
        {/* Header */}
        <header className="h-[72px] px-8 flex items-center justify-between flex-shrink-0 border-b border-slate-200/50 bg-[#F4F7F9]/95 backdrop-blur-sm sticky top-0 z-20 max-lg:h-auto max-lg:py-3">
          <div className="relative w-full max-w-[450px] lg:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search settings, users, integrations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-14 py-2 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500 border border-slate-200">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5 justify-end">
            <button onClick={() => showSettingsToast('Date range Last 30 days is active')} className="hidden sm:flex bg-white border border-slate-200 rounded-lg px-3 py-2 items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-blue-600" />
              Last 30 days
              <ChevronDown size={14} className="text-slate-400 ml-1" />
            </button>

            <button onClick={() => showSettingsToast('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
            </button>
            <div onClick={() => showSettingsToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-4 lg:pl-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px] shadow-sm border border-slate-200">A</div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-slate-700">Admin <ChevronDown size={14} className="text-slate-400" /></div>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 lg:px-8 pb-12 flex flex-col">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Settings size={24} strokeWidth={2.5} />
             </div>
             <div>
               <h2 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 leading-tight">Settings</h2>
               <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium">Manage platform settings, security, integrations, and preferences for Pathii.</p>
             </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-200 mb-6 space-x-8 overflow-x-auto custom-scrollbar pb-px">
            {[
              { id: 'general', icon: SettingsIcon, label: 'General' },
              { id: 'security', icon: Shield, label: 'Security' },
              { id: 'users', icon: UsersIcon, label: 'Users & Permissions' },
              { id: 'ai', icon: Brain, label: 'AI & Models' },
              { id: 'integrations', icon: Link, label: 'Integrations' },
              { id: 'storage', icon: DatabaseIcon, label: 'Storage' },
              { id: 'notifications', icon: BellIcon, label: 'Notifications' },
              { id: 'appearance', icon: Palette, label: 'Appearance' },
              { id: 'advanced', icon: Sliders, label: 'Advanced' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 pt-1 px-1 border-b-2 font-bold text-[13.5px] whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <tab.icon size={16} strokeWidth={2.5} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* ROW 1 */}
            {/* Platform Information */}
            <SectionCard title="Platform Information" description="Basic information about your Pathii instance." className="col-span-1">
              <div className="flex gap-4 items-start mb-5">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm relative overflow-hidden group">
                    <Brain size={32} strokeWidth={2} />
                  </div>
                  <button onClick={() => showSettingsToast('Logo upload dialog opened (PNG/SVG up to 2 MB)')} className="flex items-center gap-1.5 text-[12px] font-bold text-blue-600 hover:text-blue-700">
                    <UploadCloud size={14} /> Change Logo
                  </button>
                </div>
                <div className="flex-1 flex flex-col justify-center pt-2">
                   <h4 className="text-[18px] font-extrabold text-slate-900 leading-none mb-1.5">Pathii</h4>
                   <p className="text-[12px] font-semibold text-slate-500">AI Memory Assistant</p>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                <FormGroup label="Platform Name">
                  <Input value="Pathii" />
                </FormGroup>
                <FormGroup label="Description">
                  <Input value="Your personal AI memory assistant" />
                </FormGroup>
                <FormGroup label="Website URL">
                  <Input value="https://pathii.ai" />
                </FormGroup>
              </div>
               <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
                  <button onClick={() => showSettingsToast('General settings saved successfully!')} className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
                    <Check size={16} /> Save Changes
                  </button>
               </div>
            </SectionCard>

            {/* Appearance & Branding (Wider Card) */}
            <SectionCard title="Appearance & Branding" description="Customize the look and feel of the platform." className="col-span-2">
              <div className="grid grid-cols-2 gap-8 h-full">
                
                {/* Left Side: Controls */}
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[13px] font-bold text-slate-800 leading-tight block mb-3">Theme Mode</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => showSettingsToast('Theme set to Light')} className="flex flex-col items-center gap-2 p-3 border-2 border-blue-600 bg-blue-50 rounded-xl text-blue-600 shadow-sm">
                        <Sun size={20} strokeWidth={2.5} />
                        <span className="text-[12px] font-bold">Light</span>
                      </button>
                      <button onClick={() => showSettingsToast('Theme set to Dark')} className="flex flex-col items-center gap-2 p-3 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-600">
                        <Moon size={20} strokeWidth={2.5} />
                        <span className="text-[12px] font-bold">Dark</span>
                      </button>
                      <button onClick={() => showSettingsToast('Theme set to System')} className="flex flex-col items-center gap-2 p-3 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-600">
                        <Monitor size={20} strokeWidth={2.5} />
                        <span className="text-[12px] font-bold">System</span>
                      </button>
                    </div>
                  </div>

                  <div>
                     <label className="text-[13px] font-bold text-slate-800 leading-tight block mb-2">Primary Color</label>
                     <div className="flex gap-2.5">
                       {['bg-blue-600', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500', 'bg-indigo-500', 'bg-pink-500'].map((color, i) => (
                         <button key={i} onClick={() => showSettingsToast('Primary color updated')} className={`w-6 h-6 rounded-full ${color} ${i===0 ? 'ring-2 ring-offset-2 ring-blue-600' : ''} shadow-sm`}></button>
                       ))}
                     </div>
                  </div>

                  <div>
                     <label className="text-[13px] font-bold text-slate-800 leading-tight block mb-2">Accent Color</label>
                     <div className="flex gap-2.5">
                       {['bg-amber-500', 'bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-pink-500'].map((color, i) => (
                         <button key={i} onClick={() => showSettingsToast('Accent color updated')} className={`w-6 h-6 rounded-full ${color} ${i===0 ? 'ring-2 ring-offset-2 ring-amber-500' : ''} shadow-sm`}></button>
                       ))}
                     </div>
                  </div>
                </div>

                {/* Right Side: Mini Preview Dashboard */}
                <div className="flex flex-col">
                  <label className="text-[13px] font-bold text-slate-800 leading-tight block mb-3">Preview</label>
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 flex shadow-inner overflow-hidden">
                    {/* Mock Sidebar */}
                    <div className="w-[60px] bg-white border-r border-slate-200 flex flex-col gap-4 items-center py-4 rounded-l-lg shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] z-10">
                       <div className="text-blue-600"><Brain size={18} /></div>
                       <div className="w-4 h-4 rounded bg-slate-200 mt-2"></div>
                       <div className="w-4 h-4 rounded bg-slate-200"></div>
                       <div className="w-4 h-4 rounded bg-blue-100 text-blue-600 flex items-center justify-center relative">
                         <div className="absolute inset-0 m-auto w-2 h-2 bg-blue-500 rounded-sm opacity-50"></div>
                       </div>
                       <div className="w-4 h-4 rounded bg-slate-200 mt-auto"></div>
                    </div>
                    {/* Mock Main Content */}
                    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
                      {/* Mock Header */}
                      <div className="h-10 bg-white border-b border-slate-200 flex items-center justify-between px-3 rounded-tr-lg">
                        <div className="font-extrabold text-[12px] text-slate-800 tracking-tight flex items-center gap-1.5">
                          <Brain size={12} className="text-blue-600" /> Pathii
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-5 bg-slate-100 rounded-md"></div>
                           <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                        </div>
                      </div>
                      {/* Mock Content Area */}
                      <div className="p-3 grid grid-cols-3 gap-2 flex-1">
                        {/* Mock Cards Top */}
                        <div className="col-span-1 bg-white rounded-md border border-slate-200 p-2 shadow-sm flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="w-5 h-5 bg-emerald-100 rounded-md"></div>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2"><div className="w-1/2 h-full bg-emerald-400 rounded-full"></div></div>
                        </div>
                        <div className="col-span-1 bg-white rounded-md border border-slate-200 p-2 shadow-sm flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="w-5 h-5 bg-blue-100 rounded-md"></div>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2"><div className="w-2/3 h-full bg-blue-400 rounded-full"></div></div>
                        </div>
                        {/* Right column card */}
                        <div className="col-span-1 row-span-2 bg-white rounded-md border border-slate-200 p-2 shadow-sm flex flex-col gap-2">
                          <div className="w-full h-6 bg-blue-50 rounded-sm"></div>
                          <div className="flex items-center gap-1 mt-auto"><div className="w-2 h-2 rounded-full bg-amber-400"></div><div className="w-8 h-1 bg-slate-100 rounded"></div></div>
                          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div><div className="w-10 h-1 bg-slate-100 rounded"></div></div>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="col-span-2 bg-white rounded-md border border-slate-200 p-2 shadow-sm flex flex-col justify-end relative overflow-hidden">
                          <div className="absolute top-2 left-2 w-12 h-2 bg-slate-100 rounded"></div>
                          {/* SVG Mock Area Chart */}
                          <svg viewBox="0 0 100 30" className="w-full h-8 translate-y-1" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="mockGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            <path d="M0,30 L0,20 Q10,10 20,22 T40,15 T60,25 T80,10 T100,5 L100,30 Z" fill="url(#mockGrad)" />
                            <path d="M0,20 Q10,10 20,22 T40,15 T60,25 T80,10 T100,5" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </SectionCard>

            {/* ROW 2 */}
            {/* Security Settings */}
            <SectionCard title="Security Settings" description="Configure security and access control options.">
               <FormGroup layout="horizontal" label="Two-Factor Authentication (2FA)" description="Require 2FA for all admin users">
                 <Toggle checked={toggles.tfa} onChange={() => handleToggle('tfa')} />
               </FormGroup>
               <FormGroup layout="horizontal" label="Session Timeout" description="Auto logout after inactivity">
                 <Select value="30 minutes" className="w-[120px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Password Policy" description="Minimum 8 characters, numbers and symbols">
                 <Toggle checked={toggles.pwdPolicy} onChange={() => handleToggle('pwdPolicy')} />
               </FormGroup>
               <FormGroup layout="horizontal" label="Login Notifications" description="Get notified on new admin logins">
                 <Toggle checked={toggles.loginNotif} onChange={() => handleToggle('loginNotif')} />
               </FormGroup>
            </SectionCard>

            {/* User Management Settings */}
            <SectionCard title="User Management Settings" description="Configure user registration and access control.">
               <FormGroup layout="horizontal" label="Allow New Registrations" description="Let new users sign up to Pathii">
                 <Toggle checked={toggles.newReg} onChange={() => handleToggle('newReg')} />
               </FormGroup>
               <FormGroup layout="horizontal" label="Default User Role" description="">
                 <Select value="Standard User" className="w-[140px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Email Verification" description="Require email verification for new users">
                 <Toggle checked={toggles.emailVerify} onChange={() => handleToggle('emailVerify')} />
               </FormGroup>
               <FormGroup layout="horizontal" label="User Approval" description="Manually approve new registrations">
                 <Toggle checked={toggles.userApproval} onChange={() => handleToggle('userApproval')} />
               </FormGroup>
               <FormGroup layout="horizontal" label="User Limit" description="Maximum number of users">
                 <Input value="1000" className="w-[100px]" />
               </FormGroup>
            </SectionCard>

            {/* AI & Model Settings */}
            <SectionCard title="AI & Model Settings" description="Configure AI models and usage limits.">
               <FormGroup layout="horizontal" label="Default AI Model" description="">
                 <Select value="Google Gemini" className="w-[180px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Fallback Model" description="">
                 <Select value="OpenAI GPT-4o" className="w-[180px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Max Tokens per Request" description="">
                 <Input value="2000" className="w-[180px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Daily Usage Limit (per user)" description="">
                 <Input value="100" suffix="requests" className="w-[180px]" />
               </FormGroup>
               <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                   <label className="text-[13px] font-bold text-slate-800">Enable Vision (Images)</label>
                   <Toggle checked={toggles.vision} onChange={() => handleToggle('vision')} />
                 </div>
                 <div className="flex items-center justify-between">
                   <label className="text-[13px] font-bold text-slate-800">Enable Document Analysis</label>
                   <Toggle checked={toggles.docAnalysis} onChange={() => handleToggle('docAnalysis')} />
                 </div>
                 <div className="flex items-center justify-between">
                   <label className="text-[13px] font-bold text-slate-800">Enable Web Search</label>
                   <Toggle checked={toggles.webSearch} onChange={() => handleToggle('webSearch')} />
                 </div>
               </div>
            </SectionCard>

            {/* ROW 3 */}
            {/* Storage Settings */}
            <SectionCard title="Storage Settings" description="Manage storage limits and file handling.">
               <FormGroup layout="horizontal" label="Total Storage Limit" description="">
                 <Input value="100" suffix="GB" className="w-[140px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Per User Storage Limit" description="">
                 <Input value="5" suffix="GB" className="w-[140px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Allowed File Types" description="">
                 <Input value="pdf, doc, docx, txt, png, jpg, mp3, mp4" className="w-[200px]" />
               </FormGroup>
               <FormGroup layout="horizontal" label="Max File Size" description="">
                 <Input value="50" suffix="MB" className="w-[140px]" />
               </FormGroup>
               <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                 <div className="flex flex-col">
                   <label className="text-[13px] font-bold text-slate-800">Auto Delete Old Files</label>
                   <span className="text-[11px] text-slate-500 font-medium">Delete files older than</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <Select value="1 year" className="w-[100px]" />
                   <Toggle checked={toggles.autoDelete} onChange={() => handleToggle('autoDelete')} />
                 </div>
               </div>
            </SectionCard>

            {/* Notification Settings */}
            <SectionCard title="Notification Settings" description="Configure default notification preferences.">
               <div className="flex flex-col gap-4 mt-2">
                 {[
                   { icon: BellIcon, color: 'text-amber-500', bg: 'bg-amber-50', label: 'In-App Notifications', key: 'inAppNotif' },
                   { icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Email Notifications', key: 'emailNotif' },
                   { icon: Smartphone, color: 'text-rose-500', bg: 'bg-rose-50', label: 'Push Notifications', key: 'pushNotif' },
                   { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', label: 'System Alerts', key: 'sysAlerts' },
                   { icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Marketing Updates', key: 'marketing' },
                   { icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Weekly Digest', key: 'weeklyDigest' },
                 ].map((item: any) => (
                   <div key={item.key} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg} ${item.color}`}>
                         <item.icon size={16} />
                       </div>
                       <span className="text-[13px] font-bold text-slate-800">{item.label}</span>
                     </div>
                     <Toggle checked={(toggles as any)[item.key]} onChange={() => handleToggle(item.key)} />
                   </div>
                 ))}
               </div>
            </SectionCard>

            {/* Advanced Settings */}
            <SectionCard title="Advanced Settings" description="Additional configuration options.">
               <div className="flex flex-col gap-5 mt-2">
                 <div className="flex items-center justify-between">
                   <div className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50 text-amber-500 mt-0.5">
                       <AlertTriangle size={16} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[13px] font-bold text-slate-800">Maintenance Mode</span>
                       <span className="text-[11px] text-slate-500 font-medium">Temporarily disable platform access</span>
                     </div>
                   </div>
                   <Toggle checked={toggles.maintenance} onChange={() => handleToggle('maintenance')} />
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500 mt-0.5">
                       <Code2 size={16} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[13px] font-bold text-slate-800">Debug Mode</span>
                       <span className="text-[11px] text-slate-500 font-medium">Enable detailed logging</span>
                     </div>
                   </div>
                   <Toggle checked={toggles.debug} onChange={() => handleToggle('debug')} />
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-500 mt-0.5">
                       <Zap size={16} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[13px] font-bold text-slate-800">API Rate Limit</span>
                       <span className="text-[11px] text-slate-500 font-medium">Requests per minute</span>
                     </div>
                   </div>
                   <Input value="120" className="w-[80px]" />
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-500 mt-0.5">
                       <Archive size={16} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[13px] font-bold text-slate-800">Log Retention</span>
                       <span className="text-[11px] text-slate-500 font-medium">Keep logs for</span>
                     </div>
                   </div>
                   <Select value="30 days" className="w-[100px]" />
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-50 text-orange-500 mt-0.5">
                       <Save size={16} />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[13px] font-bold text-slate-800">Automatic Backups</span>
                       <span className="text-[11px] text-slate-500 font-medium">Daily system backup</span>
                     </div>
                   </div>
                   <Toggle checked={toggles.autoBackup} onChange={() => handleToggle('autoBackup')} />
                 </div>

               </div>
            </SectionCard>

          </div>
        </div>
        
        {/* Bottom Bar: Sticky/fixed to bottom of viewport, offset for sidebar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 lg:px-8 py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
          <div className="flex items-center gap-2">
            {savedToast && (
              <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-1.5 animate-pulse">
                <Check size={14} className="text-emerald-500" /> {savedToast}
              </span>
            )}
          </div>
          <div className="flex items-center justify-end gap-3">
            <button 
              onClick={handleReset}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-slate-200 text-slate-600 text-[13px] font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} /> Reset to Default
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-blue-600 text-white text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Save size={14} /> Save All Settings
            </button>
          </div>
        </div>

      </main>

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

/* Fallback icons to prevent render crashes if missing from import list */
const Code2 = ({ size, className }: any) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const Archive = ({ size, className }: any) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>;
