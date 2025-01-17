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
# 创建项目目录
mkdir ~/catsite
cd ~/catsite

# 创建数据目录并设置权限
mkdir -p data public/uploads
chmod -R 777 data public/uploads

# 启动容器（首次启动会使用默认配置）
docker run -d \
  --name catsite \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/public/uploads:/app/public/uploads \
  570768706/catsite:latest
```

访问地址：
- 主站：http://localhost:3000
- 后台管理：http://localhost:3000/admin （默认密码：123456）

### 方法二：手动构建

1. 克隆仓库
```bash
git clone https://github.com/OraCatQAQ/catsite.git
cd catsite
```

2. 使用 Docker Compose 部署
```bash
docker-compose up -d
```

## 配置说明

所有配置都存储在 `data/config.json` 文件中：

- 个人信息：头像、名称、介绍、社交链接等
- 站点设置：网站标题、描述、favicon 等
- 欢迎设置：欢迎标题和描述

## 技术栈

- Next.js 14
- Tailwind CSS
- TypeScript
- Docker

## License

MIT

