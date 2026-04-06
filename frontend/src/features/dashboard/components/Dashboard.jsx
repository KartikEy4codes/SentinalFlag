import ChartsSection from './ChartsSection';

export const Dashboard = ({ stats }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Flags"
          value={stats?.totalFlags || 0}
          color="blue"
          icon="🚩"
          trend="+2 this week"
        />
        <StatCard
          title="Enabled"
          value={stats?.enabledFlags || 0}
          color="green"
          icon="✅"
          percentage={Math.round((stats?.enabledFlags / stats?.totalFlags * 100) || 0)}
        />
        <StatCard
          title="Disabled"
          value={stats?.disabledFlags || 0}
          color="gray"
          icon="❌"
          percentage={Math.round((stats?.disabledFlags / stats?.totalFlags * 100) || 0)}
        />
        <StatCard
          title="Recent Changes"
          value={stats?.recentChanges || 0}
          color="purple"
          icon="⚡"
          trend="Last 24 hours"
        />
      </div>

      <ChartsSection stats={stats} />
    </div>
  );
};

const StatCard = ({ title, value, color, icon, trend, percentage, subtext }) => {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-700',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-700',
    gray: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-700',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-700',
  };

  return (
    <div className={`p-6 rounded-lg border card-hover ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium opacity-75 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <span className={`text-2xl opacity-30`}>{icon}</span>
      </div>
      {percentage !== undefined && (
        <div className="mt-3">
          <div className="text-xs opacity-60 mb-1">{percentage}% of total</div>
          <div className="w-full bg-gray-300 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}
      {trend && <p className="text-xs opacity-60 mt-2">{trend}</p>}
      {subtext && <p className="text-xs opacity-60 mt-2">{subtext}</p>}
    </div>
  );
};

export default Dashboard;
