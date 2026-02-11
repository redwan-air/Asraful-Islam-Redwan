import React from 'react';
import { USER_INFO } from '../constants.tsx';

const About: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Left Sidebar Info */}
          <div className="md:w-1/3 space-y-12 sticky top-32">
            <div>
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">/ Profile</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">Asraful Islam Redwan.</h2>
              <div className="h-1 w-12 bg-blue-600 mb-8"></div>
              <p className="text-slate-400 leading-relaxed font-medium">
                Passionate student and competitive programmer focused on mastering complex algorithms and low-level optimization using C++.
              </p>
            </div>

            <div className="space-y-6">
              <div className="group cursor-default">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Education</p>
                <p className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">
                  {USER_INFO.education}
                </p>
              </div>
              <div className="group cursor-default">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Expertise</p>
                <p className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">C++ Only</p>
              </div>
            </div>
          </div>

          {/* Main Narrative */}
          <div className="md:w-2/3 space-y-12">
            <div className="glass-premium p-10 md:p-14 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H15.017C13.9124 14 13.017 13.1046 13.017 12V5C13.017 3.89543 13.9124 3 15.017 3H21.017C22.1216 3 23.017 3.89543 23.017 5V12C23.017 13.1046 22.1216 14 21.017 14H21.017V16C21.017 18.7614 18.7784 21 16.017 21H14.017ZM1.017 14H5.017V16C5.017 18.7614 2.77843 21 0.017 21H2.017C3.12157 21 4.017 20.1046 4.017 19V18C4.017 16.8954 3.12157 16 2.017 16H1.017V14H1.017ZM1.017 5C1.017 3.89543 1.91243 3 3.017 3H9.017C10.1216 3 11.017 3.89543 11.017 5V12C11.017 13.1046 10.1216 14 9.017 14H5.017V12C5.017 10.8954 5.91243 10 7.017 10H8.017V8H5.017C3.91243 8 3.017 7.10457 3.017 6V5H1.017V5Z" /></svg>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-8 tracking-tight group-hover:text-blue-400 transition-colors">Philosophy</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-light mb-8 italic">
                "{USER_INFO.about}"
              </p>
              <div className="w-full h-[1px] bg-white/5 mb-8"></div>
              <p className="text-slate-400 leading-relaxed">
                As a student at Govt. Madan Mohan College, I am dedicating my intermediate studies to the core principles of computer science. Competitive programming is my primary focus, using C++ as the engine to solve intricate puzzles and build a solid foundation for my future in software engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bento-card p-8 rounded-[2rem] hover:bg-blue-600/5 transition-colors">
                <span className="text-blue-500 font-mono text-[10px] uppercase mb-4 block tracking-widest">Process</span>
                <h4 className="text-white font-bold mb-2">Algorithm First</h4>
                <p className="text-sm text-slate-500">I prioritize understanding the mathematical logic before implementation.</p>
              </div>
              <div className="bento-card p-8 rounded-[2rem] hover:bg-blue-600/5 transition-colors">
                <span className="text-blue-500 font-mono text-[10px] uppercase mb-4 block tracking-widest">Goal</span>
                <h4 className="text-white font-bold mb-2">Intermediate Excellence</h4>
                <p className="text-sm text-slate-500">Balancing academic studies with intensive coding practice daily.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;