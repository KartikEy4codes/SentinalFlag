import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../features/flags/services/flagService';
import { useAuth } from '../features/auth/hooks/useAuth';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
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
      const response = await authService.login(formData.email, formData.password);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
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

          <p className="text-sm text-gray-300 text-center mt-4">
            Don't have an account yet?{' '}
            <button onClick={() => navigate('/signup')} className="text-blue-300 underline">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
