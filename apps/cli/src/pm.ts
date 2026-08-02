import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm';

const LOCKFILES: ReadonlyArray<[string, PackageManager]> = [
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['package-lock.json', 'npm']
];

/**
 * Walk up from `cwd` looking for a lockfile.
 *
 * The search climbs parents because a consumer app often sits in a monorepo
 * (`apps/web`) whose lockfile lives at the workspace root — stopping at `cwd`
 * would report npm for a bun or pnpm workspace and install with the wrong
 * package manager.
 */
export function detectPackageManager(cwd: string): PackageManager {
  let dir = path.resolve(cwd);

  for (;;) {
    for (const [file, pm] of LOCKFILES) {
      if (existsSync(path.join(dir, file))) return pm;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return 'npm';
    dir = parent;
  }
}

function addArgs(pm: PackageManager, deps: string[]): string[] {
  switch (pm) {
    case 'bun':
      return ['add', ...deps];
    case 'pnpm':
      return ['add', ...deps];
    case 'yarn':
      return ['add', ...deps];
    default:
      return ['install', ...deps];
  }
}

export function installDeps(pm: PackageManager, deps: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(pm, addArgs(pm, deps), { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${pm} exited with code ${code}`));
    });
  });
}
