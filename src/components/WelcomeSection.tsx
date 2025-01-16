'use client';

import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';

interface BingImage {
  url: string;
  copyright: string;
  title: string;
}

export default function WelcomeSection() {
  const [image, setImage] = useState<BingImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchBingImage() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/bing-image');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        
        if (mounted) {
          setImage(data);
          // 预加载图片
          const img = new Image();
          img.onload = () => {
            if (mounted) {
              setIsLoading(false);
            }
          };
          img.src = data.url;
        }
      } catch (error) {
        console.error('Failed to fetch Bing image:', error);
        setIsLoading(false);
      }
    }

    fetchBingImage();

    return () => {
      mounted = false;
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.querySelector('#content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative h-screen w-full">
        {/* 背景图 */}
        <div className="absolute inset-0">
          {image && (
            <img
              src={image.url}
              alt={image.title}
              className={`h-full w-full object-cover transition-opacity duration-1000 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        </div>

        {/* 欢迎文字 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-4 text-6xl font-bold">Welcome!</h1>
          <p className="text-xl">欢迎来到我的站点</p>
        </div>

        {/* 向下滚动按钮 */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-white transition-colors hover:text-gray-200"
          aria-label="滚动到内容"
        >
          <IoIosArrowDown className="h-8 w-8" />
        </button>

        {/* 图片信息 */}
        {image && !isLoading && (
          <div className="absolute bottom-4 right-4 z-10">
            <div className="group relative rounded-lg bg-black/50 p-3 text-xs text-white backdrop-blur-sm transition-all hover:bg-black/60">
              <p className="font-medium">{image.title}</p>
              <p className="mt-1 text-xs opacity-80">{image.copyright}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 