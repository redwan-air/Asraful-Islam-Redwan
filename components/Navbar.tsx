
import React from 'react';
import { PageId } from '../App';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const navLinks: { name: string; id: PageId }[] = [
    { name: 'About', id: 'about' },
    { name: 'Work', id: 'projects' },
    { name: 'Tech', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: PageId) => {
    e.preventDefault();
    onNavigate(id);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-max">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl border border-white/5">
        <button 
          onClick={(e) => handleLinkClick(e, 'home')} 
          className="flex items-center group focus:outline-none"
        >
          <img 
            src="https://i.postimg.cc/HkYKGYnb/logo.png" 
            alt="Logo" 
            className={`h-6 w-auto transition-all group-hover:scale-110 ${activePage === 'home' ? 'brightness-200' : 'brightness-125'}`} 
          />
        </button>
        
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none ${
                activePage === link.id ? 'text-blue-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
        
        <button 
          onClick={(e) => handleLinkClick(e, 'contact')}
          className="text-[10px] font-black uppercase tracking-tighter bg-white text-black px-4 py-1.5 rounded-full hover:bg-blue-400 hover:text-white transition-all whitespace-nowrap focus:outline-none"
        >
          Hire Me
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
