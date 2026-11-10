export type Visibility = 'public' | 'private';
export type PageId = 'home' | 'about' | 'projects' | 'articles';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}
