interface Site {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  preview: string;
  category: string;
  tags: string[];
}

export const sites: Site[] = []; 