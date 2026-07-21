import type { Config } from './config.js';

/**
 * Rewrite the authoring-time import aliases used in registry source into the
 * consumer's configured aliases.
 *
 *   "@/lib/utils"  -> config.aliases.utils
 *   "@/lib/<x>"    -> `${config.aliases.lib}/<x>`
 *   "@/ui/<x>"     -> `${config.aliases.ui}/<x>`
 */
export function transformImports(content: string, config: Config): string {
  const { aliases } = config;

  return content
    .replace(/(["'])@\/lib\/utils\1/g, (_m, q) => `${q}${aliases.utils}${q}`)
    .replace(/(["'])@\/lib\/([^"']+)\1/g, (_m, q, rest) => `${q}${aliases.lib}/${rest}${q}`)
    .replace(/(["'])@\/ui\/([^"']+)\1/g, (_m, q, rest) => `${q}${aliases.ui}/${rest}${q}`);
}
