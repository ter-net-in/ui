'use client';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'motion/react';
import type * as React from 'react';
import { transitions, useControlTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';
export const Tabs = BaseTabs.Root;
const tabsListVariants = cva('relative inline-flex items-center', {
  variants: {
    variant: {
      /** Bordered bar with a rule underneath the active tab. */
      default: 'gap-0 border border-border',
      /** Segmented control: a filled block slides between tabs. */
      muted: 'gap-1 bg-muted p-1',
      /** No chrome at all — just the tabs and the rule. */
      ghost: 'gap-1'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
/**
 * The indicator is the same element in every variant, restyled — which is what
 * lets it animate between tabs. The `muted` variant grows it to a full-height
 * block behind the active tab instead of a rule beneath it.
 */
const tabsIndicatorVariants = cva('absolute left-0 z-0', {
  variants: {
    variant: {
      default: 'bottom-0 h-0.5 bg-primary',
      muted: 'inset-y-1 border border-primary/20 bg-background',
      ghost: 'bottom-0 h-0.5 bg-primary'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
export type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>['variant']>;
export function TabsList({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<typeof BaseTabs.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <BaseTabs.List className={cn(tabsListVariants({ variant }), className)} {...props}>
      {children}
      <TabsIndicator variant={variant} />
    </BaseTabs.List>
  );
}
export function TabsIndicator({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof BaseTabs.Indicator> & VariantProps<typeof tabsIndicatorVariants>) {
  return (
    <BaseTabs.Indicator
      data-slot="tabs-indicator"
      className={cn(
        // Stays CSS rather than Motion: Base UI publishes the active tab's box as
        // CSS variables, and Motion can't re-run an animation when the value
        // behind a `var()` changes — the target string never changes. A CSS
        // transition re-reads the variable on every update, so it tracks properly.
        'w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)]',
        'transition-[translate,width] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
        tabsIndicatorVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}
export function TabsTab({ className, ...props }: React.ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        'relative z-10 cursor-pointer px-4 py-2 text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors outline-none',
        'hover:text-accent-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
        'data-[active]:text-primary',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className
      )}
      {...props}
    />
  );
}
export function TabsPanel({ className, ...props }: React.ComponentProps<typeof BaseTabs.Panel>) {
  const transition = useControlTransition(transitions.enter);
  return (
    <BaseTabs.Panel
      className={cn('mt-4 outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}
      render={(panelProps, state) => (
        <motion.div
          {...(panelProps as HTMLMotionProps<'div'>)}
          // Panels are unmounted while inactive (Base UI's default), so the
          // incoming one mounts fresh and needs a real `initial` to fade from.
          // `initial={false}` would land it at full opacity with nothing to play.
          // The panel reports `hidden` rather than an open flag.
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: state.hidden ? 0 : 1, y: state.hidden ? -4 : 0 }}
          transition={transition}
        />
      )}
      {...props}
    />
  );
}
export { tabsIndicatorVariants, tabsListVariants };
