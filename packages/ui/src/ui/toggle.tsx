'use client';

import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { type HTMLMotionProps, motion } from 'motion/react';
import type * as React from 'react';

import { useTapMotion } from '@/lib/motion';
import { cn, type RadiusProps, radiusVariants } from '@/lib/utils';

export function Toggle({ className, radius, ...props }: React.ComponentProps<typeof BaseToggle> & RadiusProps) {
  const tap = useTapMotion();

  return (
    <BaseToggle
      render={(toggleProps) => <motion.button {...(toggleProps as HTMLMotionProps<'button'>)} {...tap} />}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 border border-border bg-background px-3 text-sm font-medium uppercase tracking-wide text-foreground outline-none transition-colors',
        'hover:bg-muted',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'data-[pressed]:bg-foreground data-[pressed]:text-background',
        'disabled:pointer-events-none disabled:opacity-40',
        radiusVariants({ radius }),
        className
      )}
      {...props}
    />
  );
}
