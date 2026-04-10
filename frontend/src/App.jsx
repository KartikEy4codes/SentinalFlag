import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './features/auth/context/AuthContext';
import { useAuth } from './features/auth/hooks/useAuth';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';

import './App.css';

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
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/dashboard" element={<ProtectedRoute component={UserPage} />} />

            {/* ✅ ALWAYS KEEP THIS LAST */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
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