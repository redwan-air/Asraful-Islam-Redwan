
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import GeminiAssistant from './components/GeminiAssistant';
import { USER_INFO } from './constants';

export type PageId = 'home' | 'about' | 'projects' | 'skills' | 'contact';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Hero />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 flex flex-col">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      
      <main className="flex-grow animate-in fade-in duration-700">
        {renderPage()}
      </main>

      <footer className="py-12 border-t border-white/5 bg-slate-950/50 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => setActivePage('home')} className="mb-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <img src="https://i.postimg.cc/HkYKGYnb/logo.png" alt="Logo" className="h-6 mx-auto" />
          </button>
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} {USER_INFO.fullName}.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href={`mailto:${USER_INFO.email}`} className="text-[10px] font-mono text-slate-600 hover:text-blue-400 uppercase tracking-widest transition-colors">Email</a>
            <a href={USER_INFO.github} className="text-[10px] font-mono text-slate-600 hover:text-blue-400 uppercase tracking-widest transition-colors">GitHub</a>
            <a href={USER_INFO.linkedin} className="text-[10px] font-mono text-slate-600 hover:text-blue-400 uppercase tracking-widest transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Floating AI Terminal Assistant */}
      <GeminiAssistant />
    </div>
  );
};

export default App;
