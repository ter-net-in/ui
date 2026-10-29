'use client';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { type HTMLMotionProps, motion } from 'motion/react';
import type * as React from 'react';
import { transitions, useControlTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';
export function Checkbox({ className, ...props }: React.ComponentProps<typeof BaseCheckbox.Root>) {
  const transition = useControlTransition();
  return (
    <BaseCheckbox.Root
      className={cn(
        'flex size-5 shrink-0 items-center justify-center border border-input bg-background outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'rounded-control',
        className
      )}
      {...props}
    >
      {/*
          `keepMounted` so the tick can animate both ways. Without it Base UI drops
          the indicator from the DOM the moment the box is unticked, and there's
          nothing left to animate out.
        */}
      <BaseCheckbox.Indicator
        keepMounted
        className="flex text-current"
        render={(indicatorProps, state) => (
          <motion.span
            {...(indicatorProps as HTMLMotionProps<'span'>)}
            initial={false}
            animate={{ opacity: state.checked ? 1 : 0, scale: state.checked ? 1 : 0.6 }}
            transition={transition}
          >
            <svg
              viewBox="0 0 16 16"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              aria-hidden="true"
            >
              {/* The tick draws itself on rather than just fading in. */}
              <motion.path
                d="M3 8l3.5 3.5L13 4"
                strokeLinecap="square"
                initial={false}
                animate={{ pathLength: state.checked ? 1 : 0 }}
                transition={state.checked ? transitions.enter : transitions.exit}
              />
            </svg>
          </motion.span>
        )}
      />
    </BaseCheckbox.Root>
  );
}
