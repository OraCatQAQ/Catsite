import { Site } from '../types/site';

export const sites: Site[] = [
  // 公益站点
  {
    id: 'public-1',
    title: '公益API',
    description: '通过逆向自购等方式提供公益API',
    url: 'https://api.orzcat.xyz',
    category: 'public',
    icon: '📚',
    tags: ['公益', 'API'],
    preview: '/previews/api-site.png'
  },
  {
    id: 'public-2',
    title: 'Open-webui',
    description: '公益的AI站点，对接自己的API站，稳定自用',
    url: 'https://ui.orzcat.xyz',
    category: 'public',
    icon: '🎓',
    tags: ['公益', 'open-webui'],
    preview: '/previews/webui-site.png'
  },
  {
    id: 'public-3',
    title: 'blinko',
    description: '碎片化ai笔记站点，暂时没开放注册',
    url: 'https://note.orzcat.xyz',
    category: 'public',
    icon: '🎓',
    tags: ['note', 'blinko'],
    preview: '/previews/note-site.png'
  },

  // 个人项目
  {
    id: 'personal-1',
    title: '个人博客',
    description: '分享技术文章和个人经验',
    url: 'https://example.com/blog',
    category: 'personal',
    icon: '✍️',
    tags: ['博客', '技术'],
    preview: '/previews/blog-site.png'
  },
  {
    id: 'personal-2',
    title: '项目展示',
    description: '展示个人开发的项目作品',
    url: 'https://example.com/projects',
    category: 'personal',
    icon: '🎨',
    tags: ['项目', '作品集'],
    preview: '/previews/projects-site.png'
  },

  // 开发中项目
  {
    id: 'dev-1',
    title: '工具集合',
    description: '正在开发的在线工具集合',
    url: 'https://example.com/tools',
    category: 'dev',
    icon: '🛠️',
    tags: ['开发中', '工具'],
    preview: '/previews/tools-site.png'
  },
  {
    id: 'dev-2',
    title: 'AI 助手',
    description: '智能对话和辅助工具',
    url: 'https://example.com/ai',
    category: 'dev',
    icon: '🤖',
    tags: ['开发中', 'AI'],
    preview: '/previews/ai-site.png'
  },
]; 