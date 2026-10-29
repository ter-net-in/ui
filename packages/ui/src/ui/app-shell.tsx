import type * as React from 'react';
import { cn } from '@/lib/utils';

export function AppShell({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex h-dvh min-h-0 flex-col overflow-hidden bg-background', className)} {...props} />;
}
export function AppHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn('flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4 sm:px-6', className)}
      {...props}
    />
  );
}
export function AppBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('relative flex min-h-0 min-w-0 flex-1', className)} {...props} />;
}
export function AppMain({ className, ...props }: React.ComponentProps<'main'>) {
  return <main className={cn('min-h-0 min-w-0 flex-1 overflow-y-auto', className)} {...props} />;
}
