
import React from 'react';
import { USER_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section className="min-h-screen pt-40 pb-32 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-16">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 block">/ 01 Mission</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            From zero to one. <br/> From code to engineering.
          </h2>
        </div>

        <div className="space-y-12">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5">
            <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-medium mb-8">
              "My Codeforces rating is <span className="text-white font-bold">0</span>, but my ambition is <span className="text-blue-400 font-bold">unlimited</span>."
            </p>
            <div className="h-[1px] w-full bg-white/5 mb-8"></div>
            <p className="text-lg text-slate-400 leading-relaxed">
              {USER_INFO.about} I believe that every senior engineer was once a beginner who didn't quit. My current focus is mastering Data Structures and Algorithms to become a formidable force in the competitive programming arena, while simultaneously learning the craft of building scalable software systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-[2rem] border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-slate-400 font-mono uppercase tracking-widest text-sm">{USER_INFO.location}</p>
            </div>
            <div className="glass p-8 rounded-[2rem] border-white/5 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-2">Focus</h3>
              <p className="text-slate-400 text-sm">C++, Algorithms, Performance Tuning, React, and Full-Stack Architecture.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
