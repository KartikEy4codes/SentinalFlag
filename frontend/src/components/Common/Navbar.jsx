import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ChevronDown, Bell } from 'lucide-react';

export const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 w-full px-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Environment Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Env:</span>
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md text-sm font-semibold hover:bg-slate-200 transition">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Production
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {/* Dropdown - basic for now */}
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-1">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">Development</button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">Staging</button>
                <button className="w-full text-left px-3 py-2 text-sm font-bold text-blue-600 bg-blue-50/50 rounded-md">Production</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 transition relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right flex flex-col justify-center">
              <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tight mt-1">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border border-blue-200 shadow-sm">
              <User size={20} className="text-blue-600" />
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-slate-400 hover:text-red-500 transition"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
