'use client';

import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function Fieldset({ className, ...props }: React.ComponentProps<typeof BaseFieldset.Root>) {
  return <BaseFieldset.Root className={cn('flex flex-col gap-4 border border-border p-4', className)} {...props} />;
}

export function FieldsetLegend({ className, ...props }: React.ComponentProps<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      className={cn('px-1 text-sm font-bold uppercase tracking-wide text-foreground', className)}
      {...props}
    />
  );
}
