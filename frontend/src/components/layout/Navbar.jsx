import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, Bell, Search } from 'lucide-react';

export const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-300 sticky top-0 z-20 w-full px-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Environment Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Environment:</span>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-200 transition border border-gray-300">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
              Production
              <ChevronDown size={14} className="text-gray-600" />
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-2">
                <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Development
                  </span>
                </button>
                <button className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    Staging
                  </span>
                </button>
                <button className="w-full text-left px-3 py-2.5 text-sm font-bold text-gray-900 bg-gray-100 rounded-lg transition">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    Production
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 text-gray-600 hover:text-gray-900 transition rounded-lg hover:bg-gray-100">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-gray-300"></div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:flex flex-col justify-center">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs font-medium text-gray-600 uppercase tracking-tight mt-0.5">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300 shadow-sm">
              <span className="text-black font-bold text-xs">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "U"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 text-gray-600 hover:text-gray-900 transition rounded-lg hover:bg-gray-100"
              title="Logout"
            >
              <LogOut size={18} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
