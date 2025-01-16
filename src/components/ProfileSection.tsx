'use client';

import { FaGithub, FaQq, FaWeixin } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  };
}

export default function ProfileSection() {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
      })
      .catch(error => {
        console.error('Failed to load config:', error);
      });
  }, []);

  if (!config) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 头像和社交链接 */}
      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
        <div className="mb-6 flex justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-white/20">
            <Image
              src={config.profile.avatar}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <h2 className="mb-4 text-center text-2xl font-bold text-white">{config.profile.name}</h2>
        <div className="flex justify-center gap-4">
          {config.profile.social.github && (
            <a
              href={config.profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white/80 transition-colors hover:text-white"
            >
              <FaGithub />
            </a>
          )}
          {config.profile.social.qq && (
            <button
              onClick={() => alert(`QQ: ${config.profile.social.qq}`)}
              className="text-2xl text-white/80 transition-colors hover:text-white"
            >
              <FaQq />
            </button>
          )}
          {config.profile.social.wechat && (
            <button
              onClick={() => alert('请扫描微信二维码')}
              className="text-2xl text-white/80 transition-colors hover:text-white"
            >
              <FaWeixin />
            </button>
          )}
        </div>
      </div>

      {/* 个人介绍 */}
      <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
        <h3 className="mb-4 text-xl font-bold text-white">关于我</h3>
        <p className="text-white/80">
          {config.profile.description}
        </p>
      </div>
    </div>
  );
} 