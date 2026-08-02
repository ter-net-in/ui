'use client';

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Collapsible = BaseCollapsible.Root;

export function CollapsibleTrigger({ className, ...props }: React.ComponentProps<typeof BaseCollapsible.Trigger>) {
  return (
    <BaseCollapsible.Trigger
      className={cn(
        'flex items-center gap-2 text-sm font-medium uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    />
  );
}

export function CollapsiblePanel({ className, ...props }: React.ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      className={cn('overflow-hidden text-sm text-muted-foreground transition-[height]', className)}
      {...props}
    />
  );
}
