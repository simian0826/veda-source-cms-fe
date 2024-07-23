FROM swr.cn-north-4.myhuaweicloud.com/swr-dms-public/nginx:1.22.1-tools

LABEL maintainer=Deloitte-Team

# timezone
# RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# copy dist onto image
COPY ./default.conf /etc/nginx/conf.d/
COPY ./dist /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]