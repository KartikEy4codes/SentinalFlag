import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './features/auth/context/AuthContext';
import { useAuth } from './features/auth/hooks/useAuth';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FlagsPage from './pages/FlagsPage';
import UserPage from './pages/UserPage';
import SettingsPage from './pages/Setting';
import AuditLogs from './pages/AuditLogs';

import './App.css';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select();
      if (todos) setTodos(todos);
    }
    getTodos();
  }, []);

  return (
    <ul className="p-8">
      {todos.map((todo) => (
        <li key={todo.id} className="p-4 bg-white shadow mb-2 rounded">
          {todo.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ Protected Route
const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <Component />;
};

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar */}
      {isAuthenticated && <Sidebar />}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${isAuthenticated ? 'ml-64' : ''}`}>
        
        {/* Navbar */}
        {isAuthenticated && <Navbar user={user} onLogout={logout} />}

        {/* Routes */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/flags" element={<ProtectedRoute component={FlagsPage} />} />
            <Route path="/users" element={<ProtectedRoute component={UserPage} />} />
            <Route path="/settings" element={<ProtectedRoute component={SettingsPage} />} />
            <Route path="/audit-logs" element={<ProtectedRoute component={AuditLogs} />} />

            <Route path="/todos" element={<Todos />} />

            {/* ✅ ALWAYS KEEP THIS LAST */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <AppContent />
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;