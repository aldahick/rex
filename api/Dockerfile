# Make sure to build this image using the root context, not "api" context
FROM node:22-alpine AS base

WORKDIR /rex
RUN npm i -g pnpm@latest
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY sdk/package.json ./sdk/
COPY api/package.json ./api/

FROM base AS builder

RUN pnpm install --frozen-lockfile

WORKDIR /rex/sdk
COPY sdk/tsconfig.json sdk/react.d.ts sdk/react.js ./
COPY sdk/src src
RUN pnpm build:ci

WORKDIR /rex/api
COPY api/tsconfig.json ./
COPY api/src src
RUN pnpm build

FROM base AS server

# install ffprobe
RUN wget -q http://johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz \
  && tar xJf /tmp/ffmpeg-release-64bit-static.tar.xz -C /tmp \
  && mv /tmp/ffmpeg-3.0-64bit-static/ffprobe /usr/local/bin/ \
  && rm -rf /tmp/ffmpeg

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /rex/sdk/dist sdk/dist
COPY --from=builder /rex/api/dist api/dist
COPY gql gql
ENV GRAPHQL_SCHEMA_DIRS=/rex/gql

WORKDIR /rex/api
CMD node --enable-source-maps dist/main.js
