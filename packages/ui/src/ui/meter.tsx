'use client';
import { Meter as BaseMeter } from '@base-ui/react/meter';
import type * as React from 'react';
import { cn } from '@/lib/utils';
export function Meter({ className, children, ...props }: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root className={cn('flex w-full flex-col gap-1', className)} {...props}>
      <BaseMeter.Track className={cn('h-2 w-full overflow-hidden border border-border bg-secondary', 'rounded-full')}>
        {/* Width is CSS-driven for the same reason as Progress — see progress.tsx. */}
        <BaseMeter.Indicator className="h-full bg-primary transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]" />
      </BaseMeter.Track>
      {children}
    </BaseMeter.Root>
  );
}
export function MeterLabel({ className, ...props }: React.ComponentProps<typeof BaseMeter.Label>) {
  return (
    <BaseMeter.Label
      className={cn('text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground', className)}
      {...props}
    />
  );
}
export function MeterValue({ className, ...props }: React.ComponentProps<typeof BaseMeter.Value>) {
  return <BaseMeter.Value className={cn('text-xs tabular-nums text-muted-foreground', className)} {...props} />;
}
