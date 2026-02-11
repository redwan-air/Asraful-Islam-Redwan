
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AlgoFlow Visualizer',
    description: 'A high-performance algorithm simulation engine. Visualizes dynamic programming transitions and complex graph traversals with sub-millisecond precision.',
    tags: ['C++', 'WebAssembly', 'React', 'Canvas'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Codeforces Analytics',
    description: 'A deep-dive tool for competitive programmers to analyze their rating trajectories, problem difficulty distribution, and time-to-solve metrics.',
    tags: ['TypeScript', 'Next.js', 'Redis', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Sentinel Judge',
    description: 'A distributed sandbox system for safely executing untrusted code. Designed for competitive programming contests with strict resource limits.',
    tags: ['Docker', 'Go', 'gRPC', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80'
  }
];

export const SKILLS: Skill[] = [
  { name: 'C++', icon: '🚀', category: 'backend' },
  { name: 'Algorithms', icon: '🧠', category: 'other' },
  { name: 'System Design', icon: '🏗️', category: 'other' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'TypeScript', icon: '📘', category: 'frontend' },
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'Graph Theory', icon: '🕸️', category: 'other' },
  { name: 'Problem Solving', icon: '🧩', category: 'other' }
];

export const USER_INFO = {
  name: 'Redwan',
  fullName: 'Asraful Islam Redwan',
  title: 'Competitive Programmer & Aspiring Software Engineer',
  about: 'I am a problem solver at heart. My journey started with Competitive Programming, where I learned to optimize algorithms for extreme constraints. Now, I am applying that same rigor to building scalable software systems that solve real-world problems.',
  cpStats: {
    codeforces: 'Newbie',
    leetCode: 'Contestant',
    problemsSolved: 'Developing...',
    rating: '0'
  },
  location: 'Dhaka, Bangladesh',
  email: 'inbox.air01@gmail.com',
  whatsapp: '01345156553',
  github: 'https://github.com/redwan',
  linkedin: 'https://linkedin.com/in/redwan'
};
