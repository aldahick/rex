FROM node:18-alpine AS builder

RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src src
RUN pnpm build

FROM node:18-alpine AS server

RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder dist dist
COPY gql /gql
ENV GRAPHQL_SCHEMA_DIRS=/gql
CMD node --enable-source-maps dist/main.js
