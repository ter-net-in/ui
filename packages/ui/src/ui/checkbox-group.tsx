'use client';

import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export function CheckboxGroup({ className, ...props }: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return <BaseCheckboxGroup className={cn('flex flex-col gap-2', className)} {...props} />;
}
