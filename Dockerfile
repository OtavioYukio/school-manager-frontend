FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY view /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]