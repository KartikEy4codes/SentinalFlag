import React from "react";

const logs = [
  {
    user: "Admin User",
    action: "Enabled Feature Flag",
    target: "Dark Mode Feature",
    environment: "Production",
    time: "2 mins ago",
    status: "Success",
  },
  {
    user: "Megha",
    action: "Disabled Feature Flag",
    target: "New Checkout Flow",
    environment: "Staging",
    time: "10 mins ago",
    status: "Success",
  },
  {
    user: "Admin User",
    action: "Updated Rollout",
    target: "Search Optimization",
    environment: "Dev",
    time: "30 mins ago",
    status: "Pending",
  },
];

const AuditLogs = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Audit Logs
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search logs..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <select className="px-4 py-2 border rounded-lg hover:border-blue-400 transition">
          <option>All Actions</option>
          <option>Enabled</option>
          <option>Disabled</option>
          <option>Updated</option>
        </select>

        <select className="px-4 py-2 border rounded-lg hover:border-blue-400 transition">
          <option>All Environments</option>
          <option>Production</option>
          <option>Staging</option>
          <option>Dev</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Action</th>
              <th className="p-4">Target</th>
              <th className="p-4">Environment</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                <td className="p-4 font-medium text-gray-800">
                  {log.user}
                </td>

                {/* Action Tag */}
                <td className="p-4">
                  <span className="px-2 py-1 text-xs rounded-md bg-purple-100 text-purple-600">
                    {log.action}
                  </span>
                </td>

                <td className="p-4 text-gray-700">
                  {log.target}
                </td>

                {/* Environment Badge */}
                <td className="p-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    {log.environment}
                  </span>
                </td>

                <td className="p-4 text-gray-500">
                  {log.time}
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      log.status === "Success"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;