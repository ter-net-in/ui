import type { Config } from './config.js';

export interface RegistryFile {
  path: string;
  type: string;
  target?: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

const URL_RE = /^https?:\/\//;

/** Resolve a bare name or full URL to the JSON endpoint for one item. */
export function itemUrl(config: Config, nameOrUrl: string): string {
  if (URL_RE.test(nameOrUrl)) return nameOrUrl;
  const base = config.registry.replace(/\/$/, '');
  return `${base}/r/${nameOrUrl}.json`;
}

export async function fetchItem(config: Config, nameOrUrl: string): Promise<RegistryItem> {
  const url = itemUrl(config, nameOrUrl);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (${res.status} ${res.statusText})`);
  }
  const item = (await res.json()) as RegistryItem;
  item.dependencies ??= [];
  item.registryDependencies ??= [];
  return item;
}

/**
 * Fetch the requested items and all of their registryDependencies, deduped.
 * Returned in dependency-first order so files/deps resolve before dependents.
 */
export async function resolveItems(config: Config, names: string[]): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>();
  const ordered: RegistryItem[] = [];

  async function visit(nameOrUrl: string) {
    const key = itemUrl(config, nameOrUrl);
    if (resolved.has(key)) return;
    const item = await fetchItem(config, nameOrUrl);
    resolved.set(key, item);
    for (const dep of item.registryDependencies) {
      await visit(dep);
    }
    ordered.push(item);
  }

  for (const name of names) {
    await visit(name);
  }
  return ordered;
}
