'use client';

import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import type * as React from 'react';

import { type ContainerRadiusProps, cn, containerRadiusVariants } from '@/lib/utils';

export function Menubar({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseMenubar> & ContainerRadiusProps) {
  return (
    <BaseMenubar
      className={cn(
        'flex items-center gap-0 overflow-hidden border border-border bg-background [&>*+*]:border-l',
        containerRadiusVariants({ radius }),
        className
      )}
      {...props}
    />
  );
}
