import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import { ShieldCheck, Mail, Lock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      login(response.data.access_token, response.data.user);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-[500px] bg-cyan-500/20 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl z-10 relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8">Sign in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
