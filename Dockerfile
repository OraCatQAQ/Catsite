# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 创建 data 目录并设置权限
RUN mkdir -p /app/data /app/public/uploads && \
    chown -R node:node /app && \
    chmod 755 /app/data /app/public/uploads

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 创建默认配置文件
RUN echo '{"profile":{"name":"猫猫","avatar":"/avatar.jpg","description":"一只猫猫","social":{"github":"https://github.com","qq":"","wechat":""}},"settings":{"title":"猫猫的个人导航","description":"个人导航","favicon":"/favicon.ico","adminPassword":"123456"},"welcome":{"title":"Welcome!","description":"欢迎来到我的站点"},"categories":[{"id":"public","name":"公益站点","icon":"🌟","description":"公益性质的站点"},{"id":"personal","name":"个人项目","icon":"🚀","description":"个人开发的项目"}],"sites":[{"id":"1","title":"示例站点","description":"这是一个示例站点","url":"https://example.com","icon":"🌟","category":"public"}]}' > /app/data/config.json

# 设置用户
USER node

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 