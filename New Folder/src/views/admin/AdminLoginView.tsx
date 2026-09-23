import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Key, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { loginAdmin, setActiveTab } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await loginAdmin(email, password);
      if (success) {
        setActiveTab('admin-dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border slate-200 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <img src="/ts-logo.jpg" alt="TS Sports Logo" className="w-14 h-14 rounded-2xl object-cover mx-auto shadow-lg shadow-slate-900/20" />
          
          <h2 className="text-2xl font-black slate-950 font-heading">
            TS SPORTS ADMIN PORTAL
          </h2>
          <p className="text-xs slate-600">
            Secure access for TS Sports management
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-xs font-bold uppercase slate-700 mb-1 font-heading">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl white border slate-200 text-xs slate-950 placeholder-slate-500 focus:outline-none focus:slate-950"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase slate-700 mb-1 font-heading">
              Admin Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl white border slate-200 text-xs slate-950 placeholder-slate-500 focus:outline-none focus:slate-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-extrabold slate-950 bg-gradient-to-r white to-slate-700 hover:from-slate-800 hover:to-slate-600 shadow-lg shadow-slate-900/20 flex items-center justify-center space-x-2 transition-all font-heading disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin white" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Log In to Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
