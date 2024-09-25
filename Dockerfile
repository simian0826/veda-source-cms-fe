# # 使用 Node.js 作为基础镜像
# FROM node:lts-alpine as build-stage

# # 安装 pnpm
# RUN npm install -g pnpm

# # 设置工作目录
# WORKDIR /app

# # 复制 package.json 和 pnpm-lock.yaml 到容器中
# COPY package.json pnpm-lock.yaml  ./

# # 复制 preinstall 到容器中
# COPY scripts/preinstall.js  ./scripts/


# # 安装项目依赖
# RUN pnpm install

# # 复制源代码到容器中
# COPY . .
# 使用 Node.js 作为基础镜像
FROM node:lts-alpine as build-stage

# 安装 pnpm
# RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

COPY dist  ./dist
COPY default.conf ./

# 构建生产环境代码
# RUN npm run build

# 使用 nginx 作为基础镜像
FROM nginx:stable-alpine as production-stage

# 复制生成的静态文件到 nginx 的默认静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 根据需要进行 nginx 配置
# COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/nginx.conf
# 暴露容器的 80 端口
EXPOSE 80

# 运行 nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
