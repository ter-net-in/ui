'use client';

import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof BaseScrollArea.Root>) {
  return (
    <BaseScrollArea.Root className={cn('relative overflow-hidden', className)} {...props}>
      <BaseScrollArea.Viewport className="size-full overscroll-contain outline-none">
        {children}
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        className="flex w-2 touch-none select-none border-l border-border p-0.5"
      >
        <BaseScrollArea.Thumb className="w-full bg-muted-foreground/60" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar
        orientation="horizontal"
        className="flex h-2 touch-none select-none border-t border-border p-0.5"
      >
        <BaseScrollArea.Thumb className="h-full bg-muted-foreground/60" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}
