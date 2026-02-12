
export type Visibility = 'public' | 'private';
export type PageId = 'home' | 'about' | 'projects' | 'skills' | 'gallery' | 'documents' | 'contact';

// Fix: Added missing UserProfile interface used for authentication and account states
export interface UserProfile {
  id: string;
  full_name: string | null;
  role: 'admin' | 'user';
  avatar_url?: string;
  custom_id?: string;
  access_key?: string;
  granted_resources?: string[];
}

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

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  label: 'Official' | 'Unofficial';
  imageUrl: string;
  visibility: Visibility;
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  labels: string[]; // e.g., ['Official', 'PDF']
  fileUrl: string;
  fileType: string;
  visibility: Visibility;
}
