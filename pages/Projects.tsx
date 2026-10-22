import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Selected Work</h2>
          <p className="text-slate-600 dark:text-slate-400">Hand-picked projects and experiments.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 transition-all duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
              
              <div className="relative z-10">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full group-hover:bg-slate-800 group-hover:text-blue-400 transition-colors">{tag}</span>
                      ))}
                  </div>
                  <div className="pt-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Explore
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;