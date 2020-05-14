FROM nginx:latest

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/conf_d /etc/nginx/conf.d

RUN mkdir -p /www/data
COPY code /www/data

CMD ["nginx", "-g", "daemon off;"]