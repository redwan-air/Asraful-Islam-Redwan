
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
  const [error, setError] = useState<{msg: string, code?: string} | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchProfileWithRetry = async (userId: string, retries = 5): Promise<UserProfile | null> => {
    for (let i = 0; i < retries; i++) {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data) return data as UserProfile;
      
      console.log(`Sync Attempt ${i + 1}...`);
      await new Promise(resolve => setTimeout(resolve, 1500 + i * 500));
    }
    return null;
  };

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

        const profileData = await fetchProfileWithRetry(data.user?.id || '');
        if (!profileData) {
          setError({
            msg: "আপনার একাউন্ট তৈরি হয়েছে কিন্তু ডাটাবেজ সিঙ্ক হয়নি। দয়া করে Supabase SQL Editor-এ গিয়ে database_setup.sql কোডটি রান করুন।",
            code: "REGISTRY_SYNC_FAIL"
          });
          return;
        }
        
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
          setSuccessMsg("রেজিস্ট্রেশন সফল! আপনার ইমেইল ইনবক্স চেক করুন ভেরিফিকেশন লিঙ্কের জন্য।");
        } else if (data.user) {
          const profileData = await fetchProfileWithRetry(data.user.id);
          if (profileData) {
            onAuthChange(profileData);
          } else {
            setSuccessMsg("রেজিস্ট্রেশন হয়েছে। এখন লগইন পোর্টালে গিয়ে প্রবেশ করুন।");
            setIsLogin(true);
          }
        }
      }
    } catch (err: any) {
      setError({ msg: err.message || "একটি অজানা সমস্যা হয়েছে।" });
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
        <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="glass-premium p-10 md:p-14 rounded-[3.5rem] border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
              <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center group">
                 {currentProfile.avatar_url ? (
                   <img src={currentProfile.avatar_url} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 ) : (
                   <span className="text-5xl group-hover:rotate-12 transition-transform">{currentProfile.role === 'admin' ? '⚡' : '👤'}</span>
                 )}
              </div>
              
              <div className="flex-grow text-center md:text-left space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">{currentProfile.full_name || 'Asraful Islam Redwan'}</h2>
                    <p className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mt-1 font-bold">
                      {currentProfile.role === 'admin' ? 'ROOT_ACCESS_GRANTED' : 'VERIFIED_EXPLORER'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full h-fit">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest font-bold">Authenticated</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-all">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Subject ID</p>
                    <p className="text-white font-black text-xl tracking-tight">{currentProfile.custom_id || 'ID_PENDING'}</p>
                  </div>
                  <div className="p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20 group hover:border-blue-500/50 transition-all">
                    <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest mb-1">Access Key</p>
                    <p className="text-white font-mono font-bold text-xl tracking-widest">{currentProfile.access_key || 'KEY_EMPTY'}</p>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                   <button onClick={logout} className="px-10 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95">
                     Terminate Session
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
    <section className="min-h-screen pt-40 flex flex-col items-center px-6 pb-20 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-md glass-premium p-10 md:p-12 rounded-[3rem] shadow-2xl border-white/10 relative z-10 animate-in zoom-in duration-500">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-600/30">
             <img src="https://i.postimg.cc/HkYKGYnb/logo.png" className="h-8 brightness-0 invert" alt="Logo" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">{isLogin ? 'Access Gate.' : 'Registration.'}</h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-2">Personal Management System v2.5</p>
        </div>
        
        {error && (
          <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-mono leading-relaxed">
            <span className="font-black text-red-300">SYSTEM_FAULT:</span> {error.msg}
            {error.code === 'REGISTRY_SYNC_FAIL' && (
              <div className="mt-2 pt-2 border-t border-red-500/20">
                <p className="text-white/60">সমাধান: Supabase Dashboard &rarr; SQL Editor &rarr; Paste database_setup.sql &rarr; Run.</p>
              </div>
            )}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-[10px] font-mono leading-relaxed">
            <span className="font-black text-emerald-300">LOG:</span> {successMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <div className="group">
              <label className="text-[10px] font-mono text-slate-500 mb-2 block uppercase tracking-widest transition-colors group-focus-within:text-blue-500">Subject Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 font-mono text-xs transition-all" required />
            </div>
          )}
          <div className="group">
            <label className="text-[10px] font-mono text-slate-500 mb-2 block uppercase tracking-widest transition-colors group-focus-within:text-blue-500">Credential ID (Email)</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 font-mono text-xs transition-all" required />
          </div>
          <div className="relative group">
            <label className="text-[10px] font-mono text-slate-500 mb-2 block uppercase tracking-widest transition-colors group-focus-within:text-blue-500">Passcode</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 pr-14 font-mono text-xs transition-all" 
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-slate-500 hover:text-blue-500 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
              )}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 mt-4 text-[11px] shadow-lg shadow-blue-600/20">
            {loading ? 'PROCESSING...' : (isLogin ? 'AUTHORIZE_SESSION' : 'START_REGISTRY')}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-8 text-[10px] font-mono text-slate-600 hover:text-blue-400 uppercase tracking-widest transition-colors">
          {isLogin ? "Generate New Subject ID →" : "← Back to Authorization"}
        </button>
      </div>
    </section>
  );
};

export default Account;
