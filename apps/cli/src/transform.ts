import { type Config, type Defaults, resolveDefaults } from './config.js';

/** basename of the registry file whose values are substituted by {@link applyDefaults} */
export const DEFAULTS_FILE = 'ui-defaults.ts';

const ALLOWED: Record<keyof Defaults, readonly string[]> = {
  radius: ['none', 'sm', 'md', 'lg', 'full'],
  containerRadius: ['none', 'sm', 'md', 'lg'],
  shadow: ['none', 'sm', 'md', 'lg', 'xl']
};

/**
 * Bake the `defaults` block of internet-ui.json into lib/ui-defaults.ts.
 *
 * Substitution is anchored per line (`  radius: '...'`) rather than parsing the module,
 * which is safe because this file's shape is fixed by the registry. If a key ever stops
 * matching we throw instead of silently writing an unconfigured file.
 */
export function applyDefaults(content: string, config: Config): string {
  const defaults = resolveDefaults(config);
  let out = content;

  for (const key of Object.keys(ALLOWED) as Array<keyof Defaults>) {
    const value = defaults[key];
    if (!ALLOWED[key].includes(value)) {
      throw new Error(
        `internet-ui.json: defaults.${key} is "${value}"; expected one of ${ALLOWED[key].map((v) => `"${v}"`).join(', ')}.`
      );
    }
    // `radius` must not also match `containerRadius`, hence the line anchor
    const re = new RegExp(`^(\\s*${key}:\\s*')[^']*(')`, 'm');
    if (!re.test(out)) {
      throw new Error(
        `Could not substitute defaults.${key} into ${DEFAULTS_FILE} — the registry file's shape changed.`
      );
    }
    out = out.replace(re, `$1${value}$2`);
  }

  return out;
}

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
