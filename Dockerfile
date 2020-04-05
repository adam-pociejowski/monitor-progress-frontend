FROM nginx:1.17.9
COPY ./dist/monitor-progress-frontend /usr/share/nginx/html
