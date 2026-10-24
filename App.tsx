
import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar.tsx';
import { USER_INFO } from './constants.tsx';

const App: React.FC = () => {
  return (
      <div className="relative min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 flex flex-col scroll-smooth">

        <Navbar />
        
        <main className="flex-grow animate-in fade-in duration-700">
          <Outlet />
        </main>

        <footer className="py-12 border-t border-white/5 bg-slate-950/50 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <a href="/home" className="mb-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all block">
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
