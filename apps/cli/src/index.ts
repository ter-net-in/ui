import { cac } from 'cac';

import { addComponents } from './add.js';
import { DEFAULT_REGISTRY, loadConfig } from './config.js';
import { init } from './init.js';
import { log } from './utils.js';

declare const __CLI_VERSION__: string;

const cli = cac('internet-ui');

cli
  .command('init', 'Set up internet-ui in the current project')
  .option('--cwd <dir>', 'Working directory', { default: process.cwd() })
  .option('--registry <url>', 'Registry base URL')
  .option('-y, --yes', 'Accept defaults without prompting')
  .action(async (opts: { cwd: string; registry?: string; yes?: boolean }) => {
    try {
      await init({ cwd: opts.cwd, registry: opts.registry, yes: opts.yes });
    } catch (err) {
      log.error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

cli
  .command('add [...components]', 'Add components to your project')
  .option('--cwd <dir>', 'Working directory', { default: process.cwd() })
  .option('--registry <url>', 'Override the registry base URL')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('-y, --yes', 'Do not prompt; keep existing files on conflict')
  .option('--no-install', 'Skip installing npm dependencies')
  .action(
    async (
      components: string[],
      opts: {
        cwd: string;
        registry?: string;
        overwrite?: boolean;
        yes?: boolean;
        install?: boolean;
      }
    ) => {
      try {
        if (!components || components.length === 0) {
          log.warn('Specify at least one component, e.g. `internet-ui add button`.');
          process.exit(1);
        }
        const config = await loadConfig(opts.cwd);
        if (!config) {
          log.error('No internet-ui.json found. Run `internet-ui init` first.');
          process.exit(1);
        }
        if (opts.registry) config.registry = opts.registry;
        await addComponents(opts.cwd, config, components, {
          overwrite: opts.overwrite,
          yes: opts.yes,
          install: opts.install
        });
      } catch (err) {
        log.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
      }
    }
  );

cli.help((sections) => {
  sections.push({
    title: 'Examples',
    body: ['  $ internet-ui init', `  $ internet-ui add button input   # from ${DEFAULT_REGISTRY}`].join('\n')
  });
});
cli.version(__CLI_VERSION__);

cli.parse();
