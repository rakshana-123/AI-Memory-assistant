"use client";
import NextLink from "next/link";
import React, { useState } from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar as CalendarIcon, 
  FileText, Users, Link as LinkIcon, BarChart2, Settings, ChevronRight,
  Globe, Clock, CalendarDays, Brain, AudioWaveform, Tag, ShieldCheck,
  Lock, Cpu, Shield, User, Pencil, Crown, Moon, Sun, Monitor, ChevronDown
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

const Toggle = ({ active }: any) => (
  <div className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer flex-shrink-0 ${active ? 'bg-blue-500' : 'bg-slate-200'}`}>
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

const DropdownSelect = ({ value }: any) => (
  <div className="flex items-center justify-between w-64 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-600 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
    <span className="truncate">{value}</span>
    <ChevronDown size={14} className="text-slate-400 flex-shrink-0 ml-2" />
  </div>
);

export default function PathiiSettingsDashboard() {
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
          <div className="relative w-[520px]">
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

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#F43F5E] border-2 border-[#F4F7F9] rounded-full flex items-center justify-center text-[8px] font-bold text-white">2</span>
            </button>
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-9 h-9 rounded-full object-cover shadow-sm cursor-pointer border border-slate-200" />
          </div>
        </header>

        {/* Scrollable Layout Container */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex gap-6">
          
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
                <button className="px-5 py-2 bg-blue-500 text-white text-[13px] font-bold rounded-full shadow-sm">General</button>
                <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold rounded-full shadow-sm hover:bg-slate-50">AI & Memory</button>
                <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold rounded-full shadow-sm hover:bg-slate-50">Privacy & Security</button>
                <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold rounded-full shadow-sm hover:bg-slate-50">Integrations</button>
                <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold rounded-full shadow-sm hover:bg-slate-50">Notifications</button>
                <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold rounded-full shadow-sm hover:bg-slate-50">Appearance</button>
                <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-semibold rounded-full shadow-sm hover:bg-slate-50">Plan & Billing</button>
              </div>
            </div>

            {/* General Settings Section */}
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
                  action={<DropdownSelect value="English" />} 
                />
                <SettingsRow 
                  icon={Clock} title="Time Zone" subtitle="" 
                  action={<DropdownSelect value="(GMT+05:30) India Standard Time" />} 
                />
                <SettingsRow 
                  icon={CalendarIcon} title="Date Format" subtitle="" 
                  action={<DropdownSelect value="DD / MM / YYYY" />} 
                />
                <SettingsRow 
                  icon={CalendarDays} title="Start Week On" subtitle="" 
                  action={<DropdownSelect value="Monday" />} 
                />
              </div>
            </div>

            {/* AI & Memory Settings Section */}
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
                  action={<Toggle active={true} />} 
                />
                <SettingsRow 
                  icon={FileText} title="Generate AI summary" subtitle="Create short summaries for memories" 
                  action={<Toggle active={true} />} 
                />
                <SettingsRow 
                  icon={CheckSquare} title="Extract tasks, events and people" subtitle="Automatically find tasks, events and people from your content" 
                  action={<Toggle active={true} />} 
                />
                <SettingsRow 
                  icon={Tag} title="Default memory tags" subtitle="" 
                  action={
                    <div className="w-80 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-500 font-medium truncate">
                      Personal, Work, Ideas, Learning, Projects
                    </div>
                  } 
                />
              </div>
            </div>

            {/* Privacy & Security Section */}
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
                  action={<Toggle active={true} />} 
                />
                <SettingsRow 
                  icon={Cpu} title="Local data processing (where possible)" subtitle="Process sensitive data on your device" 
                  action={<Toggle active={true} />} 
                />
                <SettingsRow 
                  icon={Shield} title="Two-factor authentication" subtitle="Add an extra layer of security to your account" 
                  action={<Toggle active={false} />} 
                />
                <SettingsRow 
                  icon={Database} title="Manage data" subtitle="Export or delete your data" 
                  action={<button className="px-4 py-1.5 bg-white border border-blue-200 text-blue-600 text-[13px] font-bold rounded-lg shadow-sm hover:bg-blue-50 transition-colors">Manage Data</button>} 
                />
              </div>
            </div>

          </div>

          <div className="w-[360px] flex flex-col gap-6 flex-shrink-0 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full">
            
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
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:bg-slate-100 transition-colors shadow-sm">
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
                <button className="px-4 py-2 bg-blue-600 text-white text-[13px] font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
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
              <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 text-[13px] font-bold rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
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
                <button className="flex flex-col items-center justify-center gap-2 py-4 border-2 border-blue-500 bg-blue-50/30 rounded-xl text-blue-600 shadow-sm">
                  <Sun size={24} />
                  <span className="text-[13px] font-bold">Light</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 py-4 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
                  <Moon size={24} />
                  <span className="text-[13px] font-semibold text-slate-700">Dark</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 py-4 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
                  <Monitor size={24} />
                  <span className="text-[13px] font-semibold text-slate-700">System</span>
                </button>
              </div>

              {/* Accent Color */}
              <div>
                <h4 className="text-[14px] font-bold text-slate-900 mb-3">Accent Color</h4>
                <div className="flex items-center justify-between">
                  {/* Active Blue */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border-[3px] border-blue-200 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                  </div>
                  {/* Purple */}
                  <div className="w-7 h-7 rounded-full bg-purple-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Green */}
                  <div className="w-7 h-7 rounded-full bg-emerald-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Yellow/Orange */}
                  <div className="w-7 h-7 rounded-full bg-amber-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Red/Pink */}
                  <div className="w-7 h-7 rounded-full bg-rose-500 cursor-pointer hover:scale-110 transition-transform"></div>
                  {/* Gradient */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-amber-500 cursor-pointer hover:scale-110 transition-transform"></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
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
