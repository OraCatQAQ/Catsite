import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'config.json');
const SITES_PATH = path.join(process.cwd(), 'src', 'data', 'sites.ts');

// 获取配置
export async function GET() {
  try {
    const config = await fs.readFile(CONFIG_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(config));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

// 更新配置
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 保存配置文件
    await fs.writeFile(CONFIG_PATH, JSON.stringify(data, null, 2));
    
    // 如果包含站点数据，更新 sites.ts
    if (data.sites) {
      const sitesContent = `import { Site } from '../types/site';\n\nexport const sites: Site[] = ${JSON.stringify(data.sites, null, 2)};`;
      await fs.writeFile(SITES_PATH, sitesContent);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
} 