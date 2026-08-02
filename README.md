# internet-ui

A personal component library built on [Base UI](https://base-ui.com) (`@base-ui/react`) + Tailwind CSS v4, distributed the shadcn way: components are **copied into your project** via a CLI, not imported as a runtime dependency. You own the code.

Aesthetic: Swiss / International-Typographic with a brutalist lean — stark mono palette, Helvetica Neue, one electric-blue accent (`#0047ff`), sharp corners.

## Monorepo layout

```
packages/ui       component SOURCE — the library itself, never published to npm
  src/theme/      design tokens (globals.css)
  src/lib/        cn util, motion helpers
  src/ui/         the components + their stories
  registry.json   catalog
apps/docs         Next.js — docs, live previews, and the registry HOST
  public/r/       built, hostable registry JSON (bun run build:registry)
apps/cli          the `internet-ui` CLI (init + add) — published to npm as `@ternetin/ui`
scripts/registry  build-registry.ts — reads packages/ui, writes apps/docs/public/r
```

`packages/ui` is the source of record and is deliberately *not* a runtime dependency of
anything: the docs app reaches it through tsconfig path aliases, and consumers get copies
of the files via the CLI.

## Develop

```bash
bun install
bun run build:registry   # emit apps/docs/public/r/*.json from packages/ui
bun run dev              # docs site + registry at http://localhost:3000
bun run build:cli        # build the CLI to apps/cli/dist
bun run typecheck
bun run lint
```

## Add a new component

1. Author `packages/ui/src/ui/<name>.tsx` (import `@base-ui/react/<x>` + `cn` from `@/lib/utils`; cross-component imports use `@/ui/<x>`).
2. Add an entry to `packages/ui/registry.json` (`dependencies`, `registryDependencies: ["utils"]`, the file).
3. `bun run build:registry` and commit the emitted `public/r/<name>.json`.

## Consuming the library (in another project)

```bash
npx @ternetin/ui init                 # writes internet-ui.json, installs tokens + cn
npx @ternetin/ui add button input     # copies components, rewrites import aliases, installs deps
```

`internet-ui.json` records the registry URL, the consumer's path aliases, and the target dirs. `add` fetches `{registry}/r/<name>.json`, resolves `registryDependencies` recursively, rewrites the authoring aliases (`@/lib/utils`, `@/ui/*`) to the consumer's aliases, installs npm `dependencies` with the detected package manager, and writes the files.

Point the CLI at a local registry during development:

```bash
npx @ternetin/ui add button --registry http://localhost:3000
```

### House style: default variants

Components are sharp-cornered with a hard offset shadow by default. Rather than passing
`radius`/`shadow` at every call site, set them once in `internet-ui.json`:

```jsonc
{
  "defaults": {
    "radius": "md",   // none | sm | md | lg | full — buttons, inputs, toggles
    "shadow": "sm"    // none | sm | md | lg | xl   — dialogs, popovers, toasts
  }
}
```

`init` prompts for these; both keys are optional and fall back to `none` / `md`. The CLI
substitutes them into `lib/ui-defaults.ts` when it writes that file, and every component
reads them through the shared cva `defaultVariants` in `lib/utils.ts` — so all 34 components
with a `radius` prop and all 5 with a `shadow` prop follow along. Invalid values fail the
install with a message rather than emitting a file that won't compile.

`containerRadius` (boxy surfaces — dialogs, menus, cards) is derived from `radius`, capped at
`lg` because a 9999px radius turns a rectangle into a lozenge. Set it explicitly to decouple
the two.

Since the values are baked in at write time, editing `internet-ui.json` later needs one
command to re-apply — it rewrites only that file:

```bash
npx @ternetin/ui add ui-defaults -o
```

Or just edit `lib/ui-defaults.ts` directly. It's your code.

## Deploy

Deploy `apps/docs` (Next.js) anywhere static-friendly; `public/r/*.json` is served at `/r/<name>.json`. Set that origin as the CLI's default registry.
