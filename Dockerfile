FROM node:latest as builder

WORKDIR /react

COPY . .

RUN yarn

RUN yarn build

FROM nginx:latest

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /react/dist /usr/share/nginx/html

EXPOSE 5000

ENTRYPOINT [ "nginx", "-g","daemon off;" ]