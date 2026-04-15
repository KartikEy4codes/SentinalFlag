import React, { useState } from 'react';

export const FlagForm = ({ onSubmit, initialData = null, loading = false, onCancel }) => {
  const [showGuide, setShowGuide] = useState(false);
  const formattedInitialData = initialData
    ? {
        ...initialData,
        targetingRules:
          typeof initialData.targetingRules === 'object'
            ? JSON.stringify(initialData.targetingRules, null, 2)
            : initialData.targetingRules || '{}',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags || '',
        targetUsers: Array.isArray(initialData.targetUsers)
          ? initialData.targetUsers.join(', ')
          : initialData.targetUsers || '',
      }
    : null;

  const [formData, setFormData] = useState(
    formattedInitialData || {
      name: '',
      description: '',
      enabled: false,
      environment: 'Dev',
      rolloutPercentage: 0,
      strategyType: 'percentage',
      targetingRules: '{}',
      targetUsers: '',
      tags: '',
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Flag name is required';
    if (formData.rolloutPercentage < 0 || formData.rolloutPercentage > 100) {
      newErrors.rolloutPercentage = 'Rollout percentage must be between 0 and 100';
    }

    try {
      if (typeof formData.targetingRules === 'string') {
        JSON.parse(formData.targetingRules);
      }
    } catch (e) {
      newErrors.targetingRules = 'Invalid JSON format for targeting rules';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = {
      ...formData,
      targetingRules: typeof formData.targetingRules === 'string' ? JSON.parse(formData.targetingRules) : formData.targetingRules,
      targetUsers: typeof formData.targetUsers === 'string'
        ? formData.targetUsers.split(',').map((user) => user.trim()).filter((user) => user)
        : formData.targetUsers,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Quick Guide */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-2 w-full text-left font-semibold text-blue-900 hover:text-blue-700"
        >
          <span className={`transform transition-transform ${showGuide ? 'rotate-90' : ''}`}>›</span>
          📖 Guide: How to Fill Out This Form
        </button>
        
        {showGuide && (
          <div className="mt-3 space-y-3 text-sm text-gray-700 border-t border-blue-200 pt-3">
            <div>
              <p className="font-semibold text-blue-900">🏷️ Flag Name</p>
              <p className="text-xs text-gray-600">Example: <code className="bg-white px-2 py-1 rounded">dark_mode_v2</code></p>
              <p className="text-xs">Unique identifier for this feature flag (alphanumeric, underscores allowed)</p>
            </div>
            
            <div>
              <p className="font-semibold text-blue-900">📝 Description</p>
              <p className="text-xs text-gray-600">Example: <code className="bg-white px-2 py-1 rounded">Enable new dark theme across UI</code></p>
              <p className="text-xs">Describe what this flag does and why it exists</p>
            </div>
            
            <div>
              <p className="font-semibold text-blue-900">🌍 Environment</p>
              <p className="text-xs">Choose: <span className="font-mono bg-white px-1.5 py-0.5 rounded text-xs">Dev</span> <span className="font-mono bg-white px-1.5 py-0.5 rounded text-xs">Staging</span> <span className="font-mono bg-white px-1.5 py-0.5 rounded text-xs">Prod</span></p>
            </div>
            
            <div>
              <p className="font-semibold text-blue-900">📊 Strategy Type</p>
              <p className="text-xs"><span className="font-semibold">Percentage Rollout:</span> Roll out to X% of users</p>
              <p className="text-xs"><span className="font-semibold">User Targeting:</span> Enable for specific users</p>
              <p className="text-xs"><span className="font-semibold">Branch-based:</span> Enable based on code branch</p>
            </div>
            
            <div>
              <p className="font-semibold text-blue-900">📌 Targeting Rules (JSON)</p>
              <p className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded">{`{"region": "us-east-1", "plan": "premium"}`}</p>
              <p className="text-xs">Define custom conditions in JSON format</p>
            </div>
            
            <div>
              <p className="font-semibold text-blue-900">👥 Tags</p>
              <p className="text-xs text-gray-600">Example: <code className="bg-white px-2 py-1 rounded">ui, frontend, rollout</code></p>
              <p className="text-xs">Comma-separated tags for organization (optional)</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group md:col-span-1">
            <label className="form-label">Flag Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-base"
              placeholder="e.g., dark_mode_v2"
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
          </div>

          <div className="form-group md:col-span-1">
            <label className="form-label">Environment</label>
            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className="input-base font-medium"
              disabled={loading}
            >
              <option value="Dev">Development</option>
              <option value="Staging">Staging</option>
              <option value="Prod">Production</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-base resize-none"
            rows="3"
            placeholder="Describe what this feature flag does..."
            disabled={loading}
          />
        </div>
      </div>

      {/* Rollout Configuration */}
      <div className="space-y-4 p-4 rounded-xl bg-gray-100 border border-gray-300">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Rollout Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Strategy Type</label>
            <select
              name="strategyType"
              value={formData.strategyType}
              onChange={handleChange}
              className="input-base font-medium"
              disabled={loading}
            >
              <option value="percentage">Percentage Rollout</option>
              <option value="user-targeting">User Targeting</option>
              <option value="branch-based">Branch-based</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Rollout Percentage</label>
            <div className="relative">
              <input
                type="number"
                name="rolloutPercentage"
                value={formData.rolloutPercentage}
                onChange={handleChange}
                min="0"
                max="100"
                className="input-base font-bold"
                disabled={loading}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 font-bold pointer-events-none">%</span>
            </div>
            {errors.rolloutPercentage && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.rolloutPercentage}</p>
            )}
          </div>
        </div>

        {formData.strategyType === 'user-targeting' && (
          <div className="form-group">
            <label className="form-label">Target Users</label>
            <input
              type="text"
              name="targetUsers"
              value={formData.targetUsers}
              onChange={handleChange}
              className="input-base"
              placeholder="Separate user IDs or emails with commas"
              disabled={loading}
            />
            <p className="text-xs text-gray-600 mt-2">Example: user@example.com, admin@example.com</p>
          </div>
        )}
      </div>

      {/* Advanced Rules */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Advanced Rules</h3>
        
        <div className="form-group">
          <label className="form-label">Targeting Rules (JSON)</label>
          <div className="bg-white rounded-lg p-4 border border-gray-300 font-mono text-sm">
            <textarea
              name="targetingRules"
              value={formData.targetingRules}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 outline-none resize-none font-mono text-xs"
              rows="6"
              placeholder='{"region": "us-east-1", "plan": "premium"}'
              disabled={loading}
              spellCheck="false"
            />
          </div>
          {errors.targetingRules && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.targetingRules}</p>
          )}
          <p className="text-xs text-gray-600 mt-2">Define JSON rules for advanced targeting conditions</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-100 border border-gray-300">
        <input
          type="checkbox"
          id="enabled"
          name="enabled"
          checked={formData.enabled}
          onChange={handleChange}
          className="w-5 h-5 rounded-md accent-blue-600 cursor-pointer"
          disabled={loading}
        />
        <label htmlFor="enabled" className="flex-1 cursor-pointer">
          <span className="font-semibold text-gray-900 block">Enable this flag</span>
          <span className="text-xs text-gray-600">Flag will be {formData.enabled ? 'enabled' : 'disabled'} when created</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-300">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost"
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary min-w-[120px]"
        >
          {loading ? 'Processing...' : initialData ? 'Update Flag' : 'Create Flag'}
        </button>
      </div>
    </form>
  );
};

export default FlagForm;
