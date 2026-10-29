'use client';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import type * as React from 'react';
import { cn } from '@/lib/utils';
export function Progress({ className, children, ...props }: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root className={cn('flex w-full flex-col gap-1', className)} {...props}>
      <BaseProgress.Track
        className={cn('h-2 w-full overflow-hidden border border-border bg-secondary', 'rounded-full')}
      >
        {/*
          Width stays in CSS: Base UI writes the filled width as an inline style
          from the current value, and a transition on that property is what makes
          value changes glide instead of jumping. Motion would need to own the
          width to animate it, and it has no access to the value.
        */}
        <BaseProgress.Indicator
          className={cn(
            'h-full bg-primary',
            'transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'data-[indeterminate]:w-1/3 data-[indeterminate]:animate-[progress-indeterminate_1.2s_ease-in-out_infinite]'
          )}
        />
      </BaseProgress.Track>
      {children}
    </BaseProgress.Root>
  );
}
export function ProgressLabel({ className, ...props }: React.ComponentProps<typeof BaseProgress.Label>) {
  return (
    <BaseProgress.Label
      className={cn('text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground', className)}
      {...props}
    />
  );
}
export function ProgressValue({ className, ...props }: React.ComponentProps<typeof BaseProgress.Value>) {
  return <BaseProgress.Value className={cn('text-xs tabular-nums text-muted-foreground', className)} {...props} />;
}
