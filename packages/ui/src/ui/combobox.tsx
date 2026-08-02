'use client';

import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import type * as React from 'react';

import { useMotionPopupRender } from '@/lib/motion';
import {
  type ContainerRadiusProps,
  cn,
  containerRadiusVariants,
  contentRadiusStyle,
  NESTED_RADIUS,
  type RadiusProps,
  radiusVariants
} from '@/lib/utils';

export const Combobox = BaseCombobox.Root;
export const ComboboxValue = BaseCombobox.Value;

export function ComboboxInput({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & RadiusProps) {
  return (
    <BaseCombobox.Input
      className={cn(
        'flex h-10 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
        radiusVariants({ radius }),
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
  radius,
  style,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & { sideOffset?: number } & ContainerRadiusProps) {
  // A results list appearing under an input: no scale, it would look like a
  // zoom on text the user is actively reading. Just a short slide and fade.
  const renderPopup = useMotionPopupRender({ scale: 1, offset: 6 });

  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} className="z-50">
        <BaseCombobox.Popup
          // Publishes `--content-radius` so items can stay concentric with the popup.
          style={{ ...contentRadiusStyle(radius), ...style }}
          className={cn(
            'max-h-64 min-w-[var(--anchor-width)] overflow-y-auto border border-border bg-popover p-1 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            containerRadiusVariants({ radius }),
            className
          )}
          render={renderPopup}
          {...props}
        >
          <BaseCombobox.Empty className="px-3 py-2 text-sm text-muted-foreground empty:p-0">
            No results.
          </BaseCombobox.Empty>
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
        NESTED_RADIUS,
        className
      )}
      {...props}
    >
      {children}
      <BaseCombobox.ItemIndicator>✓</BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}
