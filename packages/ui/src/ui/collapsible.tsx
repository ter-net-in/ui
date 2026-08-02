'use client';

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { type ContainerRadiusProps, cn, containerRadiusVariants } from '@/lib/utils';

const collapsibleVariants = cva('', {
  variants: {
    variant: {
      default: 'border border-border',
      ghost: 'border-none bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface CollapsibleProps
  extends React.ComponentProps<typeof BaseCollapsible.Root>,
    VariantProps<typeof collapsibleVariants> {}

export function Collapsible({ className, variant, ...props }: CollapsibleProps) {
  return <BaseCollapsible.Root className={cn(collapsibleVariants({ variant }), className)} {...props} />;
}

export function CollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Trigger>) {
  return (
    <BaseCollapsible.Trigger
      className={cn(
        'flex items-center justify-between gap-2 text-sm font-medium uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-ring',
        '[&>svg]:transition-transform [&[data-panel-open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        className="size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </BaseCollapsible.Trigger>
  );
}

export function CollapsiblePanel({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Panel> & ContainerRadiusProps) {
  return (
    <BaseCollapsible.Panel
      className={cn(
        // CSS rather than Motion, for the reason spelled out in accordion.tsx:
        // Base UI unmounts this panel when its CSS transition ends, and Motion's
        // animations start too late to be seen by that check.
        'h-[var(--collapsible-panel-height)] overflow-hidden text-sm text-muted-foreground',
        'transition-[height,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
        'data-[starting-style]:h-0 data-[starting-style]:opacity-0',
        'data-[ending-style]:h-0 data-[ending-style]:opacity-0',
        containerRadiusVariants({ radius }),
        className
      )}
      {...props}
    />
  );
}

export { collapsibleVariants };
