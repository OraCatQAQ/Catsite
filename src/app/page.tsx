'use client';

import BingBackground from '@/components/BingBackground';
import ProfileSection from '@/components/ProfileSection';
import { useEffect, useState, useRef } from 'react';
import SiteCard from '@/components/SiteCard';

interface Site {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  preview: string;
  category: 'public' | 'personal' | 'dev';
  tags: string[];
}

interface Config {
  profile: {
    name: string;
    description: string;
    avatar: string;
    social: {
      github: string;
      qq: string;
      wechat: string;
    };
  };
  settings: {
    title: string;
    description: string;
    favicon: string;
  };
  welcome: {
    title: string;
    description: string;
  };
  sites: Site[];
  categories: {
    id: string;
    name: string;
    icon: string;
  }[];
}

export default function Home() {
  const [isFixed, setIsFixed] = useState(false);
  const [config, setConfig] = useState<Config | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 加载配置
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
      })
      .catch(error => {
        console.error('Failed to load config:', error);
      });

    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollPosition = window.scrollY;
      const contentTop = contentRef.current.offsetTop;
      
      setIsFixed(scrollPosition >= contentTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!config) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {/* Bing背景 */}
      <BingBackground />

      {/* 欢迎部分 */}
      <section className="relative flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-6xl font-bold text-white">{config.welcome.title}</h1>
        <p className="text-xl text-white">{config.welcome.description}</p>
      </section>

      {/* 内容区域 */}
      <div ref={contentRef} className="relative mx-auto max-w-[1600px] px-8 pb-20">
        <div className="flex flex-row">
          {/* 左侧个人信息容器 */}
          <div className="w-72 flex-none">
            {/* 占位元素，保持布局 */}
            <div className="w-full opacity-0">
              <ProfileSection />
            </div>
            {/* 实际内容 */}
            <div
              className={`w-72 transition-[top] duration-300 ${
                isFixed ? 'fixed left-8 top-8' : 'absolute left-0 top-0'
              }`}
            >
              <ProfileSection />
            </div>
          </div>

          {/* 右侧导航内容 */}
          <main className="ml-8 flex-1">
            {/* 头部区域 */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-white">导航</h2>
            </div>

            {/* 分类区域 */}
            <div className="space-y-12">
              {config.categories.map(category => (
                <section key={category.id}>
                  <h2 className="mb-6 text-2xl font-bold text-white">
                    {category.icon} {category.name}
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {config.sites
                      .filter(site => site.category === category.id)
                      .map(site => (
                        <SiteCard key={site.id} site={site} />
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
