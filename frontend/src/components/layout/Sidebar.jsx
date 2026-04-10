import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#0B1A2B] text-white flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-[#1f2d3d]">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="font-bold">P</span>
        </div>
        <span className="text-lg font-semibold">Sentinel Flag</span>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-[#13263A] text-blue-400"
                    : "text-gray-400 hover:bg-[#13263A] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="text-sm">{item.name}</span>
                </div>

                {/* Arrow for active */}
                {active && <ChevronRight size={16} />}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Usage Card */}
      <div className="p-4 m-3 bg-[#0f2235] rounded-xl border border-[#1f2d3d]">
        <div className="text-xs text-gray-400 mb-2">USAGE</div>

        <div className="w-full bg-[#1f2d3d] rounded-full h-2 mb-2">
          <div className="bg-blue-500 h-2 rounded-full w-[65%]"></div>
        </div>

        <div className="text-xs text-gray-400">
          13 / 20 Flags active
        </div>
      </div>
    </div>
  );
};

export default Sidebar;