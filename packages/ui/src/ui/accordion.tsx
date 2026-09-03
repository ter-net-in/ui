'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { type ContainerRadiusProps, cn, containerRadiusVariants } from '@/lib/utils';

const accordionVariants = cva('w-full', {
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

export interface AccordionProps
  extends React.ComponentProps<typeof BaseAccordion.Root>,
    VariantProps<typeof accordionVariants>,
    ContainerRadiusProps {}

export function Accordion({ className, variant, radius, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cn(
        accordionVariants({ variant }),
        // The root is the element with the border, so it owns the radius. Items
        // are clipped to it — rounding an item on its own does nothing, because
        // the root's square corners still draw over it.
        'overflow-hidden',
        variant !== 'ghost' && '[&>[data-slot=accordion-item]]:!rounded-none',
        containerRadiusVariants({ radius }),
        className
      )}
      {...props}
    />
  );
}

/**
 * `radius` here only shows up on the `ghost` variant, where items are separate
 * surfaces. Inside the default bordered `Accordion` the root's radius wins — set
 * it there instead.
 */
export function AccordionItem({
  className,
  radius,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Item> & ContainerRadiusProps) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn('border-b border-border last:border-b-0', containerRadiusVariants({ radius }), className)}
      {...props}
    />
  );
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
          'flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium tracking-[-0.01em] outline-none transition-colors',
          'hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
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
        // This panel animates in CSS rather than with Motion, and it has to.
        // Base UI measures the content and publishes the target height as
        // `--accordion-panel-height`, then removes the panel from the DOM once
        // its CSS transition finishes. Motion starts its animations in an effect
        // after paint, which is too late for that check — the panel is already
        // gone, so a collapse never plays. A CSS transition is declared up front
        // and is visible to Base UI immediately, so it animates both ways.
        //
        // `overflow-hidden` makes the height change read as a reveal instead of a
        // squash: the content keeps its natural size and is clipped as it grows.
        'h-[var(--accordion-panel-height)] overflow-hidden bg-secondary text-sm text-muted-foreground',
        'transition-[height,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
        'data-[starting-style]:h-0 data-[starting-style]:opacity-0',
        'data-[ending-style]:h-0 data-[ending-style]:opacity-0',
        '[&>*]:px-4 [&>*]:py-3',
        className
      )}
      {...props}
    />
  );
}

export { accordionVariants };
