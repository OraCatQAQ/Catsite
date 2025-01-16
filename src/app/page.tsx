'use client';

import { sites } from '@/data/sites';
import BingBackground from '@/components/BingBackground';
import ProfileSection from '@/components/ProfileSection';
import { useEffect, useState, useRef } from 'react';
import SiteCard from '@/components/SiteCard';

export default function Home() {
  const [isFixed, setIsFixed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollPosition = window.scrollY;
      const contentTop = contentRef.current.offsetTop;
      
      // 只有当滚动超过内容区域顶部时才固定
      setIsFixed(scrollPosition >= contentTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Bing背景 */}
      <BingBackground />

      {/* 欢迎部分 */}
      <section className="relative flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-6xl font-bold text-white">Welcome!</h1>
        <p className="text-xl text-white">欢迎来到我的站点</p>
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
              <p className="mt-4 text-lg text-white/80">
                猫猫的站点、项目、和正在做的事情
              </p>
            </div>

            {/* 搜索框 */}
            <div className="relative mb-12">
              <input
                type="text"
                placeholder="搜索站点..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-lg text-white backdrop-blur-sm transition-all duration-300 placeholder:text-white/50 focus:border-white/30 focus:bg-white/20 focus:outline-none"
              />
            </div>

            {/* 分类区域 */}
            <div className="space-y-12">
              {/* 公益站点 */}
              <section>
                <h2 className="mb-6 text-2xl font-bold text-white">🌟 公益站点</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sites
                    .filter(site => site.category === 'public')
                    .map(site => (
                      <SiteCard key={site.id} site={site} />
                    ))}
                </div>
              </section>

              {/* 个人项目 */}
              <section>
                <h2 className="mb-6 text-2xl font-bold text-white">🚀 个人项目</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sites
                    .filter(site => site.category === 'personal')
                    .map(site => (
                      <SiteCard key={site.id} site={site} />
                    ))}
                </div>
              </section>

              {/* 开发中 */}
              <section>
                <h2 className="mb-6 text-2xl font-bold text-white">🔧 最近在做</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sites
                    .filter(site => site.category === 'dev')
                    .map(site => (
                      <SiteCard key={site.id} site={site} />
                    ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
