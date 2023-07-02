# Rex API

Backend for [aldahick](https://github.com/aldahick)'s personal site. Powered by [athena](https://github.com/aldahick/athena), an extensible web server framework.

## Setup

1. Install [Node.JS 18.x](https://nodejs.org) and [PostgreSQL](https://postgresql.org).
2. Copy `.env.example` to `.env` and modify appropriately.
3. `pnpm dev`

## Operations

### Database schema changes

1. Write [Orchid](https://orchid-orm.netlify.app/guide/) models in [`./src/model`](`./src/model`).
2. `pnpm db new $migration_name`
3. `pnpm db migrate`
