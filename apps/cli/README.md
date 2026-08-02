# @ternetin/ui

CLI for copying [internet-ui](https://ui.ter.net.in) components into a React project. Components use Base UI, Tailwind CSS v4, and Motion. Generated source belongs to the consuming project; no internet-ui runtime package is installed.

## Usage

```bash
npx @ternetin/ui init
npx @ternetin/ui add button input dialog
```

Run commands from the project root. `init` writes `internet-ui.json` and installs the theme and shared utilities. `add` resolves component dependencies, rewrites aliases, installs required packages with the detected package manager, and writes component source.

```bash
npx @ternetin/ui add --help
npx @ternetin/ui add button --overwrite
npx @ternetin/ui add button --no-install
npx @ternetin/ui add button --registry https://ui.ter.net.in
```

See [full documentation](https://ui.ter.net.in) and [Storybook](https://storybook.ui.ter.net.in).
