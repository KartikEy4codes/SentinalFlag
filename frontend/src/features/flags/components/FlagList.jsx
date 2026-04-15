import React from 'react';
import { Edit2, Trash2, ShieldCheck, ShieldAlert, MoreHorizontal } from 'lucide-react';

export const FlagList = ({ flags, onEdit, onDelete, onToggle }) => {
  if (flags.length === 0) {
    return (
      <div className="card-base p-12 text-center">
        <div className="empty-state">
          <div className="empty-state-icon">🚩</div>
          <div className="empty-state-title">No flags found</div>
          <div className="empty-state-text">Create your first feature flag to get started</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-base overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="table-cell text-left table-cell-label">Flag Name</th>
              <th className="table-cell text-left table-cell-label">Environment</th>
              <th className="table-cell text-left table-cell-label">Strategy</th>
              <th className="table-cell text-left table-cell-label">Rollout</th>
              <th className="table-cell text-left table-cell-label">Status</th>
              <th className="table-cell text-right table-cell-label">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {flags.map((flag, idx) => (
              <tr key={flag._id || idx} className="hover:bg-gray-100 transition-colors group">
                <td className="table-cell">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{flag.name}</p>
                    <p className="text-xs text-gray-600 line-clamp-1 mt-1">{flag.description || 'No description'}</p>
                  </div>
                </td>
                <td className="table-cell">
                  <span className={`env-badge ${
                    flag.environment === 'Prod' || flag.environment === 'Production' ? 'env-prod' :
                    flag.environment === 'Staging' ? 'env-staging' :
                    'env-dev'
                  }`}>
                    {flag.environment === 'Prod' || flag.environment === 'Production' ? 'Prod' : flag.environment}
                  </span>
                </td>
                <td className="table-cell">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                    {flag.strategyType || 'percentage'}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-xs">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${flag.rolloutPercentage || 0}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-600 min-w-max">{flag.rolloutPercentage || 0}%</span>
                  </div>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => onToggle && onToggle(flag._id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      flag.enabled
                        ? 'bg-green-900/40 text-green-200 border-green-800 hover:bg-green-900/60'
                        : 'bg-red-900/40 text-red-200 border-red-800 hover:bg-red-900/60'
                    }`}
                  >
                    {flag.enabled ? (
                      <ShieldCheck size={14} />
                    ) : (
                      <ShieldAlert size={14} />
                    )}
                    {flag.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="table-cell text-right">
                  <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit && onEdit(flag._id)}
                      className="btn-icon"
                      title="Edit flag"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(flag._id)}
                      className="btn-icon hover:text-gray-300 hover:bg-gray-900"
                      title="Delete flag"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="btn-icon">
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
