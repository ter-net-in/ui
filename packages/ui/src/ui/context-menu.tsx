'use client';

import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type * as React from 'react';

import { useMotionPopupRender } from '@/lib/motion';
import { type ContainerRadiusProps, cn, containerRadiusVariants, contentRadiusStyle, NESTED_RADIUS } from '@/lib/utils';

export const ContextMenu = BaseContextMenu.Root;
export const ContextMenuTrigger = BaseContextMenu.Trigger;
export const ContextMenuGroup = BaseContextMenu.Group;

export function ContextMenuContent({
  className,
  children,
  radius,
  style,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Popup> & ContainerRadiusProps) {
  // Anchored to the pointer, so it grows from the click point with no slide.
  const renderPopup = useMotionPopupRender({ scale: 0.95, offset: 0 });

  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className="z-50 outline-none">
        <BaseContextMenu.Popup
          style={{ ...contentRadiusStyle(radius), ...style }}
          className={cn(
            'min-w-40 border border-border bg-popover p-1 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            '[transform-origin:var(--transform-origin)]',
            containerRadiusVariants({ radius }),
            className
          )}
          render={renderPopup}
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
        'flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 text-sm outline-none',
        NESTED_RADIUS,
        'data-[highlighted]:bg-foreground data-[highlighted]:text-background',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className
      )}
      {...props}
    />
  );
}

export function ContextMenuSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}
