'use client';

import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Autocomplete = BaseAutocomplete.Root;

export function AutocompleteInput({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Input>) {
  return (
    <BaseAutocomplete.Input
      className={cn(
        'flex h-10 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      {...props}
    />
  );
}

export function AutocompleteContent({
  className,
  children,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup> & { sideOffset?: number }) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner sideOffset={sideOffset} className="z-50">
        <BaseAutocomplete.Popup
          className={cn(
            'max-h-64 min-w-[var(--anchor-width)] overflow-y-auto border border-border bg-popover p-1 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            'transition-opacity duration-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            className
          )}
          {...props}
        >
          <BaseAutocomplete.Empty className="px-3 py-2 text-sm text-muted-foreground">
            No results.
          </BaseAutocomplete.Empty>
          <BaseAutocomplete.List>{children}</BaseAutocomplete.List>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

export function AutocompleteItem({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        'flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 text-sm outline-none data-[highlighted]:bg-foreground data-[highlighted]:text-background',
        className
      )}
      {...props}
    />
  );
}
