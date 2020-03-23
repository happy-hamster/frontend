# Use node 12.7 for building
FROM node:12.7-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Install needed node packages
COPY /SAKPaaS/package.json ./
RUN npm install

# Copy source code
COPY /SAKPaaS/. .
# Compile source code
RUN npm run build:prod


# Serve application via nginx
FROM nginx:alpine

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# Copy build
COPY --from=build /usr/src/app/dist/SAKPaaS /usr/share/nginx/html
