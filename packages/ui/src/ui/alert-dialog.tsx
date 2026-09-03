'use client';

import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import type * as React from 'react';

import { useMotionBackdropRender, useMotionPopupRender } from '@/lib/motion';
import { type ContainerRadiusProps, cn, containerRadiusVariants, type ShadowProps, shadowVariants } from '@/lib/utils';

export const AlertDialog = BaseAlertDialog.Root;
export const AlertDialogTrigger = BaseAlertDialog.Trigger;
export const AlertDialogClose = BaseAlertDialog.Close;

export function AlertDialogContent({
  className,
  children,
  radius,
  shadow,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup> & ContainerRadiusProps & ShadowProps) {
  const renderBackdrop = useMotionBackdropRender();
  // No anchor to grow from, so it scales in place rather than sliding.
  const renderPopup = useMotionPopupRender({ scale: 0.97, offset: 0 });

  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className="fixed inset-0 z-50 bg-foreground/40" render={renderBackdrop} />
      <BaseAlertDialog.Popup
        className={cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4',
          'border border-border bg-background p-5 outline-none',
          shadowVariants({ shadow }),
          containerRadiusVariants({ radius }),
          className
        )}
        render={renderPopup}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

export function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title
      className={cn('text-lg font-semibold leading-none tracking-[-0.02em]', className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description className={cn('text-sm leading-6 text-muted-foreground', className)} {...props} />
  );
}

export function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
}
