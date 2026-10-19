
import { Project, Skill, GalleryItem, DocumentItem } from './types';

export const PROJECTS: Project[] = [];

export const SKILLS: Skill[] = [
  { name: 'C++', icon: '🚀', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'Go', icon: '🐹', category: 'backend' },
  { name: 'Algorithms', icon: '🧠', category: 'other' },
  { name: 'Graph Theory', icon: '🕸️', category: 'other' },
  { name: 'Problem Solving', icon: '🧩', category: 'other' },
  { name: 'Data Structures', icon: '📊', category: 'other' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-logo',
    title: 'Official Logo',
    description: 'The official visual identity of Asraful Islam Redwan.',
    dateTime: '2026-02-12 10:00',
    label: 'Official',
    imageUrl: 'https://i.postimg.cc/HkYKGYnb/logo.png',
    visibility: 'public'
  }
];

export const DOCUMENT_ITEMS: DocumentItem[] = [
  {
    id: 'doc-private-1',
    title: 'Development Roadmap',
    description: 'Confidential strategic goals for the current academic year.',
    dateTime: '2026-02-01 12:00',
    labels: ['Official', 'Private'],
    fileUrl: '#',
    fileType: 'PDF',
    visibility: 'private'
  }
];

export const USER_INFO = {
  name: 'Redwan',
  fullName: 'Asraful Islam Redwan',
  title: 'Competitive Programmer & Student',
  about: 'Driven by logic and efficiency. Specializing in high-performance C++ systems and algorithmic optimization. Current mission: Mastering intermediate academic challenges while competing on a global stage.',
  education: 'Govt. Madan Mohan College | 2025-NOW',
  cpStats: {
    codeforces: '386',
    leetCode: 'Contestant',
    problemsSolved: 'Developing...',
    rating: '0'
  },
  location: 'Sylhet, BD',
  email: 'inbox.air01@gmail.com',
  whatsapp: '01345156553',
  github: 'https://github.com/redwan',
  linkedin: 'https://linkedin.com/in/redwan',
  codeforces: 'redwan.code',
  version: '2.5.0'
};

export const METADATA_CONFIG = {
  home: { title: 'Asraful Islam Redwan | Competitive Programmer', description: 'Personal website of Asraful Islam Redwan, a competitive programmer and coder.' },
  about: { title: 'About Asraful Islam Redwan', description: 'Learn more about Asraful Islam Redwan, his journey, and his passion for coding.' },
  projects: { title: 'Projects | Asraful Islam Redwan', description: 'Explore the projects built by Asraful Islam Redwan, including tools and technology experiments.' },
  skills: { title: 'Skills | Asraful Islam Redwan', description: 'Technical skills of Asraful Islam Redwan, including C++, Python, and more.' },
  gallery: { title: 'Gallery | Asraful Islam Redwan', description: 'Gallery showcasing visual assets and projects of Asraful Islam Redwan.' },
  documents: { title: 'Documents | Asraful Islam Redwan', description: 'Documents and resources shared by Asraful Islam Redwan.' },
  articles: { title: 'Articles | Asraful Islam Redwan', description: 'Read articles and insights by Asraful Islam Redwan, including "Journey Of Unfoundid".' },
  contact: { title: 'Contact | Asraful Islam Redwan', description: 'Get in touch with Asraful Islam Redwan.' }
};
