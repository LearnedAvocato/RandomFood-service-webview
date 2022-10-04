# build environment
FROM node:18-alpine as builder
RUN mkdir /app

COPY . /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS --openssl-legacy-provider
COPY package.json /app/package.json
RUN npm install --loglevel verbose
#RUN npm install react-scripts@5.0.1 -g --silent

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
