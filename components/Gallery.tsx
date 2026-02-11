
import React, { useState, useMemo } from 'react';
import { GALLERY_ITEMS } from '../constants.tsx';
import { GalleryItem } from '../types.ts';

interface GalleryProps {
  hasAccess: (id: string, visibility: 'public' | 'private') => boolean;
}

const Gallery: React.FC<GalleryProps> = ({ hasAccess }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Official' | 'Unofficial'>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter(item => {
      // Access Control
      if (!hasAccess(item.id, item.visibility)) return false;

      const matchesFilter = activeFilter === 'All' || item.label === activeFilter;
      const searchStr = `${item.title} ${item.description} ${item.dateTime} ${item.label}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter, hasAccess]);

  const recentUploads = useMemo(() => {
    return GALLERY_ITEMS
      .filter(item => hasAccess(item.id, item.visibility))
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
      .slice(0, 5);
  }, [hasAccess]);

  const formatDisplayDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
      }).replace(',', ' |');
    } catch { return dateStr; }
  };

  return (
    <section className="min-h-screen pb-32 relative px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        <div className="md:w-1/4 space-y-8">
          <div className="glass-premium p-8 rounded-[2.5rem] border-white/5">
            <h3 className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">Visible Assets</h3>
            <div className="space-y-6">
              {recentUploads.map(item => (
                <div key={item.id} className="group cursor-pointer flex gap-4 items-center" onClick={() => setSelectedImage(item)}>
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/5 bg-slate-900/50">
                    <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{item.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      {item.visibility === 'private' && <span className="text-amber-500">🔒</span>}
                      {formatDisplayDate(item.dateTime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-3/4 space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-2 block">/ Assets</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Visual Archive.</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <input 
                type="text" 
                placeholder="Search archive..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-white/5 rounded-full px-6 py-3 text-xs text-white focus:outline-none focus:border-blue-500/50 w-64 shadow-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative glass-premium rounded-[2rem] overflow-hidden border-white/5 cursor-pointer hover:scale-[1.02] transition-all duration-500 shadow-2xl bg-slate-900/30"
              >
                <div className="aspect-[4/5] overflow-hidden flex items-center justify-center bg-slate-900/50">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  {item.visibility === 'private' && (
                    <span className="px-3 py-1.5 rounded-full text-[8px] font-black uppercase bg-amber-500/20 text-amber-500 border border-amber-500/30">
                      Private
                    </span>
                  )}
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    item.label === 'Official' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-slate-800/20 text-slate-400 border-slate-500/30'
                  }`}>
                    {item.label}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 space-y-1">
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">ID: {item.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setSelectedImage(null)}></div>
          <div className="relative glass-premium rounded-[3rem] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="md:w-2/3 h-[40vh] md:h-auto bg-slate-900 flex items-center justify-center overflow-hidden">
              <img src={selectedImage.imageUrl} className="max-w-full max-h-full object-contain" alt="" />
            </div>
            <div className="md:w-1/3 p-10 flex flex-col justify-between bg-slate-950/40">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Resource Archive</span>
                  <button onClick={() => setSelectedImage(null)} className="text-slate-500 hover:text-white transition-colors">✕</button>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">{selectedImage.title}</h3>
                  <p className="text-slate-400 text-sm">{selectedImage.description}</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 font-mono">
                  <p className="text-[9px] text-slate-600 mb-1 uppercase">Object ID</p>
                  <p className="text-xs text-blue-400">{selectedImage.id}</p>
                </div>
              </div>
              <button className="w-full py-4 mt-8 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Download Reference</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
