import registry from '../../../../packages/ui/registry.json';

import { ComponentBrowser } from './component-browser';

const components = registry.items
  .filter((item) => item.type === 'registry:ui')
  .map(({ name, title, description }) => ({ name, title, description }));

export default function ComponentsPage() {
  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-[100rem] px-3 sm:px-6">
      <header className="flex h-[73px] items-center justify-between border-x border-border px-4 sm:px-6">
        <a href="/" className="font-bold tracking-tight">
          ui.ter.net.in
        </a>
        <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
          {components.length} components
        </span>
      </header>
      <ComponentBrowser components={components} />
    </main>
  );
}
