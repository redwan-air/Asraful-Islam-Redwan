import React from 'react';
import { motion } from 'framer-motion';
import { USER_INFO } from '../constants';


const Contact: React.FC = () => {
  const whatsappUrl = `https://wa.me/88${USER_INFO.whatsapp.replace(/\D/g, '')}`;

  return (
    <section className="min-h-screen pt-32 pb-32 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[200px] rounded-full"></div>
      
      <div className="max-w-4xl mx-auto px-6 z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">Let's Connect.</h2>
          <p className="text-xl text-slate-400 font-light max-w-lg mx-auto">Have a project, idea, or just want to chat? Feel free to reach out anytime.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.a 
            whileHover={{ y: -10 }}
            href={`mailto:${USER_INFO.email}`} 
            className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Email</span>
              <span className="text-2xl font-bold text-white">{USER_INFO.email}</span>
            </div>
          </motion.a>
          
          <motion.a 
            whileHover={{ y: -10 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72A3.5 3.5 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Instant Chat</span>
              <span className="text-2xl font-bold text-white">Message on WhatsApp</span>
            </div>
          </motion.a>
        </div>

        <div className="flex justify-end pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { 
                label: 'GitHub', 
                href: USER_INFO.github, 
                color: 'hover:text-white',
                icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              },
              { 
                label: 'LinkedIn', 
                href: USER_INFO.linkedin, 
                color: 'hover:text-blue-500',
                icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              },
              { 
                label: 'Codeforces', 
                href: `https://codeforces.com/profile/${USER_INFO.codeforces}`, 
                color: 'hover:text-amber-500',
                icon: <path d="M4 20h4v-10h-4v10zM10 20h4v-16h-4v16zM16 20h4v-6h-4v6z" />
              }
            ].map(link => (
              <motion.a 
                key={link.label}
                whileHover={{ y: -5 }}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center gap-3 transition-colors ${link.color}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">{link.icon}</svg>
                <span className="uppercase font-mono text-xs tracking-widest text-slate-400">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
