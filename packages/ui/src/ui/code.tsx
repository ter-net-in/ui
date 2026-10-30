'use client';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'motion/react';
import * as React from 'react';
import { type Language, type TokenKind, tokenize } from '@/lib/highlight';
import { useTapMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

const codeVariants = cva('flex w-full min-w-0 flex-col overflow-hidden font-mono font-medium', {
  variants: {
    variant: {
      default: 'border-l-[3px] border-l-primary bg-primary/[0.06] text-foreground',
      outline: 'border border-border border-l-[3px] border-l-primary bg-background text-primary',
      muted: 'border-l-[3px] border-l-border bg-muted text-foreground',
      ghost: 'border-l-[3px] border-l-transparent bg-transparent text-foreground'
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});
/**
 * How each size packs its rows. Separate from the cva above, which only sets the
 * type scale and the box's colours — these are the metrics the header, the snippet
 * row and the copy button have to agree on.
 *
 *  header  the title strip, deliberately tighter than the snippet row
 *  row     the snippet row
 *  inset   tightens whichever row holds the copy button, since the button carries
 *          its own optical padding around the icon
 *  button  the button box; the negative margin lets a button taller than the line
 *          it sits on bleed into the row's padding instead of growing the row
 *  label   the title's own type scale — meta text, a step down from the code
 */
const SIZES = {
  sm: {
    header: 'px-2.5 py-1',
    row: 'gap-1.5 px-2.5 py-1.5',
    inset: 'pr-1',
    button: '-my-1 size-6 [&_svg]:size-3.5',
    label: 'text-xs'
  },
  default: {
    header: 'px-3 py-1.5',
    row: 'gap-2 px-3 py-2',
    inset: 'pr-1.5',
    button: '-my-1 size-7 [&_svg]:size-4',
    label: 'text-xs'
  },
  lg: {
    header: 'px-4 py-2',
    row: 'gap-2.5 px-4 py-3',
    inset: 'pr-2',
    button: '-my-1 size-8 [&_svg]:size-4.5',
    label: 'text-sm'
  }
} as const;
/**
 * `whitespace-pre` is the whole difference between the two modes: a block keeps
 * its line breaks, and a one-liner is forbidden from wrapping — it scrolls
 * sideways instead, so the row keeps its height and the copy button never moves.
 */
const CONTENT = 'min-w-0 flex-1 overflow-x-auto whitespace-pre';
const HEADER = 'flex items-center justify-between gap-2 border-b border-border font-semibold tracking-[-0.01em]';
/**
 * Token colours. Three inks and no more, defined in the theme: the house blue for
 * language keywords, a violet for names, a green for literals. Comments and
 * punctuation recede into grey, and anything unclassified stays ink.
 */
const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: '',
  comment: 'font-normal text-muted-foreground',
  keyword: 'text-syntax-keyword',
  literal: 'text-syntax-literal',
  name: 'text-syntax-name',
  punctuation: 'text-muted-foreground'
};
/**
 * The confirmed state borrows --syntax-keyword rather than --primary: it's the
 * same house blue in light mode, but lifted in dark, where #0047ff as a 16px icon
 * on black sits at about 2.3:1.
 */
const COPY_BUTTON =
  'inline-flex shrink-0 cursor-pointer items-center justify-center border border-transparent text-current transition-colors outline-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-40 data-[copied]:text-syntax-keyword [&_svg]:shrink-0';
function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M11.5 6V2.5H2.5v9H6" />
      <rect x="6" y="6" width="7.5" height="7.5" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}
export interface CodeCopyButtonProps extends Omit<React.ComponentProps<typeof BaseButton>, 'children'> {
  /** Text to copy. Falls back to the text content of `target`. */
  code?: string;
  /** Element whose text content is copied when `code` isn't given. */
  target?: React.RefObject<HTMLElement | null>;
  /** Called with the text that reached the clipboard. Not called on a failed write. */
  onCopied?: (code: string) => void;
  /**
   * Accessible name.
   * @default 'Copy code'
   */
  label?: string;
  /**
   * Accessible name and announcement once the text is on the clipboard.
   * @default 'Copied'
   */
  copiedLabel?: string;
  /**
   * How long the confirmation state stays on screen, in ms.
   * @default 2000
   */
  copiedDuration?: number;
}
/**
 * Copy-to-clipboard button. Rendered inside {@link Code} by default; export is
 * for placing one somewhere else — a card header, a table row — against a
 * `target` element or an explicit `code` string.
 */
export function CodeCopyButton({
  className,
  code,
  target,
  onCopied,
  label = 'Copy code',
  copiedLabel = 'Copied',
  copiedDuration = 2000,
  onClick,
  ...props
}: CodeCopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const tap = useTapMotion();
  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), copiedDuration);
    return () => window.clearTimeout(timer);
  }, [copied, copiedDuration]);
  async function writeToClipboard() {
    const text = code ?? target?.current?.textContent ?? '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard writes are refused outside a secure context, and under some
      // permission policies. Leave the button alone rather than confirm a copy
      // that never landed.
      return;
    }
    setCopied(true);
    onCopied?.(text);
  }
  return (
    <BaseButton
      aria-label={copied ? copiedLabel : label}
      data-copied={copied || undefined}
      className={cn(COPY_BUTTON, className)}
      onClick={(event) => {
        onClick?.(event);
        void writeToClipboard();
      }}
      render={(buttonProps) => <motion.button {...(buttonProps as HTMLMotionProps<'button'>)} {...tap} />}
      {...props}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {/* A swapped aria-label isn't announced on a button that already has focus. */}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </BaseButton>
  );
}
export interface CodeProps extends React.ComponentProps<'div'>, VariantProps<typeof codeVariants> {
  /**
   * Text handed to the clipboard. Defaults to the rendered text content, so it
   * only needs setting when the children aren't the literal snippet — a
   * highlighted or truncated rendering, say.
   */
  code?: string;
  /**
   * Filename or label for the snippet, shown in a strip above it. The copy button
   * moves up into that strip, off the code itself.
   */
  title?: string;
  /**
   * Colour the snippet's syntax. Only applies to plain-string children: there's
   * nothing to tokenize in an already-rendered tree, so pass a string and let this
   * do the highlighting, or pass your own spans and leave it off.
   */
  language?: Language;
  /**
   * Render as a block that keeps its line breaks. Inferred from the snippet when
   * left unset: anything with a newline in it becomes a block, a one-liner stays
   * a single row. Set it explicitly when the children aren't a plain string.
   */
  multiline?: boolean;
  /**
   * Show the copy button.
   * @default true
   */
  copy?: boolean;
  /** Called with the text that reached the clipboard. */
  onCopied?: (code: string) => void;
}
/**
 * A command, token or snippet, with a copy button and optional syntax colouring.
 * Plain styled container — not a Base UI primitive.
 */
export function Code({
  className,
  variant,
  size,
  code,
  title,
  language,
  multiline,
  copy = true,
  onCopied,
  children,
  ...props
}: CodeProps) {
  const contentRef = React.useRef<HTMLElement | null>(null);
  const setContentRef = (element: HTMLElement | null) => {
    contentRef.current = element;
  };
  const source = typeof children === 'string' ? children : undefined;
  const block = multiline ?? (code ?? source)?.includes('\n') ?? false;
  const metrics = SIZES[size ?? 'default'];
  const tokens = React.useMemo(
    () => (language && source !== undefined ? tokenize(source, language) : undefined),
    [language, source]
  );
  // Plain runs stay bare strings: fewer elements, and the copy button reads the
  // same text content either way.
  const content = tokens
    ? tokens.map((token) =>
        token.kind === 'plain' ? (
          token.value
        ) : (
          <span key={token.start} className={TOKEN_CLASS[token.kind]}>
            {token.value}
          </span>
        )
      )
    : children;
  const copyButton = copy ? (
    <CodeCopyButton
      code={code}
      target={contentRef}
      onCopied={onCopied}
      label={title ? `Copy ${title}` : undefined}
      className={metrics.button}
    />
  ) : null;
  return (
    <div
      data-multiline={block || undefined}
      className={cn(codeVariants({ variant, size }), 'rounded-surface', className)}
      {...props}
    >
      {title ? (
        <div className={cn(HEADER, metrics.header, copy && metrics.inset)}>
          <span className={cn('truncate text-foreground', metrics.label)}>{title}</span>
          {copyButton}
        </div>
      ) : null}
      <div
        className={cn(
          'flex min-w-0',
          // A one-liner centres its copy button against the single row of text; a
          // block pins it to the first line so it stays put as the snippet grows.
          block ? 'items-start' : 'items-center',
          metrics.row,
          !title && copy && metrics.inset
        )}
      >
        {block ? (
          <pre ref={setContentRef} className={CONTENT}>
            <code>{content}</code>
          </pre>
        ) : (
          <code ref={setContentRef} className={CONTENT}>
            {content}
          </code>
        )}
        {title ? null : copyButton}
      </div>
    </div>
  );
}
/** Stacked snippets — a run of one-liners read as a sequence to type in order. */
export function CodeStack({ className, ...props }: React.ComponentProps<'div'>) {
  return <div role="group" className={cn('grid w-full gap-2', className)} {...props} />;
}
export { codeVariants };
