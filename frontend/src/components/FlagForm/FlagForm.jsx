import React, { useState } from 'react';

export const FlagForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      description: '',
      enabled: false,
      environment: 'Dev',
      rolloutPercentage: 0,
      strategyType: 'percentage',
      targetingRules: '{}',
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
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Flag Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g., pilot_program_v1"
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Environment</label>
          <select
            name="environment"
            value={formData.environment}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            disabled={loading}
          >
            <option value="Dev">Development</option>
            <option value="Staging">Staging</option>
            <option value="Prod">Production</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[80px]"
          placeholder="Describe the purpose of this feature flag..."
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Strategy Type</label>
          <select
            name="strategyType"
            value={formData.strategyType}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            disabled={loading}
          >
            <option value="percentage">Percentage Rollout</option>
            <option value="user-targeting">User Targeting</option>
            <option value="branch-based">Branch-based</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rollout %</label>
          <div className="relative">
            <input
              type="number"
              name="rolloutPercentage"
              value={formData.rolloutPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
              disabled={loading}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
          {errors.rolloutPercentage && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.rolloutPercentage}</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-xl">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Targeting Rules (JSON)</label>
        <textarea
          name="targetingRules"
          value={formData.targetingRules}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-800 text-blue-300 font-mono text-sm border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[120px]"
          placeholder='{"region": "us-east-1", "plan": "premium"}'
          disabled={loading}
        />
        {errors.targetingRules && <p className="text-red-400 text-xs mt-2 font-medium">{errors.targetingRules}</p>}
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              className="sr-only peer"
              disabled={loading}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
            Initially {formData.enabled ? 'Enabled' : 'Disabled'}
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-slate-300 transition-all shadow-lg shadow-blue-500/20"
          >
            {loading ? 'Processing...' : initialData ? 'Update Flag' : 'Create Flag'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FlagForm;
