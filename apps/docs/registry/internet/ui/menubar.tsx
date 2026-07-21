'use client';

import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function Menubar({ className, ...props }: React.ComponentProps<typeof BaseMenubar>) {
  return (
    <BaseMenubar
      className={cn('flex items-center gap-0 border border-border bg-background [&>*+*]:border-l', className)}
      {...props}
    />
  );
}
