export async function GET() {
  try {
    const response = await fetch(
      'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN'
    );
    const data = await response.json();
    const image = data.images[0];
    
    // 构建完整的高清图片URL
    const baseUrl = 'https://www.bing.com';
    const imageUrl = `${baseUrl}${image.url.replace('&pid=hp', '')}&w=1920&h=1080`;
    
    return Response.json({
      url: imageUrl,
      copyright: image.copyright,
      title: image.title,
    });
  } catch (error) {
    console.error('Failed to fetch Bing image:', error);
    return Response.json(
      { error: 'Failed to fetch Bing image' },
      { status: 500 }
    );
  }
} 