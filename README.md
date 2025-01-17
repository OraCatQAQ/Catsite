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
# 创建项目目录
mkdir ~/catsite
cd ~/catsite

# 创建数据目录
mkdir data
# 下载示例配置文件
curl -o data/config.json https://raw.githubusercontent.com/OraCatQAQ/catsite/main/data/config.json
```

2. 启动容器：
```bash
docker run -d \
  --name catsite \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  570768706/catsite:latest
```

3. 更新应用：
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

1. 创建专属目录并进入：
```bash
# 创建项目目录
mkdir ~/catsite
cd ~/catsite
```

2. 下载必要文件：
```bash
# 下载 docker-compose.yml
curl -o docker-compose.yml https://raw.githubusercontent.com/OraCatQAQ/catsite/main/docker-compose.yml

# 创建数据目录并下载配置文件
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

### 目录结构说明

推荐的目录结构：
```
~/catsite/              # 项目专属目录
  ├── data/            # 数据目录
  │   └── config.json  # 配置文件
  └── docker-compose.yml  # （如果使用方法二）
```

这样的目录结构有以下优点：
- 所有相关文件都在一个专属目录中，方便管理
- 避免与其他项目的数据目录混淆
- 方便备份整个应用的数据

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

