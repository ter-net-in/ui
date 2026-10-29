'use client';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import type * as React from 'react';
import { cn } from '@/lib/utils';
export function ToggleGroup({ className, ...props }: React.ComponentProps<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      className={cn(
        'inline-flex items-center gap-0 overflow-hidden border border-border [&>*]:rounded-none [&>*]:border-0 [&>*+*]:border-l',
        'rounded-surface',
        className
      )}
      {...props}
    />
  );
}
