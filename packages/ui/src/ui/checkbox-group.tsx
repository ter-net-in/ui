'use client';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/lib/utils';

const checkboxGroupVariants = cva('flex gap-2', {
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
export interface CheckboxGroupProps
  extends React.ComponentProps<typeof BaseCheckboxGroup>,
    VariantProps<typeof checkboxGroupVariants> {}
export function CheckboxGroup({ className, orientation, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup className={cn(checkboxGroupVariants({ orientation }), className)} {...props} />;
}
export { checkboxGroupVariants };
