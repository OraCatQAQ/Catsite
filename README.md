# CatSite - 个人导航站点

一个美观的个人导航网站，带有后台管理系统。使用 Next.js 14 + Tailwind CSS 构建，支持响应式设计。

## 特性

- 🎨 现代化的UI设计
- 🌈 每日必应壁纸作为背景
- 📱 完全响应式设计
- ⚡️ 快速的页面加载和导航
- 🛠️ 完整的后台管理系统
- 🔐 安全的密码保护
- 🎯 分类管理和站点管理
- 📝 可自定义的个人信息

## 部署说明

### 方法一：一键部署（推荐）

```bash
docker run -d \
  --name catsite \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  570768706/catsite:latest
```

### 方法二：手动构建

1. 克隆仓库并构建
```bash
git clone https://github.com/OraCatQAQ/CatSite.git
cd CatSite
docker build -t catsite .
docker run -d \
  --name catsite \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  catsite
```

### 使用 docker-compose

创建 `docker-compose.yml` 文件：
```yaml
version: '3'
services:
  catsite:
    image: 570768706/catsite:latest
    container_name: catsite
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

运行：
```bash
docker-compose up -d
```

## 配置说明

所有配置都存储在 `data/config.json` 文件中，包括：

- 个人信息（头像、名称、描述、社交链接）
- 站点设置（标题、描述、图标）
- 欢迎语设置
- 分类和导航站点数据

访问地址：`http://localhost:3000`
后台管理：`http://localhost:3000/admin`
默认密码：`123456`

## 技术栈

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Docker

