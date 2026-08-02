'use client';

import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const Drawer = BaseDrawer.Root;
export const DrawerTrigger = BaseDrawer.Trigger;
export const DrawerClose = BaseDrawer.Close;

export function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof BaseDrawer.Popup>) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        className={cn(
          'fixed inset-0 z-50 bg-foreground/40 transition-opacity duration-200',
          'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0'
        )}
      />
      <BaseDrawer.Popup
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-80 max-w-[90vw] flex-col gap-4 border-l border-border bg-background p-6 outline-none',
          'transition-transform duration-200 data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full',
          className
        )}
        {...props}
      >
        {children}
      </BaseDrawer.Popup>
    </BaseDrawer.Portal>
  );
}

export function DrawerTitle({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Title>) {
  return <BaseDrawer.Title className={cn('text-lg font-bold uppercase tracking-tight', className)} {...props} />;
}

export function DrawerDescription({ className, ...props }: React.ComponentProps<typeof BaseDrawer.Description>) {
  return <BaseDrawer.Description className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
