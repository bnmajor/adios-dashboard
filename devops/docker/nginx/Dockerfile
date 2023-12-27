FROM node:16 as build
COPY ./client /client
RUN cd /client && npm && npm run build

FROM nginx
COPY ./devops/docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /client/dist/ /etc/nginx/html/
