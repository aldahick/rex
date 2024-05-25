# Make sure to build this image using the root context, not "api" context
FROM node:20-alpine AS base

WORKDIR /rex
RUN npm i -g pnpm@latest
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/

FROM base AS builder

RUN pnpm install --frozen-lockfile

WORKDIR /rex/api
COPY api/tsconfig.json ./
COPY api/src src
RUN pnpm build

FROM base AS server

RUN pnpm install --prod --frozen-lockfile

WORKDIR /rex/api
COPY --from=builder /rex/api/dist dist
COPY gql gql
ENV GRAPHQL_SCHEMA_DIRS=/rex/api/gql
CMD node --enable-source-maps dist/main.js
