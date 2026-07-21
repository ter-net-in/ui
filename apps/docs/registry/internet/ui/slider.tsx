'use client';

import { Slider as BaseSlider } from '@base-ui/react/slider';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function Slider({ className, ...props }: React.ComponentProps<typeof BaseSlider.Root>) {
  return (
    <BaseSlider.Root className={cn('relative w-full', className)} {...props}>
      <BaseSlider.Control className="flex w-full items-center py-3">
        <BaseSlider.Track className="h-1.5 w-full bg-border">
          <BaseSlider.Indicator className="bg-primary" />
          <BaseSlider.Thumb className="size-4 border border-primary bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export function SliderValue({ className, ...props }: React.ComponentProps<typeof BaseSlider.Value>) {
  return <BaseSlider.Value className={cn('text-xs tabular-nums text-muted-foreground', className)} {...props} />;
}
