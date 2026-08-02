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

export interface Config {
  /** registry base url; items are fetched from `${registry}/r/<name>.json` */
  registry: string;
  /** whether the project uses TypeScript (.tsx) */
  tsx: boolean;
  aliases: Aliases;
  paths: Paths;
}

export const DEFAULT_REGISTRY = 'https://internet-ui.dev';

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
    }
  };
}
