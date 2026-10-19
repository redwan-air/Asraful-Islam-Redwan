
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Projects from './components/Projects.tsx';
import Skills from './components/Skills.tsx';
import Gallery from './components/Gallery.tsx';
import Documents from './components/Documents.tsx';
import Achievements from './components/Achievements.tsx';
import Contact from './components/Contact.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import { USER_INFO, METADATA_CONFIG } from './constants.tsx';

const PageMetadataUpdater: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    const pageId = location.pathname.substring(1) || 'home';
    const meta = METADATA_CONFIG[pageId as keyof typeof METADATA_CONFIG] || METADATA_CONFIG.home;
    document.title = meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageMetadataUpdater />
      <div className="relative min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 flex flex-col">
        <CustomCursor />
        <Navbar />
        
        <main className="flex-grow animate-in fade-in duration-700">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/work" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="py-12 border-t border-white/5 bg-slate-950/50 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <a href="/" className="mb-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all block">
              <img src="/logo.png" alt="Logo" className="h-6 mx-auto" />
            </a>
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
      </div>
    </BrowserRouter>
  );
};

export default App;
