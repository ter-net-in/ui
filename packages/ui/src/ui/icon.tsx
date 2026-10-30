import type { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Pass a named Lucide import so unused icons stay out of the bundle. Label the control for decorative icons. */
export function Icon({ icon: Component, className, ...props }: LucideProps & { icon: LucideIcon }) {
  return (
    <Component
      size={16}
      strokeWidth={1.75}
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      className={cn('shrink-0', className)}
      {...props}
    />
  );
}
