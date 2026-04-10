import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../features/flags/services/flagService';
import { useAuth } from '../features/auth/hooks/useAuth';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
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

      const response = await authService.register(formData);

      login(response.data.token, response.data.user);
      navigate('/dashboard');

    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-gray-800/70 border border-purple-500/30 rounded-xl shadow-xl backdrop-blur-sm">
        
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="text-sm text-slate-200 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white outline-none focus:border-purple-400"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-200 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white outline-none focus:border-purple-400"
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-200 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white outline-none focus:border-purple-400"
              placeholder="At least 6 characters"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-slate-200 uppercase tracking-wider">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white outline-none focus:border-purple-400"
            >
              <option value="user">User (default)</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-slate-300 text-center">
          Already have an account?{' '}
          <button
            className="text-blue-300 underline"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;