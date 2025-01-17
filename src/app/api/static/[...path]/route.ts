import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'uploads', ...params.path);
    const file = await fs.readFile(filePath);
    
    // 获取文件扩展名
    const ext = path.extname(filePath).toLowerCase();
    
    // 设置适当的 Content-Type
    let contentType = 'application/octet-stream';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    if (ext === '.gif') contentType = 'image/gif';
    if (ext === '.webp') contentType = 'image/webp';
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Failed to serve file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
} 