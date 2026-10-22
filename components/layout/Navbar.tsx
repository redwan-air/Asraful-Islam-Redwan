
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageId } from '../../types.ts';

const Navbar: React.FC = () => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleGlow = () => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 3000);
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'articles', 'contact'];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('glowSidebar', handleGlow);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('glowSidebar', handleGlow);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks: { name: string; id: PageId; href: string }[] = [
    { name: 'Work', id: 'projects', href: '#projects' },
    { name: 'Articles', id: 'articles', href: '#articles' },
    { name: 'Connect', id: 'contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-max">
      <div className={`bg-slate-950 px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl border border-white/10 group/nav transition-all duration-500 ${isGlowing ? 'animate-rainbow-glow border-opacity-100 scale-105' : 'border-opacity-10'}`}>
        <motion.a 
          href="#home"
          className="flex items-center group/logo focus:outline-none relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`h-7 w-auto transition-all ${activeSection === 'home' ? 'brightness-200' : 'brightness-125 grayscale'}`} 
          />
          {activeSection === 'home' && (
            <motion.div layoutId="active-nav" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></motion.div>
          )}
        </motion.a>
        
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 focus:outline-none hover:text-white ${
                activeSection === link.id ? 'text-blue-400' : 'text-slate-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div layoutId="active-nav" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></motion.div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
