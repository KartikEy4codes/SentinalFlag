import React from 'react';

export const FlagCard = ({ flag, onEdit, onDelete, onToggle }) => {
  const rolloutText = flag.rolloutPercentage === 100 ? 'Full Rollout' : `${flag.rolloutPercentage}% Rollout`;

  return (
    <div className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm card-hover hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 text-lg">{flag.name}</h4>
            <span className={`badge ${flag.enabled ? 'badge-success' : 'badge-warning'}`}>
              {flag.enabled ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-sm text-gray-600">{flag.description}</p>
        </div>
        <button
          onClick={() => onToggle(flag._id)}
          className={`ml-3 w-14 h-8 rounded-full transition flex-shrink-0 ${
            flag.enabled
              ? 'bg-green-500 shadow-lg shadow-green-500/50'
              : 'bg-gray-300'
          }`}
          title={flag.enabled ? 'Click to disable' : 'Click to enable'}
        />
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Environment</span>
          <span className="font-medium text-gray-900 badge badge-info">{flag.environment}</span>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Rollout</span>
            <span className="font-medium text-gray-900">{rolloutText}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${flag.rolloutPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {flag.targetSegments && flag.targetSegments.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-2">Target Segments:</p>
          <div className="flex flex-wrap gap-1">
            {flag.targetSegments.map((segment) => (
              <span key={segment} className="badge badge-info text-xs">
                {segment}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(flag._id)}
          className="flex-1 py-2 px-3 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium transition"
          title="Edit this flag"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(flag._id)}
          className="flex-1 py-2 px-3 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium transition"
          title="Delete this flag"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default FlagCard;
