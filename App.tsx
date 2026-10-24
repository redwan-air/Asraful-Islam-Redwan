
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar.tsx';
import Hero from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import Articles from './pages/Articles.tsx';
import Contact from './pages/Contact.tsx';
import { USER_INFO } from './constants.tsx';

const App: React.FC = () => {
  return (
      <div className="relative min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 flex flex-col scroll-smooth">

        <Navbar />
        
        <main className="flex-grow animate-in fade-in duration-700">
          <motion.section 
            id="home"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Hero />
          </motion.section>
          <motion.section 
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Projects />
          </motion.section>
          <motion.section 
            id="articles"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Articles />
          </motion.section>
          <motion.section 
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Contact />
          </motion.section>

        </main>

        <footer className="py-12 border-t border-white/5 bg-slate-950/50 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <a href="#home" className="mb-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all block">
              <img src="/logo.png" alt="Logo" className="h-6 mx-auto" />
            </a>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} {USER_INFO.fullName}.
            </p>
            <div className="mt-4 flex justify-center gap-6">
            </div>
          </div>
        </footer>
      </div>
  );
};

export default App;
