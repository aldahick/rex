FROM node:12.18-alpine

EXPOSE 5000

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY tsconfig.json craco.config.js ./
COPY src ./src
COPY public ./public
RUN yarn build

# allow for rebuild on container first start
RUN yarn clean

COPY scripts ./scripts
CMD yarn start:prod
