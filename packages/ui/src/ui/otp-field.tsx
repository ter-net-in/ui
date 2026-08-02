'use client';

import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export interface OtpFieldProps extends Omit<React.ComponentProps<typeof BaseOTPField.Root>, 'length'> {
  length?: number;
}

export function OtpField({ className, length = 6, ...props }: OtpFieldProps) {
  return (
    <BaseOTPField.Root length={length} className={cn('flex gap-2', className)} {...props}>
      {Array.from({ length }).map((_, i) => (
        <BaseOTPField.Input
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length OTP cells
          key={i}
          className="size-11 border border-input bg-background text-center text-lg tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      ))}
    </BaseOTPField.Root>
  );
}
