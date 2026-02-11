import React, { useState, useMemo } from 'react';
import { DOCUMENT_ITEMS } from '../constants.tsx';

interface DocumentsProps {
  hasAccess: (id: string, visibility: 'public' | 'private') => boolean;
}

const Documents: React.FC<DocumentsProps> = ({ hasAccess }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return DOCUMENT_ITEMS.filter(item => {
      if (!hasAccess(item.id, item.visibility)) return false;
      const searchStr = `${item.title} ${item.description} ${item.labels.join(' ')} ${item.id}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, hasAccess]);

  const handleDownload = (e: React.MouseEvent, url: string, title: string) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = `${title.replace(/\s+/g, '_')}_Document`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-2 block">/ System Registry</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Documentation.</h2>
          </div>
          <div className="w-full md:w-96 relative">
            <input 
              type="text" 
              placeholder="Search by Title, ID, or Label..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl px-8 py-5 text-sm text-white focus:outline-none focus:border-blue-500/50 shadow-2xl transition-all"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" /></svg>
            </div>
          </div>
        </div>

        {/* Short Query Shortcut Bar */}
        <div className="flex flex-wrap gap-3">
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest self-center mr-2">Short Queries:</span>
          {['Official', 'Private', 'PDF', 'Roadmap'].map(label => (
            <button 
              key={label}
              onClick={() => setSearchTerm(label)}
              className="px-4 py-2 rounded-xl bg-slate-900/50 border border-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-400 hover:border-blue-500/30 transition-all"
            >
              {label}
            </button>
          ))}
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-[9px] font-bold text-red-500 uppercase tracking-widest px-4 py-2 hover:underline">Clear Filter</button>
          )}
        </div>

        <div className="grid gap-6">
          {filteredItems.map((doc) => (
            <div key={doc.id} className="group p-8 glass-premium rounded-[3rem] border-white/5 hover:border-blue-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-8 shadow-xl relative overflow-hidden">
              <div className="w-20 h-20 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 flex-shrink-0">
                 <span className="font-black text-sm">{doc.fileType}</span>
              </div>
              
              <div className="flex-grow min-w-0 space-y-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors truncate">{doc.title}</h4>
                  <div className="flex gap-2">
                    {doc.labels.map(label => (
                      <button 
                        key={label}
                        onClick={() => setSearchTerm(label)}
                        className={`text-[8px] font-black uppercase px-3 py-1 rounded-full border transition-all ${
                          label === 'Private' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-slate-800/10 text-slate-500 border-slate-500/20 hover:text-blue-400'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{doc.description}</p>
                <p className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em]">Registry_ID: {doc.id}</p>
              </div>

              <button 
                onClick={(e) => handleDownload(e, doc.fileUrl, doc.title)}
                className="group/btn flex items-center gap-3 px-8 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all self-end sm:self-center active:scale-95 shadow-2xl"
              >
                Download
                <svg className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="py-24 text-center glass-premium rounded-[4rem] border-white/5 bg-slate-900/10">
              <div className="text-slate-700 mb-4 flex justify-center">
                <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" /></svg>
              </div>
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No registry matches for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Documents;