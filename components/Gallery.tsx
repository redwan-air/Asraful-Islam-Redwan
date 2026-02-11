
import React, { useState, useMemo } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Official' | 'Unofficial'>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const formatDisplayDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(',', ' |');
    } catch {
      return dateStr;
    }
  };

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter(item => {
      const matchesFilter = activeFilter === 'All' || item.label === activeFilter;
      const searchStr = `${item.title} ${item.description} ${item.dateTime} ${item.label}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  const recentUploads = useMemo(() => {
    return [...GALLERY_ITEMS].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()).slice(0, 5);
  }, []);

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/\s+/g, '_')}_Redwan_Gallery.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen pt-40 pb-32 relative px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Sidebar: Recent Uploads */}
        <div className="md:w-1/4 space-y-8">
          <div className="glass-premium p-8 rounded-[2.5rem] border-white/5">
            <h3 className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {recentUploads.map(item => (
                <div key={item.id} className="group cursor-pointer flex gap-4 items-center" onClick={() => setSelectedImage(item)}>
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/5 bg-slate-900/50">
                    <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{item.title}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{formatDisplayDate(item.dateTime)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content: Gallery Grid */}
        <div className="md:w-3/4 space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-2 block">/ Assets</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Visual Archive.</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search archive..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-white/5 rounded-full px-6 py-3 text-xs text-white focus:outline-none focus:border-blue-500/50 w-64 transition-all"
                />
              </div>
              <div className="flex glass rounded-full p-1 border-white/5">
                {['All', 'Official', 'Unofficial'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f as any)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeFilter === f ? 'bg-white text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
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
                
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    item.label === 'Official' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-slate-800/20 text-slate-400 border-slate-500/30'
                  }`}>
                    {item.label}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 space-y-1">
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {formatDisplayDate(item.dateTime)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center glass-premium rounded-[3rem] border-white/5">
              <p className="text-slate-500 font-mono uppercase tracking-[0.2em]">No visual data found matching your query.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setSelectedImage(null)}></div>
          <div className="relative glass-premium rounded-[3rem] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_-20px_rgba(59,130,246,0.5)]">
            <div className="md:w-2/3 h-[50vh] md:h-auto bg-slate-900 flex items-center justify-center overflow-hidden">
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="md:w-1/3 p-10 flex flex-col justify-between bg-slate-950/40">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    selectedImage.label === 'Official' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-slate-800/20 text-slate-400 border-slate-500/30'
                  }`}>
                    {selectedImage.label}
                  </span>
                  <button onClick={() => setSelectedImage(null)} className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tighter leading-tight">{selectedImage.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{selectedImage.description}</p>
                </div>
                <div className="pt-6 border-t border-white/5 font-mono">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Timestamp</p>
                  <p className="text-sm text-white">{formatDisplayDate(selectedImage.dateTime)}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDownload(selectedImage.imageUrl, selectedImage.title)}
                className="w-full py-4 mt-8 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
