'use client';

import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Combobox = BaseCombobox.Root;
export const ComboboxValue = BaseCombobox.Value;

export function ComboboxInput({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Input>) {
  return (
    <BaseCombobox.Input
      className={cn(
        'flex h-10 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      {...props}
    />
  );
}

export function ComboboxContent({
  className,
  children,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & { sideOffset?: number }) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} className="z-50">
        <BaseCombobox.Popup
          className={cn(
            'max-h-64 min-w-[var(--anchor-width)] overflow-y-auto border border-border bg-popover p-1 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            'transition-opacity duration-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            className
          )}
          {...props}
        >
          <BaseCombobox.Empty className="px-3 py-2 text-sm text-muted-foreground">No results.</BaseCombobox.Empty>
          <BaseCombobox.List>{children}</BaseCombobox.List>
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export function ComboboxItem({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      className={cn(
        'flex cursor-pointer select-none items-center justify-between gap-2 px-3 py-1.5 text-sm outline-none data-[highlighted]:bg-foreground data-[highlighted]:text-background',
        className
      )}
      {...props}
    >
      {children}
      <BaseCombobox.ItemIndicator>✓</BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}
