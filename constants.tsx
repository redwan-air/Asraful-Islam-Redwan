
import { Project, Skill, GalleryItem, DocumentItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AlgoFlow Visualizer',
    description: 'A high-performance algorithm simulation engine. Visualizes dynamic programming transitions and complex graph traversals with sub-millisecond precision.',
    tags: ['C++', 'Algorithms', 'Logic'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Codeforces Analytics',
    description: 'A tool for competitive programmers to analyze their rating trajectories and problem difficulty distribution using optimized data processing.',
    tags: ['C++', 'Data Structures'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'C++ Sandbox Judge',
    description: 'A local sandbox system for safely executing code logic. Designed for competitive programming practice with strict resource limits.',
    tags: ['C++', 'Systems'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80'
  }
];

export const SKILLS: Skill[] = [
  { name: 'C++', icon: '🚀', category: 'backend' },
  { name: 'Algorithms', icon: '🧠', category: 'other' },
  { name: 'Graph Theory', icon: '🕸️', category: 'other' },
  { name: 'Problem Solving', icon: '🧩', category: 'other' },
  { name: 'Data Structures', icon: '📊', category: 'other' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-logo',
    title: 'Official Logo',
    description: 'This is the official logo of Asraful Islam Redwan',
    dateTime: '2026-02-02 17:52',
    label: 'Official',
    imageUrl: 'https://i.postimg.cc/HkYKGYnb/logo.png'
  }
];

export const DOCUMENT_ITEMS: DocumentItem[] = [];

export const USER_INFO = {
  name: 'Redwan',
  fullName: 'Asraful Islam Redwan',
  title: 'Competitive Programmer & Student',
  about: 'I am a problem solver at heart. Currently focused on mastering C++ and Competitive Programming. I believe in the elegance of logic and the power of efficient code.',
  education: 'Govt. Madan Mohan College | 2025-NOW | Intermediate',
  cpStats: {
    codeforces: 'Newbie',
    leetCode: 'Contestant',
    problemsSolved: 'Developing...',
    rating: '0'
  },
  location: 'Sylhet, Bangladesh',
  email: 'inbox.air01@gmail.com',
  whatsapp: '01345156553',
  github: 'https://github.com/redwan',
  linkedin: 'https://linkedin.com/in/redwan',
  version: '1.02.0'
};
