
import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import { UserProfile } from '../types.ts';
import AdminPanel from './AdminPanel.tsx';

interface AccountProps {
  onAuthChange: (profile: UserProfile | null) => void;
  currentProfile: UserProfile | null;
}

const Account: React.FC<AccountProps> = ({ onAuthChange, currentProfile }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email, 
          password,
        });

        if (authError) throw authError;

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user?.id)
          .single();
        
        if (profileError) throw profileError;
        onAuthChange(profileData);

      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        
        if (authError) throw authError;

        if (data.user && data.session === null) {
          setSuccessMsg("Registry entry initiated! Please check your email to confirm your identity.");
        } else if (data.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          onAuthChange(profileData);
        }
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
  };

  if (currentProfile) {
    return (
      <section className="min-h-screen pt-40 flex flex-col items-center px-6 pb-20">
        <div className="w-full max-w-4xl space-y-8">
          <div className="glass-premium p-10 md:p-14 rounded-[3.5rem] border-white/5 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
              <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
                 {currentProfile.avatar_url ? (
                   <img src={currentProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <span className="text-5xl">{currentProfile.role === 'admin' ? '⚡' : '👤'}</span>
                 )}
              </div>
              
              <div className="flex-grow text-center md:text-left space-y-4">
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight">{currentProfile.full_name}</h2>
                  <p className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mt-1 font-bold">
                    {currentProfile.role === 'admin' ? 'ROOT_ACCESS_GRANTED' : 'VERIFIED_EXPLORER'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-5 bg-slate-900/50 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">User ID</p>
                    <p className="text-white font-bold text-lg">{currentProfile.custom_id}</p>
                  </div>
                  <div className="p-5 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                    <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest mb-1">Access Key</p>
                    <p className="text-white font-mono font-bold text-lg tracking-widest">{currentProfile.access_key}</p>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                   <button onClick={logout} className="px-8 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all">
                     Logout
                   </button>
                </div>
              </div>
            </div>
          </div>
          {currentProfile.role === 'admin' && <AdminPanel />}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-40 flex flex-col items-center px-6 pb-20">
      <div className="w-full max-w-md glass-premium p-10 rounded-[3rem] shadow-2xl border-white/10">
        <h2 className="text-3xl font-black text-white mb-6 tracking-tight">{isLogin ? 'Access Portal.' : 'Identity Registry.'}</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-mono">
            ERROR: {error}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-[10px] font-mono">
            SUCCESS: {successMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-[10px] font-mono text-slate-500 mb-2 block uppercase tracking-widest">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500" required />
            </div>
          )}
          <div>
            <label className="text-[10px] font-mono text-slate-500 mb-2 block uppercase tracking-widest">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="relative">
            <label className="text-[10px] font-mono text-slate-500 mb-2 block uppercase tracking-widest">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 pr-14" 
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-slate-500 hover:text-blue-500 transition-colors"
            >
              {showPassword ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
              )}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 mt-4">
            {loading ? 'PROCESSING...' : (isLogin ? 'AUTHORIZE' : 'CREATE ACCOUNT')}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-[10px] font-mono text-slate-500 hover:text-white uppercase tracking-widest">
          {isLogin ? "Need an ID? Create Profile" : "Back to Login"}
        </button>
      </div>
    </section>
  );
};

export default Account;
