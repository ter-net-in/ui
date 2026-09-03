'use client';

import { Menu as BaseMenu } from '@base-ui/react/menu';
import type * as React from 'react';

import { useMotionPopupRender } from '@/lib/motion';
import { type ContainerRadiusProps, cn, containerRadiusVariants, contentRadiusStyle, NESTED_RADIUS } from '@/lib/utils';

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuGroup = BaseMenu.Group;
export const SubmenuRoot = BaseMenu.SubmenuRoot;

export function MenuContent({
  className,
  children,
  sideOffset = 6,
  radius,
  style,
  ...props
}: React.ComponentProps<typeof BaseMenu.Popup> & { sideOffset?: number } & ContainerRadiusProps) {
  const renderPopup = useMotionPopupRender();

  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} className="z-50 outline-none">
        <BaseMenu.Popup
          style={{ ...contentRadiusStyle(radius), ...style }}
          className={cn(
            'min-w-40 border border-border bg-popover p-1 text-popover-foreground shadow-[0_10px_30px_var(--shadow-color)] outline-none',
            // Unfold from the trigger's edge instead of the popup's centre.
            '[transform-origin:var(--transform-origin)]',
            containerRadiusVariants({ radius }),
            className
          )}
          render={renderPopup}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

const itemClasses = cn(
  'flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 text-sm leading-5 outline-none',
  NESTED_RADIUS,
  'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40'
);

export function MenuItem({ className, ...props }: React.ComponentProps<typeof BaseMenu.Item>) {
  return <BaseMenu.Item className={cn(itemClasses, className)} {...props} />;
}

export function MenuGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      className={cn('px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground', className)}
      {...props}
    />
  );
}

export function MenuSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
}

export function MenuSubmenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger className={cn(itemClasses, 'justify-between', className)} {...props}>
      {children}
      {/* Signals that this item opens a submenu rather than performing an action. */}
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path d="M6 4l4 4-4 4" />
      </svg>
    </BaseMenu.SubmenuTrigger>
  );
}
