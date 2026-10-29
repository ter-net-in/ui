'use client';
import { Select as BaseSelect } from '@base-ui/react/select';
import type * as React from 'react';
import { useMotionPopupRender } from '@/lib/motion';
import { cn, NESTED_RADIUS } from '@/lib/utils';
export const Select = BaseSelect.Root;
export const SelectValue = BaseSelect.Value;
export function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={cn(
        'flex h-9 w-full items-center justify-between gap-2 border border-input bg-background px-3 py-2 text-sm leading-5 text-foreground outline-none',
        'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'rounded-control',
        className
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="flex size-4 shrink-0 items-center justify-center text-muted-foreground">
        <svg
          viewBox="0 0 16 16"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}
export function SelectContent({ className, children, style, ...props }: React.ComponentProps<typeof BaseSelect.Popup>) {
  // Unlike other popups, Select stays mounted after the first interaction. The
  // same open-state-driven animation covers both cases — the first open plays
  // `initial`, later ones animate between the two variants.
  const renderPopup = useMotionPopupRender();
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={4} className="z-50">
        <BaseSelect.Popup
          // Nested items follow the fixed popup corner treatment.
          style={style}
          className={cn(
            'min-w-[var(--anchor-width)] border border-border bg-popover p-1 text-popover-foreground shadow-popup outline-none',
            '[transform-origin:var(--transform-origin)]',
            'rounded-surface',
            className
          )}
          render={renderPopup}
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
        'flex cursor-pointer items-center justify-between gap-2 px-3 py-1.5 text-sm leading-5 outline-none select-none',
        NESTED_RADIUS,
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        className
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="text-primary">
        <svg
          viewBox="0 0 16 16"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.25}
          aria-hidden="true"
        >
          <path d="M3 8l3 3 7-7" />
        </svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
