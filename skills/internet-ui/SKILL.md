---
name: internet-ui
description: Add or modify internet-ui React components in projects using Base UI and Tailwind CSS v4. Use when asked to install internet-ui, add UI components, configure internet-ui.json, change project-wide radius or shadow defaults, or discover components from ui.ter.net.in.
---

# internet-ui

Use internet-ui as source-owned code. The CLI copies files into the target project; after installation, inspect and edit those local files like any other application code.

## Inspect before changing

1. Work from the target project root.
2. Read `internet-ui.json` if it exists. Respect its registry, aliases, output paths, TypeScript mode, and defaults.
3. Check target component files for local edits before adding or updating anything.
4. Inspect available items at `https://ui.ter.net.in/r/registry.json` when component names are unknown.

## Initialize

If `internet-ui.json` does not exist, initialize non-interactively only when detected defaults are correct:

```bash
npx @ternetin/ui init --yes
```

Otherwise run `npx @ternetin/ui init` and ask the user for choices the project cannot establish automatically. Never hand-write config before checking CLI output.

## Add components

Install all needed components in one command:

```bash
npx @ternetin/ui add button input dialog
```

The CLI resolves registry dependencies and installs npm dependencies. Do not separately install packages unless `--no-install` was requested or dependency installation failed.

Do not use `--overwrite` when a target file may contain local changes. If an update is required, compare existing source with registry source and merge intentionally. Use `--overwrite` only with explicit user approval or known-unmodified generated files.

For local or forked registries:

```bash
npx @ternetin/ui add button --registry <origin>
```

## Configure defaults

`internet-ui.json` supports project-wide source defaults:

```json
{
  "defaults": {
    "radius": "md",
    "containerRadius": "md",
    "shadow": "sm"
  }
}
```

- `radius`: `none`, `sm`, `md`, `lg`, or `full`
- `containerRadius`: `none`, `sm`, `md`, or `lg`; derived from `radius` when omitted
- `shadow`: `none`, `sm`, `md`, `lg`, or `xl`

After changing defaults, update only generated defaults source:

```bash
npx @ternetin/ui add ui-defaults --overwrite
```

## Modify generated UI

- Preserve Base UI behavior, accessibility, state attributes, and composition APIs.
- Use target aliases from `internet-ui.json`; do not restore registry authoring aliases blindly.
- Reuse local `cn`, variant helpers, motion helpers, and design tokens.
- Keep Tailwind CSS v4 conventions already present in target project.
- Treat installed files as application source. Match local style and abstractions instead of registry source when they differ.

## Verify

1. Review written files and package manifest changes.
2. Run target project's formatter or linter, type checker, and relevant tests.
3. Build affected app when practical.
4. Report files added, dependencies installed, local conflicts preserved, and checks run.

Never claim component installed based only on command exit. Confirm expected files exist and compile.
