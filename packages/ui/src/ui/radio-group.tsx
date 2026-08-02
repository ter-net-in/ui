'use client';

import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'motion/react';
import type * as React from 'react';

import { useControlTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';

const radioGroupVariants = cva('flex gap-2', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row'
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
});

export interface RadioGroupProps
  extends React.ComponentProps<typeof BaseRadioGroup>,
    VariantProps<typeof radioGroupVariants> {}

export function RadioGroup({ className, orientation, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cn(radioGroupVariants({ orientation }), className)} {...props} />;
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof BaseRadio.Root>) {
  const transition = useControlTransition();

  return (
    <BaseRadio.Root
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'data-[checked]:border-primary',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className
      )}
      {...props}
    >
      {/* `keepMounted` so the dot can scale away as well as in — see checkbox.tsx. */}
      <BaseRadio.Indicator
        keepMounted
        className="size-2.5 rounded-full bg-primary"
        render={(indicatorProps, state) => (
          <motion.span
            {...(indicatorProps as HTMLMotionProps<'span'>)}
            initial={false}
            animate={{ opacity: state.checked ? 1 : 0, scale: state.checked ? 1 : 0 }}
            transition={transition}
          />
        )}
      />
    </BaseRadio.Root>
  );
}

export { radioGroupVariants };
