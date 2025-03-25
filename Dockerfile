FROM node:lts-alpine as build-stage
WORKDIR /app
COPY dist  ./dist
COPY default.conf ./

FROM nginx:stable-alpine as production-stage
# 创建 veda-source-cms 目录并复制文件到该目录下
RUN mkdir -p /usr/share/nginx/html/veda-source-cms
COPY --from=build-stage /app/dist /usr/share/nginx/html/veda-source-cms

# 复制 nginx 配置
COPY default.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]