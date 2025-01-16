import { Category, Site } from '@/types/site';
import SiteCard from './SiteCard';

interface CategorySectionProps {
  category: Category;
  sites: Site[];
}

export default function CategorySection({ category, sites }: CategorySectionProps) {
  const categorySites = sites.filter((site) => site.category === category.id);

  if (categorySites.length === 0) return null;

  return (
    <SiteCard site={sites[0]} />
  );
} 