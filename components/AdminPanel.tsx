
import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';

const AdminPanel: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const grantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Find profile by access key
      const { data: profile, error: findError } = await supabase
        .from('profiles')
        .select('*')
        .eq('accessKey', accessKey)
        .single();

      if (findError || !profile) throw new Error("Access Key not found.");

      const updatedResources = [...(profile.grantedResources || []), resourceId];
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ grantedResources: Array.from(new Set(updatedResources)) })
        .eq('accessKey', accessKey);

      if (updateError) throw updateError;

      setMessage(`Access successfully granted to ${profile.customId} for resource: ${resourceId}`);
      setResourceId('');
    } catch (err: any) {
      setMessage(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-premium p-8 rounded-[2.5rem] border border-blue-500/20 mb-12">
      <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        Administrative Control Deck
      </h3>
      
      <form onSubmit={grantAccess} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">User Access Key</label>
            <input 
              type="text" 
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g. AIR-X2J..."
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Resource ID to Unlock</label>
            <input 
              type="text" 
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g. g-private-1"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="px-8 py-3 bg-white text-black rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? 'Updating Permissions...' : 'Add People / Grant Access'}
        </button>

        {message && (
          <p className={`text-[10px] font-mono mt-4 ${message.startsWith('ERROR') ? 'text-red-500' : 'text-emerald-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminPanel;
