'use client';

import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import type * as React from 'react';

import { useMotionPopupRender } from '@/lib/motion';
import {
  type ContainerRadiusProps,
  cn,
  containerRadiusVariants,
  contentRadiusStyle,
  NESTED_RADIUS,
  type RadiusProps,
  radiusVariants,
  type ShadowProps,
  shadowVariants
} from '@/lib/utils';

export const Autocomplete = BaseAutocomplete.Root;

export function AutocompleteInput({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Input> & RadiusProps) {
  return (
    <BaseAutocomplete.Input
      className={cn(
        'flex h-10 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
        radiusVariants({ radius }),
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
  radius,
  shadow,
  style,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Popup> & { sideOffset?: number } & ContainerRadiusProps & ShadowProps) {
  // Matches Combobox: slide and fade, no scale on a live results list.
  const renderPopup = useMotionPopupRender({ scale: 1, offset: 6 });

  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner sideOffset={sideOffset} className="z-50">
        <BaseAutocomplete.Popup
          // Publishes `--content-radius` so items can stay concentric with the popup.
          style={{ ...contentRadiusStyle(radius), ...style }}
          className={cn(
            'max-h-64 min-w-[var(--anchor-width)] overflow-y-auto border border-border bg-popover p-1 text-popover-foreground outline-none',
            shadowVariants({ shadow }),
            containerRadiusVariants({ radius }),
            className
          )}
          render={renderPopup}
          {...props}
        >
          <BaseAutocomplete.Empty className="px-3 py-2 text-sm text-muted-foreground empty:p-0">
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
        NESTED_RADIUS,
        className
      )}
      {...props}
    />
  );
}
