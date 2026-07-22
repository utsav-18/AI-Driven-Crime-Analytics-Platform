import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-navy-900 hidden sm:block">AI-Driven Crime Analytics</h2>
      </div>

      <div className="flex items-center gap-4">
        <button 
          aria-label="Notifications"
          className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-dark flex items-center justify-center font-bold" aria-hidden="true">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium text-navy-900">Admin User</p>
            <p className="text-xs text-slate-500">Karnataka Police</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
