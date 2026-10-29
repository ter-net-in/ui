'use client';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import type * as React from 'react';
import { cn } from '@/lib/utils';
export function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof BaseScrollArea.Root>) {
  return (
    <BaseScrollArea.Root className={cn('relative overflow-hidden', 'rounded-surface', className)} {...props}>
      <BaseScrollArea.Viewport className="size-full overscroll-contain outline-none">
        {children}
      </BaseScrollArea.Viewport>
      {/*
          Scrollbars rest invisible and fade in while the pointer is over the area
          or the user is scrolling. Base UI reports both as data attributes, so this
          is a CSS transition rather than Motion — there's no mount/unmount to
          coordinate, and it keeps the scroll path free of React work.
        */}
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        className={cn(
          'flex w-2 touch-none select-none border-l border-border p-0.5',
          'opacity-0 transition-opacity duration-200 ease-out',
          'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
        )}
      >
        <BaseScrollArea.Thumb className="w-full bg-muted-foreground/60" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar
        orientation="horizontal"
        className={cn(
          'flex h-2 touch-none select-none border-t border-border p-0.5',
          'opacity-0 transition-opacity duration-200 ease-out',
          'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
        )}
      >
        <BaseScrollArea.Thumb className="h-full bg-muted-foreground/60" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  );
}
