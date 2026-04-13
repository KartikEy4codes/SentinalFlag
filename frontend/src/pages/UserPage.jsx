import { useState, useEffect } from "react";
import FlagList from '../features/flags/components/FlagList';
import FlagForm from '../features/flags/components/FlagForm';
import Modal from '../components/ui/Modal';
import Dashboard from '../features/dashboard/components/Dashboard';
import { useFlagAPI } from '../features/flags/hooks/useFlagAPI';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Search, Filter } from 'lucide-react';
import { flagService } from '../features/flags/services/flagService';

export default function UserPage() {
  const [search, setSearch] = useState("");
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ environment: '', search: '' });
  const { createFlag, deleteFlag, toggleFlag } = useFlagAPI();
  const { user } = useAuth();

  const currentUser = user
    ? {
        name: user.name || 'Unknown User',
        email: user.email || 'unknown@sentinalflag.local',
        env: user.role ? user.role.toUpperCase() : 'USER',
        features: flags.length,
        status: 'Active',
      }
    : null;

  const filteredUsers = currentUser
    ? [currentUser].filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

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

  const envTotals = {
    DEV: flags.filter((f) => f.environment?.toLowerCase() === 'dev').length,
    STAGING: flags.filter((f) => f.environment?.toLowerCase() === 'staging').length,
    PROD: flags.filter((f) => ['prod', 'production'].includes(f.environment?.toLowerCase())).length,
  };
  const envTotal = flags.length || 1;

  const stats = {
    totalFlags: flags.length,
    enabledFlags: flags.filter((f) => f.enabled).length,
    disabledFlags: flags.filter((f) => !f.enabled).length,
    recentChanges,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow"
        >
          + Create Flag
        </button>
      </div>

      {/* 🔹 User Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total Users" value={currentUser ? 1 : 0} sub={currentUser ? `Logged in as ${currentUser.name}` : 'No active user'} />
        <Card title="Active Users" value={currentUser ? 1 : 0} sub={currentUser ? 'Active session' : 'Signed out'} green />
        <Card title="Inactive Users" value={0} sub="No inactive users" gray />
        <Card title="Recent Flags" value={newFlagsCount} sub="Created in last 7 days" purple />
      </div>

      {/* 🔹 Flag Dashboard Stats */}
      <div className="mb-6">
        <Dashboard stats={stats} flags={flags} />
      </div>

      {/* 🔹 Flag Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search flags by name or description..."
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
            {flags.length} Flags
          </div>
        </div>
      </div>

      {/* 🔹 Flags List */}
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

      {/* 🔹 User Distribution Chart */}
      <div className="grid grid-cols-2 gap-6 mb-6 mt-8">
        <div className="bg-white rounded-xl shadow p-4 h-40">
          <h2 className="font-semibold mb-2">Flag Environment Summary</h2>
          <div className="flex justify-between text-sm text-gray-400 mt-16">
            <span>{envTotals.DEV} DEV</span>
            <span>{envTotals.STAGING} STAGING</span>
            <span>{envTotals.PROD} PROD</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Environment Allocation</h2>

          <EnvBar label="DEV" value={Math.round((envTotals.DEV / envTotal) * 100)} color="bg-blue-500" />
          <EnvBar label="STAGING" value={Math.round((envTotals.STAGING / envTotal) * 100)} color="bg-yellow-500" />
          <EnvBar label="PROD" value={Math.round((envTotals.PROD / envTotal) * 100)} color="bg-red-500" />

          <div className="flex justify-center mt-4">
            <div className="w-20 h-20 rounded-full border-4 border-blue-400 flex items-center justify-center text-sm font-semibold">
              {flags.length}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Users Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>

        {/* Search + Filters */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="flex-1 border px-3 py-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="border px-3 py-2 rounded-lg">
            <option>All Environments</option>
            <option>PRODUCTION</option>
            <option>DEVELOPMENT</option>
            <option>STAGING</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead className="text-gray-500 text-sm border-b">
            <tr>
              <th className="py-2">NAME</th>
              <th>EMAIL</th>
              <th>ENVIRONMENT</th>
              <th>FEATURES</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                    {user.env}
                  </span>
                </td>

                <td>{user.features}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="flex gap-3 text-gray-500">
                  <button>✏️</button>
                  <button>🗑️</button>
                  <button>⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Flag Modal */}
      {showForm && (
        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
          <FlagForm onSubmit={handleCreateFlag} onCancel={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  );
}

/* 🔹 Card Component */
function Card({ title, value, sub, green, gray, purple }) {
  return (
    <div
      className={`p-4 rounded-xl shadow bg-white ${
        green && "bg-green-50"
      } ${gray && "bg-gray-100"} ${purple && "bg-purple-50"}`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
    
  );
}

/* 🔹 Env Bar */
function EnvBar({ label, value, color }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}