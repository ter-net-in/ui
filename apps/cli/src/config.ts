import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const CONFIG_FILE = 'internet-ui.json';

export interface Aliases {
  /** import alias for UI components, e.g. "@/components/ui" */
  ui: string;
  /** import alias for lib files, e.g. "@/lib" */
  lib: string;
  /** import alias for the cn util, e.g. "@/lib/utils" */
  utils: string;
}

export interface Paths {
  /** filesystem dir for UI components, e.g. "src/components/ui" */
  ui: string;
  /** filesystem dir for lib files, e.g. "src/lib" */
  lib: string;
  /** filesystem path to the global stylesheet, e.g. "src/app/globals.css" */
  css: string;
}

export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';
/** container surfaces cap out at `lg` — a 9999px radius turns a dialog into a lozenge */
export type ContainerRadius = Exclude<Radius, 'full'>;
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/** Project-wide default variants, baked into lib/ui-defaults.ts when it is written. */
export interface Defaults {
  /** default for pill/circle-friendly controls (buttons, inputs, toggles) */
  radius: Radius;
  /** default for boxy surfaces (dialogs, menus, cards); derived from `radius` when omitted */
  containerRadius: ContainerRadius;
  /** default for raised surfaces (dialogs, popovers, toasts) */
  shadow: Shadow;
}

export interface Config {
  /** registry base url; items are fetched from `${registry}/r/<name>.json` */
  registry: string;
  /** whether the project uses TypeScript (.tsx) */
  tsx: boolean;
  aliases: Aliases;
  paths: Paths;
  /** optional; falls back to DEFAULT_VARIANTS for any key left out */
  defaults?: Partial<Defaults>;
}

export const DEFAULT_VARIANTS: Defaults = {
  radius: 'none',
  containerRadius: 'none',
  shadow: 'md'
};

/**
 * Fill in the variant defaults, deriving `containerRadius` from `radius` when the
 * consumer only set the latter. `full` is capped to `lg` because the container scale
 * has no `full` step — writing it through would emit a value cva can't resolve.
 */
export function resolveDefaults(config: Config): Defaults {
  const d = config.defaults ?? {};
  const radius = d.radius ?? DEFAULT_VARIANTS.radius;
  const containerRadius = d.containerRadius ?? (radius === 'full' ? 'lg' : radius);
  return { radius, containerRadius, shadow: d.shadow ?? DEFAULT_VARIANTS.shadow };
}

export const DEFAULT_REGISTRY = 'https://ui.ter.net.in';

export function configPath(cwd: string) {
  return path.join(cwd, CONFIG_FILE);
}

export async function loadConfig(cwd: string): Promise<Config | null> {
  const file = configPath(cwd);
  if (!existsSync(file)) return null;
  return JSON.parse(await readFile(file, 'utf8')) as Config;
}

export async function writeConfig(cwd: string, config: Config): Promise<void> {
  await writeFile(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`);
}

/** Best-effort detection of project layout for `init` defaults. */
export function detectDefaults(cwd: string): Config {
  const hasSrc = existsSync(path.join(cwd, 'src'));
  const base = hasSrc ? 'src' : '.';
  const cssCandidates = hasSrc
    ? ['src/app/globals.css', 'src/styles/globals.css', 'src/index.css']
    : ['app/globals.css', 'styles/globals.css', 'index.css'];
  const css = cssCandidates.find((c) => existsSync(path.join(cwd, c))) ?? cssCandidates[0];

  return {
    registry: DEFAULT_REGISTRY,
    tsx: existsSync(path.join(cwd, 'tsconfig.json')),
    aliases: {
      ui: '@/components/ui',
      lib: '@/lib',
      utils: '@/lib/utils'
    },
    paths: {
      ui: `${base}/components/ui`.replace(/^\.\//, ''),
      lib: `${base}/lib`.replace(/^\.\//, ''),
      css
    },
    defaults: { ...DEFAULT_VARIANTS }
  };
}
