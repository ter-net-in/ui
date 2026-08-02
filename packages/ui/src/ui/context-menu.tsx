'use client';

import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const ContextMenu = BaseContextMenu.Root;
export const ContextMenuTrigger = BaseContextMenu.Trigger;
export const ContextMenuGroup = BaseContextMenu.Group;

export function ContextMenuContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Popup>) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className="z-50 outline-none">
        <BaseContextMenu.Popup
          className={cn(
            'min-w-40 border border-border bg-popover p-1 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            'transition-opacity duration-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            className
          )}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

export function ContextMenuItem({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Item>) {
  return (
    <BaseContextMenu.Item
      className={cn(
        'flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 text-sm outline-none data-[highlighted]:bg-foreground data-[highlighted]:text-background data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className
      )}
      {...props}
    />
  );
}

export function ContextMenuSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}
