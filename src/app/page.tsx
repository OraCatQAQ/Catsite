'use client';

import { sites } from '../../data/sites';
import BingBackground from '@/components/BingBackground';
import ProfileSection from '@/components/ProfileSection';

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

export default function Home() {
  return (
    <main className="min-h-screen">
      <BingBackground />
      <div className="flex gap-8 px-8 py-8">
        <ProfileSection />
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((site: Site) => (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-2 p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{site.icon}</span>
                  <h3 className="text-white font-medium">{site.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{site.description}</p>
                {site.tags && site.tags.length > 0 && (
                  <div className="flex gap-2 mt-auto">
                    {site.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
