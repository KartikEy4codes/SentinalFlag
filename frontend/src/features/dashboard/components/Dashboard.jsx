import ChartsSection from './ChartsSection';
import { TrendingUp, CheckCircle, XCircle, Zap } from 'lucide-react';

export const Dashboard = ({ stats, flags = [] }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Stats */}
        <div className="lg:col-span-2">
          <StatCardMain
            title="Total Flags"
            value={stats?.totalFlags || 0}
            subtitle="Across all envs"
            meta="All environments"
          />
        </div>

        <StatCard
          title="Enabled"
          value={stats?.enabledFlags || 0}
          icon={<CheckCircle size={20} className="text-gray-800" />}
          color="emerald"
          percentage={Math.round((stats?.enabledFlags / (stats?.totalFlags || 1) * 100))}
        />

        <StatCard
          title="Disabled"
          value={stats?.disabledFlags || 0}
          icon={<XCircle size={20} className="text-gray-800" />}
          color="slate"
          percentage={Math.round((stats?.disabledFlags / (stats?.totalFlags || 1) * 100))}
        />
      </div>

      <ChartsSection stats={stats} flags={flags} />
    </div>
  );
};

const StatCardMain = ({ title, value, subtitle, meta }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-black text-xs font-semibold uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold text-black mb-1">{value}</p>
          <p className="text-gray-700 text-sm">{subtitle}</p>
        </div>
        <div className="text-gray-400 opacity-20">
          <TrendingUp size={32} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, percentage }) => {
  const bgGradients = {
    emerald: 'bg-white border-gray-300',
    slate: 'bg-white border-gray-300',
    indigo: 'bg-white border-gray-300',
  };

  const textColors = {
    emerald: 'text-black',
    slate: 'text-gray-800',
    indigo: 'text-black',
  };

  const progressColors = {
    emerald: 'bg-black',
    slate: 'bg-black',
    indigo: 'bg-black',
  };

  return (
    <div className={`${bgGradients[color]} border rounded-2xl p-4 card-hover`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className={`text-sm font-semibold ${textColors[color]} opacity-70 mb-1`}>{title}</p>
          <p className={`text-4xl font-bold ${textColors[color]}`}>{value}</p>
        </div>
        <div className="p-2 bg-gray-200 rounded-lg shadow-sm">
          {icon}
        </div>
      </div>

      {percentage !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold ${textColors[color]} opacity-70`}>{percentage}% of total</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${progressColors[color]} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
