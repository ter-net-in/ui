'use client';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import type * as React from 'react';
import { useMotionPopupRender } from '@/lib/motion';
import { cn, NESTED_RADIUS } from '@/lib/utils';
export const Combobox = BaseCombobox.Root;
export const ComboboxValue = BaseCombobox.Value;
export function ComboboxInput({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Input>) {
  return (
    <BaseCombobox.Input
      className={cn(
        'flex h-9 w-full border border-input bg-background px-3 py-2 text-sm leading-5 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
        'rounded-control',
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
  style,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Popup> & {
  sideOffset?: number;
}) {
  // A results list appearing under an input: no scale, it would look like a
  // zoom on text the user is actively reading. Just a short slide and fade.
  const renderPopup = useMotionPopupRender({ scale: 1, offset: 6 });
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} className="z-50">
        <BaseCombobox.Popup
          // Nested items follow the fixed popup corner treatment.
          style={style}
          className={cn(
            'max-h-64 min-w-[var(--anchor-width)] overflow-y-auto border border-border bg-popover p-1 text-popover-foreground shadow-popup outline-none',
            'rounded-surface',
            className
          )}
          render={renderPopup}
          {...props}
        >
          <BaseCombobox.Empty className="px-3 py-2 text-sm leading-5 text-muted-foreground empty:p-0">
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
        'flex cursor-pointer select-none items-center justify-between gap-2 px-3 py-1.5 text-sm leading-5 outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
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
