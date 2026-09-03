'use client';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type * as React from 'react';

import { cn, type RadiusProps, radiusVariants } from '@/lib/utils';

export function NumberField({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root> & RadiusProps) {
  return (
    <BaseNumberField.Root className={cn('inline-flex flex-col gap-1', className)} {...props}>
      <BaseNumberField.Group
        className={cn(
          'flex h-10 items-stretch overflow-hidden border border-input bg-background',
          radiusVariants({ radius })
        )}
      >
        <BaseNumberField.Decrement className="flex w-9 items-center justify-center border-r border-border text-lg outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
          −
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="w-16 bg-transparent px-2 text-center text-sm leading-5 tabular-nums outline-none" />
        <BaseNumberField.Increment className="flex w-9 items-center justify-center border-l border-border text-lg outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
          +
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
