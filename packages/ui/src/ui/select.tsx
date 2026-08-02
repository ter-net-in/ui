'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Select = BaseSelect.Root;
export const SelectValue = BaseSelect.Value;

export function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={cn(
        'flex h-10 w-full items-center justify-between gap-2 border border-input bg-background px-3 py-2 text-sm text-foreground outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="text-muted-foreground">▾</BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export function SelectContent({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={4} className="z-50">
        <BaseSelect.Popup
          className={cn(
            'min-w-[var(--anchor-width)] border border-border bg-popover p-1 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            'transition-opacity duration-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            className
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function SelectItem({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        'flex cursor-pointer items-center justify-between gap-2 px-3 py-1.5 text-sm outline-none select-none',
        'data-[highlighted]:bg-foreground data-[highlighted]:text-background',
        className
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator>✓</BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
