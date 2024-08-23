# # 基础镜像
# FROM  node:22-alpine AS base

# # 安装依赖阶段
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # 复制依赖文件
# COPY package.json pnpm-lock.yaml ./

# # 安装 pnpm
# RUN npm install -g pnpm

# # 安装依赖
# RUN pnpm install

# # 构建阶段
# FROM base AS builder
# WORKDIR /app

# # 复制 node_modules
# COPY --from=deps /app/node_modules ./node_modules

# # 复制应用代码
# COPY . .

# RUN npm install -g pnpm

# # 构建应用
# RUN pnpm run build

# # 运行时阶段
# FROM base AS runner
# WORKDIR /app

# # 设置环境变量
# ENV NODE_ENV=production
# ENV PORT=5555
# ENV HOSTNAME=0.0.0.0

# # 复制构建的文件
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# # 暴露端口
# EXPOSE 5555

# # 启动应用
# CMD ["node", "server.js"]

# 使用 BuildKit 进行多平台构建
# syntax=docker/dockerfile:1.2

# 基础镜像
FROM --platform=linux/amd64 node:22-alpine AS base

# 安装依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 构建阶段
FROM base AS builder
WORKDIR /app

# 复制 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制应用代码
COPY . .

RUN npm install -g pnpm

# 构建应用
RUN pnpm run build

# 运行时阶段
FROM base AS runner
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=5555
ENV HOSTNAME=0.0.0.0

# 复制构建的文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 暴露端口
EXPOSE 5555

# 启动应用
CMD ["node", "server.js"]
