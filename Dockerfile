# syntax=docker/dockerfile:1
# Dockerfile — production image for the site.
#
# Stage 1 builds code/site with Vite; stage 2 serves that build with nginx.
# The web root must receive code/site/dist. Copying the repo root instead is
# what left nginx serving its stock welcome page: the repo root has no
# index.html, so the base image's own index.html was never overwritten.

# =============================================================================
# Stage 1: Build
# Installs from the workspace root, then builds the site package.
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY code/site/package.json code/site/package.json

RUN npm ci -w code/site

COPY code/site/ code/site/

RUN npm run build -w code/site

# =============================================================================
# Stage 2: Production
# Serves the static build via nginx on port 8080 as an unprivileged user.
# =============================================================================
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Unprivileged runtime: relocate the pid file out of /run, clear the stock
# html so none of it can survive, and hand ownership to the runtime user.
RUN addgroup -S appgroup \
    && adduser -S -G appgroup -H -s /sbin/nologin appuser \
    && mkdir -p /var/cache/nginx /var/log/nginx /tmp/nginx \
    && sed -i 's|/run/nginx.pid|/tmp/nginx/nginx.pid|' /etc/nginx/nginx.conf \
    && rm -rf /usr/share/nginx/html/* \
    && chown -R appuser:appgroup \
        /var/cache/nginx /var/log/nginx /tmp/nginx \
        /usr/share/nginx/html /etc/nginx/conf.d

COPY --chown=appuser:appgroup --from=builder /app/code/site/dist /usr/share/nginx/html

USER appuser
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
