'use client';

import { FaGithub, FaQq, FaWeixin } from 'react-icons/fa';
import Image from 'next/image';

export default function ProfileSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* 头像和社交链接 */}
      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
        <div className="mb-6 flex justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-white/20">
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <h2 className="mb-4 text-center text-2xl font-bold text-white">orzCat</h2>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-white/80 transition-colors hover:text-white"
          >
            <FaGithub />
          </a>
          <button
            onClick={() => {/* 显示QQ信息 */}}
            className="text-2xl text-white/80 transition-colors hover:text-white"
          >
            <FaQq />
          </button>
          <button
            onClick={() => {/* 显示微信二维码 */}}
            className="text-2xl text-white/80 transition-colors hover:text-white"
          >
            <FaWeixin />
          </button>
        </div>
      </div>

      {/* 个人介绍 */}
      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
        <h3 className="mb-4 text-xl font-bold text-white">关于我</h3>
        <p className="text-white/80">
          orzcat，一只只会睡大觉的猫猫OWO~
        </p>
      </div>
    </div>
  );
} 