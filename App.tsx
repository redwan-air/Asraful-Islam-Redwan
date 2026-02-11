import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Projects from './components/Projects.tsx';
import Skills from './components/Skills.tsx';
import Gallery from './components/Gallery.tsx';
import Documents from './components/Documents.tsx';
import Contact from './components/Contact.tsx';
import Account from './components/Account.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import GeminiAssistant from './components/GeminiAssistant.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import { USER_INFO } from './constants.tsx';
import { UserProfile } from './types.ts';

export type PageId = 'home' | 'about' | 'projects' | 'skills' | 'gallery' | 'documents' | 'contact' | 'account';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('redwan_auth');
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
  }, []);

  const hasAccess = (resourceId: string, visibility: 'public' | 'private') => {
    if (visibility === 'public') return true;
    if (!userProfile) return false;
    if (userProfile.role === 'admin') return true;
    return userProfile.granted_resources.includes(resourceId) || userProfile.granted_resources.includes('*');
  };

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
      case 'gallery':
        return (
          <>
            {userProfile?.role === 'admin' && (
              <div className="max-w-7xl mx-auto pt-40 px-6 -mb-20">
                <AdminPanel />
              </div>
            )}
            <Gallery hasAccess={hasAccess} />
          </>
        );
      case 'documents':
        return (
          <>
            {userProfile?.role === 'admin' && (
              <div className="max-w-7xl mx-auto pt-40 px-6 -mb-20">
                <AdminPanel />
              </div>
            )}
            <Documents hasAccess={hasAccess} />
          </>
        );
      case 'contact':
        return <Contact />;
      case 'account':
        return <Account onAuthChange={setUserProfile} currentProfile={userProfile} />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 flex flex-col">
      <CustomCursor />
      <Navbar activePage={activePage} onNavigate={setActivePage} isAuth={!!userProfile} userProfile={userProfile} />
      
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

      <GeminiAssistant />
    </div>
  );
};

export default App;