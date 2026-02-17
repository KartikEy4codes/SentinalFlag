import React, { useState, useEffect } from 'react';
import FlagList from '../components/FlagList/FlagList';
import FlagForm from '../components/FlagForm/FlagForm';
import Modal from '../components/Common/Modal';
import Dashboard from '../components/Dashboard/Dashboard';
import { useFlagAPI } from '../hooks/useFlagAPI';
import { Search, Filter } from 'lucide-react';
import { flagService } from '../services/flagService';
import { mockFlags } from '../utils/mockData';

export const FlagsPage = () => {
  const [flags, setFlags] = useState(mockFlags); // Start with mock data
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ environment: '', search: '' });
  const { createFlag, deleteFlag, toggleFlag } = useFlagAPI();

  useEffect(() => {
    fetchFlags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      // Try to fetch from API first
      try {
        const response = await flagService.getAllFlags(filters);
        setFlags(response.data.data);
      } catch (error) {
        // Fall back to mock data for demo purposes
        console.log('Using mock data for demo');
        const filteredFlags = mockFlags.filter((flag) => {
          const matchSearch =
            flag.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            flag.description.toLowerCase().includes(filters.search.toLowerCase());
          const matchEnv = filters.environment === '' || flag.environment === filters.environment;
          return matchSearch && matchEnv;
        });
        setFlags(filteredFlags);
      }
    } catch (error) {
      console.error('Error fetching flags:', error);
      setFlags(mockFlags);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFlag = async (formData) => {
    try {
      await createFlag(formData);
      setShowForm(false);
      await fetchFlags();
    } catch (error) {
      console.error('Error creating flag:', error);
    }
  };

  const handleDeleteFlag = async (id) => {
    if (window.confirm('Are you sure you want to delete this flag?')) {
      try {
        await deleteFlag(id);
        await fetchFlags();
      } catch (error) {
        console.error('Error deleting flag:', error);
        // In demo mode, just remove from UI
        setFlags((prev) => prev.filter((f) => f._id !== id));
      }
    }
  };

  const handleToggleFlag = async (id) => {
    try {
      await toggleFlag(id);
      await fetchFlags();
    } catch (error) {
      console.error('Error toggling flag:', error);
      // In demo mode, toggle in UI
      setFlags((prev) =>
        prev.map((f) => (f._id === id ? { ...f, enabled: !f.enabled } : f))
      );
    }
  };

  const stats = {
    totalFlags: flags.length,
    enabledFlags: flags.filter((f) => f.enabled).length,
    disabledFlags: flags.filter((f) => !f.enabled).length,
    recentChanges: Math.floor(Math.random() * 20) + 5,
  };

  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Dashboard Stats */}
        <Dashboard stats={stats} />

        {/* Controls */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Feature Flags</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold"
          >
            + Create Flag
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by flag name or description..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={filters.environment}
              onChange={(e) => setFilters({ ...filters, environment: e.target.value })}
              className="flex-1 md:w-48 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
            >
              <option value="">All Environments</option>
              <option value="Dev">Development</option>
              <option value="Staging">Staging</option>
              <option value="Prod">Production</option>
            </select>
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-2 border border-blue-100 whitespace-nowrap">
              <Filter size={14} />
              {flags.length} Results
            </div>
          </div>
        </div>

        {/* Flags List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading flags...</p>
            </div>
          </div>
        ) : flags.length === 0 ? (
          <div className="text-center py-12 bg-blue-50 rounded-lg">
            <p className="text-gray-600 mb-4">No flags found</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create First Flag
            </button>
          </div>
        ) : (
          <FlagList
            flags={flags}
            onEdit={(id) => console.log('Edit:', id)}
            onDelete={handleDeleteFlag}
            onToggle={handleToggleFlag}
          />
        )}

        {/* Create Flag Modal */}
        {showForm && (
          <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
            <FlagForm onSubmit={handleCreateFlag} onCancel={() => setShowForm(false)} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default FlagsPage;
