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

1. 首次部署：
```bash
# 创建数据目录
mkdir data
# 下载示例配置文件
curl -o data/config.json https://raw.githubusercontent.com/OraCatQAQ/catsite/main/data/config.json
# 启动容器
docker run -d \
  --name catsite \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  570768706/catsite:latest
```

2. 更新应用：
```bash
# 拉取最新镜像
docker pull 570768706/catsite:latest
# 停止并删除旧容器（配置文件会保留）
docker stop catsite
docker rm catsite
# 使用相同的配置启动新容器
docker run -d \
  --name catsite \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  570768706/catsite:latest
```

### 方法二：使用 docker-compose

1. 下载 docker-compose.yml：
```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/OraCatQAQ/catsite/main/docker-compose.yml
```

2. 创建数据目录并下载配置文件：
```bash
mkdir data
curl -o data/config.json https://raw.githubusercontent.com/OraCatQAQ/catsite/main/data/config.json
```

3. 启动服务：
```bash
docker-compose up -d
```

4. 更新应用：
```bash
docker-compose pull
docker-compose down
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
- Tailwind CSS
- TypeScript
- Docker

