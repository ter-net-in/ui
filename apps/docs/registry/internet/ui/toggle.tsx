'use client';

import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function Toggle({ className, ...props }: React.ComponentProps<typeof BaseToggle>) {
  return (
    <BaseToggle
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 border border-border bg-background px-3 text-sm font-medium uppercase tracking-wide text-foreground outline-none transition-colors',
        'hover:bg-muted',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'data-[pressed]:bg-foreground data-[pressed]:text-background',
        'disabled:pointer-events-none disabled:opacity-40',
        className
      )}
      {...props}
    />
  );
}
