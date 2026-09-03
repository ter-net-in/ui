'use client';

import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { type ContainerRadiusProps, cn, containerRadiusVariants } from '@/lib/utils';

const fieldsetVariants = cva('relative flex flex-col gap-4 p-4', {
  variants: {
    variant: {
      // `pt-6` leaves room for the legend, which sits on the top border line.
      default: 'border border-border pt-6',
      ghost: 'border-none bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface FieldsetProps
  extends React.ComponentProps<typeof BaseFieldset.Root>,
    VariantProps<typeof fieldsetVariants>,
    ContainerRadiusProps {}

export function Fieldset({ className, variant, radius, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root
      className={cn(fieldsetVariants({ variant }), containerRadiusVariants({ radius }), className)}
      {...props}
    />
  );
}

/**
 * Sits astride the fieldset's top border, interrupting it — the native `<legend>`
 * look. Base UI renders this part as a `<div>`, and a `<div>` gets none of the
 * browser's legend behaviour, so the effect is built here: pull it up onto the
 * border line and paint the page background behind it to punch out the gap.
 *
 * The background must match whatever the fieldset sits on. Override it (e.g.
 * `className="bg-card"`) when the surface underneath isn't `--background`.
 */
export function FieldsetLegend({ className, ...props }: React.ComponentProps<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      className={cn(
        'absolute -top-[0.6875rem] left-3 bg-background px-1.5',
        'text-sm font-semibold uppercase tracking-[0.04em] text-foreground',
        className
      )}
      {...props}
    />
  );
}

export { fieldsetVariants };
