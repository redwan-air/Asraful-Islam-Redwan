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
      if (!hasAccess(item.id, item.visibility)) return false;
      const matchesFilter = activeFilter === 'All' || item.label === activeFilter;
      const searchStr = `${item.title} ${item.description} ${item.dateTime} ${item.label}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter, hasAccess]);

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.download = `${title.replace(/\s+/g, '_')}_Reference`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen pt-40 pb-32 relative px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-2 block">/ Assets Archive</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Visual Intelligence.</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Short Query Filter Labels */}
            <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 h-fit">
              {(['All', 'Official', 'Unofficial'] as const).map((label) => (
                <button
                  key={label}
                  onClick={() => setActiveFilter(label)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeFilter === label 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <input 
              type="text" 
              placeholder="Search by ID, Title, or Label..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-2xl px-6 py-3.5 text-xs text-white focus:outline-none focus:border-blue-500/50 w-full sm:w-64 shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative glass-premium rounded-[2.5rem] overflow-hidden border-white/5 cursor-pointer hover:scale-[1.02] transition-all duration-500 shadow-2xl bg-slate-900/30"
            >
              <div className="aspect-[4/5] overflow-hidden bg-slate-900/50">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute top-5 right-5 flex gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                  item.label === 'Official' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-slate-800/20 text-slate-400 border-slate-500/30'
                }`}>
                  {item.label}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8">
                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">{item.title}</h4>
                <p className="text-[9px] text-slate-500 font-mono mt-2 uppercase tracking-widest">ID: {item.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setSelectedImage(null)}></div>
          <div className="relative glass-premium rounded-[3rem] max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in duration-300">
            <div className="md:w-3/5 h-[40vh] md:h-auto bg-slate-900 flex items-center justify-center p-8">
              <img src={selectedImage.imageUrl} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" alt="" />
            </div>
            <div className="md:w-2/5 p-12 flex flex-col justify-between bg-slate-950/60">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">Resource Archive</span>
                  <button onClick={() => setSelectedImage(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-slate-500 hover:text-white transition-all">✕</button>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter leading-none">{selectedImage.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed">{selectedImage.description}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 p-5 bg-slate-900/50 rounded-2xl border border-white/5 font-mono">
                    <p className="text-[8px] text-slate-600 mb-1 uppercase tracking-widest">Object ID</p>
                    <p className="text-xs text-blue-400 font-bold">{selectedImage.id}</p>
                  </div>
                  <div className="flex-1 p-5 bg-slate-900/50 rounded-2xl border border-white/5 font-mono">
                    <p className="text-[8px] text-slate-600 mb-1 uppercase tracking-widest">Visibility</p>
                    <p className="text-xs text-white font-bold uppercase">{selectedImage.visibility}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDownload(selectedImage.imageUrl, selectedImage.title)}
                className="w-full py-5 mt-12 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98] shadow-2xl"
              >
                Download Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;