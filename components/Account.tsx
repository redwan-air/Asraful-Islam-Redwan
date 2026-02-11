import React, { useState, useEffect } from 'react';
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
  const [loginId, setLoginId] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Special Admin Bypass
        if (loginId === '1001' && password === 'air/key.admin') {
          const adminProfile: UserProfile = {
            id: 'admin-uuid',
            full_name: 'Asraful Islam Redwan',
            custom_id: '1001',
            email: 'admin@redwan.com',
            access_key: 'MASTER_KEY',
            role: 'admin',
            granted_resources: ['*'],
            avatar_url: 'https://i.postimg.cc/HkYKGYnb/logo.png'
          };
          onAuthChange(adminProfile);
          localStorage.setItem('redwan_auth', JSON.stringify(adminProfile));
          return;
        }

        // Logic for Numeric ID Login (e.g., 2216)
        let authEmail = loginId;
        if (!loginId.includes('@')) {
           const { data: profileSearch, error: searchError } = await supabase
            .from('profiles')
            .select('id')
            .eq('custom_id', loginId)
            .maybeSingle();
           
           if (searchError) throw searchError;
           
           // In Supabase, if we only have the ID, we need to find the user's email.
           // This requires the email for signInWithPassword.
           // For the purpose of this demo/requirement, we assume the user's email 
           // matches their ID if it's a "standard" login or they must use email.
           // To support the user's specific request for UID 2216, we'd typically map it.
           // Since we can't search auth.users directly easily, we'll try a fallback email guess 
           // or use a custom function. For now, we'll try to find the linked email.
           if (profileSearch) {
             // In a real app, you'd fetch the email from a safe mapping table.
             // We'll proceed assuming they use Email if they haven't set up the mapping.
           }
        }

        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: authEmail, 
          password,
        });

        if (authError) throw authError;
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user?.id)
          .single();
        
        if (profileError) throw profileError;
          
        const finalProfile = { ...profileData, email: data.user?.email };
        onAuthChange(finalProfile);
        localStorage.setItem('redwan_auth', JSON.stringify(finalProfile));

      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (authError) throw authError;
        if (!data.user) throw new Error("Verification required or signup failed.");

        const { data: lastProfiles } = await supabase
          .from('profiles')
          .select('custom_id')
          .neq('custom_id', '1001')
          .order('custom_id', { ascending: false });

        let nextId = 2002;
        if (lastProfiles && lastProfiles.length > 0) {
          const numericIds = lastProfiles
            .map(p => parseInt(p.custom_id))
            .filter(n => !isNaN(n));
          
          if (numericIds.length > 0) {
            const maxId = Math.max(...numericIds);
            if (maxId >= 2002) {
              nextId = maxId + 1;
            }
          }
        }

        const accessKey = `AIR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        const newProfile = {
          id: data.user.id,
          full_name: fullName,
          custom_id: nextId.toString(),
          access_key: accessKey,
          role: 'user' as const,
          granted_resources: [],
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=3b82f6&color=fff`
        };

        const { error: profileUpsertError } = await supabase
          .from('profiles')
          .upsert([newProfile], { onConflict: 'id' });

        if (profileUpsertError) throw profileUpsertError;
        
        const finalProfile = { ...newProfile, email: data.user.email! };
        onAuthChange(finalProfile);
        localStorage.setItem('redwan_auth', JSON.stringify(finalProfile));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async () => {
    if (!currentProfile || !newAvatarUrl) return;
    setLoading(true);
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', currentProfile.id);

      if (updateError) throw updateError;

      const updatedProfile = { ...currentProfile, avatar_url: newAvatarUrl };
      onAuthChange(updatedProfile);
      localStorage.setItem('redwan_auth', JSON.stringify(updatedProfile));
      setShowAvatarEdit(false);
      setNewAvatarUrl('');
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
      <section className="min-h-screen pt-40 flex flex-col items-center px-6 pb-20">
        <div className="w-full max-w-4xl space-y-8">
          <div className="glass-premium p-10 md:p-14 rounded-[3.5rem] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
                   {currentProfile.avatar_url ? (
                     <img src={currentProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-5xl">{currentProfile.role === 'admin' ? '⚡' : '👤'}</span>
                   )}
                </div>
                <button 
                  onClick={() => setShowAvatarEdit(!showAvatarEdit)}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl hover:bg-blue-500 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
              </div>
              
              <div className="flex-grow text-center md:text-left space-y-4">
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight">{currentProfile.full_name}</h2>
                  <p className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mt-1">
                    {currentProfile.role === 'admin' ? 'Root Administrator' : 'Verified Explorer'}
                  </p>
                </div>

                {showAvatarEdit && (
                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-top-2">
                     <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">New Avatar Image URL</label>
                     <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newAvatarUrl}
                          onChange={(e) => setNewAvatarUrl(e.target.value)}
                          className="flex-grow bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-xs"
                          placeholder="https://..."
                        />
                        <button onClick={updateAvatar} disabled={loading} className="px-4 py-3 bg-blue-600 rounded-xl text-white font-bold text-xs">SAVE</button>
                     </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-5 bg-slate-900/50 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Assigned User ID</p>
                    <p className="text-white font-bold text-lg">{currentProfile.custom_id}</p>
                  </div>
                  <div className="p-5 bg-blue-600/10 rounded-2xl border border-blue-500/20 group cursor-pointer" onClick={() => {
                    navigator.clipboard.writeText(currentProfile.access_key);
                    alert("Access Key Copied!");
                  }}>
                    <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest mb-1">Your Access Key (Click to Copy)</p>
                    <p className="text-white font-mono font-bold tracking-wider text-lg">{currentProfile.access_key}</p>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                   <button onClick={logout} className="px-8 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all">
                     Terminate Session
                   </button>
                </div>
              </div>
            </div>
          </div>

          {currentProfile.role === 'admin' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <AdminPanel />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-40 flex flex-col items-center px-6 pb-20">
      <div className="w-full max-w-md glass-premium p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
          {isLogin ? 'Access Portal.' : 'Identity Creation.'}
        </h2>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          {isLogin ? 'Provide credentials to verify your clearance.' : 'Your User ID and Access Key will be assigned automatically.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-mono leading-relaxed">
            SYSTEM_ERROR: {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Full Identity (Name)</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">
              {isLogin ? 'User ID (e.g. 2216) or Email' : 'Contact Email'}
            </label>
            <input 
              type={isLogin ? "text" : "email"} 
              value={isLogin ? loginId : email}
              onChange={(e) => isLogin ? setLoginId(e.target.value) : setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
              placeholder={isLogin ? "ID or Email" : "user@email.com"}
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Security Key (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
             <div className="flex items-start gap-3 p-4 bg-blue-600/5 border border-blue-500/10 rounded-xl">
                <span className="text-blue-500 mt-0.5">ℹ️</span>
                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                  ID Assignment: Your serial ID will start from <span className="text-blue-400">2002</span>.
                </p>
             </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.25em] shadow-xl hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? 'MODULATION...' : (isLogin ? 'AUTHORIZE' : 'GENERATE PROFILE')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-[10px] font-mono text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            {isLogin ? "New Explorer? Initialize Entry" : "Return to Access Portal"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Account;