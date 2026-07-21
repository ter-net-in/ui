'use client';

import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNavigationMenu.Root>) {
  return (
    <BaseNavigationMenu.Root className={cn('relative', className)} {...props}>
      {children}
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner className="z-50" sideOffset={8}>
          <BaseNavigationMenu.Popup className="border border-border bg-popover p-2 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0">
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
  return <BaseNavigationMenu.Content className={cn('w-max', className)} {...props} />;
}

export function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Link>) {
  return (
    <BaseNavigationMenu.Link
      className={cn('block px-3 py-2 text-sm outline-none hover:bg-muted focus-visible:bg-muted', className)}
      {...props}
    />
  );
}
