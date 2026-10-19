
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageId } from '../types.ts';

const Navbar: React.FC = () => {
  const [isGlowing, setIsGlowing] = useState(false);
  const location = useLocation();
  const activePage = location.pathname.substring(1) || 'home';

  useEffect(() => {
    const handleGlow = () => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 3000);
    };

    window.addEventListener('glowSidebar', handleGlow);
    return () => window.removeEventListener('glowSidebar', handleGlow);
  }, []);

  const navLinks: { name: string; id: PageId; path: string }[] = [
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Work', id: 'projects', path: '/projects' },
    { name: 'Tech', id: 'skills', path: '/skills' },
    { name: 'Gallery', id: 'gallery', path: '/gallery' },
    { name: 'Docs', id: 'documents', path: '/documents' },
    { name: 'Achievements', id: 'achievements', path: '/achievements' },
    { name: 'Connect', id: 'contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-max">
      <div className={`bg-slate-950 px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl border border-white/10 group/nav transition-all duration-500 ${isGlowing ? 'animate-rainbow-glow border-opacity-100 scale-105' : 'border-opacity-10'}`}>
        <Link 
          to="/"
          className="flex items-center group/logo focus:outline-none relative"
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`h-7 w-auto transition-all group-hover/logo:scale-110 ${activePage === 'home' ? 'brightness-200' : 'brightness-125 grayscale'}`} 
          />
          {activePage === 'home' && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
          )}
        </Link>
        
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 focus:outline-none hover:text-white ${
                activePage === link.id ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              {link.name}
              {activePage === link.id && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
