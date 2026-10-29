import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import prompts from 'prompts';

import type { Config } from './config.js';
import { detectPackageManager, installDeps } from './pm.js';
import { type RegistryFile, resolveItems } from './registry.js';
import { transformImports } from './transform.js';
import { c, log } from './utils.js';

export interface AddOptions {
  overwrite?: boolean;
  yes?: boolean;
  install?: boolean;
}

/** Absolute destination path for a registry file, based on its type + config. */
function destFor(file: RegistryFile, config: Config, cwd: string): string {
  const base = path.basename(file.path);
  switch (file.type) {
    case 'registry:ui':
      return path.join(cwd, config.paths.ui, base);
    case 'registry:lib':
      return path.join(cwd, config.paths.lib, base);
    case 'registry:style':
      // consumer's configured CSS path wins over the registry's target hint
      return path.join(cwd, config.paths.css);
    default:
      return path.join(cwd, file.target ?? base);
  }
}

async function confirmOverwrite(rel: string, opts: AddOptions): Promise<boolean> {
  if (opts.overwrite) return true;
  if (opts.yes) return false;
  const { value } = await prompts({
    type: 'confirm',
    name: 'value',
    message: `${rel} already exists. Overwrite?`,
    initial: false
  });
  return Boolean(value);
}

export async function addComponents(
  cwd: string,
  config: Config,
  names: string[],
  opts: AddOptions = {}
): Promise<void> {
  const items = await resolveItems(config, names);
  if (
    items.some(
      (item) => item.name === 'ui-defaults' || item.files.some((file) => path.basename(file.path) === 'ui-defaults.ts')
    )
  ) {
    throw new Error(
      'This legacy registry uses configurable visual defaults. Use the current registry with internet-ui 0.2 or retain your older CLI and registry together. No files were written.'
    );
  }
  if (items.length === 0) {
    log.warn('Nothing to add.');
    return;
  }

  log.info(`Resolving ${c.bold(items.map((i) => i.name).join(', '))}`);

  const npmDeps = new Set<string>();
  const written: string[] = [];

  for (const item of items) {
    for (const dep of item.dependencies) npmDeps.add(dep);
    for (const file of item.files) {
      const dest = destFor(file, config, cwd);
      const rel = path.relative(cwd, dest);
      const content = file.type === 'registry:style' ? file.content : transformImports(file.content, config);

      if (existsSync(dest)) {
        const ok = await confirmOverwrite(rel, opts);
        if (!ok) {
          log.dim(`skip  ${rel}`);
          continue;
        }
      }

      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, content);
      written.push(rel);
      log.ok(`write ${rel}`);
    }
  }

  if (opts.install !== false && npmDeps.size > 0) {
    const pm = detectPackageManager(cwd);
    const deps = [...npmDeps];
    log.info(`Installing with ${c.bold(pm)}: ${deps.join(', ')}`);
    await installDeps(pm, deps, cwd);
  }

  log.done(`Added ${written.length} file(s).`);
}
