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
COPY sdk/tsconfig.json sdk/react.d.ts sdk/react.js ./
COPY sdk/src src
RUN pnpm build:ci

WORKDIR /rex/web
COPY web/postcss.config.js web/tailwind.config.ts web/tsconfig.json web/vite.config.ts web/index.html ./
COPY web/public public
COPY web/src src
RUN pnpm build

FROM base AS server
RUN npm i -g serve

WORKDIR /rex
COPY --from=builder /rex/sdk/dist sdk/dist

WORKDIR /rex/web
COPY --from=builder /rex/web/dist dist
COPY --from=builder /rex/web/public public

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:3000"]
