import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/flagService';
import { useAuth } from '../hooks/useAuth';
import { mockUser, getMockAuthToken } from '../utils/mockData';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/flags');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      // Try real API first
      try {
        const response = await authService.login(formData.email, formData.password);
        login(response.data.token, response.data.user);
      } catch (err) {
        // Demo mode - allow any submission
        console.log('Demo mode: Using mock authentication');
        login(getMockAuthToken(), mockUser);
      }
      navigate('/flags');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      // Use demo credentials
      setFormData({ email: 'admin@sentinelflag.dev', password: 'demo@!23' });
      login(getMockAuthToken(), mockUser);
      setTimeout(() => navigate('/flags'), 300);
    } catch (err) {
      console.error('Demo login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-500/20 shadow-2xl p-8 animate-slideUp">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🚩 Sentinel
              </span>
            </h1>
            <p className="text-gray-400 text-sm">Feature Flag Management</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? '🔄 Logging in...' : '✨ Login'}
            </button>
          </form>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-600/50"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-600/50"></div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-3 border border-purple-500/50 text-purple-300 rounded-lg font-semibold hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            🎬 Try Demo Account
          </button>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300 text-center mb-2">📝 Demo Credentials</p>
            <p className="text-xs text-gray-400 text-center">
              <strong className="text-gray-300">Email:</strong> admin@sentinelflag.dev<br />
              <strong className="text-gray-300">Password:</strong> demo@!23
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
