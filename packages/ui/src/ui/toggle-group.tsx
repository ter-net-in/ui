'use client';

import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import type * as React from 'react';

import { type ContainerRadiusProps, cn, containerRadiusVariants } from '@/lib/utils';

export function ToggleGroup({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseToggleGroup> & ContainerRadiusProps) {
  return (
    <BaseToggleGroup
      className={cn(
        'inline-flex items-center gap-0 overflow-hidden border border-border [&>*]:border-0 [&>*+*]:border-l',
        containerRadiusVariants({ radius }),
        className
      )}
      {...props}
    />
  );
}
