import type * as React from 'react';
import { cn } from '@/lib/utils';

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn('flex min-h-48 flex-col items-center justify-center gap-3 px-6 py-10 text-center', className)}
      {...props}
    >
      {icon && <div className="text-muted-foreground [&_svg]:size-7">{icon}</div>}
      <h2 className="text-base font-semibold">{title}</h2>
      {description && <p className="max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
