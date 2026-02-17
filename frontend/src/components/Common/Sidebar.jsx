import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Flag,
    Settings,
    Users,
    History,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'Feature Flags', icon: <Flag size={20} />, path: '/flags' },
        { name: 'Users', icon: <Users size={20} />, path: '/users' },
        { name: 'Audit Logs', icon: <History size={20} />, path: '/audit' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 z-20 border-r border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Flag className="text-white" size={20} />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Sentinel Flag</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronRight
                            size={16}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Usage</p>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">13 / 20 Flags active</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
