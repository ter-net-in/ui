import { afterEach, describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { addComponents } from './add';
import { detectDefaults, loadConfig } from './config';

const directories: string[] = [];
const servers: ReturnType<typeof Bun.serve>[] = [];
afterEach(async () => {
  for (const server of servers.splice(0)) server.stop(true);
  await Promise.all(directories.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

async function fixture(items: Record<string, unknown>) {
  const cwd = await mkdtemp(path.join(tmpdir(), 'internet-ui-test-'));
  directories.push(cwd);
  const server = Bun.serve({
    port: 0,
    fetch(request) {
      const name = new URL(request.url).pathname.split('/').at(-1)?.replace('.json', '');
      return name && items[name] ? Response.json(items[name]) : new Response('Not found', { status: 404 });
    }
  });
  servers.push(server);
  return { cwd, config: { ...detectDefaults(cwd), registry: server.url.toString() } };
}

const item = (name: string, content: string, registryDependencies: string[] = []) => ({
  name,
  type: 'registry:ui',
  title: name,
  description: '',
  dependencies: [],
  registryDependencies,
  files: [{ path: `src/ui/${name}.tsx`, type: 'registry:ui', content }]
});

describe('house-style source migration', () => {
  test('new configuration has paths and aliases without cosmetic defaults', () => {
    expect(detectDefaults('/tmp')).not.toHaveProperty('defaults');
    expect(detectDefaults('/tmp').aliases.utils).toBe('@/lib/utils');
  });

  test('legacy defaults do not select styles or rewrite the config on disk', async () => {
    const { cwd, config } = await fixture({});
    const legacy = { ...config, defaults: { radius: 'full', shadow: 'xl' } };
    const content = JSON.stringify(legacy);
    await writeFile(path.join(cwd, 'internet-ui.json'), content);
    const loaded = await loadConfig(cwd);
    expect(loaded).not.toHaveProperty('defaults');
    expect(loaded?.paths).toEqual(config.paths);
    expect(await readFile(path.join(cwd, 'internet-ui.json'), 'utf8')).toBe(content);
  });

  test('legacy registry defaults fail before any component files are written', async () => {
    const { cwd, config } = await fixture({
      button: item('button', 'export const Button = 1;', ['ui-defaults']),
      'ui-defaults': {
        ...item('ui-defaults', 'export const UI_DEFAULTS = {};'),
        files: [{ path: 'src/lib/ui-defaults.ts', type: 'registry:lib', content: 'export const UI_DEFAULTS = {};' }]
      }
    });
    await expect(addComponents(cwd, config, ['button'], { install: false, yes: true })).rejects.toThrow('legacy');
    expect(existsSync(path.join(cwd, config.paths.ui))).toBe(false);
    expect(existsSync(path.join(cwd, config.paths.lib))).toBe(false);
  });

  test('new layout installs dependencies and rewrites aliases without overwriting edited source', async () => {
    const { cwd, config } = await fixture({
      shell: item('shell', "import { Button } from '@/ui/button';\nimport { cn } from '@/lib/utils';", ['button']),
      button: item('button', 'export const Button = 1;')
    });
    config.aliases = { ui: '@/design', lib: '@/shared', utils: '@/shared/classes' };
    await mkdir(path.join(cwd, config.paths.ui), { recursive: true });
    const local = path.join(cwd, config.paths.ui, 'button.tsx');
    await writeFile(local, 'local changes');
    await addComponents(cwd, config, ['shell'], { install: false, yes: true });
    expect(await readFile(local, 'utf8')).toBe('local changes');
    const installed = await readFile(path.join(cwd, config.paths.ui, 'shell.tsx'), 'utf8');
    expect(installed).toContain("from '@/design/button'");
    expect(installed).toContain("from '@/shared/classes'");
    await addComponents(cwd, config, ['button'], { install: false, overwrite: true });
    expect(await readFile(local, 'utf8')).toBe('export const Button = 1;');
  });
});
