# rex

![API image version](https://ghcr-badge.egpl.dev/aldahick/rex-api/latest_tag?trim=major&label=ghcr.io/aldahick/rex-api)
![Web image version](https://ghcr-badge.egpl.dev/aldahick/rex-web/latest_tag?trim=major&label=ghcr.io/aldahick/rex-web)

This is a monorepo for my personal site, Rex, which includes a reference implementation of an [Athena](https://github.com/aldahick/athena) server. That backend is written in [TypeScript](https://typescriptlang.org), providing a GraphQL API using Athena, [Fastify](https://npmjs.com/package/fastify), and [Node.JS](https://nodejs.org). The frontend is [React](https://react.dev/) and TypeScript, with most styling from [MUI](https://mui.com).

# Features

## 🎼 [/mzk](https://alexhicks.net/mzk)

Transcribe monotonic recordings into sheet music using the [Omnizart] project! I wrote a [paper](./docs/automatic-music-transcription-at-scale.pdf) and a [reference implementation](https://github.com/aldahick/mzk) for a cloud computing course at IUPUI, and subsequently reimplemented it as a production-ready feature in Rex. The Docker-based executor, connecting Omnizart to Rex's media API, is [written](./docker/mzk) in Python. It's vastly overengineered for its expected use case, but that's what this project is all about, or something.

## 🐈 [/cat](https://alexhicks.net/cat)

Entertain your cat! [This project](./web/src/features/cat/) is precisely as complex as it needs to be, which is hardly at all. Cats are not very difficult to distract.
