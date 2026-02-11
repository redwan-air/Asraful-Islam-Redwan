
export type Visibility = 'public' | 'private';

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

export interface UserProfile {
  id: string;
  customId: string;
  email: string;
  accessKey: string;
  role: 'admin' | 'user';
  grantedResources: string[]; // List of IDs they can see
}
