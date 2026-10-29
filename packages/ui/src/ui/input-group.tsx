import type * as React from 'react';
import { cn } from '@/lib/utils';

export function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('ui-input-group flex min-w-0 items-stretch [&>input]:min-w-0 [&>input]:flex-1', className)}
      {...props}
    />
  );
}
export function InputAddon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-control border border-input bg-muted px-3 text-sm text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
