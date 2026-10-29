# Next.js runs on Node in CI and production; Bun retains its package/service roles.
FROM oven/bun:1.3.13 AS bun
FROM node:24-bookworm-slim AS builder
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/cli/package.json apps/cli/package.json
COPY apps/docs/package.json apps/docs/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build:registry
WORKDIR /app/apps/docs
RUN node node_modules/next/dist/bin/next build \
  && node node_modules/storybook/bin/index.cjs build

FROM alpine:3.22 AS docs

COPY --from=builder /app/apps/docs/out /site

CMD ["sh", "-c", "find /output -mindepth 1 -maxdepth 1 -exec rm -rf {} + && cp -a /site/. /output/"]

FROM alpine:3.22 AS storybook

COPY --from=builder /app/apps/docs/storybook-static /site

CMD ["sh", "-c", "find /output -mindepth 1 -maxdepth 1 -exec rm -rf {} + && cp -a /site/. /output/"]
