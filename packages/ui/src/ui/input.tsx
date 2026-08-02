'use client';

import { Input as BaseInput } from '@base-ui/react/input';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.ComponentProps<typeof BaseInput>;

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      className={cn(
        'flex h-10 w-full border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'data-[invalid]:border-destructive',
        className
      )}
      {...props}
    />
  );
}
