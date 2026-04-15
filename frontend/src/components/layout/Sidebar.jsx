import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ChevronRight, MessageCircle } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-200">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900">SentinelFlag</h1>
          <p className="text-xs text-slate-500">Feature Flags</p>
        </div>
      </div>

      {/* User Profile Card */}
      {user && (
        <div className="px-4 py-5 border-b border-slate-200">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow">
                <span className="text-white font-bold text-sm">{getInitials(user.name)}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">
                <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Active
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-0.5">{user.name || "User"}</h3>
            <p className="text-xs text-slate-600 line-clamp-1">{user.email || "user@sentinalflag.local"}</p>
          </div>
        </div>
      )}

      {/* Menu with Dots */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                    active
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={active ? "text-indigo-600" : ""} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {active && <ChevronRight size={16} className="text-indigo-600" />}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex flex-col gap-3 mt-8 px-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Environment Statistics */}
      <div className="px-4 pb-6 border-t border-slate-200 pt-6">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">ENVIRONMENTS</h3>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium text-slate-700">Dev</span>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">12</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-sm font-medium text-slate-700">Staging</span>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">7</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium text-slate-700">Prod</span>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;