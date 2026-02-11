import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { UserProfile } from '../types.ts';

interface AccountProps {
  onAuthChange: (profile: UserProfile | null) => void;
  currentProfile: UserProfile | null;
}

const Account: React.FC<AccountProps> = ({ onAuthChange, currentProfile }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customId, setCustomId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Handle special Admin login check
        if (customId === '1001' && password === 'air/key.admin') {
          // In a real app, we'd use Supabase Auth. 
          // For this prompt's requirement, we'll simulate an admin session.
          const adminProfile: UserProfile = {
            id: 'admin-uuid',
            customId: '1001',
            email: 'admin@redwan.com',
            accessKey: 'MASTER_KEY',
            role: 'admin',
            grantedResources: ['*']
          };
          onAuthChange(adminProfile);
          localStorage.setItem('redwan_auth', JSON.stringify(adminProfile));
          return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        onAuthChange({ ...profileData, email: data.user.email });
        localStorage.setItem('redwan_auth', JSON.stringify({ ...profileData, email: data.user.email }));

      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (!data.user) throw new Error("Signup failed");

        // Generate Access Key
        const accessKey = `AIR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        
        // Fix: Cast 'role' to its literal union type to fix assignment error with UserProfile
        const newProfile = {
          id: data.user.id,
          customId: customId || `UID-${Math.floor(Math.random() * 9000) + 1000}`,
          accessKey: accessKey,
          role: 'user' as 'user' | 'admin',
          grantedResources: []
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([newProfile]);

        if (profileError) throw profileError;
        
        onAuthChange({ ...newProfile, email: data.user.email! });
        localStorage.setItem('redwan_auth', JSON.stringify({ ...newProfile, email: data.user.email! }));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    onAuthChange(null);
    localStorage.removeItem('redwan_auth');
  };

  if (currentProfile) {
    return (
      <section className="min-h-screen pt-40 flex flex-col items-center px-6">
        <div className="w-full max-w-xl glass-premium p-10 rounded-[3rem] text-center">
          <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <span className="text-4xl">👤</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">{currentProfile.role === 'admin' ? 'Administrator' : 'Explorer Profile'}</h2>
          <p className="text-slate-400 font-mono text-xs mb-8">System ID: {currentProfile.customId}</p>
          
          <div className="space-y-4 mb-10 text-left">
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Email Address</p>
              <p className="text-white font-bold">{currentProfile.email}</p>
            </div>
            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Your Access Key</p>
              <p className="text-blue-400 font-mono font-bold">{currentProfile.accessKey}</p>
              <p className="text-[9px] text-slate-600 mt-2">Give this to Redwan to unlock private archives.</p>
            </div>
          </div>

          <button 
            onClick={logout}
            className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            Terminal Shutdown (Logout)
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-40 flex flex-col items-center px-6">
      <div className="w-full max-w-md glass-premium p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.761 0-5 2.239-5 5v1h10v-1c0-2.761-2.239-5-5-5z" /></svg>
        </div>

        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
          {isLogin ? 'Welcome Back.' : 'System Access.'}
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          {isLogin ? 'Enter your credentials to access the repository.' : 'Create an account to receive your personal access key.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-mono">
            ERROR: {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isLogin ? (
            <div className="space-y-4">
               <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">User ID / Email</label>
                <input 
                  type="text" 
                  value={customId || email}
                  onChange={(e) => {
                    if (e.target.value.includes('@')) setEmail(e.target.value);
                    else setCustomId(e.target.value);
                  }}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                  placeholder="1001 or email@example.com"
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Preferred User ID (Optional)</label>
                <input 
                  type="text" 
                  value={customId}
                  onChange={(e) => setCustomId(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. 2026-RED"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Security Key (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Authorize Session' : 'Generate Key')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-mono text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Account;