
import React from 'react';
import { USER_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(3,7,18,1)_100%)]"></div>
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full animate-glow"></div>
      
      {/* Subtle Mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Phase 0: Problem Solving Journey
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6">
          <span className="text-white opacity-95">{USER_INFO.name}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">
            {USER_INFO.cpStats.codeforces.toUpperCase()}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-12">
          An aspiring <span className="text-white">Software Engineer</span> grounding his logic in Competitive Programming. Currently at rating 0, building the foundations for something massive.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="glass px-8 py-5 rounded-[2rem] text-center border-white/5 hover:border-blue-500/20 transition-all group">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Current Rating</p>
            <p className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">{USER_INFO.cpStats.rating}</p>
          </div>
          <div className="glass px-8 py-5 rounded-[2rem] text-center border-white/5 hover:border-blue-500/20 transition-all group">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Target</p>
            <p className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">Grandmaster</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
