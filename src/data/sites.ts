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
    icon: '🧿',
    tags: ['note', 'blinko'],
    preview: '/previews/note-site.png'
  },

  // 个人项目
  {
    id: 'personal-1',
    title: 'cmd_write',
    description: '一个摸鱼小工具',
    url: 'https://github.com/OraCatQAQ/cmd_writer',
    category: 'personal',
    icon: '✍️',
    tags: ['github', '摸鱼'],
    // preview: '/previews/blog-site.png'
  },
  {
    id: 'personal-2',
    title: 'CatSite',
    description: '该站点源码，一个个人站点导航站',
    url: 'https://github.com/OraCatQAQ/CatSite',
    category: 'personal',
    icon: '🎨',
    tags: ['github', '导航站'],
    // preview: '/previews/projects-site.png'
  },

  // 最近在做
  {
    id: 'dev-1',
    title: 'Useful_AI',
    description: '准备搭建一个以实用为导向的知识库，欢迎贡献',
    url: 'https://k6hl7te86b.feishu.cn/wiki/space/7444116130671247364?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home',
    category: 'dev',
    icon: '🛠️',
    tags: ['飞书', '知识库'],
    // preview: '/previews/tools-site.png'
  },
  {
    id: 'dev-2',
    title: '心耀APP',
    description: '一个心理+宠物的APP，还在开发阶段',
    url: 'https://github.com/OraCatQAQ/xinyao_MVP',
    category: 'dev',
    icon: '🤖',
    tags: ['github', '心耀'],
    // preview: '/previews/ai-site.png'
  },
]; 