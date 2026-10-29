import type * as React from 'react';
import { cn } from '@/lib/utils';

export function Sidebar({ className, ...props }: React.ComponentProps<'aside'>) {
  return <aside className={cn('flex w-56 shrink-0 flex-col border-r border-border bg-card', className)} {...props} />;
}
export function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4', className)}
      {...props}
    />
  );
}
export function SidebarContent({ className, ...props }: React.ComponentProps<'nav'>) {
  return <nav className={cn('min-h-0 flex-1 space-y-1 overflow-y-auto p-2', className)} {...props} />;
}
export function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('shrink-0 border-t border-border p-4 text-xs text-muted-foreground', className)} {...props} />
  );
}
const itemClass =
  'ui-control flex min-h-9 w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:shrink-0';
export function SidebarLink({ active, className, ...props }: React.ComponentProps<'a'> & { active?: boolean }) {
  return (
    <a
      aria-current={active ? 'page' : undefined}
      className={cn(itemClass, active && 'bg-accent font-medium text-accent-foreground', className)}
      {...props}
    />
  );
}
export function SidebarButton({ active, className, ...props }: React.ComponentProps<'button'> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(itemClass, 'cursor-pointer', active && 'bg-accent font-medium text-accent-foreground', className)}
      {...props}
    />
  );
}
