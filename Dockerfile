# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 创建 data 目录
RUN mkdir -p /app/data

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 复制初始配置文件（如果存在）
COPY --from=builder /app/data/config.json ./data/config.json

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 创建启动脚本
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'chown -R node:node /app/data' >> /app/start.sh && \
    echo 'su-exec node node server.js' >> /app/start.sh && \
    chmod +x /app/start.sh

# 安装 su-exec
RUN apk add --no-cache su-exec

CMD ["/app/start.sh"] 