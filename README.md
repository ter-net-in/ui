# internet-ui

Source-owned React components built with [Base UI](https://base-ui.com), Tailwind CSS v4, and Motion. Components are copied into your project through a CLI instead of installed as a runtime component package, so the resulting code stays local and editable.

- Documentation and registry: [ui.ter.net.in](https://ui.ter.net.in)
- Storybook: [storybook.ui.ter.net.in](https://storybook.ui.ter.net.in)
- LLM registry: [ui.ter.net.in/llms.txt](https://ui.ter.net.in/llms.txt)
- CLI: [`@ternetin/ui`](https://www.npmjs.com/package/@ternetin/ui)

## Quick start

Run the initializer from the root of a React project:

```bash
npx @ternetin/ui init
npx @ternetin/ui add button input dialog
```

`init` creates `internet-ui.json`, installs the theme and shared utilities, and asks where component files should be written. `add` resolves transitive registry dependencies, rewrites import aliases for your project, installs npm dependencies with the detected package manager, and writes the selected source files.

Use a registry override when testing locally or hosting a fork:

```bash
npx @ternetin/ui add button --registry http://localhost:3000
```

## Shared styling and layouts

Controls use 6px corners, containers use 8px corners, and shadows are reserved for floating surfaces. These are fixed component rules. Component props, CLI configuration, and previews no longer expose radius or shadow choices.

Install layouts and supporting components individually, or start from a complete working example:

```bash
npx @ternetin/ui add app-shell sidebar sidebar-drawer page-layout split-pane
npx @ternetin/ui add auth-example admin-example settings-example workspace-example
```

Examples use fictional local data. Applications own routing, authentication, navigation, and persistence. See [the examples](https://ui.ter.net.in/examples) and [the 0.2 migration guide](https://ui.ter.net.in/migration) before updating existing source copies. Compare local changes before overwriting files. Legacy `defaults` configuration is ignored with a migration notice; it is never rewritten automatically.

## Repository

```text
packages/ui       component source, stories, theme, and registry catalog
apps/docs         Next.js documentation site and static registry host
apps/cli          @ternetin/ui CLI
scripts/registry  registry JSON generator
skills            instructions for coding agents
```

`packages/ui` is the source of truth. It is private and never published. `bun run build:registry` turns its catalog and source files into static JSON under `apps/docs/public/r`.

## Development

Requires [Bun](https://bun.sh) 1.3.13 or newer and Node.js. Production containers build Next.js and Storybook with Node 24.

```bash
bun install
bun run build:registry
bun run dev
```

Common checks:

```bash
bun run lint
bun run typecheck
bun run build
bun run --filter '@internet-ui/docs' storybook
```

## Adding a component

1. Add `packages/ui/src/ui/<name>.tsx` and its Storybook story.
2. Add the component and its dependencies to `packages/ui/registry.json`.
3. Run `bun run build:registry`.
4. Run lint, type checks, the production build, and the Storybook build.
5. Commit both source and generated `apps/docs/public/r/*.json` files.

Authoring imports use `@/lib/*` and `@/ui/*`. The CLI rewrites those aliases for each consumer. Keep component dependencies explicit in the registry entry.

## Agentic use

Agent Skills-compatible clients can load [`skills/internet-ui/SKILL.md`](skills/internet-ui/SKILL.md). The skill tells coding agents how to inspect an existing install, choose components, run the CLI safely, and verify generated code without overwriting local edits.

## Deployment

`Dockerfile` uses Bun for the frozen dependency install and registry generation, then Node 24 for the Next.js and Storybook builds. Separate `docs` and `storybook` targets export static files. Compose copies their static files into host directories:

```text
deploy/ui         Next.js static export
deploy/storybook  Storybook static export
```

Point main server Caddy at those directories for `ui.ter.net.in` and `storybook.ui.ter.net.in`. No web server or port binding runs inside this project.

Run locally:

```bash
docker compose build
docker compose run --rm ui
docker compose run --rm storybook
```

CI still builds and validates both static sites on every pull request. Pushes to `main` sync repository to `~/internet-ui` on VPS, build both targets, and export files to `~/internet-ui/deploy`.

Configure GitHub environment `production` with:

- Secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`
- Optional secret: `VPS_PORT` (defaults to `22`)

VPS requires Docker with Compose plugin. `VPS_USER` must be able to write its home directory and run Docker.

## CLI releases

CLI releases are manual. Authenticate with npm, update `apps/cli/package.json`, then build and publish from repository root:

```bash
npm login
bun run publish:cli
```

The command rebuilds the CLI before publishing `@ternetin/ui` publicly. npm rejects versions already published.

## License

MIT
