FROM nginx:latest

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/conf_d /etc/nginx/conf.d

RUN mkdir -p /data/www
COPY code /data/www

CMD ["nginx", "-g", "daemon off;"]