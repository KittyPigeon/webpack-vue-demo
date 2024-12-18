FROM nginx
MAINTAINER 1609401009@qq.com
ADD dist/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/nginx.conf
RUN echo 'echo init ok!'
