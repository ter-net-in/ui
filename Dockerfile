FROM oven/bun:1.3.13-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/cli/package.json apps/cli/package.json
COPY apps/docs/package.json apps/docs/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build:registry \
  && bun run --filter '@internet-ui/docs' build \
  && bun run --filter '@internet-ui/docs' build-storybook

FROM alpine:3.22 AS docs

COPY --from=builder /app/apps/docs/out /site

CMD ["sh", "-c", "find /output -mindepth 1 -maxdepth 1 -exec rm -rf {} + && cp -a /site/. /output/"]

FROM alpine:3.22 AS storybook

COPY --from=builder /app/apps/docs/storybook-static /site

CMD ["sh", "-c", "find /output -mindepth 1 -maxdepth 1 -exec rm -rf {} + && cp -a /site/. /output/"]
