'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export const ToastProvider = BaseToast.Provider;
export const useToast = BaseToast.useToastManager;

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((toast) => (
    <BaseToast.Root
      key={toast.id}
      toast={toast}
      className={cn(
        'w-80 border border-border bg-background p-4 text-foreground shadow-[6px_6px_0_0_var(--color-foreground)]',
        'transition-all data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full data-[starting-style]:opacity-0 data-[ending-style]:opacity-0'
      )}
    >
      <BaseToast.Title className="text-sm font-bold uppercase tracking-wide" />
      <BaseToast.Description className="mt-1 text-sm text-muted-foreground" />
      <BaseToast.Close
        className="absolute right-2 top-2 text-muted-foreground outline-none hover:text-foreground"
        aria-label="Close"
      >
        ✕
      </BaseToast.Close>
    </BaseToast.Root>
  ));
}

export function Toaster() {
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 outline-none">
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}
