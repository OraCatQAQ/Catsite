'use client';

import { useEffect, useState } from 'react';

interface BingImage {
  url: string;
  copyright: string;
  title: string;
}

export default function BingBackground() {
  const [image, setImage] = useState<BingImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blurAmount, setBlurAmount] = useState(0);

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

    // 监听滚动事件
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // 当滚动超过一屏高度时开始增加模糊效果
      const blur = Math.min(Math.max(scrollPosition - windowHeight/2, 0) / windowHeight * 10, 10);
      setBlurAmount(blur);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      mounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* 背景图 */}
      <div className="fixed inset-0 -z-10">
        {image && (
          <img
            src={image.url}
            alt={image.title}
            style={{ filter: `blur(${blurAmount}px)` }}
            className={`h-full w-full object-cover transition-all duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
      </div>
      
      {/* 图片信息 */}
      {image && !isLoading && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="group relative rounded-lg bg-white/10 p-3 text-xs text-white backdrop-blur-sm transition-all hover:bg-white/20">
            <p className="font-medium">{image.title}</p>
            <p className="mt-1 text-xs opacity-80">{image.copyright}</p>
          </div>
        </div>
      )}
    </>
  );
} 