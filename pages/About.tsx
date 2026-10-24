import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { USER_INFO } from '../constants.tsx';

const About: React.FC = () => {
  const whatsappUrl = `https://wa.me/88${USER_INFO.whatsapp.replace(/\D/g, '')}`;

  return (
    <section id="about" className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-slate-950">
      {/* Background Decorative Boxes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-8"
      >
        {/* About Me Section */}
        <div className="flex items-center gap-3 text-blue-500 mb-6 font-medium tracking-widest text-sm uppercase">
           <div className="w-8 h-[1px] bg-blue-500" /> ABOUT ME
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
           <div>
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Hi, I'm Asraful Islam Redwan</h1>
             <p className="text-slate-400 mb-8 font-medium text-lg">(air_redwan) · Redwan Developer</p>
             <div className="text-slate-400 space-y-4 text-base leading-relaxed">
               <p>I'm a programmer and independent builder based in Sylhet, Bangladesh, focused on building software, digital products, and practical technology solutions.</p>
               <p>I am the Founder and CEO of Developeair, a technology company focused on turning ideas into digital products.</p>
               <p>I also lead Unfoundid, a subsidiary of Developeair that focuses on developing useful digital products and software tools.</p>
               <p>Through these ventures, I explore ideas, build products, and work toward creating technology that solves real problems.</p>
             </div>
           </div>
           <div className="relative group bg-slate-900 border border-white/5 rounded-3xl p-8 flex flex-col gap-6 overflow-hidden transition-all hover:border-blue-500/30">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="text-2xl font-bold text-white relative">Connect</h3>
              <div className="space-y-4 relative">
                <a href={`mailto:${USER_INFO.email}`} className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-sm font-medium">{USER_INFO.email}</span>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72A3.5 3.5 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  </div>
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
                <a href={USER_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.509 11.509 0 013.003-.404c1.02.004 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a href={USER_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-700/10 flex items-center justify-center text-blue-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61595652535259" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a href={`https://codeforces.com/profile/${USER_INFO.codeforces}`} target="_blank" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <span className="text-sm font-medium">Codeforces: {USER_INFO.codeforces}</span>
                </a>
              </div>
           </div>
        </div>

        {/* Companies Section */}
        <div className="flex items-center gap-3 text-blue-500 mb-6 font-medium tracking-widest text-sm uppercase">
           <div className="w-8 h-[1px] bg-blue-500" /> COMPANIES
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl mb-6 flex items-center justify-center text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Developeair</h3>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase">Parent Company</span>
              <p className="text-slate-400 mt-4 mb-6">A technology company focused on turning ideas into digital products, software, and practical solutions.</p>
              <a href="https://developeair.vercel.app" target="_blank" className="flex items-center gap-2 text-blue-400 font-bold hover:underline">Official Website →</a>
           </div>
           
           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl mb-6 flex items-center justify-center text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Unfoundid</h3>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase">Subsidiary of Developeair</span>
              <p className="text-slate-400 mt-4 mb-6">Building useful digital products and software tools to make life simpler and smarter.</p>
              <a href="https://unfoundid.cyou" target="_blank" className="flex items-center gap-2 text-blue-400 font-bold hover:underline">Official Website →</a>
           </div>
        </div>

        {/* Footer Link */}
        <div className="flex justify-center">
            <a href="https://www.air-redwan.cyou/" target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-lg font-bold">
               Official Website: https://www.air-redwan.cyou/ →
            </a>
        </div>
      </motion.div>
    </section>
  );
};

export default About;