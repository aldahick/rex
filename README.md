# rex

![API image version](https://ghcr-badge.egpl.dev/aldahick/rex-api/latest_tag?trim=major&label=ghcr.io/aldahick/rex-api)
![Web image version](https://ghcr-badge.egpl.dev/aldahick/rex-web/latest_tag?trim=major&label=ghcr.io/aldahick/rex-web)
![API workflow status badge](https://github.com/aldahick/rex/actions/workflows/api.yml/badge.svg?branch=main)
![Web workflow status badge](https://github.com/aldahick/rex/actions/workflows/web.yml/badge.svg?branch=main)

This is a monorepo for [my personal site](https://alexhicks.net), Rex, which includes a reference implementation of an [Athena](https://github.com/aldahick/athena) server. That backend is written in [TypeScript](https://typescriptlang.org), providing a GraphQL API using Athena, [Fastify](https://npmjs.com/package/fastify), and [Node.JS](https://nodejs.org). The frontend is built with [React](https://react.dev/) and TypeScript, with most styling from [MUI](https://mui.com).

## Features

### 🎼 [/mzk](https://alexhicks.net/mzk)

Transcribe monotonic recordings into sheet music using the [Omnizart](https://github.com/Music-and-Culture-Technology-Lab/omnizart) project! I wrote a [paper](./docs/automatic-music-transcription-at-scale.pdf) and a [reference implementation](https://github.com/aldahick/mzk) for a cloud computing course at IUPUI, and subsequently reimplemented it as a production-ready feature in Rex. The Docker-based executor, connecting Omnizart to Rex's media API, is [written](./docker/mzk) in Python. It's vastly overengineered for its expected use case, but that's what this project is all about, or something. In that spirit, I'm basically reimplementing it while porting it to Rex, and [that](./api/src/module/media/) [effort](./api/src/module/mzk/) is [still](./web/src/features/media/) [underway](./web/src/features/mzk/).

### 🐈 [/cat](https://alexhicks.net/cat)

[https://alexhicks.net/cat](https://alexhicks.net/cat)

Entertain your cat! [This project](./web/src/features/cat/) is precisely as complex as it needs to be, which is hardly at all. Cats are not very difficult to distract.

## Development

See the README files in [`api`](./api/README.md) and [`web`](./web/README.md) for package-specific documentation.

### Changing GraphQL schema

To generate new TypeScript types based on changes to the [GraphQL schema](./gql/), do `pnpm generate`. You can run this in either package directory, or the root (which runs it for both `api` and `web`).

## Deployment

To tag a new version, use `pnpm version [patch|minor|major]` in the repository root. This will update all three `package.json` files (`/`, `/api/`, and `/web/`) and create a Git tag for the new version. To publish the new version's Docker images to [GHCR](https://github.com/aldahick?tab=packages&tab=packages&q=rex), do `git push && git push --tags` and follow the [job status](https://github.com/aldahick/rex/actions?query=publish).
