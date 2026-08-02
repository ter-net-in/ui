'use client';

import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function ToggleGroup({ className, ...props }: React.ComponentProps<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      className={cn('inline-flex items-center gap-0 border border-border [&>*]:border-0 [&>*+*]:border-l', className)}
      {...props}
    />
  );
}
