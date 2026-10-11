"use client";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Database, FileText, CalendarCheck,
  Cpu, Link, BarChart2, FileSpreadsheet, Bell, ShieldCheck,
  Settings, Search, ChevronDown, ChevronRight, Brain, Lock,
  Plus, MoreVertical, Edit2, Shield, Key, Eye, File, Settings as GearIcon,
  Headset, ChevronLeft, UserPlus, UserMinus, UserCheck, Activity,
  Save, X, CheckCircle2
} from 'lucide-react';

// --- DATA ---
// Roles are runtime records: the list starts empty and grows through the
// Create Role flows. The permission catalog below (row labels) is product
// config and stays. Demo roles/changes remain recoverable from git history.

const userRoles: { name: string; desc: string; users: number; icon: any; color: string }[] = [];

const permissionCategories = [
  { name: 'Users & Administration', count: 12, icon: Users },
  { name: 'Memories', count: 10, icon: Database },
  { name: 'Documents', count: 10, icon: FileText },
  { name: 'Tasks & Events', count: 10, icon: CalendarCheck },
  { name: 'AI Usage', count: 12, icon: FileText },
  { name: 'Integrations', count: 10, icon: Link },
  { name: 'Analytics', count: 8, icon: BarChart2 },
  { name: 'Reports', count: 8, icon: FileSpreadsheet },
  { name: 'Notifications', count: 8, icon: Bell },
  { name: 'System Health', count: 8, icon: ShieldCheck },
  { name: 'Settings', count: 10, icon: GearIcon },
];

const recentChanges: { user: string; action: string; time: string; type: string }[] = [];

// Permission catalog — product config (the capability list). Role columns in
// the matrix are rendered from the roles list; per-role toggle states live in
// component state and default to OFF (1) as roles are created.
// Toggle states: 2 = ON, 1 = OFF, 0 = DISABLED
const permissionCatalog = [
  { perm: 'View Users', cat: 'Users' },
  { perm: 'Create Users', cat: 'Users' },
  { perm: 'Delete Users', cat: 'Users' },
  { perm: 'Manage Roles', cat: 'Users' },
  { perm: 'Access Memories', cat: 'Memories' },
  { perm: 'Delete Memories', cat: 'Memories' },
  { perm: 'View Documents', cat: 'Documents' },
  { perm: 'Upload Documents', cat: 'Documents' },
  { perm: 'Delete Documents', cat: 'Documents' },
  { perm: 'Manage Tasks', cat: 'Tasks & Events' },
  { perm: 'Manage AI Models', cat: 'AI Usage' },
  { perm: 'View Analytics', cat: 'Analytics' },
  { perm: 'Generate Reports', cat: 'Reports' },
  { perm: 'System Settings', cat: 'Settings' },
];

const EmptyState = ({ icon: Icon, title, subtitle }: any) => (
  <div className="flex flex-col items-center justify-center text-center py-12">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
      <Icon size={22} className="text-slate-400" strokeWidth={2} />
    </div>
    <p className="text-[15px] font-semibold text-slate-700">{title}</p>
    <p className="text-[13px] text-slate-400 mt-1">{subtitle}</p>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, badge, href }: any) => (
  <NextLink href={href} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#EBF3FF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
      <span className="text-[14px]">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 rounded-md bg-rose-500 text-white text-[11px] font-bold">{badge}</span>
    )}
  </NextLink>
);

const MatrixToggle = ({ state, onToggle }: { state: number; onToggle?: () => void }) => {
  // state: 2 = ON, 1 = OFF, 0 = DISABLED
  if (state === 2) {
    return (
      <button 
        type="button" 
        onClick={onToggle}
        className="w-8 h-4 bg-blue-500 rounded-full flex items-center justify-end px-0.5 transition-colors cursor-pointer focus:outline-none"
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
      </button>
    );
  } else if (state === 1) {
    return (
      <button 
        type="button"
        onClick={onToggle}
        className="w-8 h-4 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-start px-0.5 transition-colors cursor-pointer focus:outline-none"
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
      </button>
    );
  } else {
    // Disabled state
    return (
      <div className="w-8 h-4 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-start px-0.5 opacity-60 cursor-not-allowed">
        <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
      </div>
    );
  }
};

const ChangeIcon = ({ type }: any) => {
  switch (type) {
    case 'add': return <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><Plus size={12} strokeWidth={3} /></div>;
    case 'edit': return <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Edit2 size={12} strokeWidth={2.5} /></div>;
    case 'user': return <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><UserPlus size={12} strokeWidth={2.5} /></div>;
    case 'remove': return <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center"><UserMinus size={12} strokeWidth={2.5} /></div>;
    default: return <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Settings size={12} strokeWidth={2.5} /></div>;
  }
};

const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'All time', 'Today'];

const cycleOption = (options: string[], current: string) => {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
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

export default function RolesDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [matrixSearch, setMatrixSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [matrix, setMatrix] = useState(() => permissionCatalog.map((row) => ({ ...row, states: [] as number[] })));
  const [roleForm, setRoleForm] = useState({
    name: '',
    desc: '',
  });
  const [savedToast, setSavedToast] = useState(false);
  const [roles, setRoles] = useState(userRoles);
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const metricCards: { title: string; value: number | string; icon: any; color: string; bg: string; trend?: string }[] = [
    { title: 'Total Roles', value: roles.length, icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Admin Users', value: 0, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Total Permissions', value: matrix.length, icon: Key, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Secure Access', value: '—', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Access Logs', value: 0, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const handleCreateRole = () => {
    const suffix = roles.filter((r) => r.name.startsWith('Custom Role')).length + 1;
    const name = suffix === 1 ? 'Custom Role' : `Custom Role ${suffix}`;
    setRoles((prev) => [
      ...prev,
      { name, desc: 'Custom role with configurable permissions', users: 0, icon: Plus, color: 'bg-blue-100 text-blue-600' },
    ]);
    showToast(`Role "${name}" created — configure it in the editor`);
  };

  const handleExportPermissions = () => {
    downloadCsv('pathii-permissions.csv', [
      ['Permission', 'Category', ...roles.map((r) => r.name)],
      ...matrix.map((row) => [row.perm, row.cat, ...roles.map((_, roleIdx) => {
        const s = row.states[roleIdx];
        return s === 2 ? 'ON' : s === 1 ? 'OFF' : 'N/A';
      })]),
    ]);
    showToast(`Exported ${matrix.length} permissions`);
  };

  const handleToggle = (rowIndex: number, roleIndex: number) => {
    setMatrix(prev => {
      const next = [...prev];
      const targetRow = { ...next[rowIndex], states: [...next[rowIndex].states] };
      // Pad with OFF (1) for roles created after this row was last touched.
      while (targetRow.states.length <= roleIndex) targetRow.states.push(1);
      const current = targetRow.states[roleIndex];
      if (current === 2) targetRow.states[roleIndex] = 1;
      else if (current === 1) targetRow.states[roleIndex] = 2;
      next[rowIndex] = targetRow;
      return next;
    });
  };

  const handleSaveRole = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const filteredRoles = roles.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMatrix = matrix.filter(row => {
    const matchesSearch = row.perm.toLowerCase().includes(matrixSearch.toLowerCase()) ||
                          row.cat.toLowerCase().includes(matrixSearch.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || row.cat.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen lg:h-screen bg-[#F4F7F9] font-sans lg:overflow-hidden text-slate-900 antialiased">
      
      {/* Left Sidebar */}
      <aside className="w-[240px] bg-white flex flex-col flex-shrink-0 border-r border-slate-200/60 z-10">
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
          <SidebarItem icon={LayoutDashboard} label="Overview" href="/admin" />
          <SidebarItem icon={Users} label="Users" href="/admin/users" />
          <SidebarItem icon={Database} label="Memories" href="/admin/memories" />
          <SidebarItem icon={FileText} label="Documents" href="/admin/documents" />
          <SidebarItem icon={CalendarCheck} label="Tasks & Events" href="/admin/tasks" />
          <SidebarItem icon={Cpu} label="AI Usage" href="/admin/ai-usage" />
          <SidebarItem icon={Link} label="Integrations" href="/admin/integrations" />
          <SidebarItem icon={BarChart2} label="Analytics" href="/admin/analytics" />
          <SidebarItem icon={FileSpreadsheet} label="Reports" href="/admin/reports" />
          <SidebarItem icon={Bell} label="Notifications" href="/admin/notifications" />
          <SidebarItem icon={ShieldCheck} label="System Health" href="/admin/system-health" />
          <SidebarItem icon={Settings} label="Settings" href="/admin/settings" />
          <SidebarItem icon={Lock} label="Roles & Permissions" active href="/admin/roles" />
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto flex flex-col gap-2">
          <NextLink href="/admin/settings" className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[13px]">A</div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Admin</p>
                <p className="text-[12px] text-slate-500 font-medium leading-none">Administrator</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </NextLink>
          <NextLink 
            href="/"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[12px] font-bold transition-all border border-slate-200"
          >
            <ChevronLeft size={16} />
            <span>← Back to User View</span>
          </NextLink>
        </div>
      </aside>

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-auto py-4 lg:h-[72px] px-4 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-shrink-0 bg-[#F4F7F9]">
          <div className="relative w-full max-w-[450px] lg:w-[450px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search roles, users, permissions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-14 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium text-slate-700 shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-500 border border-slate-200">
              ⌘ K
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5 justify-end">
            <button onClick={() => setDateRange(cycleOption(dateRangeOptions, dateRange))} className="hidden sm:flex bg-white border border-slate-200 rounded-lg px-3 py-2 items-center gap-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <CalendarCheck size={16} className="text-blue-600" />
              {dateRange}
              <ChevronDown size={14} className="text-slate-400 ml-1" />
            </button>
            <button onClick={() => showToast('Notifications opened')} className="relative p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors bg-white border border-slate-200 shadow-sm">
              <Bell size={18} />
            </button>
            <div onClick={() => showToast('Signed in as Administrator')} className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-4 lg:pl-5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px] shadow-sm border border-slate-200">A</div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-slate-700">Admin <ChevronDown size={14} className="text-slate-400" /></div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 custom-scrollbar flex flex-col lg:flex-row gap-6">
          
          {/* Main Left Column */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            
            {/* Title Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={24} strokeWidth={2.5} />
                 </div>
                 <div>
                   <h2 className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 leading-tight">Roles & Permissions</h2>
                   <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium">Manage admin roles, user permissions, and access control across Pathii platform.</p>
                 </div>
               </div>
               <button 
                 onClick={() => {
                   setRoleForm({ name: 'New Custom Role', desc: 'Custom permissions for team members' });
                 }}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[13px] font-bold transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
               >
                  <Plus size={16} /> Create New Role
               </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              {metricCards.map((metric, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${metric.bg}`}>
                      <metric.icon size={20} className={metric.color} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-extrabold text-slate-900 leading-none mb-1">{metric.value}</h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-none whitespace-nowrap">{metric.title}</p>
                    </div>
                  </div>
                  {metric.trend && (
                  <div className={`flex items-center gap-1 text-[11px] font-bold mt-1 text-emerald-500`}>
                    <span className="text-lg leading-none mb-1">↑</span>
                    <span>{metric.trend}</span>
                    <span className="text-slate-400 font-medium ml-1">vs last month</span>
                  </div>
                  )}
                </div>
              ))}
            </div>

            {/* Middle Row: Table & Edit Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
              
              {/* User Roles Table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="text-[16px] font-bold text-slate-900">User Roles</h3>
                  <p className="text-[13px] text-slate-500 font-medium">List of all available roles in the system.</p>
                </div>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                        <th className="py-3 px-5 font-semibold">Role Name</th>
                        <th className="py-3 px-5 font-semibold">Description</th>
                        <th className="py-3 px-5 font-semibold text-center">Users</th>
                        <th className="py-3 px-5 font-semibold">Status</th>
                        <th className="py-3 px-5 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-[12px]">
                      {roles.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-2">
                            <EmptyState icon={ShieldCheck} title="No roles yet" subtitle="Roles you create will appear here." />
                          </td>
                        </tr>
                      ) : filteredRoles.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                            No roles match "{searchQuery}"
                          </td>
                        </tr>
                      ) : (
                        filteredRoles.map((role, i) => (
                          <tr 
                            key={i} 
                            onClick={() => {
                              setRoleForm({ name: role.name, desc: role.desc });
                            }}
                            className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          >
                            <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${role.color}`}>
                                  <role.icon size={16} strokeWidth={2.5} />
                                </div>
                                <span className="font-bold text-slate-900 text-[13px] group-hover:text-blue-600 transition-colors">{role.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-5 text-slate-500 font-medium w-[220px] truncate">{role.desc}</td>
                            <td className="py-3 px-5 text-center text-blue-600 font-bold">{role.users}</td>
                            <td className="py-3 px-5">
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Active
                              </div>
                            </td>
                            <td className="py-3 px-5 text-right">
                              <button onClick={() => showToast(`Opened actions for "${role.name}"`)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreVertical size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Create / Edit Role Panel */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
                <h3 className="text-[16px] font-bold text-slate-900 mb-5">Create / Edit Role</h3>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Role Name</label>
                    <input 
                      type="text" 
                      value={roleForm.name}
                      onChange={(e) => setRoleForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" 
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Description</label>
                    <input 
                      type="text" 
                      value={roleForm.desc}
                      onChange={(e) => setRoleForm(prev => ({ ...prev, desc: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 mb-2">Role Color</label>
                    <div className="flex gap-3">
                      <div onClick={() => showToast('Role color set to Blue')} className="w-6 h-6 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-blue-500 cursor-pointer"></div>
                      <div onClick={() => showToast('Role color set to Purple')} className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer hover:scale-110 transition-transform"></div>
                      <div onClick={() => showToast('Role color set to Emerald')} className="w-6 h-6 rounded-full bg-emerald-500 cursor-pointer hover:scale-110 transition-transform"></div>
                      <div onClick={() => showToast('Role color set to Amber')} className="w-6 h-6 rounded-full bg-amber-500 cursor-pointer hover:scale-110 transition-transform"></div>
                      <div onClick={() => showToast('Role color set to Rose')} className="w-6 h-6 rounded-full bg-rose-500 cursor-pointer hover:scale-110 transition-transform"></div>
                      <div onClick={() => showToast('Role color set to Pink')} className="w-6 h-6 rounded-full bg-pink-500 cursor-pointer hover:scale-110 transition-transform"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 mb-2">Role Icon</label>
                    <div className="flex flex-wrap gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm cursor-pointer"><FileText size={16} /></div>
                      <div onClick={() => showToast('Role icon set to Users')} className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"><Users size={16} /></div>
                      <div onClick={() => showToast('Role icon set to Settings')} className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"><GearIcon size={16} /></div>
                      <div onClick={() => showToast('Role icon set to Brain')} className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"><Brain size={16} /></div>
                      <div onClick={() => showToast('Role icon set to Headset')} className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"><Headset size={16} /></div>
                      <div onClick={() => showToast('Role icon set to Eye')} className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"><Eye size={16} /></div>
                      <div onClick={() => showToast('Role icon set to Link')} className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"><Link size={16} /></div>
                      <div onClick={() => showToast('Role icon set to Shield')} className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"><Shield size={16} /></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  {savedToast ? (
                    <span className="text-[12px] font-bold text-emerald-600 animate-pulse">✓ Saved successfully!</span>
                  ) : <span />}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setRoleForm({ name: '', desc: '' })}
                      className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-colors"
                    >
                      Clear
                    </button>
                    <button 
                      onClick={handleSaveRole}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Save Role
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Permission Matrix */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
               <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                 <div>
                   <h3 className="text-[16px] font-bold text-slate-900">Permission Matrix</h3>
                   <p className="text-[13px] text-slate-500 font-medium">Define which permissions are available for each role (click toggle to switch).</p>
                 </div>
                 <div className="flex flex-wrap items-center gap-2">
                   <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                     {['All', 'Users', 'Memories', 'Documents', 'AI Usage', 'Analytics'].map((cat) => (
                       <button
                         key={cat}
                         onClick={() => setCategoryFilter(cat)}
                         className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                           categoryFilter === cat
                             ? 'bg-white text-blue-600 shadow-sm'
                             : 'text-slate-500 hover:text-slate-900'
                         }`}
                       >
                         {cat}
                       </button>
                     ))}
                   </div>
                   <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                     <input 
                       type="text" 
                       placeholder="Search permissions..." 
                       value={matrixSearch}
                       onChange={(e) => setMatrixSearch(e.target.value)}
                       className="w-full sm:w-[180px] pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-700" 
                     />
                   </div>
                 </div>
               </div>

               <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                 <table className="w-full text-left border-collapse">
                   <thead className="sticky top-0 bg-white z-10 shadow-sm">
                     <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 tracking-wider">
                       <th className="py-3 px-5 bg-slate-50 w-[200px]">Permission</th>
                       <th className="py-3 px-5 bg-slate-50 w-[150px]">Category</th>

                       {/* Role Headers — rendered from the roles list */}
                       {roles.map((role) => (
                         <th key={role.name} className="py-3 px-4 bg-slate-50">
                           <div className="flex items-center gap-1.5 justify-center"><role.icon size={14} className="text-blue-500"/> {role.name}</div>
                         </th>
                       ))}
                     </tr>
                   </thead>
                   <tbody className="text-[12px]">
                     {roles.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="py-2">
                          <EmptyState icon={Lock} title="No roles yet" subtitle="Create a role to configure its permissions." />
                        </td>
                      </tr>
                     ) : filteredMatrix.length === 0 ? (
                       <tr>
                         <td colSpan={2 + roles.length} className="py-12 text-center text-slate-400 font-medium">
                           No permissions match "{matrixSearch}"
                         </td>
                       </tr>
                     ) : (
                       filteredMatrix.map((row, i) => {
                         const origIndex = matrix.findIndex(r => r.perm === row.perm);
                         return (
                           <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                             <td className="py-3 px-5 font-bold text-slate-800">{row.perm}</td>
                             <td className="py-3 px-5 text-blue-600 font-medium">{row.cat}</td>

                             {/* Toggles for each role */}
                             {roles.map((_, roleIdx) => (
                               <td key={roleIdx} className="py-3 px-4 text-center">
                                 <div className="flex justify-center">
                                   <MatrixToggle
                                     state={row.states[roleIdx] ?? 1}
                                     onToggle={() => handleToggle(origIndex, roleIdx)}
                                   />
                                 </div>
                               </td>
                             ))}
                           </tr>
                         );
                       })
                     )}
                   </tbody>
                 </table>
               </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Permission Categories */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">Permission Categories</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Manage permission modules.</p>
                </div>
                <button onClick={() => showToast('Permission categories are managed via the matrix')} className="text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={14} /></button>
              </div>
              
              <div className="flex flex-col space-y-2">
                {permissionCategories.map((cat, i) => (
                  <div key={i} onClick={() => showToast(`${cat.name}: ${cat.count} permissions`)} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
                        <cat.icon size={16} />
                      </div>
                      <span className="text-[13px] font-bold text-slate-700">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-slate-400">{cat.count} permissions</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Permission Changes */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[15px] font-bold text-slate-900">Recent Permission Changes</h3>
                  <button onClick={() => showToast('Showing recent permission changes')} className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">View all <ChevronRight size={14} /></button>
               </div>
               
               <div className="space-y-4 relative">
                 {/* Connecting Line */}
                 <div className="absolute left-[11px] top-4 bottom-4 w-px bg-slate-100 z-0"></div>

                 {recentChanges.length > 0 ? recentChanges.map((change, i) => (
                   <div key={i} className="flex items-start gap-3 relative z-10">
                     <ChangeIcon type={change.type} />
                     <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[9px]">{change.user.charAt(0)}</div>
                          <span className="text-[13px] font-bold text-slate-900">{change.user}</span>
                          <span className="text-[10px] text-slate-400 font-medium ml-auto whitespace-nowrap">{change.time}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 font-medium leading-snug truncate pl-7">{change.action}</p>
                     </div>
                   </div>
                 )) : (
                   <EmptyState icon={UserCheck} title="No permission changes yet" subtitle="Changes will appear here as permissions are edited." />
                 )}
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
               <h3 className="text-[15px] font-bold text-slate-900 mb-4">Quick Actions</h3>
               
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleCreateRole} className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 rounded-xl transition-colors">
                    <Plus size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-[11px] font-bold leading-tight text-left">Create New Role</span>
                  </button>
                  <button onClick={() => router.push('/admin/users')} className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 rounded-xl transition-colors">
                    <Users size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-[11px] font-bold leading-tight text-left">Manage Users</span>
                  </button>
                  <button onClick={handleExportPermissions} className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 rounded-xl transition-colors">
                    <Save size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-[11px] font-bold leading-tight text-left">Export Permissions</span>
                  </button>
                  <button onClick={() => showToast('No access logs yet')} className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 rounded-xl transition-colors">
                    <FileText size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-[11px] font-bold leading-tight text-left">View Access Logs</span>
                  </button>
                </div>
            </div>

          </div>

        </div>
      </div>

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
