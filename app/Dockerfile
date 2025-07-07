FROM node:24-alpine

ENV TZ=America/Mexico_City

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S userapp -u 1001

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN chown -R userapp:nodejs /app
USER userapp

RUN pnpm install

COPY . .