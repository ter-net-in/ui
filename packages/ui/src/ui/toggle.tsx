'use client';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { type HTMLMotionProps, motion } from 'motion/react';
import type * as React from 'react';
import { useTapMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
export function Toggle({ className, ...props }: React.ComponentProps<typeof BaseToggle>) {
  const tap = useTapMotion();
  return (
    <BaseToggle
      render={(toggleProps) => <motion.button {...(toggleProps as HTMLMotionProps<'button'>)} {...tap} />}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 border border-border bg-background px-3 text-sm font-medium tracking-[-0.01em] text-foreground outline-none transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'data-[pressed]:border-primary data-[pressed]:bg-primary data-[pressed]:text-primary-foreground',
        'disabled:pointer-events-none disabled:opacity-40',
        'rounded-control',
        className
      )}
      {...props}
    />
  );
}
