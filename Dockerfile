# build environment
FROM node:lts-alpine as builder

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS --openssl-legacy-provider

COPY package*.json /app/
RUN npm config set cache /root/.npm
RUN npm ci

COPY . /app
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
