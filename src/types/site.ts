export interface Site {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string;
  tags?: string[];
  preview?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
} 