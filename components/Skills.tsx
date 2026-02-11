
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="min-h-screen pt-40 pb-32 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-2 block">/ 03 Tools of Trade</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Technical Arsenal</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name}
              className="group relative p-8 bento-card flex flex-col items-center justify-center text-center gap-4 border-white/5 hover:bg-blue-600/5 hover:-translate-y-2 transition-all"
            >
              <div className="text-5xl group-hover:scale-125 transition-transform duration-500 filter grayscale group-hover:grayscale-0">
                {skill.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{skill.name}</p>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mt-1">{skill.category}</p>
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 glass rounded-[2rem] border-white/5 text-center">
          <p className="text-slate-400 font-medium">
            Currently exploring: <span className="text-white">Rust, LLVM Internals, and Distributed Consensus Algorithms.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
