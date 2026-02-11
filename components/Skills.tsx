
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="min-h-screen pt-40 pb-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.5em] mb-4 block">/ Technical Deck</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Stack Intelligence.</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name}
              className="group relative p-10 glass-premium rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-6 border-white/5 hover:border-blue-500/40 hover:-translate-y-3 transition-all duration-500"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full animate-shimmer group-hover:block hidden"></div>
              </div>

              <div className="text-6xl group-hover:scale-110 transition-transform duration-700 filter drop-shadow-lg grayscale group-hover:grayscale-0">
                {skill.icon}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white tracking-tight">{skill.name}</p>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">{skill.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bento-card rounded-[3rem] border-white/10 bg-slate-900/30 flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="max-w-xl">
             <h4 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500"></span>
               Future Trajectory
             </h4>
             <p className="text-slate-400 text-sm leading-relaxed">
               I am currently deep-diving into <span className="text-blue-400 font-medium">Distributed Systems</span> and <span className="text-blue-400 font-medium">Low-level optimization in Rust</span>, aiming to engineer infrastructures that process millions of events per second with minimal latency.
             </p>
          </div>
          <button className="px-8 py-4 glass text-xs font-bold uppercase tracking-widest text-white rounded-full group-hover:bg-white group-hover:text-black transition-all">
            Download Tech CV
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
