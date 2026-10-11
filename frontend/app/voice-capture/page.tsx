"use client";
import NextLink from "next/link";
import React from 'react';
import { 
  Search, Bell, Home, Mic, Database, CheckSquare, Calendar, 
  FileText, Users, Link, BarChart2, Settings, ChevronRight,
  MoreVertical, Play, ArrowLeft, ShieldCheck, ChevronDown,
  X, Bookmark, Sparkles, List, CheckCircle2, User, Clock, ArrowRight
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

const AnalysisCard = ({ icon: Icon, title, desc, theme }: any) => {
  const themes = {
    blue: { bg: 'bg-[#F4F8FF]', iconBg: 'bg-[#E5EFFF]', iconColor: 'text-[#2563EB]' },
    green: { bg: 'bg-[#F2FCF7]', iconBg: 'bg-[#E1F7EC]', iconColor: 'text-[#10B981]' },
    purple: { bg: 'bg-[#F8F5FF]', iconBg: 'bg-[#EFE8FF]', iconColor: 'text-[#8B5CF6]' },
    red: { bg: 'bg-[#FFF5F6]', iconBg: 'bg-[#FFE6EA]', iconColor: 'text-[#F43F5E]' },
  };
  const currentTheme = themes[theme as keyof typeof themes];

  return (
    <div className={`${currentTheme.bg} rounded-[16px] p-4 flex flex-col gap-3 relative`}>
      <div className="absolute top-4 right-4 text-slate-300">
        <div className="w-3 h-0.5 bg-slate-300 rounded-full"></div>
      </div>
      <div className={`${currentTheme.iconBg} w-9 h-9 rounded-full flex items-center justify-center`}>
        <Icon size={18} className={currentTheme.iconColor} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">{title}</h4>
        <p className="text-[12px] text-slate-500 leading-tight pr-4">{desc}</p>
      </div>
    </div>
  );
};

const CaptureCard = ({ title, time, tag, tagColor, onCardClick, onMoreClick }: any) => (
  <div onClick={onCardClick} className="bg-white rounded-[20px] p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
    <div className="w-12 h-12 rounded-full bg-[#EBF3FF] flex items-center justify-center flex-shrink-0 group">
      <Play size={20} className="text-[#2563EB] ml-1 group-hover:scale-110 transition-transform" fill="currentColor" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[14.5px] font-bold text-slate-900 truncate">{title}</h4>
      <p className="text-[12.5px] text-slate-500 mt-0.5 truncate">{time}</p>
      <span className={`inline-block mt-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${tagColor}`}>
        {tag}
      </span>
    </div>
    <button onClick={(e) => { e.stopPropagation(); onMoreClick(); }} className="text-slate-400 hover:text-slate-600 self-start mt-1">
      <MoreVertical size={18} />
    </button>
  </div>
);

const recentCaptures = [
  { id: 1, title: "Project discussion", time: "Today, 10:42 AM • 02:14", tag: "Idea", tagColor: "bg-[#EBF3FF] text-[#2563EB]" },
  { id: 2, title: "Meeting with Sarah", time: "Yesterday, 4:20 PM • 05:30", tag: "Meeting", tagColor: "bg-[#F3E8FF] text-[#8B5CF6]" },
  { id: 3, title: "Research notes", time: "Oct 12, 2024 • 03:18", tag: "Document", tagColor: "bg-[#EBF3FF] text-[#2563EB]" },
  { id: 4, title: "Client call", time: "Oct 10, 2024 • 08:45", tag: "Task", tagColor: "bg-[#E6F8F0] text-[#10B981]" },
];

export default function PathiiDashboard() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [captures, setCaptures] = React.useState(recentCaptures);
  const [toast, setToast] = React.useState<string | null>(null);
  const [inputSourceIndex, setInputSourceIndex] = React.useState(0);

  const inputSources = ['Default (Microphone)', 'AirPods Pro', 'System Audio'];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const durationStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      const newCap = {
        id: captures.length + 1,
        title: "Voice capture thought",
        time: `Just now • ${durationStr}`,
        tag: "Voice",
        tagColor: "bg-[#EBF3FF] text-[#2563EB]"
      };
      setCaptures(prev => [newCap, ...prev]);
      setIsRecording(false);
      setSeconds(0);
    } else {
      setIsRecording(true);
      setSeconds(0);
    }
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setSeconds(0);
  };

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeDisplay = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const filteredCaptures = captures.filter((capture) =>
    capture.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Hardcoded waveform heights for the visualizer
  const waveformHeights = [
    4, 6, 4, 8, 12, 8, 4, 16, 24, 16, 12, 8, 4, 8, 16, 32, 48, 64, 48, 32,
    24, 40, 56, 40, 24, 16, 24, 32, 24, 16, 12, 8, 16, 12, 8, 4, 8, 4, 6, 4
  ];

  return (
    <div className="flex min-h-screen lg:h-screen bg-[#F4F7F9] font-sans lg:overflow-hidden text-slate-900 antialiased selection:bg-blue-100">
      
      {}
      <aside className="w-[260px] bg-[#F4F7F9] flex flex-col z-10 flex-shrink-0 py-6 px-4">
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
          <SidebarItem icon={Home} label="Dashboard" href="/" />
          <SidebarItem icon={Mic} label="Voice Capture" active href="/voice-capture" />
          <SidebarItem icon={Database} label="Memories" href="/memories" />
          <SidebarItem icon={CheckSquare} label="Tasks & Schedule" href="/tasks" />
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
              <img src="https://i.pravatar.cc/150?img=11" alt="Alex" className="w-10 h-10 rounded-full object-cover" />
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

      {}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F7F9] relative rounded-tl-[40px] border-l border-slate-200/50 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
        
        {/* Header Search & Notification */}
        <header className="h-[90px] px-8 flex items-center justify-between z-20">
          <div className="relative w-full max-w-[450px] lg:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your memories, tasks, documents..."
              className="w-full pl-11 pr-14 py-3 bg-white rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow shadow-[0_2px_8px_rgba(0,0,0,0.04)] placeholder:text-slate-400 font-medium text-slate-700"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-2 py-1 rounded-md text-[11px] font-semibold text-slate-500">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-4 max-lg:flex-shrink-0">
            <button onClick={() => showToast('Notifications opened — 1 new alert')} className="relative p-2.5 rounded-full hover:bg-white/80 transition-colors text-slate-600 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full ring-2 ring-white flex items-center justify-center text-[9px] font-bold text-white">1</span>
            </button>
            <NextLink href="/settings">
              <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-[42px] h-[42px] rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer" />
            </NextLink>
          </div>
        </header>

        {/* Scrollable Main View */}
        <div className="flex-1 overflow-y-auto p-8 pt-2 pb-12">
          
          {}
          <div className="flex flex-col lg:flex-row items-center max-lg:items-start justify-between mb-6 pl-2 max-lg:gap-4">
            <div>
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <NextLink href="/" className="hover:text-slate-800 flex items-center gap-1.5">
                  <ArrowLeft size={16} />
                  <span className="text-[14px] font-medium">Dashboard</span>
                </NextLink>
              </div>
              <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Capture a thought</h2>
              <p className="text-slate-500 mt-1 text-[15px]">Speak naturally. Let AI organize the details.</p>
            </div>

            <div className="bg-[#EBF3FF] rounded-2xl p-4 flex items-center gap-4 max-w-[320px]">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] flex flex-shrink-0 items-center justify-center text-white">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1E3A8A]">Your privacy, your control</h4>
                <p className="text-[12px] text-[#3B82F6] mt-0.5 leading-tight">Recording starts only when you tap the button.</p>
              </div>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 mb-6">
            
            {/* Left: Main Recording Area */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col items-center relative min-h-[500px]">
              
              {/* Top Controls */}
              <div className="w-full flex items-center justify-between mb-8 max-lg:flex-wrap max-lg:gap-2">
                <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-[13px] font-semibold transition-colors ${isRecording ? 'bg-rose-50 text-rose-600' : 'bg-[#E6F8F0] text-[#10B981]'}`}>
                  <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-[#10B981]'}`}></div>
                  {isRecording ? 'Recording live...' : 'Ready to record'}
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const next = (inputSourceIndex + 1) % inputSources.length;
                      setInputSourceIndex(next);
                      showToast(`Input source: ${inputSources[next]}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-[13.5px] font-medium text-slate-700 transition-colors"
                  >
                    <Mic size={16} className="text-slate-500" />
                    {inputSources[inputSourceIndex]}
                    <ChevronDown size={14} className="text-slate-400 ml-1" />
                  </button>
                  <button 
                    onClick={() => showToast('Recording settings opened')}
                    className="w-9 h-9 rounded-full border border-slate-100 hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <Settings size={18} />
                  </button>
                </div>
              </div>

              {/* Central Mic & Visualizer */}
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                
                <div className="relative flex items-center justify-center w-64 h-64 mb-6">
                  {/* Concentric rings to simulate sound waves/glow */}
                  <div className={`absolute w-[300px] h-[300px] rounded-full border transition-all duration-500 ${isRecording ? 'border-blue-300 scale-110 opacity-70 animate-pulse' : 'border-[#EBF3FF] opacity-60'}`}></div>
                  <div className={`absolute w-[240px] h-[240px] rounded-full border-[1.5px] transition-all duration-500 ${isRecording ? 'border-blue-400 scale-105 opacity-90' : 'border-[#D4E4FF] opacity-80'}`}></div>
                  <div className={`absolute w-[180px] h-[180px] rounded-full transition-all duration-500 ${isRecording ? 'bg-blue-100 opacity-80' : 'bg-[#EBF3FF] opacity-50'}`}></div>
                  
                  {/* Main Blue Button */}
                  <button 
                    onClick={toggleRecording}
                    className={`relative z-10 w-[120px] h-[120px] rounded-full flex items-center justify-center shadow-[0_12px_32px_-8px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-300 ${
                      isRecording ? 'bg-gradient-to-br from-rose-500 to-rose-600 ring-4 ring-rose-200' : 'bg-gradient-to-br from-[#5C94FF] to-[#2563EB]'
                    }`}
                  >
                    <Mic size={48} className="text-white" strokeWidth={2} />
                  </button>
                </div>

                <div className="text-center mb-10">
                  <h3 className={`text-[42px] font-bold leading-none tracking-tight ${isRecording ? 'text-blue-600' : 'text-slate-900'}`}>{timeDisplay}</h3>
                  <p className="text-slate-500 text-[14px] mt-2 font-medium">
                    {isRecording ? 'Listening... Tap mic or Stop when finished' : 'Tap the microphone to start recording'}
                  </p>
                </div>

                {/* Waveform Visualization */}
                <div className="w-full flex items-center justify-center gap-[3px] h-16">
                  {waveformHeights.map((height, i) => (
                    <div 
                      key={i} 
                      className={`w-[3px] rounded-full transition-all duration-300 ${isRecording ? 'bg-[#2563EB]' : 'bg-slate-200'}`}
                      style={{ 
                        height: isRecording ? `${Math.min(60, height * (1 + (i % 3) * 0.4))}px` : `${height}px`, 
                        opacity: isRecording ? 0.9 : (height > 20 ? 0.7 : 0.4) 
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-end justify-center gap-12 mt-8 w-full">
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={cancelRecording}
                    className="w-14 h-14 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-sm"
                  >
                    <X size={24} />
                  </button>
                  <span className="text-[12px] font-semibold text-slate-600">Cancel</span>
                </div>

                <div className="flex flex-col items-center gap-2 mb-2">
                  <button 
                    onClick={toggleRecording}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors shadow-md ${
                      isRecording ? 'bg-rose-600 hover:bg-rose-700' : 'bg-[#2563EB] hover:bg-blue-700'
                    }`}
                  >
                    <Mic size={24} fill="currentColor" />
                  </button>
                  <span className="text-[13px] font-bold text-slate-900">{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <NextLink 
                    href="/documents"
                    className="w-14 h-14 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shadow-sm"
                  >
                    <Bookmark size={22} />
                  </NextLink>
                  <span className="text-[12px] font-semibold text-slate-600">Quick Note</span>
                </div>
              </div>

            </div>

            {}
            <div className="flex flex-col gap-6">
              
              {/* Live Transcript Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-[#2563EB]" />
                    <h3 className="text-[16px] font-bold text-slate-900">Live Transcript</h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center gap-2 text-[12px] font-semibold ${isRecording ? 'bg-blue-50 text-blue-600' : 'bg-[#EBF3FF] text-[#2563EB]'}`}>
                    <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-blue-600 animate-pulse' : 'bg-[#2563EB]'}`}></div>
                    {isRecording ? 'Live Streaming...' : 'Processing with AI'}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] rounded-[16px] p-5 min-h-[140px] border border-slate-100 flex items-start">
                  <div className="w-0.5 h-5 bg-[#2563EB] rounded-full mr-2 animate-pulse"></div>
                  <p className={`text-[14.5px] font-medium leading-relaxed ${isRecording ? 'text-slate-800' : 'text-slate-400 italic'}`}>
                    {isRecording
                      ? "Discussing project ideas for AI memory assistant. We should enable multi-modal capture across voice, notes, and calendar events, with automatic entity extraction and reminders."
                      : "Your speech will appear here..."}
                  </p>
                </div>
              </div>

              {/* AI Analysis Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex-1">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-[#8B5CF6]" fill="#8B5CF6" fillOpacity="0.2" />
                    <h3 className="text-[16px] font-bold text-slate-900">AI Analysis</h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center gap-2 text-[12px] font-semibold ${isRecording ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                    {isRecording ? 'Analyzing Audio...' : 'Waiting for audio...'}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnalysisCard 
                    icon={List} theme="blue"
                    title="Key Points" desc={isRecording ? "AI memory assistant project scope and features" : "Important information extracted from your speech"}
                  />
                  <AnalysisCard 
                    icon={CheckCircle2} theme="green"
                    title="Tasks" desc={isRecording ? "Draft feature list & research calendar API" : "Action items and deadlines"}
                  />
                  <AnalysisCard 
                    icon={User} theme="purple"
                    title="People" desc={isRecording ? "Sarah (Designer), Alex (Product Lead)" : "Names and relationships mentioned"}
                  />
                  <AnalysisCard 
                    icon={Calendar} theme="red"
                    title="Events" desc={isRecording ? "Follow up sprint planning tomorrow" : "Dates, meetings and commitments"}
                  />
                </div>
              </div>

            </div>
          </div>

          {}
          <div>
            <div className="flex items-center justify-between mb-4 pl-1">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-[#2563EB]" />
                <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Recent Captures</h3>
              </div>
              <NextLink href="/memories" className="text-[#2563EB] text-[13px] font-semibold hover:text-blue-700 flex items-center gap-1 group">
                View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </NextLink>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCaptures.map((capture) => (
                <CaptureCard
                  key={capture.id}
                  title={capture.title}
                  time={capture.time}
                  tag={capture.tag}
                  tagColor={capture.tagColor}
                  onCardClick={() => showToast(`Playing '${capture.title}'`)}
                  onMoreClick={() => showToast(`More options for '${capture.title}'`)}
                />
              ))}
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
