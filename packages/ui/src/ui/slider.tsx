'use client';

import { Slider as BaseSlider } from '@base-ui/react/slider';
import { type HTMLMotionProps, motion } from 'motion/react';
import type * as React from 'react';

import { useControlTransition } from '@/lib/motion';
import { cn, type RadiusProps, radiusVariants } from '@/lib/utils';

export function Slider({ className, radius, ...props }: React.ComponentProps<typeof BaseSlider.Root> & RadiusProps) {
  const transition = useControlTransition();

  return (
    <BaseSlider.Root className={cn('relative w-full', className)} {...props}>
      <BaseSlider.Control className="flex w-full items-center py-3">
        <BaseSlider.Track className={cn('h-1.5 w-full bg-border', radiusVariants({ radius }))}>
          <BaseSlider.Indicator className={cn('bg-primary', radiusVariants({ radius }))} />
          <BaseSlider.Thumb
            className={cn(
              'size-4 border border-primary bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring',
              radiusVariants({ radius })
            )}
            render={(thumbProps, state) => (
              <motion.div
                {...(thumbProps as HTMLMotionProps<'div'>)}
                // Grows under the finger while dragging. Base UI owns the thumb's
                // position, so only scale is animated here — no transform clash.
                initial={false}
                animate={{ scale: state.dragging ? 1.25 : 1 }}
                transition={transition}
              />
            )}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export function SliderValue({ className, ...props }: React.ComponentProps<typeof BaseSlider.Value>) {
  return <BaseSlider.Value className={cn('text-xs tabular-nums text-muted-foreground', className)} {...props} />;
}
