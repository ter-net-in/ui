'use client';

import { Popover as BasePopover } from '@base-ui/react/popover';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

export function PopoverContent({
  className,
  children,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup> & { sideOffset?: number }) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset} className="z-50">
        <BasePopover.Popup
          className={cn(
            'w-72 border border-border bg-popover p-4 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            'transition-all duration-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            className
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export function PopoverTitle({ className, ...props }: React.ComponentProps<typeof BasePopover.Title>) {
  return <BasePopover.Title className={cn('text-sm font-bold uppercase tracking-wide', className)} {...props} />;
}

export function PopoverDescription({ className, ...props }: React.ComponentProps<typeof BasePopover.Description>) {
  return <BasePopover.Description className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
