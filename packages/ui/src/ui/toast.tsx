'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import { cva, type VariantProps } from 'class-variance-authority';

import { type ContainerRadiusProps, cn, containerRadiusVariants, type ShadowProps, shadowVariants } from '@/lib/utils';

export const ToastProvider = BaseToast.Provider;
export const useToast = BaseToast.useToastManager;

const viewportVariants = cva('fixed z-50 flex outline-none', {
  variants: {
    position: {
      // Bottom stacks grow upward, so the newest toast stays nearest the edge.
      'bottom-right': 'bottom-4 right-4 flex-col-reverse gap-2',
      'bottom-left': 'bottom-4 left-4 flex-col-reverse gap-2',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse gap-2 items-center',
      'top-right': 'top-4 right-4 flex-col gap-2',
      'top-left': 'top-4 left-4 flex-col gap-2',
      'top-center': 'top-4 left-1/2 -translate-x-1/2 flex-col gap-2 items-center'
    }
  },
  defaultVariants: {
    position: 'bottom-right'
  }
});

export type ToastPosition = NonNullable<VariantProps<typeof viewportVariants>['position']>;

/**
 * Which way a toast travels as it arrives and leaves — outward, toward whichever
 * edge it's anchored to.
 */
const enterFrom: Record<ToastPosition, string> = {
  'bottom-right': 'data-[starting-style]:[translate:100%_0] data-[ending-style]:[translate:100%_0]',
  'bottom-left': 'data-[starting-style]:[translate:-100%_0] data-[ending-style]:[translate:-100%_0]',
  'bottom-center': 'data-[starting-style]:[translate:0_100%] data-[ending-style]:[translate:0_100%]',
  'top-right': 'data-[starting-style]:[translate:100%_0] data-[ending-style]:[translate:100%_0]',
  'top-left': 'data-[starting-style]:[translate:-100%_0] data-[ending-style]:[translate:-100%_0]',
  'top-center': 'data-[starting-style]:[translate:0_-100%] data-[ending-style]:[translate:0_-100%]'
};

interface ToastListProps extends ContainerRadiusProps, ShadowProps {
  position: ToastPosition;
}

function ToastList({ radius, shadow, position }: ToastListProps) {
  const { toasts } = BaseToast.useToastManager();

  return toasts.map((toast) => (
    <BaseToast.Root
      key={toast.id}
      toast={toast}
      className={cn(
        'relative w-80 border border-border bg-background p-4 text-foreground',
        shadowVariants({ shadow }),
        // Toast motion is CSS rather than Motion, and deliberately so: during a
        // swipe Base UI drives this element by writing `transform` directly, so a
        // `motion.div` — which owns `transform` — would stop the toast following
        // the finger. See lib/motion.tsx for where Motion is used.
        //
        // Enter and exit are ours, via `translate`, which Tailwind compiles to a
        // property separate from the `transform` Base UI writes. Don't add
        // `--toast-swipe-movement-*` here: Base UI already applies that movement,
        // and reapplying it would move the toast twice as far as the finger.
        'transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        enterFrom[position],
        // While a finger is down the toast must track it exactly, with no easing.
        'data-[swiping]:transition-none',
        containerRadiusVariants({ radius })
      )}
    >
      <BaseToast.Title className="pr-6 text-sm font-semibold leading-none tracking-[-0.01em]" />
      <BaseToast.Description className="mt-1 text-sm leading-5 text-muted-foreground" />
      <BaseToast.Close
        className="absolute right-2 top-2 inline-flex size-6 cursor-pointer items-center justify-center text-xs leading-none text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Close"
      >
        ✕
      </BaseToast.Close>
    </BaseToast.Root>
  ));
}

export interface ToasterProps extends ContainerRadiusProps, ShadowProps {
  /**
   * Screen corner the stack is anchored to. Also sets the direction toasts travel
   * as they arrive and leave.
   * @default 'bottom-right'
   */
  position?: ToastPosition;
}

export function Toaster({ radius, shadow = 'md', position = 'bottom-right' }: ToasterProps) {
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className={viewportVariants({ position })}>
        <ToastList radius={radius} shadow={shadow} position={position} />
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

export { viewportVariants as toastViewportVariants };
