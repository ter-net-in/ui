'use client';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type * as React from 'react';
import { useMotionPopupRender } from '@/lib/motion';
import { cn } from '@/lib/utils';
export const PreviewCard = BasePreviewCard.Root;
export const PreviewCardTrigger = BasePreviewCard.Trigger;
export function PreviewCardContent({
  className,
  children,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Popup> & {
  sideOffset?: number;
}) {
  // Hover-triggered, so it travels a little further than a click-opened popover.
  const renderPopup = useMotionPopupRender({ offset: 6 });
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner sideOffset={sideOffset} className="z-50">
        <BasePreviewCard.Popup
          className={cn(
            'w-72 border border-border bg-popover p-4 text-popover-foreground shadow-popup outline-none',
            '[transform-origin:var(--transform-origin)]',
            'rounded-surface',
            className
          )}
          render={renderPopup}
          {...props}
        >
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
