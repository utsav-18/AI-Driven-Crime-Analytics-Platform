import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  UserX, 
  ShieldAlert, 
  MapPin, 
  Map,
  Share2,
  BrainCircuit,
  BarChart2, 
  Settings,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard',       path: '/dashboard',       icon: LayoutDashboard },
  { name: 'AI Insights',     path: '/ai-analytics',     icon: BrainCircuit },
  { name: 'Crime Map',       path: '/crime-map',        icon: Map },
  { name: 'Network',         path: '/network-analysis', icon: Share2 },
  { name: 'Cases',           path: '/cases',            icon: FileText },
  { name: 'Victims',         path: '/victims',          icon: Users },
  { name: 'Accused',         path: '/accused',          icon: UserX },
  { name: 'Crime Categories',path: '/crime-categories', icon: ShieldAlert },
  { name: 'Districts',       path: '/districts',        icon: MapPin },
  { name: 'Analytics',       path: '/analytics',        icon: BarChart2 },
  { name: 'Settings',        path: '/settings',         icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-navy-900/50 z-20 lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-navy-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-navy-700">
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-blue-accent" />
            <span className="truncate">KSP Analytics</span>
          </span>
          <button 
            className="lg:hidden text-slate-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors font-medium",
                isActive 
                  ? "bg-blue-dark text-white shadow-sm" 
                  : "text-slate-300 hover:bg-navy-700 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
