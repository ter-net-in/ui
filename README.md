# internet-ui

A personal component library built on [Base UI](https://base-ui.com) (`@base-ui/react`) + Tailwind CSS v4, distributed the shadcn way: components are **copied into your project** via a CLI, not imported as a runtime dependency. You own the code.

Aesthetic: Swiss / International-Typographic with a brutalist lean — stark mono palette, Helvetica Neue, one electric-blue accent (`#0047ff`), sharp corners.

## Monorepo layout

```
apps/docs         Next.js — docs, live previews, and the registry HOST (serves /r/*.json)
  registry/       component SOURCE (theme tokens, cn util, ui/*.tsx)
  registry.json   catalog
  public/r/       built, hostable registry JSON (bun run build:registry)
packages/cli      the `internet-ui` CLI (init + add)
```

## Develop

```bash
bun install
bun run build:registry   # emit apps/docs/public/r/*.json from registry.json + source
bun run dev              # docs site + registry at http://localhost:3000
bun run build:cli        # build the CLI to packages/cli/dist
bun run typecheck
bun run lint
```

## Add a new component

1. Author `apps/docs/registry/internet/ui/<name>.tsx` (import `@base-ui/react/<x>` + `cn` from `@/lib/utils`; cross-component imports use `@/ui/<x>`).
2. Add an entry to `apps/docs/registry.json` (`dependencies`, `registryDependencies: ["utils"]`, the file).
3. `bun run build:registry` and commit the emitted `public/r/<name>.json`.

## Consuming the library (in another project)

```bash
npx internet-ui init                 # writes internet-ui.json, installs tokens + cn
npx internet-ui add button input     # copies components, rewrites import aliases, installs deps
```

`internet-ui.json` records the registry URL, the consumer's path aliases, and the target dirs. `add` fetches `{registry}/r/<name>.json`, resolves `registryDependencies` recursively, rewrites the authoring aliases (`@/lib/utils`, `@/ui/*`) to the consumer's aliases, installs npm `dependencies` with the detected package manager, and writes the files.

Point the CLI at a local registry during development:

```bash
npx internet-ui add button --registry http://localhost:3000
```

## Deploy

Deploy `apps/docs` (Next.js) anywhere static-friendly; `public/r/*.json` is served at `/r/<name>.json`. Set that origin as the CLI's default registry.
