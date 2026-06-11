
import React from 'react';
import { USER_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="flex flex-col items-center space-y-12">
          
          <div className="text-center space-y-6">
            
            <div className="space-y-2">
              <h2 className="text-slate-500 font-mono text-xs uppercase tracking-[0.5em] opacity-60">
                The Personal Portfolio of
              </h2>
              <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white selection:bg-blue-600 selection:text-white transition-all">
                REDWAN
                <span className="text-blue-600">.</span>
              </h1>
            </div>
          </div>

          <p className="max-w-3xl text-center text-xl md:text-2xl text-slate-400 font-light leading-relaxed text-balance animate-in fade-in duration-1000 delay-300">
            Crafting the future through <span className="text-white font-medium italic underline decoration-blue-500/40 underline-offset-8">computational intelligence</span> and refined structural design.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl pt-8 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            {[
              { label: 'Primary Role', value: 'Software Engineer' },
              { label: 'Core Stack', value: 'C++ Systems' },
              { label: 'Codeforces Rating', value: USER_INFO.cpStats.codeforces },
              { label: 'Origin', value: 'Sylhet, BD' }
            ].map((stat, i) => (
              <div key={i} className="glass-premium p-8 rounded-[2.5rem] text-center group hover:border-blue-500/30 transition-all cursor-default">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 group-hover:text-blue-500">{stat.label}</p>
                <p className="text-base font-bold text-white transition-colors">{stat.value}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
