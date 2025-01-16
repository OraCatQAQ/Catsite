#!/bin/bash

# 拉取最新镜像
docker pull oracatqaq/catsite:latest

# 停止并删除旧容器（如果存在）
docker-compose down

# 启动新容器
docker-compose up -d

echo "部署完成！" 