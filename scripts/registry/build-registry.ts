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
const PUBLIC_DIR = path.join(REPO_ROOT, 'apps', 'docs', 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'r');

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
  const llmsIndex = [
    '# internet-ui',
    '',
    '> Source-owned React components built with Base UI, Tailwind CSS v4, and Motion.',
    '',
    'Use the CLI to copy component source into a project. Do not install `@internet-ui/ui` as a runtime dependency.',
    '',
    '```bash',
    'npx @ternetin/ui init',
    'npx @ternetin/ui add button input dialog',
    '```',
    '',
    '## Resources',
    '',
    `- [Full source catalog](${registry.homepage}/llms-full.txt): component metadata and complete source files`,
    `- [JSON registry](${registry.homepage}/r/registry.json): machine-readable component index`,
    '- [Storybook](https://storybook.ui.ter.net.in): rendered component examples',
    '',
    '## Components',
    ''
  ];
  const llmsFull = [
    '# internet-ui full registry',
    '',
    '> Complete component catalog for coding agents and other LLM clients.',
    '',
    'Initialize a target project before adding components:',
    '',
    '```bash',
    'npx @ternetin/ui init',
    'npx @ternetin/ui add <component...>',
    '```',
    '',
    'The CLI resolves registry dependencies, rewrites `@/lib/*` and `@/ui/*` imports to target aliases, installs npm dependencies, and writes editable local source.',
    ''
  ];

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

    llmsIndex.push(`- [${item.title}](${registry.homepage}/r/${item.name}.json): ${item.description}`);
    llmsFull.push(
      `## ${item.title} (\`${item.name}\`)`,
      '',
      item.description,
      '',
      `- Type: \`${item.type}\``,
      `- Install: \`npx @ternetin/ui add ${item.name}\``,
      `- npm dependencies: ${output.dependencies.length > 0 ? output.dependencies.map((dep) => `\`${dep}\``).join(', ') : 'none'}`,
      `- Registry dependencies: ${output.registryDependencies.length > 0 ? output.registryDependencies.map((dep) => `\`${dep}\``).join(', ') : 'none'}`,
      ''
    );

    for (const file of files) {
      const extension = path.extname(file.path).slice(1);
      llmsFull.push(`### \`${file.path}\``, '', `\`\`\`\`${extension}`, file.content.trimEnd(), '````', '');
    }

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
  await writeFile(path.join(PUBLIC_DIR, 'llms.txt'), `${llmsIndex.join('\n')}\n`);
  await writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), `${llmsFull.join('\n')}\n`);
  console.log(`✓ r/registry.json (${index.length} items)`);
  console.log('✓ llms.txt + llms-full.txt');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
