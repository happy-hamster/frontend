### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY /SAKPaaS/package.json ./
RUN npm install
COPY /SAKPaaS/. .
RUN npm run build:prod
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/SAKPaaS /usr/share/nginx/html
