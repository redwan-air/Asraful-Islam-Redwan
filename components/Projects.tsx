
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section className="min-h-screen pt-40 pb-32 bg-slate-950/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-20">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-2 block">/ 02 Selected Works</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Software Experiments</h2>
        </div>

        <div className="grid gap-20">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center group`}
            >
              <div className="flex-1 w-full">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all"></div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black text-white/5 font-mono">{String(index + 1).padStart(2, '0')}</span>
                  <div className="h-[1px] w-12 bg-blue-500/50"></div>
                </div>
                
                <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-lg text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-slate-900/50 border border-white/5 rounded-full text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-blue-400 transition-all group/link"
                  >
                    Explore Case Study
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
