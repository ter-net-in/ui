'use client';

import { Progress as BaseProgress } from '@base-ui/react/progress';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function Progress({ className, children, ...props }: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root className={cn('flex w-full flex-col gap-1', className)} {...props}>
      <BaseProgress.Track className="h-2 w-full overflow-hidden border border-border bg-background">
        <BaseProgress.Indicator className="h-full bg-primary transition-all" />
      </BaseProgress.Track>
      {children}
    </BaseProgress.Root>
  );
}

export function ProgressLabel({ className, ...props }: React.ComponentProps<typeof BaseProgress.Label>) {
  return (
    <BaseProgress.Label
      className={cn('text-xs font-medium uppercase tracking-wide text-muted-foreground', className)}
      {...props}
    />
  );
}

export function ProgressValue({ className, ...props }: React.ComponentProps<typeof BaseProgress.Value>) {
  return <BaseProgress.Value className={cn('text-xs tabular-nums text-muted-foreground', className)} {...props} />;
}
