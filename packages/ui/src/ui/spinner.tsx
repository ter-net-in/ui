'use client';
import { LoaderCircle } from 'lucide-react';
import type * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/ui/icon';

export function Spinner({
  label = 'Loading…',
  className,
  ...props
}: React.ComponentProps<'span'> & { label?: string }) {
  return (
    <span
      role="status"
      className={cn('inline-flex items-center gap-2 text-sm text-muted-foreground', className)}
      {...props}
    >
      <Icon icon={LoaderCircle} className="animate-spin motion-reduce:animate-none" />
      <span>{label}</span>
    </span>
  );
}
