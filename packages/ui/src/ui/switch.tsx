'use client';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { type HTMLMotionProps, motion } from 'motion/react';
import type * as React from 'react';
import { useControlTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Thumb travel, in px, matching `h-6 w-11` track and `size-4` thumb. */
const THUMB_OFF = 4;
const THUMB_ON = 24;
export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root>;
export function Switch({ className, ...props }: SwitchProps) {
  const transition = useControlTransition();
  return (
    <BaseSwitch.Root
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border border-input bg-background transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'data-[checked]:border-primary data-[checked]:bg-primary',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'rounded-full',
        className
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          'block size-4 bg-foreground transition-colors data-[checked]:bg-primary-foreground',
          'rounded-full'
        )}
        render={(thumbProps, state) => (
          <motion.span
            {...(thumbProps as HTMLMotionProps<'span'>)}
            // `initial={false}` so a switch that starts checked renders in place
            // instead of sliding across on first paint.
            initial={false}
            animate={{ x: state.checked ? THUMB_ON : THUMB_OFF }}
            transition={transition}
          />
        )}
      />
    </BaseSwitch.Root>
  );
}
