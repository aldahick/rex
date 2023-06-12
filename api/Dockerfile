FROM node:18-alpine AS builder

RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src src
RUN pnpm build

FROM node:18-alpine AS server

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder dist dist
COPY gql /gql
ENV GRAPHQL_DIR=/gql
CMD pnpm start
