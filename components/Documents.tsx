
import React, { useState, useMemo } from 'react';
import { DOCUMENT_ITEMS } from '../constants';

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['All']);

  const allPossibleLabels = useMemo(() => {
    const labels = new Set<string>(['All']);
    DOCUMENT_ITEMS.forEach(doc => doc.labels.forEach(l => labels.add(l)));
    return Array.from(labels);
  }, []);

  const handleFilterToggle = (label: string) => {
    if (label === 'All') {
      setActiveFilters(['All']);
      return;
    }
    const newFilters = activeFilters.includes('All') ? [label] : 
                      activeFilters.includes(label) ? activeFilters.filter(f => f !== label) : 
                      [...activeFilters, label];
    setActiveFilters(newFilters.length === 0 ? ['All'] : newFilters);
  };

  const filteredItems = useMemo(() => {
    return DOCUMENT_ITEMS.filter(item => {
      const matchesFilter = activeFilters.includes('All') || item.labels.some(l => activeFilters.includes(l));
      const searchStr = `${item.title} ${item.description} ${item.dateTime} ${item.labels.join(' ')}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilters]);

  const recentUploads = useMemo(() => {
    return [...DOCUMENT_ITEMS].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()).slice(0, 5);
  }, []);

  return (
    <section className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Sidebar: Recent Uploads */}
        <div className="md:w-1/4 space-y-8">
          <div className="glass-premium p-8 rounded-[2.5rem] border-white/5 shadow-xl">
            <h3 className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">Recent Documents</h3>
            <div className="space-y-6">
              {recentUploads.map(doc => (
                <div key={doc.id} className="group cursor-pointer block">
                  <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">{doc.title}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">{doc.dateTime} • {doc.fileType}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content: Files List */}
        <div className="md:w-3/4 space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-2 block">/ Repositories</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Documentation.</h2>
            </div>
            
            <div className="flex flex-col md:items-end gap-6">
              <input 
                type="text" 
                placeholder="Search database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-white/5 rounded-full px-8 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 w-full md:w-80 transition-all shadow-xl"
              />
              <div className="flex flex-wrap gap-2">
                {allPossibleLabels.map((f) => (
                  <button
                    key={f}
                    onClick={() => handleFilterToggle(f)}
                    className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border ${
                      activeFilters.includes(f) ? 'bg-white text-black border-white' : 'glass border-white/5 text-slate-500 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredItems.map((doc) => (
              <div 
                key={doc.id}
                className="group p-8 glass-premium rounded-[2.5rem] border-white/5 hover:border-blue-500/30 transition-all flex items-center gap-8 shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                   <span className="font-black text-xs">{doc.fileType}</span>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">{doc.title}</h4>
                    <div className="flex gap-2">
                      {doc.labels.map(l => (
                        <span key={l} className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-800 text-slate-500 rounded-full border border-white/5">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 truncate max-w-xl">{doc.description}</p>
                </div>

                <div className="hidden lg:block text-right pr-4">
                  <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Modified</p>
                  <p className="text-xs text-slate-300">{doc.dateTime.split(' ')[0]}</p>
                </div>

                <a 
                  href={doc.fileUrl}
                  className="p-4 bg-slate-800 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl flex-shrink-0"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center glass-premium rounded-[3rem] border-white/5">
              <p className="text-slate-500 font-mono uppercase tracking-[0.2em]">Zero documents found in active search parameters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Documents;
