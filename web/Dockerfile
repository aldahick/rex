FROM node:18-alpine AS builder

RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY src src
COPY index.html ./
COPY vite.config.ts tsconfig.json tsconfig.node.json .eslintrc.json ./
RUN pnpm build

FROM node:18-alpine AS server

RUN npm i -g serve

COPY --from=builder dist dist
COPY scripts scripts

CMD ["sh", "scripts/serve.sh", "dist"]
