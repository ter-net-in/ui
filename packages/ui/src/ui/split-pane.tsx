'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Pane = 'primary' | 'secondary';

export function SplitPane({
  activePane = 'primary',
  className,
  onFocusCapture,
  ...props
}: React.ComponentProps<'div'> & { activePane?: Pane }) {
  const root = React.useRef<HTMLDivElement>(null);
  const previous = React.useRef(activePane);
  const focused = React.useRef<Partial<Record<Pane, HTMLElement>>>({});

  React.useEffect(() => {
    if (previous.current !== activePane && window.matchMedia('(max-width: 1023px)').matches) {
      const panel = root.current?.querySelector<HTMLElement>(`[data-pane="${activePane}"]`);
      const remembered = focused.current[activePane];
      if (remembered?.isConnected && panel?.contains(remembered)) remembered.focus();
      else panel?.focus();
    }
    previous.current = activePane;
  }, [activePane]);

  return (
    <div
      ref={root}
      data-active-pane={activePane}
      onFocusCapture={(event) => {
        const target = event.target;
        const pane = target.closest<HTMLElement>('[data-pane]')?.dataset.pane as Pane | undefined;
        if (pane) focused.current[pane] = target;
        onFocusCapture?.(event);
      }}
      className={cn(
        'group/split grid min-h-0 min-w-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)]',
        className
      )}
      {...props}
    />
  );
}

export function SplitPanePrimary({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-pane="primary"
      tabIndex={-1}
      className={cn(
        'flex min-h-0 min-w-0 flex-col border-r border-border outline-none group-data-[active-pane=secondary]/split:hidden lg:group-data-[active-pane=secondary]/split:flex',
        className
      )}
      {...props}
    />
  );
}
export function SplitPaneSecondary({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-pane="secondary"
      tabIndex={-1}
      className={cn(
        'flex min-h-0 min-w-0 flex-col bg-card outline-none group-data-[active-pane=primary]/split:hidden lg:group-data-[active-pane=primary]/split:flex',
        className
      )}
      {...props}
    />
  );
}
