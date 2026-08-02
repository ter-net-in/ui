'use client';

import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const PreviewCard = BasePreviewCard.Root;
export const PreviewCardTrigger = BasePreviewCard.Trigger;

export function PreviewCardContent({
  className,
  children,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Popup> & { sideOffset?: number }) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner sideOffset={sideOffset} className="z-50">
        <BasePreviewCard.Popup
          className={cn(
            'w-72 border border-border bg-popover p-4 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            'transition-all duration-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            className
          )}
          {...props}
        >
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
