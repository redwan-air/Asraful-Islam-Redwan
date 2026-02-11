
import React from 'react';
import { UserProfile, PageId } from '../types.ts';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isAuth: boolean;
  userProfile?: UserProfile | null;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, isAuth, userProfile }) => {
  const navLinks: { name: string; id: PageId }[] = [
    { name: 'About', id: 'about' },
    { name: 'Work', id: 'projects' },
    { name: 'Tech', id: 'skills' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Docs', id: 'documents' },
    { name: 'Connect', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: PageId) => {
    e.preventDefault();
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-max">
      <div className="glass-premium px-8 py-4 rounded-full flex items-center gap-6 shadow-2xl border-white/10 group/nav">
        <button 
          onClick={(e) => handleLinkClick(e, 'home')} 
          className="flex items-center group/logo focus:outline-none relative"
        >
          <img 
            src="https://i.postimg.cc/HkYKGYnb/logo.png" 
            alt="Logo" 
            className={`h-7 w-auto transition-all group-hover/logo:scale-110 ${activePage === 'home' ? 'brightness-200' : 'brightness-125 grayscale'}`} 
          />
          {activePage === 'home' && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
          )}
        </button>
        
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 focus:outline-none hover:text-white ${
                activePage === link.id ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              {link.name}
              {activePage === link.id && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
          
          <button
            onClick={(e) => handleLinkClick(e, 'account')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border font-bold uppercase text-[9px] tracking-widest ${
              activePage === 'account' 
                ? 'bg-blue-600 text-white border-blue-500' 
                : 'glass border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {isAuth && userProfile?.avatar_url ? (
              <img src={userProfile.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover" />
            ) : (
              isAuth ? 'Profile' : 'Login'
            )}
            {isAuth && !userProfile?.avatar_url && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
