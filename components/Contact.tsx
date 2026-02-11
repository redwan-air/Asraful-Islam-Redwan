
import React from 'react';
import { USER_INFO } from '../constants';

const Contact: React.FC = () => {
  const whatsappUrl = `https://wa.me/88${USER_INFO.whatsapp.replace(/\D/g, '')}`;

  return (
    <section className="min-h-screen pt-40 pb-32 relative flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 block">/ 04 Direct Channel</span>
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-12">Let's Connect.</h2>
        
        <div className="grid gap-6 mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${USER_INFO.email}`} 
              className="flex-1 px-8 py-6 glass rounded-[2rem] border-white/5 hover:border-blue-500/30 hover:bg-white/5 transition-all text-left group"
            >
              <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Email Address</span>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{USER_INFO.email}</span>
            </a>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex-1 px-8 py-6 glass rounded-[2rem] border-white/5 hover:border-emerald-500/30 hover:bg-white/5 transition-all text-left group"
            >
              <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Instant Chat</span>
              <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">Message on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-12 pt-12">
          <a href={USER_INFO.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest">GitHub</a>
          <a href={USER_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest">LinkedIn</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
