
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
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  labels: string[]; // e.g., ['Official', 'PDF']
  fileUrl: string;
  fileType: string;
}
