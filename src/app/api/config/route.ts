import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'config.json');

// 获取配置
export async function GET() {
  try {
    console.log('Reading config from:', CONFIG_PATH);
    const config = await fs.readFile(CONFIG_PATH, 'utf-8');
    console.log('Config content:', config);
    return NextResponse.json(JSON.parse(config));
  } catch (error: any) {
    console.error('Failed to read config:', error);
    // 如果配置文件不存在，返回默认配置
    if (error.code === 'ENOENT') {
      const defaultConfig = {
        profile: {
          name: "猫猫",
          avatar: "/avatar.jpg",
          description: "一只猫猫",
          social: {
            github: "https://github.com",
            qq: "",
            wechat: ""
          }
        },
        settings: {
          title: "猫猫的个人导航",
          description: "个人导航",
          favicon: "/favicon.ico",
          adminPassword: "123456"
        },
        welcome: {
          title: "Welcome!",
          description: "欢迎来到我的站点"
        },
        categories: [
          {
            id: "public",
            name: "公益站点",
            icon: "🌟",
            description: "公益性质的站点"
          },
          {
            id: "personal",
            name: "个人项目",
            icon: "🚀",
            description: "个人开发的项目"
          }
        ],
        sites: [
          {
            id: "1",
            title: "示例站点",
            description: "这是一个示例站点",
            url: "https://example.com",
            icon: "🌟",
            preview: "",
            category: "public",
            tags: ["示例", "演示"]
          }
        ]
      };
      return NextResponse.json(defaultConfig);
    }
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

// 更新配置
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 确保目录存在
    const dir = path.dirname(CONFIG_PATH);
    await fs.mkdir(dir, { recursive: true });
    
    // 保存配置文件
    await fs.writeFile(CONFIG_PATH, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update config:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update config', 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
} 