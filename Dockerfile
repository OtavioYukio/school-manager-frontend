FROM nginx:alpine

COPY view /usr/share/nginx/html
COPY src /usr/share/nginx/html/src
COPY public /usr/share/nginx/html/public

# Exponha a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]  