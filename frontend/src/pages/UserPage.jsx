import { useState, useEffect } from "react";
import FlagList from '../features/flags/components/FlagList';
import FlagForm from '../features/flags/components/FlagForm';
import Modal from '../components/ui/Modal';
import Dashboard from '../features/dashboard/components/Dashboard';
import { useFlagAPI } from '../features/flags/hooks/useFlagAPI';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Search, Filter, Plus } from 'lucide-react';
import { flagService } from '../features/flags/services/flagService';

export default function UserPage() {
  const [search, setSearch] = useState("");
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ environment: '', search: '' });
  const { createFlag, deleteFlag, toggleFlag } = useFlagAPI();
  const { user } = useAuth();

  useEffect(() => {
    fetchFlags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      const response = await flagService.getAllFlags(filters);
      setFlags(response.data.data);
    } catch (error) {
      console.error('Error fetching flags:', error);
      setFlags([]);
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
      setFlags((prev) =>
        prev.map((f) => (f._id === id ? { ...f, enabled: !f.enabled } : f))
      );
    }
  };

  const newFlagsCount = flags.filter((flag) => {
    const createdAt = new Date(flag.createdAt || flag.createdAtAt || '');
    if (Number.isNaN(createdAt.getTime())) return false;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return createdAt >= cutoff;
  }).length;

  const recentChanges = flags.filter((flag) => {
    const modified = new Date(flag.lastModified || flag.updatedAt || flag.createdAt || '');
    if (Number.isNaN(modified.getTime())) return false;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 1);
    return modified >= cutoff;
  }).length;

  const stats = {
    totalFlags: flags.length,
    enabledFlags: flags.filter((f) => f.enabled).length,
    disabledFlags: flags.filter((f) => !f.enabled).length,
    recentChanges,
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        
        {/* Dashboard Stats */}
        <div className="animate-fade-in">
          <Dashboard stats={stats} flags={flags} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Column - Search & Flags */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search & Filters */}
          <div className="card-base p-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search flags..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input-base pl-10 w-full"
                />
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
              >
                <Plus size={18} />
                New
              </button>
              <select
                value={filters.environment}
                onChange={(e) => setFilters({ ...filters, environment: e.target.value })}
                className="input-base"
              >
                <option value="">All envs</option>
                <option value="Dev">Development</option>
                <option value="Staging">Staging</option>
                <option value="Prod">Production</option>
              </select>
            </div>
          </div>

          {/* Flags Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Feature flags</h2>
            {loading ? (
              <div className="card-base p-8 text-center">
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="spinner">
                    <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" fill="currentColor" />
                      <circle cx="12" cy="5" r="1" fill="currentColor" opacity="0.3" />
                      <circle cx="12" cy="19" r="1" fill="currentColor" opacity="0.3" />
                      <circle cx="5" cy="12" r="1" fill="currentColor" opacity="0.3" />
                      <circle cx="19" cy="12" r="1" fill="currentColor" opacity="0.3" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Loading flags...</p>
                </div>
              </div>
            ) : (
              <FlagList
                flags={flags}
                onEdit={(id) => console.log('Edit:', id)}
                onDelete={handleDeleteFlag}
                onToggle={handleToggleFlag}
              />
            )}
          </div>
        </div>

        {/* Right Column - Users & Activity */}
        <div className="space-y-4">
          
          {/* Users Section */}
          <div className="card-base p-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">USERS</h2>
            
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow">
                    <span className="text-black font-bold text-sm">
                      {user.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{user.name || "Unknown User"}</h3>
                    <p className="text-xs text-gray-600 truncate">{user.email || "user@sentinalflag.local"}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-300">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      Active
                    </span>
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-gray-100 border border-gray-300 text-center">
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Flags owned</p>
                  <p className="text-3xl font-bold text-gray-900">{flags.length}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-green-700">{stats.enabledFlags} on</span>
                  <span className="text-red-700">{stats.disabledFlags} off</span>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">👤</div>
                <div className="empty-state-title">No user logged in</div>
              </div>
            )}
          </div>

          {/* Activity Section */}
          <div className="card-base p-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">ACTIVITY</h2>
            
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-gray-100 border border-gray-300">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">New this w</p>
                <p className="text-xl font-bold text-gray-900">{newFlagsCount}</p>
              </div>

              <div className="p-2 rounded-lg bg-gray-100 border border-gray-300">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">M</p>
                <p className="text-xl font-bold text-gray-900">{recentChanges}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Create Flag Modal */}
        {showForm && (
          <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
            <FlagForm onSubmit={handleCreateFlag} onCancel={() => setShowForm(false)} />
          </Modal>
        )}
      </div>
    </div>
  );
}