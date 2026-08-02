'use client';

import { Meter as BaseMeter } from '@base-ui/react/meter';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function Meter({ className, children, ...props }: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root className={cn('flex w-full flex-col gap-1', className)} {...props}>
      <BaseMeter.Track className="h-2 w-full overflow-hidden border border-border bg-background">
        <BaseMeter.Indicator className="h-full bg-primary" />
      </BaseMeter.Track>
      {children}
    </BaseMeter.Root>
  );
}

export function MeterLabel({ className, ...props }: React.ComponentProps<typeof BaseMeter.Label>) {
  return (
    <BaseMeter.Label
      className={cn('text-xs font-medium uppercase tracking-wide text-muted-foreground', className)}
      {...props}
    />
  );
}

export function MeterValue({ className, ...props }: React.ComponentProps<typeof BaseMeter.Value>) {
  return <BaseMeter.Value className={cn('text-xs tabular-nums text-muted-foreground', className)} {...props} />;
}
