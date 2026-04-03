import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme for whole website
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-black dark:text-black p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>
      

      {/* Account Settings */}
     <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-white-700 p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
        <div className="grid gap-3">
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded bg-white-100 dark:bg-white-700"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-gray-100 dark:bg-white-700"
          />
         <div className="flex justify-center">
  <button className="w-40 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600">
    Change Password
  </button>
</div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Security</h2>
        <div className="flex items-center justify-between">
          <span>Enable 2FA</span>
          <input type="checkbox" />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-2">
          <label className="flex justify-between">
            <span>Flag Change Alerts</span>
            <input type="checkbox" />
          </label>
          <label className="flex justify-between">
            <span>Email Notifications</span>
            <input type="checkbox" />
          </label>
        </div>
      </div>

      {/* Default Flag Settings */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Default Flag Settings</h2>
        <select className="p-2 rounded bg-gray-100 dark:bg-white-700 w-full">
          <option>0%</option>
          <option>50%</option>
          <option>100%</option>
        </select>
      </div>

      {/* Appearance (Theme) */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>

        <div className="flex items-center justify-between">
          <span className="font-medium">
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </span>

          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded text-white ${
              darkMode ? "bg-gray-700" : "bg-purple-600"
            }`}
          >
            {darkMode ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-red-600">
          Danger Zone
        </h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Delete Account
        </button>
      </div>
    </div>
  );
}
