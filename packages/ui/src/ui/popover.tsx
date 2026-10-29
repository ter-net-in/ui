'use client';
import { Popover as BasePopover } from '@base-ui/react/popover';
import type * as React from 'react';
import { useMotionPopupRender } from '@/lib/motion';
import { cn } from '@/lib/utils';
export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;
export function PopoverContent({
  className,
  children,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup> & {
  sideOffset?: number;
}) {
  const renderPopup = useMotionPopupRender();
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset} className="z-50">
        <BasePopover.Popup
          className={cn(
            'w-72 border border-border bg-popover p-3 text-popover-foreground outline-none',
            'shadow-popup',
            // Grow out of the anchor rather than the popup's own centre.
            '[transform-origin:var(--transform-origin)]',
            'rounded-surface',
            className
          )}
          render={renderPopup}
          {...props}
        >
          <BasePopover.Arrow
            className={cn(
              'size-2.5 rotate-45 border border-border bg-popover',
              'data-[side=top]:bottom-[-5px] data-[side=bottom]:top-[-5px]',
              'data-[side=left]:right-[-5px] data-[side=right]:left-[-5px]'
            )}
          />
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
export function PopoverTitle({ className, ...props }: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title className={cn('text-sm font-semibold leading-none tracking-[-0.01em]', className)} {...props} />
  );
}
export function PopoverDescription({ className, ...props }: React.ComponentProps<typeof BasePopover.Description>) {
  return <BasePopover.Description className={cn('text-sm leading-6 text-muted-foreground', className)} {...props} />;
}
