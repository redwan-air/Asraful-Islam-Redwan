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
      const searchStr = `${item.title} ${item.description} ${item.labels.join(' ')}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, hasAccess]);

  return (
    <section className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-2 block">/ Repositories</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Documentation.</h2>
            </div>
            <div className="w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-full px-8 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 shadow-xl transition-all"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredItems.map((doc) => (
              <div key={doc.id} className="group p-8 glass-premium rounded-[2.5rem] border-white/5 hover:border-blue-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-8 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                   <span className="font-black text-xs">{doc.fileType}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">{doc.title}</h4>
                    {doc.visibility === 'private' && (
                      <span className="text-[8px] font-black uppercase px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">Private</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 truncate leading-relaxed">{doc.description || `Resource ID: ${doc.id}`}</p>
                </div>
                <a href={doc.fileUrl} className="p-4 bg-slate-800 text-white rounded-2xl hover:bg-blue-600 transition-all self-end sm:self-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="py-20 text-center glass-premium rounded-[3rem] border-white/5">
                <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">No documents found matching search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;