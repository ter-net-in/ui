'use client';

import { Menu as BaseMenu } from '@base-ui/react/menu';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuGroup = BaseMenu.Group;
export const SubmenuRoot = BaseMenu.SubmenuRoot;

export function MenuContent({
  className,
  children,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & { sideOffset?: number }) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} className="z-50 outline-none">
        <BaseMenu.Popup
          className={cn(
            'min-w-40 border border-border bg-popover p-1 text-popover-foreground shadow-[6px_6px_0_0_var(--color-foreground)] outline-none',
            'transition-opacity duration-100 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            className
          )}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

const itemClasses =
  'flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 text-sm outline-none data-[highlighted]:bg-foreground data-[highlighted]:text-background data-[disabled]:pointer-events-none data-[disabled]:opacity-40';

export function MenuItem({ className, ...props }: React.ComponentProps<typeof BaseMenu.Item>) {
  return <BaseMenu.Item className={cn(itemClasses, className)} {...props} />;
}

export function MenuGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      className={cn('px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground', className)}
      {...props}
    />
  );
}

export function MenuSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}

export function MenuSubmenuTrigger({ className, ...props }: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return <BaseMenu.SubmenuTrigger className={cn(itemClasses, 'justify-between', className)} {...props} />;
}
