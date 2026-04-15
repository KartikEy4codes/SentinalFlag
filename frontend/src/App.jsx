import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './features/auth/context/AuthContext';
import { useAuth } from './features/auth/hooks/useAuth';
import Navbar from './components/layout/Navbar';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';

import './App.css';

// ✅ Protected Route
const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="spinner mb-4">
            <svg className="w-12 h-12 text-gray-900 mx-auto animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
              <path fill="none" stroke="currentColor" d="M4 12a8 8 0 018-8v0a8 8 0 018 8" />
            </svg>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <Component />;
};

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-white overflow-x-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        {isAuthenticated && <Navbar user={user} onLogout={logout} />}

        {/* Routes */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
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
        <ToastContainer 
          position="bottom-right"
          theme="light"
          toastClassName="!bg-white !text-gray-900 !border !border-gray-300"
        />
      </AuthProvider>
    </Router>
  );
}

export default App;