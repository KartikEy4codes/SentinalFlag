import { useState } from "react";

export default function UsersTable() {
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
    <div className="bg-white rounded-xl shadow p-4">
      {/* 🔍 Search + Filter */}
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

      {/* 📋 Table */}
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
  );
}