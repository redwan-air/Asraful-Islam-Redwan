
import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import { GALLERY_ITEMS, DOCUMENT_ITEMS } from '../constants.tsx';

const AdminPanel: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const privateResources = [
    ...GALLERY_ITEMS.filter(i => i.visibility === 'private').map(i => ({ id: i.id, title: i.title, type: 'Gallery' })),
    ...DOCUMENT_ITEMS.filter(i => i.visibility === 'private').map(i => ({ id: i.id, title: i.title, type: 'Document' }))
  ];

  const grantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data: profile, error: findError } = await supabase
        .from('profiles')
        .select('*')
        .eq('access_key', accessKey)
        .single();

      if (findError || !profile) throw new Error("The provided Access Key does not exist in the database.");

      const updatedResources = [...(profile.granted_resources || []), resourceId];
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ granted_resources: Array.from(new Set(updatedResources)) })
        .eq('access_key', accessKey);

      if (updateError) throw updateError;

      setMessage({ 
        text: `Access granted successfully to ${profile.full_name || profile.custom_id}. Resource ${resourceId} is now visible to them.`, 
        type: 'success' 
      });
      setResourceId('');
    } catch (err: any) {
      setMessage({ text: `DENIED: ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-premium p-10 rounded-[3rem] border border-blue-500/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        </div>
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">Administrative Control Deck</h3>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Manage Global Permissions</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Grant Form */}
        <form onSubmit={grantAccess} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Target Access Key</label>
              <input 
                type="text" 
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g. AIR-K8B2L"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Resource ID</label>
              <input 
                type="text" 
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g. g-private-1"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 shadow-xl active:scale-[0.98]"
          >
            {loading ? 'MODIFYING REGISTRY...' : 'ADD PEOPLE / GRANT ACCESS'}
          </button>

          {message && (
            <div className={`p-4 rounded-xl border text-[11px] font-mono leading-relaxed ${
              message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}
        </form>

        {/* Resource Reference */}
        <div className="space-y-4">
           <h4 className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-4">Registry Reference</h4>
           <div className="bg-slate-950/50 rounded-2xl border border-white/5 overflow-hidden">
              <div className="max-h-[200px] overflow-y-auto">
                {privateResources.length > 0 ? (
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-white/5 text-slate-400 uppercase font-mono">
                      <tr>
                        <th className="px-4 py-3">Resource</th>
                        <th className="px-4 py-3">ID (Copy this)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {privateResources.map(res => (
                        <tr key={res.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setResourceId(res.id)}>
                          <td className="px-4 py-3 text-slate-300">
                             <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 mr-2 uppercase">{res.type}</span>
                             {res.title}
                          </td>
                          <td className="px-4 py-3 font-mono text-blue-400 font-bold">{res.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="p-8 text-center text-slate-600 font-mono text-[10px]">No private resources indexed.</p>
                )}
              </div>
           </div>
           <p className="text-[9px] text-slate-600 italic">Click an ID to auto-fill the form.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
