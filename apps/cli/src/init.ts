import { existsSync } from 'node:fs';
import prompts from 'prompts';

import { addComponents } from './add.js';
import { type Config, configPath, DEFAULT_REGISTRY, DEFAULT_VARIANTS, detectDefaults, writeConfig } from './config.js';
import { log } from './utils.js';

export interface InitOptions {
  cwd?: string;
  registry?: string;
  yes?: boolean;
}

export async function init(opts: InitOptions = {}): Promise<void> {
  const cwd = opts.cwd ?? process.cwd();

  if (existsSync(configPath(cwd)) && !opts.yes) {
    const { value } = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'internet-ui.json already exists. Overwrite?',
      initial: false
    });
    if (!value) {
      log.warn('Init cancelled.');
      return;
    }
  }

  const defaults = detectDefaults(cwd);
  let config: Config = { ...defaults, registry: opts.registry ?? defaults.registry };

  if (!opts.yes) {
    const choices = (values: readonly string[], current: string) =>
      values.map((v) => ({ title: v, value: v, selected: v === current }));

    const answers = await prompts([
      { type: 'text', name: 'registry', message: 'Registry URL', initial: config.registry },
      { type: 'text', name: 'ui', message: 'Components dir', initial: config.paths.ui },
      { type: 'text', name: 'lib', message: 'Lib dir', initial: config.paths.lib },
      { type: 'text', name: 'css', message: 'Global CSS file', initial: config.paths.css },
      {
        type: 'select',
        name: 'radius',
        message: 'Default corner radius',
        choices: choices(['none', 'sm', 'md', 'lg', 'full'], DEFAULT_VARIANTS.radius)
      },
      {
        type: 'select',
        name: 'shadow',
        message: 'Default shadow',
        choices: choices(['none', 'sm', 'md', 'lg', 'xl'], DEFAULT_VARIANTS.shadow)
      }
    ]);
    if (answers.registry) {
      config = {
        ...config,
        registry: answers.registry,
        paths: { ui: answers.ui, lib: answers.lib, css: answers.css },
        // containerRadius is derived from radius by resolveDefaults()
        defaults: { radius: answers.radius, shadow: answers.shadow }
      };
    }
  }

  await writeConfig(cwd, config);
  log.ok(`Wrote internet-ui.json (registry: ${config.registry || DEFAULT_REGISTRY})`);

  // install the design tokens + cn util so the project is ready for components.
  // overwrite so the theme lands in the global stylesheet during setup.
  log.warn(`Writing design tokens to ${config.paths.css} (existing contents replaced).`);
  await addComponents(cwd, config, ['theme', 'utils'], { overwrite: true, yes: opts.yes });
  log.done('Initialized. Add components with `internet-ui add <name>`.');
}
