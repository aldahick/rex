FROM node:20-alpine AS base

RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./

FROM base AS builder

RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src src
RUN pnpm build

FROM base AS server

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder dist dist
COPY gql /gql
ENV GRAPHQL_SCHEMA_DIRS=/gql
CMD node --enable-source-maps dist/main.js
