'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function Accordion({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Root>) {
  return <BaseAccordion.Root className={cn('w-full border border-border', className)} {...props} />;
}

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Item>) {
  return <BaseAccordion.Item className={cn('border-b border-border last:border-b-0', className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Header>
      <BaseAccordion.Trigger
        className={cn(
          'flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium uppercase tracking-wide outline-none transition-colors',
          'hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
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
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export function AccordionPanel({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      className={cn(
        'overflow-hidden text-sm text-muted-foreground transition-[height] [&>*]:px-4 [&>*]:pb-3',
        className
      )}
      {...props}
    />
  );
}
