import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 确保上传目录存在，并设置权限
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true, mode: 0o777 });
    }

    // 生成文件名
    const ext = path.extname(file.name);
    const filename = `${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    // 写入文件并设置权限
    await fs.writeFile(filepath, buffer, { mode: 0o666 });

    // 返回可访问的URL路径
    return NextResponse.json({ 
      url: `/uploads/${filename}`,
      success: true 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    );
  }
}

// 配置接收的文件大小限制
export const config = {
  api: {
    bodyParser: false,
  },
}; 