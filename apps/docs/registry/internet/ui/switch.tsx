'use client';

import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border border-input bg-background transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'data-[checked]:border-primary data-[checked]:bg-primary',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          'block size-4 translate-x-1 bg-foreground transition-transform',
          'data-[checked]:translate-x-6 data-[checked]:bg-primary-foreground'
        )}
      />
    </BaseSwitch.Root>
  );
}
