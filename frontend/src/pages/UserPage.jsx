import { useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const users = [
    {
      name: "Tina",
      email: "tina@gmail.com",
      env: "PRODUCTION",
      features: 3,
      status: "Active",
    },
    {
      name: "Rahul",
      email: "rahul@gmail.com",
      env: "DEVELOPMENT",
      features: 1,
      status: "Active",
    },
    {
      name: "Aman",
      email: "aman@gmail.com",
      env: "STAGING",
      features: 0,
      status: "Inactive",
    },
  ];

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow">
          + Create User
        </button>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total Users" value="120" sub="+5 this week" />
        <Card title="Active Users" value="95" sub="79% of total" green />
        <Card title="Inactive Users" value="25" sub="21% of total" gray />
        <Card title="New Users" value="12" sub="Last 24 hours" purple />
      </div>

      {/* 🔹 Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4 h-40">
          <h2 className="font-semibold mb-2">User Distribution</h2>
          <div className="flex justify-between text-sm text-gray-400 mt-16">
            <span>0–10</span>
            <span>10–20</span>
            <span>20+</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Environment Allocation</h2>

          <EnvBar label="DEV" value={45} color="bg-blue-500" />
          <EnvBar label="STAGING" value={25} color="bg-yellow-500" />
          <EnvBar label="PROD" value={30} color="bg-red-500" />

          <div className="flex justify-center mt-4">
            <div className="w-20 h-20 rounded-full border-4 border-blue-400 flex items-center justify-center text-sm font-semibold">
              120
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
            {filtered.map((user, i) => (
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