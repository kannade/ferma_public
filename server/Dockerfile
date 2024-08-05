# dev
FROM node:22.5.1-alpine3.20 AS dev
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules

WORKDIR /opt/server/
COPY ./package.json ./
RUN ["npm", "i", "--legacy-peer-deps"]

# production
FROM node:22.5.1-alpine3.20 AS production
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules

WORKDIR /opt/server/

COPY ./package.json ./
RUN ["npm", "i", "--legacy-peer-deps"]
COPY . .
RUN ["npm", "run", "build"]
RUN ["cp", "-r", "src/env/", "dist/src/"]