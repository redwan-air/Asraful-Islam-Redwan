
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { GALLERY_ITEMS, DOCUMENT_ITEMS, PROJECTS, USER_INFO } from '../constants.tsx';

type TabId = 'access' | 'identity' | 'projects' | 'resources';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('access');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  // Access Control State
  const [accessKey, setAccessKey] = useState('');
  const [resourceId, setResourceId] = useState('');

  // Identity State (Defaults to USER_INFO)
  const [siteInfo, setSiteInfo] = useState({
    fullName: USER_INFO.fullName,
    title: USER_INFO.title,
    about: USER_INFO.about,
    location: USER_INFO.location,
  });

  const privateResources = [
    ...GALLERY_ITEMS.filter(i => i.visibility === 'private').map(i => ({ id: i.id, title: i.title, type: 'Gallery' })),
    ...DOCUMENT_ITEMS.filter(i => i.visibility === 'private').map(i => ({ id: i.id, title: i.title, type: 'Document' }))
  ];

  const showStatus = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const grantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: profile, error: findError } = await supabase
        .from('profiles')
        .select('*')
        .eq('access_key', accessKey)
        .single();

      if (findError || !profile) throw new Error("Access Key not found.");

      const updatedResources = Array.from(new Set([...(profile.granted_resources || []), resourceId]));
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ granted_resources: updatedResources })
        .eq('access_key', accessKey);

      if (updateError) throw updateError;
      showStatus(`Access granted to ${profile.full_name}.`, 'success');
      setResourceId('');
    } catch (err: any) {
      showStatus(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real scenario, we'd have a 'site_config' table. 
      // For now, we update the admin's own profile 'about' field or metadata
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: siteInfo.fullName })
        .eq('role', 'admin');
      
      if (error) throw error;
      showStatus("Site identity updated in registry. (Reload to see global changes)", 'success');
    } catch (err: any) {
      showStatus(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-premium rounded-[3rem] border border-blue-500/20 overflow-hidden shadow-2xl">
      {/* Tab Navigation */}
      <div className="flex border-b border-white/5 bg-slate-900/50">
        {(['access', 'identity', 'projects', 'resources'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="p-10">
        {activeTab === 'access' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">Access Control</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Manage Global Permissions</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <form onSubmit={grantAccess} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Target Access Key</label>
                    <input type="text" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="AIR-XXXXX" required />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Resource ID</label>
                    <input type="text" value={resourceId} onChange={(e) => setResourceId(e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="g-private-1" required />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50">
                  {loading ? 'MODIFYING...' : 'GRANT ACCESS'}
                </button>
              </form>
              <div className="bg-slate-950/50 rounded-2xl border border-white/5 p-6 h-[200px] overflow-y-auto custom-scrollbar">
                <h4 className="text-[9px] font-mono text-blue-500 uppercase tracking-widest mb-4">Registry Reference</h4>
                <div className="space-y-2">
                  {privateResources.map(res => (
                    <div key={res.id} onClick={() => setResourceId(res.id)} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-blue-600/10 cursor-pointer transition-colors border border-transparent hover:border-blue-500/20">
                      <span className="text-[10px] text-slate-300 font-bold">{res.title}</span>
                      <span className="font-mono text-[9px] text-blue-400">{res.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xl font-black text-white tracking-tight mb-8">Site Identity Manager</h3>
            <form onSubmit={updateIdentity} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Public Full Name</label>
                  <input type="text" value={siteInfo.fullName} onChange={(e) => setSiteInfo({...siteInfo, fullName: e.target.value})} className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Professional Title</label>
                  <input type="text" value={siteInfo.title} onChange={(e) => setSiteInfo({...siteInfo, title: e.target.value})} className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:border-blue-500" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Bio / Philosophy</label>
                  <textarea rows={4} value={siteInfo.about} onChange={(e) => setSiteInfo({...siteInfo, about: e.target.value})} className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:border-blue-500" />
                </div>
              </div>
              <button type="submit" className="md:col-span-2 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500">
                SAVE SYSTEM CONFIGURATION
              </button>
            </form>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-2">
            <svg className="w-12 h-12 mx-auto text-slate-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mb-6">Database Synchronization Enabled</p>
            <button className="px-8 py-4 glass text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Add New Project Entry
            </button>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-2">
             <h3 className="text-xl font-black text-white tracking-tight mb-2">Resource Registry</h3>
             <p className="text-slate-500 text-sm mb-8">Manage images and documents in the global archives.</p>
             <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-white/5 text-blue-400 border border-blue-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white">New Image</button>
                <button className="px-6 py-3 bg-white/5 text-blue-400 border border-blue-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white">New Document</button>
             </div>
          </div>
        )}

        {message && (
          <div className={`mt-8 p-4 rounded-2xl border text-[11px] font-mono animate-in slide-in-from-top-2 ${
            message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <span className="mr-2">[{message.type.toUpperCase()}]</span> {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
