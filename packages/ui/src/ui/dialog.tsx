'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type * as React from 'react';

import { useMotionBackdropRender, useMotionPopupRender } from '@/lib/motion';
import { type ContainerRadiusProps, cn, containerRadiusVariants, type ShadowProps, shadowVariants } from '@/lib/utils';

export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;
export const DialogPortal = BaseDialog.Portal;

export function DialogContent({
  className,
  children,
  radius,
  shadow,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup> & ContainerRadiusProps & ShadowProps) {
  const renderBackdrop = useMotionBackdropRender();
  // A dialog has no anchor to grow from, so it scales in place rather than sliding.
  const renderPopup = useMotionPopupRender({ scale: 0.97, offset: 0 });

  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-foreground/40" render={renderBackdrop} />
      <BaseDialog.Popup
        className={cn(
          // Tailwind centres with the standalone `translate` property, which
          // composes with the `transform` Motion writes — they don't collide.
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4',
          'border border-border bg-background p-6 outline-none',
          shadowVariants({ shadow }),
          containerRadiusVariants({ radius }),
          className
        )}
        render={renderPopup}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1', className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn('text-lg font-bold uppercase tracking-tight', className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
