'use client';

import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import type * as React from 'react';

import { type ContainerRadiusProps, cn, containerRadiusVariants, type RadiusProps, radiusVariants } from '@/lib/utils';

export function Toolbar({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Root> & ContainerRadiusProps) {
  return (
    <BaseToolbar.Root
      className={cn(
        'flex items-center gap-1 border border-border bg-background p-1',
        containerRadiusVariants({ radius }),
        className
      )}
      {...props}
    />
  );
}

export const ToolbarGroup = BaseToolbar.Group;

export function ToolbarButton({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseToolbar.Button> & RadiusProps) {
  return (
    <BaseToolbar.Button
      className={cn(
        'inline-flex h-8 items-center justify-center gap-2 border border-transparent px-2 text-sm font-medium uppercase tracking-wide outline-none transition-colors',
        'hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[pressed]:bg-foreground data-[pressed]:text-background',
        'disabled:pointer-events-none disabled:opacity-40',
        radiusVariants({ radius }),
        className
      )}
      {...props}
    />
  );
}

export function ToolbarLink({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link
      className={cn('px-2 text-sm underline-offset-4 outline-none hover:underline focus-visible:underline', className)}
      {...props}
    />
  );
}

export function ToolbarSeparator({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Separator>) {
  return <BaseToolbar.Separator className={cn('mx-1 h-6 w-px bg-border', className)} {...props} />;
}
