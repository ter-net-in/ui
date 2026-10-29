import type * as React from 'react';
import { cn } from '@/lib/utils';

export function Spinner({
  label = 'Loading…',
  className,
  ...props
}: React.ComponentProps<'span'> & { label?: string }) {
  return (
    <span
      role="status"
      className={cn('inline-flex items-center gap-2 text-sm text-muted-foreground', className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 animate-spin motion-reduce:animate-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" opacity=".25" />
        <path d="M12 3a9 9 0 0 1 9 9" />
      </svg>
      <span>{label}</span>
    </span>
  );
}
