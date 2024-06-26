# Make sure to build this image using the root context, not "web" context
FROM node:20-alpine AS base

WORKDIR /rex
RUN npm i -g pnpm@latest
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY sdk/package.json ./sdk/
COPY web/package.json ./web/

FROM base AS builder

RUN pnpm install --frozen-lockfile

WORKDIR /rex/sdk
COPY sdk/tsconfig.json ./
COPY sdk/src src
RUN pnpm build:ci

WORKDIR /rex/web
COPY web/postcss.config.js web/tailwind.config.ts web/tsconfig.json web/vite.config.ts ./
COPY web/public public
COPY web/app app
RUN pnpm build

FROM base AS server

RUN pnpm install --prod --frozen-lockfile

WORKDIR /rex
COPY --from=builder /rex/sdk/dist sdk/dist
COPY --from=builder /rex/web/build web/build
COPY --from=builder /rex/web/public web/public

WORKDIR /rex/web
CMD pnpm start
