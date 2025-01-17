# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 创建数据和上传目录
RUN mkdir -p /app/data /app/public/uploads && \
    chmod -R 777 /app/data /app/public/uploads

# 构建应用
RUN npm run build

# 生产阶段
FROM node:18-alpine
WORKDIR /app

# 创建必要的目录并设置权限
RUN mkdir -p /app/data /app/public/uploads && \
    chmod -R 777 /app/data /app/public/uploads

# 从构建阶段复制文件
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# 创建默认配置
RUN echo '{"profile":{"name":"猫猫","avatar":"/avatar.jpg","description":"一只猫猫","social":{"github":"https://github.com","qq":"","wechat":""}},"settings":{"title":"猫猫的个人导航","description":"个人导航","favicon":"/favicon.ico","adminPassword":"123456"},"welcome":{"title":"Welcome!","description":"欢迎来到我的站点"},"categories":[{"id":"public","name":"公益站点","icon":"🌟","description":"公益性质的站点"},{"id":"personal","name":"个人项目","icon":"🚀","description":"个人开发的项目"}],"sites":[{"id":"1","title":"示例站点","description":"这是一个示例站点","url":"https://example.com","icon":"🌟","category":"public"}]}' > /app/data/config.json

# 安装生产依赖
RUN npm install --production

# 设置用户权限
RUN chown -R node:node /app
USER node

# 启动应用
CMD ["npm", "start"] 