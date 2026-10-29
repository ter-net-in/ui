'use client';
import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import type * as React from 'react';
import { cn } from '@/lib/utils';
/**
 * Base UI dismisses a drawer along `swipeDirection`, which defaults to `'down'`.
 * This drawer is styled as a right-hand panel, so the default would have the user
 * swiping down to dismiss a sheet that slides in horizontally, and would leave the
 * backdrop's swipe-progress fade inert — Base UI only reports movement along the
 * configured axis. Override it if you restyle the drawer to enter from another edge.
 */
export function Drawer({ swipeDirection = 'right', ...props }: React.ComponentProps<typeof BaseDrawer.Root>) {
  return <BaseDrawer.Root swipeDirection={swipeDirection} {...props} />;
}
export const DrawerTrigger = BaseDrawer.Trigger;
export const DrawerClose = BaseDrawer.Close;
export function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof BaseDrawer.Popup>) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        className={cn(
          'fixed inset-0 z-50 bg-foreground/40',
          // Base UI reports how far through a dismiss swipe the drawer is, as a
          // 0–1 scalar. Feeding it into opacity lets the scrim lift under the
          // finger instead of holding full strength until release.
          'opacity-[calc(1-var(--drawer-swipe-progress,0))]',
          'transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
          'data-[swiping]:transition-none'
        )}
      />
      {/*
          The viewport is required, not optional decoration: without it Base UI
          disables swipe-to-close and touch scroll locking outright, which would
          make the swipe-tracking styles below dead code.
        */}
      <BaseDrawer.Viewport className="fixed inset-y-0 right-0 z-50 flex">
        <BaseDrawer.Popup
          className={cn(
            'flex w-80 max-w-[90vw] flex-col gap-4 border-l border-border bg-background p-5 outline-none',
            // Drawer motion is CSS rather than Motion, and deliberately so: during a
            // swipe Base UI drives this element by writing `transform` directly, so
            // a `motion.div` — which owns `transform` — would stop the sheet
            // tracking the finger. See lib/motion.tsx for where Motion is used.
            //
            // Enter and exit are ours to animate, via `translate`. Base UI's drag
            // uses `transform`, and Tailwind compiles `translate-*` to the separate
            // `translate` property, so the two never overwrite each other. Don't add
            // `--drawer-swipe-movement-*` here: Base UI already applies that
            // movement itself, and reapplying it moves the drawer twice as far.
            'transition-[translate] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
            'data-[starting-style]:[translate:100%_0] data-[ending-style]:[translate:100%_0]',
            // No easing while the finger is down — the sheet must track it 1:1.
            'data-[swiping]:transition-none',
            'rounded-surface',
            'ui-drawer-content rounded-r-none [border-bottom-right-radius:0] [border-top-right-radius:0]',
            className
          )}
          {...props}
        >
          {children}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}
export function DrawerTitle({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title className={cn('text-lg font-semibold leading-none tracking-[-0.02em]', className)} {...props} />
  );
}
export function DrawerDescription({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Description>) {
  return <BaseDrawer.Description className={cn('text-sm leading-6 text-muted-foreground', className)} {...props} />;
}
