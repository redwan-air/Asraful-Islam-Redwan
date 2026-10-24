
import React from 'react';
import { motion } from 'framer-motion';
import { USER_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-32 pb-20">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-slate-500 font-mono text-xs uppercase tracking-[0.5em]">
                The Personal Portfolio of
              </h2>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
                ASRAFUL ISLAM <br /> REDWAN
                <span className="text-blue-600">.</span>
              </h1>
            </div>

            <p className="max-w-xl text-lg text-slate-400 font-light leading-relaxed text-balance">
              Crafting the future through <span className="text-white font-medium italic underline decoration-blue-500/40 underline-offset-8">computational intelligence</span> and refined structural design.
            </p>

            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium transition-all"
              >
                Explore Projects
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-8 py-3 bg-white/5 text-white rounded-full font-medium transition-all"
              >
                Contact Me
              </motion.a>
            </div>
            

          </div>

          <div className="flex-1">
            <div className="relative group mb-8">
              <img src="/air-redwan.png" alt="Redwan" className="w-full max-w-sm rounded-3xl border border-white/10 transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">Philosophy</h3>
            <p className="text-xl text-slate-300 leading-relaxed font-light mb-8 italic max-w-2xl">
              "Understand the problem. Build the solution. Learn from the result."
            </p>
            <p className="text-slate-400 leading-relaxed max-w-2xl mb-8">
              Programmer & Independent Builder. I explore technology by building things. My work revolves around software development, digital products, and solving practical problems through code.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center gap-8 pt-24 border-t border-white/5 mt-16 text-center">
          {[
            { label: 'Role', value: 'Software Engineer' },
            { label: 'Stack', value: 'C++ Systems' },
            { label: 'Rating', value: USER_INFO.cpStats.codeforces },
            { label: 'Location', value: 'Sylhet, BD' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-sm font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
