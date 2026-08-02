'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type * as React from 'react';

import { transitions, useMotionPopupRender } from '@/lib/motion';
import { type ContainerRadiusProps, cn, containerRadiusVariants } from '@/lib/utils';

/**
 * Base UI waits 600ms before showing a tooltip. That's long enough that a hover
 * feels like nothing happened, so both the provider and the root default to
 * something snappier here. Pass `delay`/`closeDelay` to override.
 *
 * `closeDelay` is deliberately non-zero: it lets the pointer cross the gap between
 * trigger and popup without the tooltip flickering out.
 */
const OPEN_DELAY = 200;
const CLOSE_DELAY = 100;

export function TooltipProvider({
  delay = OPEN_DELAY,
  closeDelay = CLOSE_DELAY,
  ...props
}: BaseTooltip.Provider.Props) {
  return <BaseTooltip.Provider delay={delay} closeDelay={closeDelay} {...props} />;
}

export const Tooltip = BaseTooltip.Root;

/**
 * Carries the same delay default as {@link TooltipProvider}, so a tooltip used
 * without a provider is just as responsive. A provider, when present, still wins
 * for grouping behaviour.
 */
export function TooltipTrigger({ delay = OPEN_DELAY, ...props }: BaseTooltip.Trigger.Props) {
  return <BaseTooltip.Trigger delay={delay} {...props} />;
}

export function TooltipContent({
  className,
  sideOffset = 8,
  children,
  radius,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup> & { sideOffset?: number } & ContainerRadiusProps) {
  // Tooltips are the lightest surface in the library: barely any scale, and a
  // faster curve than the rest, since they follow the pointer around.
  const renderPopup = useMotionPopupRender({
    scale: 0.94,
    offset: 3,
    transition: { duration: transitions.fade.duration, ease: 'easeOut' }
  });

  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={sideOffset} className="z-50">
        <BaseTooltip.Popup
          className={cn(
            'border border-border bg-foreground px-2 py-1 text-xs font-medium uppercase tracking-wide text-background',
            '[transform-origin:var(--transform-origin)]',
            containerRadiusVariants({ radius }),
            className
          )}
          render={renderPopup}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
