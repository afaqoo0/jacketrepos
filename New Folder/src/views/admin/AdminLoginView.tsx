import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Key, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { loginAdmin, setActiveTab, isBackendConnected } = useStore();
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
        setError(
          isBackendConnected
            ? 'Invalid email or password.'
            : 'Invalid credentials. Use sportspakistan10@gmail.com and password admin123'
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setEmail('sportspakistan10@gmail.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <img src="/ts-logo.jpg" alt="TS Sports Logo" className="w-14 h-14 rounded-2xl object-cover mx-auto shadow-lg shadow-white/10" />
          
          <h2 className="text-2xl font-black text-white font-heading">
            TS SPORTS ADMIN PORTAL
          </h2>
          <p className="text-xs text-slate-400">
            {isBackendConnected
              ? 'Secure access for TS Sports management'
              : 'Authenticated access for TS Sports product & site management'}
          </p>
        </div>

        {/* Credentials Quick Button */}
        <div className="p-3 rounded-xl bg-white/10 border border-white/30 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-white font-heading block">Admin Credentials:</span>
            <span className="text-slate-300 block font-mono text-[11px]">sportspakistan10@gmail.com / admin123</span>
          </div>
          <button
            type="button"
            onClick={fillDefaultCredentials}
            className="px-3 py-1.5 rounded-lg bg-white text-slate-950 text-[11px] font-bold hover:bg-slate-300 transition-colors font-heading"
          >
            Auto-fill
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sportspakistan10@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-white to-slate-300 hover:from-slate-200 hover:to-slate-400 shadow-lg shadow-white/10 flex items-center justify-center space-x-2 transition-all font-heading disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
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
