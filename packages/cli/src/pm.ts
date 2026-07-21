import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm';

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(path.join(cwd, 'bun.lock')) || existsSync(path.join(cwd, 'bun.lockb'))) {
    return 'bun';
  }
  if (existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
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
