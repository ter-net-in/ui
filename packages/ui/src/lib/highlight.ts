/**
 * Tiny syntax highlighter for the Code component.
 *
 * Deliberately not a parser. It scans left to right and takes the first rule that
 * matches at the cursor, which is enough for the snippets a docs page shows — an
 * install command, an import, a config object. Long or unusual code will come out
 * subtly wrong in places, and that's the trade for shipping zero dependencies
 * instead of pulling a grammar-based highlighter into a copy-paste component.
 *
 * The token stream is lossless: joining every `value` back together reproduces the
 * input exactly. That's what lets the copy button keep reading the rendered text.
 */

export type TokenKind = 'plain' | 'comment' | 'keyword' | 'literal' | 'name' | 'punctuation';

export interface Token {
  kind: TokenKind;
  value: string;
  /** Character offset in the source. Unique per token, so it keys rendered spans. */
  start: number;
}

/** Languages the `language` prop accepts. Aliases resolve onto a shared ruleset. */
export type Language =
  | 'shell'
  | 'bash'
  | 'sh'
  | 'zsh'
  | 'console'
  | 'js'
  | 'javascript'
  | 'jsx'
  | 'ts'
  | 'typescript'
  | 'tsx'
  | 'json'
  | 'css'
  | 'html';

interface Cursor {
  /** Character before the cursor; `undefined` at the start of the snippet. */
  previous: string | undefined;
  /** True when only whitespace stands between the cursor and the start of its line. */
  atLineStart: boolean;
}

interface Rule {
  kind: Exclude<TokenKind, 'plain'>;
  /**
   * Must carry the sticky flag. The scanner sets `lastIndex` and matches *at* the
   * cursor rather than searching ahead of it, so rule order decides precedence.
   */
  pattern: RegExp;
  /** Extra condition on where a match may start. */
  where?: (cursor: Cursor) => boolean;
}

/** Not in the middle of a word — keeps `1` in `h1` from reading as a number. */
const notInWord = ({ previous }: Cursor) => previous === undefined || !/[\w$]/.test(previous);

/** Preceded by whitespace — a shell flag or comment starts its own word. */
const afterSpace = ({ previous }: Cursor) => previous === undefined || /\s/.test(previous);

/**
 * Somewhere a JSX tag could legally open. Without this, the `<` of `a<b` reads as
 * the start of a `<b>` element.
 */
const beforeTag = ({ previous }: Cursor) => previous === undefined || /[\s([{},;=>:&|!?+]/.test(previous);

/** Shared by js, ts, jsx and tsx — the differences don't survive this level of detail. */
const JS_RULES: Rule[] = [
  { kind: 'comment', pattern: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
  { kind: 'literal', pattern: /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/y },
  {
    kind: 'keyword',
    pattern:
      /\b(?:as|async|await|break|case|catch|class|const|continue|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|new|of|private|protected|public|readonly|return|satisfies|static|switch|this|throw|try|type|typeof|var|void|while|yield)\b/y
  },
  { kind: 'literal', pattern: /\b(?:true|false|null|undefined|NaN|Infinity)\b/y },
  { kind: 'name', pattern: /<\/?[A-Za-z][\w.:-]*/y, where: beforeTag },
  { kind: 'literal', pattern: /0[xX][\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/y, where: notInWord },
  // A call, then anything else in PascalCase: components, classes, types.
  { kind: 'name', pattern: /[A-Za-z_$][\w$]*(?=\s*\()/y, where: notInWord },
  { kind: 'name', pattern: /[A-Z][\w$]*/y, where: notInWord },
  // Angle brackets are matched one at a time, and last. Folded into the run above
  // they'd swallow the `<` of `}</Code>` before the tag rule ever saw it.
  { kind: 'punctuation', pattern: /[{}[\]().,;:?!=+\-*/%&|^~]+/y },
  { kind: 'punctuation', pattern: /[<>]/y }
];

const SHELL_RULES: Rule[] = [
  { kind: 'comment', pattern: /#[^\n]*/y, where: afterSpace },
  { kind: 'literal', pattern: /'[^'\n]*'|"(?:[^"\\\n]|\\.)*"/y },
  { kind: 'name', pattern: /\$\{[^}\n]*\}|\$[A-Za-z_]\w*/y },
  {
    kind: 'keyword',
    pattern: /\b(?:case|do|done|elif|else|esac|export|fi|for|function|if|in|local|return|sudo|then|while)\b/y
  },
  { kind: 'keyword', pattern: /--?[A-Za-z][\w-]*/y, where: afterSpace },
  // The first word of a line is the program being run. Subcommands and paths after
  // it stay plain, which keeps a long command from turning into confetti.
  { kind: 'name', pattern: /[A-Za-z_][\w./-]*/y, where: ({ atLineStart }) => atLineStart },
  { kind: 'literal', pattern: /\d[\w.]*/y, where: notInWord },
  { kind: 'punctuation', pattern: /[|&;<>()]+/y }
];

const JSON_RULES: Rule[] = [
  { kind: 'name', pattern: /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y },
  { kind: 'literal', pattern: /"(?:[^"\\\n]|\\.)*"/y },
  { kind: 'keyword', pattern: /\b(?:true|false|null)\b/y },
  { kind: 'literal', pattern: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/y, where: notInWord },
  { kind: 'punctuation', pattern: /[{}[\],:]+/y }
];

const CSS_RULES: Rule[] = [
  { kind: 'comment', pattern: /\/\*[\s\S]*?\*\//y },
  { kind: 'keyword', pattern: /@[\w-]+/y },
  { kind: 'name', pattern: /--[\w-]+/y },
  { kind: 'literal', pattern: /'[^'\n]*'|"[^"\n]*"/y },
  { kind: 'literal', pattern: /#[0-9a-fA-F]{3,8}\b/y },
  { kind: 'name', pattern: /[a-zA-Z-][\w-]*(?=\s*:)/y, where: notInWord },
  { kind: 'name', pattern: /[\w-]+(?=\()/y, where: notInWord },
  { kind: 'literal', pattern: /-?(?:\d+\.?\d*|\.\d+)(?:[a-z%]+)?/y, where: notInWord },
  { kind: 'punctuation', pattern: /[{}()[\];:,.>+~*]+/y }
];

const HTML_RULES: Rule[] = [
  { kind: 'comment', pattern: /<!--[\s\S]*?-->/y },
  { kind: 'keyword', pattern: /<!\w+/y },
  { kind: 'name', pattern: /<\/?[a-zA-Z][\w-]*/y },
  { kind: 'literal', pattern: /"[^"\n]*"|'[^'\n]*'/y },
  { kind: 'keyword', pattern: /[a-zA-Z-][\w-]*(?=\s*=)/y, where: notInWord },
  { kind: 'punctuation', pattern: /[/=]+/y },
  { kind: 'punctuation', pattern: /[<>]/y }
];

const RULES = {
  shell: SHELL_RULES,
  js: JS_RULES,
  json: JSON_RULES,
  css: CSS_RULES,
  html: HTML_RULES
} as const;

const RULESET: Record<Language, keyof typeof RULES> = {
  shell: 'shell',
  bash: 'shell',
  sh: 'shell',
  zsh: 'shell',
  console: 'shell',
  js: 'js',
  javascript: 'js',
  jsx: 'js',
  ts: 'js',
  typescript: 'js',
  tsx: 'js',
  json: 'json',
  css: 'css',
  html: 'html'
};

function atLineStart(code: string, cursor: number) {
  for (let index = cursor - 1; index >= 0; index--) {
    const char = code[index];
    if (char === '\n') return true;
    if (char !== ' ' && char !== '\t') return false;
  }
  return true;
}

/**
 * Split `code` into coloured tokens. Unmatched text comes back as `plain` runs
 * rather than being dropped, so the result always reassembles into the input.
 */
export function tokenize(code: string, language: Language): Token[] {
  const rules = RULES[RULESET[language]];
  const tokens: Token[] = [];
  let cursor = 0;
  let plainStart = -1;

  function flushPlain(end: number) {
    if (plainStart < 0) return;
    tokens.push({ kind: 'plain', value: code.slice(plainStart, end), start: plainStart });
    plainStart = -1;
  }

  while (cursor < code.length) {
    const position: Cursor = {
      previous: cursor > 0 ? code[cursor - 1] : undefined,
      atLineStart: atLineStart(code, cursor)
    };

    let match: Token | undefined;
    for (const rule of rules) {
      if (rule.where && !rule.where(position)) continue;
      rule.pattern.lastIndex = cursor;
      const found = rule.pattern.exec(code);
      // A zero-length match would never advance the cursor.
      if (found && found[0].length > 0) {
        match = { kind: rule.kind, value: found[0], start: cursor };
        break;
      }
    }

    if (!match) {
      if (plainStart < 0) plainStart = cursor;
      cursor += 1;
      continue;
    }

    flushPlain(cursor);
    tokens.push(match);
    cursor += match.value.length;
  }

  flushPlain(code.length);
  return tokens;
}
