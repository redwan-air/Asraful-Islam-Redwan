
import { Project, Skill, GalleryItem, DocumentItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p-signalsynth',
    title: 'SignalSynth',
    description: 'An AI-powered product research and feedback intelligence platform under Unfoundid. It transforms customer feedback and interview transcripts into meaningful themes, evidence-backed insights, and better product decisions, with a focus on data privacy.',
    tags: ['AI/ML', 'Product Intelligence', 'UX Research', 'Data Privacy'],
    imageUrl: '/signalsynth0.png',
    link: 'https://signalsynth.onrender.com'
  },
  {
    id: 'p-unfoundscape',
    title: 'Unfoundscape',
    description: 'A privacy-first offline document and developer utility suite under Unfoundid. Engineered with a zero-upload architecture using WebAssembly, it provides 40+ high-performance tools for PDF manipulation, image processing, and text encoding, ensuring absolute user data privacy.',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'WebAssembly', 'PWA'],
    imageUrl: '/unfoundscape0.png',
    link: 'https://www.unfoundscape.cyou'
  }
];

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
  title: 'Programmer & Independent Builder',
  about:
    'I explore technology by building things. My interests include software development, web technologies, and digital products. I learn through experimentation, solving practical problems, and turning ideas into working solutions.',
  education: 'Govt. Madan Mohan College | 2025-Present',
  cpStats: {
    codeforces: '386',
    leetCode: 'Contestant',
    problemsSolved: 'Developing...',
    rating: '0'
  },
  location: 'Sylhet, Bangladesh',
  email: 'inbox.air01@gmail.com',
  whatsapp: '01345156553',
  github: 'https://github.com/air-redwan',
  linkedin: 'https://www.linkedin.com/in/asraful-islam-redwan-076b5742b',
  codeforces: 'redwan.code',
  version: '2.5.0'
};

export const METADATA_CONFIG = {
  home: {
    title: 'Asraful Islam Redwan | Programmer & Builder',
    description:
      'Official portfolio of Asraful Islam Redwan, a programmer and independent builder exploring software development, web technologies, and digital products.'
  },
  about: {
    title: 'About Asraful Islam Redwan | Programmer & Builder',
    description:
      'Learn about Asraful Islam Redwan, his approach to technology, development journey, and work building digital products.'
  },
  projects: {
    title: 'Projects | Asraful Islam Redwan',
    description:
      'Explore software projects and technology experiments by Asraful Islam Redwan.'
  },
  skills: {
    title: 'Technical Skills | Asraful Islam Redwan',
    description:
      'Explore the programming languages, technical skills, and problem-solving interests of Asraful Islam Redwan.'
  },
  gallery: {
    title: 'Gallery | Asraful Islam Redwan',
    description:
      'Explore selected visual work and official assets of Asraful Islam Redwan.'
  },
  documents: {
    title: 'Documents | Asraful Islam Redwan',
    description:
      'Explore publicly available documents and resources by Asraful Islam Redwan.'
  },
  achievements: {
    title: 'Achievements | Asraful Islam Redwan',
    description:
      'Explore achievements and milestones of Asraful Islam Redwan.'
  },
  articles: {
    title: 'Articles | Asraful Islam Redwan',
    description:
      'Read articles and thoughts by Asraful Islam Redwan.'
  },
  contact: {
    title: 'Contact Asraful Islam Redwan',
    description:
      'Contact Asraful Islam Redwan through his official portfolio.'
  }
};
