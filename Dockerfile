FROM nginx:1.17.9
WORKDIR /usr/share/nginx/html
COPY ./dist/monitor-progress-frontend /usr/share/nginx/html
