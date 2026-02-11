
import React, { useState } from 'react';
import { USER_INFO } from '../constants';

interface HeroProps {
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ isAdmin, onAdminClick }) => {
  const [showVersion, setShowVersion] = useState(false);

  const handleExplore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    // Dispatch custom event for the navbar glow effect
    window.dispatchEvent(new CustomEvent('glowSidebar'));
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="flex flex-col items-center space-y-10">
          
          {/* Main Typography */}
          <div className="text-center space-y-4">
            <h2 className="text-blue-500 font-mono text-sm uppercase tracking-[0.4em] mb-2 opacity-70">
              The Personal Portfolio of
            </h2>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tight leading-[0.85] text-white">
              {USER_INFO.name.toUpperCase()}
              <span className="text-blue-600">.</span>
            </h1>
          </div>

          {/* Tagline / Introduction */}
          <p className="max-w-2xl text-center text-xl md:text-2xl text-slate-400 font-light leading-relaxed text-balance">
            Building highly efficient systems through <span className="text-white font-medium italic underline decoration-blue-500/50 underline-offset-8">algorithmic precision</span> and creative engineering.
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl pt-8">
            <div className="glass-premium p-6 rounded-3xl text-center group">
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Role</p>
              <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Software Engineer</p>
            </div>
            <div className="glass-premium p-6 rounded-3xl text-center group">
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Focus</p>
              <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Algorithms</p>
            </div>
            <div className="glass-premium p-6 rounded-3xl text-center group">
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Rank</p>
              <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{USER_INFO.cpStats.codeforces}</p>
            </div>
            <div className="glass-premium p-6 rounded-3xl text-center group">
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Location</p>
              <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Sylhet, BD</p>
            </div>
          </div>

          {/* Working Button */}
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={handleExplore}
              className="px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95"
            >
              Explore Systems
            </button>
            {isAdmin && (
              <button 
                onClick={onAdminClick}
                className="text-[10px] font-mono text-blue-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                [ ADMIN_CMS_LINK ]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Version Information Button */}
      <div className="absolute bottom-8 left-8 z-[100] group">
        {showVersion && (
          <div className="absolute bottom-full left-0 mb-4 px-6 py-3 glass-premium rounded-2xl animate-in slide-in-from-bottom-2 duration-300">
             <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">System Version</p>
             <p className="text-sm font-bold text-white">{USER_INFO.version}</p>
          </div>
        )}
        <button 
          onMouseEnter={() => setShowVersion(true)}
          onMouseLeave={() => setShowVersion(false)}
          className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all shadow-xl"
        >
          <span className="font-serif italic font-bold text-lg">i</span>
        </button>
      </div>

      {/* Visual Scroll/Navigation Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
