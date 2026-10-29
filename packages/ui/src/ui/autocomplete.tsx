'use client';
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import type * as React from 'react';
import { useMotionPopupRender } from '@/lib/motion';
import { cn, NESTED_RADIUS } from '@/lib/utils';
export const Autocomplete = BaseAutocomplete.Root;
export function AutocompleteInput({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Input>) {
  return (
    <BaseAutocomplete.Input
      className={cn(
        'flex h-9 w-full border border-input bg-background px-3 py-2 text-sm leading-5 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
        'rounded-control',
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
  style,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup> & {
  sideOffset?: number;
}) {
  // Matches Combobox: slide and fade, no scale on a live results list.
  const renderPopup = useMotionPopupRender({ scale: 1, offset: 6 });
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner sideOffset={sideOffset} className="z-50">
        <BaseAutocomplete.Popup
          // Nested items follow the fixed popup corner treatment.
          style={style}
          className={cn(
            'max-h-64 min-w-[var(--anchor-width)] overflow-y-auto border border-border bg-popover p-1 text-popover-foreground outline-none',
            'shadow-popup',
            'rounded-surface',
            className
          )}
          render={renderPopup}
          {...props}
        >
          <BaseAutocomplete.Empty className="px-3 py-2 text-sm leading-5 text-muted-foreground empty:p-0">
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
        'flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 text-sm leading-5 outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        NESTED_RADIUS,
        className
      )}
      {...props}
    />
  );
}
