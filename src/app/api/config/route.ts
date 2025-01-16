import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'config.json');

// 获取配置
export async function GET() {
  try {
    const config = await fs.readFile(CONFIG_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(config));
  } catch (error) {
    console.error('Failed to read config:', error);
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