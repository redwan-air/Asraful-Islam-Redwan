
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.tsx';
import Hero from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import Articles from './pages/Articles.tsx';
import About from './pages/About.tsx';
import { USER_INFO } from './constants.tsx';

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
      <div className="relative min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 flex flex-col scroll-smooth">
        <Navbar />
        
        <main className="flex-grow animate-in fade-in duration-700">
          <div id="home"><Hero /></div>
          <div id="projects"><Projects /></div>
          <div id="articles"><Articles /></div>
          <div id="about"><About /></div>
        </main>

        <footer className="py-12 border-t border-white/5 bg-slate-950/50 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <a href="/home" className="mb-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all block">
              <img src="/logo.png" alt="Logo" className="h-6 mx-auto" />
            </a>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} {USER_INFO.fullName}.
            </p>
          </div>
        </footer>
      </div>
  );
};

export default App;
