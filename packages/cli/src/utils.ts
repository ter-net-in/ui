import kleur from 'kleur';

export const c = kleur;

const tag = kleur.bold().blue('internet-ui');

export const log = {
  info: (msg: string) => console.log(`${tag} ${msg}`),
  ok: (msg: string) => console.log(`${tag} ${kleur.green('✓')} ${msg}`),
  warn: (msg: string) => console.log(`${tag} ${kleur.yellow('!')} ${msg}`),
  dim: (msg: string) => console.log(`${tag} ${kleur.dim(msg)}`),
  done: (msg: string) => console.log(`${tag} ${kleur.bold().green(msg)}`),
  error: (msg: string) => console.error(`${tag} ${kleur.red('✗')} ${msg}`)
};
