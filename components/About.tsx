import React, { useEffect } from 'react';
import { USER_INFO } from '../constants.tsx';

const About: React.FC = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Asraful Islam Redwan",
        "jobTitle": "Programmer & Independent Builder",
        "description": "Programmer and independent builder exploring software development, technology, and digital products.",
        "url": "https://air-redwan.cyou/about"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
                Programmer & Independent Builder. I explore technology by building things. My work revolves around software development, digital products, and solving practical problems through code.
              </p>
            </div>

            <div className="space-y-6">
              <div className="group cursor-default">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">EDUCATION</p>
                <p className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">
                  Govt. Madan Mohan College
                </p>
                <p className="text-sm text-slate-400">Intermediate Studies · 2025–Present</p>
              </div>
              <div className="group cursor-default">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">CURRENT FOCUS</p>
                <p className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">
                  Software Development · Web Technologies · Digital Products
                </p>
              </div>
            </div>
          </div>

          {/* Main Narrative */}
          <div className="md:w-2/3 space-y-12">
            <div className="glass-premium p-10 md:p-14 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972v11.5c0 1.25.75 2 2 2h3a1 1 0 0 0 1-1v-1c0-1-1-2-2-2s-2.003.001-2.003 0" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972v11.5c0 1.25.75 2 2 2h3a1 1 0 0 0 1-1v-1c0-1-1-2-2-2s-2.003.001-2.003 0" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-8 tracking-tight group-hover:text-blue-400 transition-colors">Philosophy</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-light mb-8 italic">
                "Understand the problem. Build the solution. Learn from the result."
              </p>
              <div className="w-full h-[1px] bg-white/5 mb-8"></div>
              <p className="text-slate-400 leading-relaxed mb-6">
                I believe the best way to understand technology is to experiment with it. I document the ideas I explore, the challenges I encounter, the solutions I test, and the products I build along the way.
              </p>
              <p className="text-slate-400 leading-relaxed">
                My journey is not just about writing code. It is about developing the ability to turn problems into practical solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bento-card p-8 rounded-[2rem] hover:bg-blue-600/5 transition-colors">
                <span className="text-blue-500 font-mono text-[10px] uppercase mb-4 block tracking-widest">Process</span>
                <h4 className="text-white font-bold mb-2">Build to Learn</h4>
                <p className="text-sm text-slate-500">I learn by experimenting, solving problems, and building real projects.</p>
              </div>
              <div className="bento-card p-8 rounded-[2rem] hover:bg-blue-600/5 transition-colors">
                <span className="text-blue-500 font-mono text-[10px] uppercase mb-4 block tracking-widest">Goal</span>
                <h4 className="text-white font-bold mb-2">Long-Term Growth</h4>
                <p className="text-sm text-slate-500">Develop strong engineering fundamentals and build useful technology that creates lasting value.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;