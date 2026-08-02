'use client';

import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof BaseRadioGroup>) {
  return <BaseRadioGroup className={cn('flex flex-col gap-2', className)} {...props} />;
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof BaseRadio.Root>) {
  return (
    <BaseRadio.Root
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'data-[checked]:border-primary',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator className="size-2.5 rounded-full bg-primary data-[unchecked]:hidden" />
    </BaseRadio.Root>
  );
}
