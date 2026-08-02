'use client';

import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import type * as React from 'react';

import { useMotionPopupRender } from '@/lib/motion';
import { type ContainerRadiusProps, cn, containerRadiusVariants } from '@/lib/utils';

export function NavigationMenu({
  className,
  children,
  radius,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Root> & ContainerRadiusProps) {
  const renderPopup = useMotionPopupRender({ scale: 0.98, offset: 6 });

  return (
    <BaseNavigationMenu.Root className={cn('relative', className)} {...props}>
      {children}
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner className="z-50" sideOffset={8}>
          <BaseNavigationMenu.Popup
            className={cn(
              'border border-border bg-popover text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
              // Base UI measures each panel and publishes the target box as CSS
              // variables (`auto` while a single panel is open, pixel values while
              // switching). Transitioning them is what makes the popup morph
              // between items of different sizes instead of snapping. Motion owns
              // opacity and transform for the enter/exit, so the two never contend
              // for the same properties.
              'h-[var(--popup-height)] w-[var(--popup-width)] overflow-hidden',
              'transition-[width,height] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
              '[transform-origin:var(--transform-origin)]',
              containerRadiusVariants({ radius })
            )}
            render={renderPopup}
          >
            <BaseNavigationMenu.Viewport />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}

export function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.List>) {
  return <BaseNavigationMenu.List className={cn('flex items-center gap-1', className)} {...props} />;
}

export const NavigationMenuItem = BaseNavigationMenu.Item;

export function NavigationMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Trigger>) {
  return (
    <BaseNavigationMenu.Trigger
      className={cn(
        'px-3 py-2 text-sm font-medium uppercase tracking-wide outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    />
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Content>) {
  return (
    <BaseNavigationMenu.Content
      className={cn(
        'w-max',
        // Panels cross-fade in the direction the user moved along the menu bar.
        'transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        'data-[activation-direction=left]:data-[starting-style]:-translate-x-1/4',
        'data-[activation-direction=right]:data-[starting-style]:translate-x-1/4',
        'data-[activation-direction=left]:data-[ending-style]:translate-x-1/4',
        'data-[activation-direction=right]:data-[ending-style]:-translate-x-1/4',
        className
      )}
      {...props}
    />
  );
}

export function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Link>) {
  return (
    <BaseNavigationMenu.Link
      className={cn('block px-3 py-2 text-sm outline-none hover:bg-muted focus-visible:bg-muted', className)}
      {...props}
    />
  );
}
