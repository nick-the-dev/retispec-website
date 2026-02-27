FROM node:22-alpine AS build
WORKDIR /app

# Install build dependencies for native modules (sharp/libvips)
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    git \
    python3

COPY apps/cms/package.json apps/cms/package-lock.json ./
RUN npm ci

COPY apps/cms/ .
ENV NODE_ENV=production
RUN npm run build

# ---
FROM node:22-alpine AS runner
WORKDIR /app

# Runtime dependencies for sharp/libvips
RUN apk add --no-cache vips-dev

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/favicon.png ./
COPY --from=build /app/public ./public
COPY --from=build /app/config ./config
COPY --from=build /app/src ./src
COPY --from=build /app/database ./database
COPY --from=build /app/tsconfig.json ./

EXPOSE 1337
CMD ["npm", "run", "start"]
