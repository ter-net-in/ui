/**
 * Reads packages/ui/registry.json + component source and emits one hostable JSON
 * file per item into the docs app's public/r/<name>.json, plus a registry.json index.
 * Bridges the two packages, so it lives at the repo root rather than in either.
 * Run with: bun run build:registry
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
/** source of record: item `path` fields are relative to this */
const ROOT = path.join(REPO_ROOT, 'packages', 'ui');
/** the docs app hosts the built registry as static files */
const OUT_DIR = path.join(REPO_ROOT, 'apps', 'docs', 'public', 'r');

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}
interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}
interface Registry {
  name: string;
  homepage: string;
  items: RegistryItem[];
}

async function main() {
  const registry: Registry = JSON.parse(await readFile(path.join(ROOT, 'registry.json'), 'utf8'));

  await mkdir(OUT_DIR, { recursive: true });

  const index: Array<Pick<RegistryItem, 'name' | 'type' | 'title' | 'description'>> = [];

  for (const item of registry.items) {
    const files = await Promise.all(
      item.files.map(async (f) => ({
        path: f.path,
        type: f.type,
        target: f.target,
        content: await readFile(path.join(ROOT, f.path), 'utf8')
      }))
    );

    const output = {
      $schema: 'https://ui.ter.net.in/schema/registry-item.json',
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies ?? [],
      registryDependencies: item.registryDependencies ?? [],
      files
    };

    await writeFile(path.join(OUT_DIR, `${item.name}.json`), `${JSON.stringify(output, null, 2)}\n`);

    index.push({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description
    });
    console.log(`✓ r/${item.name}.json`);
  }

  await writeFile(
    path.join(OUT_DIR, 'registry.json'),
    `${JSON.stringify({ name: registry.name, homepage: registry.homepage, items: index }, null, 2)}\n`
  );
  console.log(`✓ r/registry.json (${index.length} items)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
