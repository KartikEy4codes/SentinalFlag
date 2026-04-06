import React from 'react';

import { Edit2, Trash2, ShieldCheck, ShieldAlert, MoreHorizontal } from 'lucide-react';

export const FlagList = ({ flags, onEdit, onDelete, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Flag Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Environment</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Strategy</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Rollout</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {flags.map((flag) => (
              <tr key={flag._id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{flag.name}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{flag.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${flag.environment === 'Prod' ? 'bg-red-50 text-red-600 border-red-100' :
                    flag.environment === 'Staging' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                    {flag.environment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600">{flag.strategyType || 'percentage'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${flag.rolloutPercentage}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{flag.rolloutPercentage}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggle(flag._id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${flag.enabled
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {flag.enabled ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                    {flag.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      onClick={() => onEdit(flag._id)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(flag._id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlagList;
