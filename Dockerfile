# Use node 12.7 for building
FROM node:12.7-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy source code
COPY /SAKPaaS/. .

# Install needed node packages
# https://stackoverflow.com/a/59685701
RUN npm ci
# Compile source code
RUN npm run build:prod


# Serve application via nginx
FROM nginx:alpine

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# Copy build
COPY --from=build /usr/src/app/dist/SAKPaaS /usr/share/nginx/html
