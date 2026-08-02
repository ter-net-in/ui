'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Tabs = BaseTabs.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn('relative inline-flex items-center gap-0 border border-border', className)}
      {...props}
    />
  );
}

export function TabsTab({ className, ...props }: React.ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        'px-4 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors outline-none',
        'hover:text-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
        'data-[selected]:bg-foreground data-[selected]:text-background',
        className
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: React.ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      className={cn('mt-4 outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}
      {...props}
    />
  );
}
