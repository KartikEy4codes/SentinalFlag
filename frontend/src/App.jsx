import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/Sidebar';

// Pages
import Home from './pages/Home';
import FlagsPage from './pages/FlagsPage';
import LoginPage from './pages/LoginPage';

import './App.css';

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
      {isAuthenticated && <Sidebar />}
      <div className={`flex-1 flex flex-col ${isAuthenticated ? 'ml-64' : ''}`}>
        {isAuthenticated && <Navbar user={user} onLogout={logout} />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/flags" element={<ProtectedRoute component={FlagsPage} />} />
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
