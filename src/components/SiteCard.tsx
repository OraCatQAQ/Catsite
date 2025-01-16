import { Site } from '@/types/site';
import { useState } from 'react';
import Link from 'next/link';

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      {/* 主卡片 */}
      <div
        onClick={() => setShowDetail(true)}
        className="group relative h-[280px] cursor-pointer overflow-hidden rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
      >
        {/* 标题 */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">{site.icon}</span>
          <h3 className="text-xl font-bold text-white">{site.title}</h3>
        </div>

        {/* 预览图 */}
        <div className="h-[180px] w-full overflow-hidden rounded-lg">
          {site.preview ? (
            <img src={site.preview} alt={site.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
              <span className="text-5xl opacity-50">{site.icon}</span>
            </div>
          )}
        </div>
      </div>

      {/* 详情弹窗 */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white/10 p-6 backdrop-blur-md">
            {/* 关闭按钮 */}
            <button
              onClick={() => setShowDetail(false)}
              className="absolute right-4 top-4 text-white/80 hover:text-white"
            >
              ✕
            </button>

            {/* 详情内容 */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">{site.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{site.title}</h3>
                <p className="mt-2 text-white/80">{site.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {site.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={site.url}
                  target="_blank"
                  className="mt-6 inline-block rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
                >
                  访问站点
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 