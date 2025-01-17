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

# 创建 data 目录
RUN mkdir -p /app/data

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 复制初始配置文件（如果存在）
COPY --from=builder /app/data/config.json ./data/config.json || true

# 设置权限
RUN chown -R node:node /app

# 使用非 root 用户
USER node

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 