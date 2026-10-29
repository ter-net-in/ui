'use client';

import { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { useTheme } from '../theme';

type ComponentItem = { name: string; title: string; description: string };
const PRODUCTION_STORYBOOK_ORIGIN = 'https://storybook.ui.ter.net.in';

export function ComponentBrowser({ components }: { components: ComponentItem[] }) {
  const [query, setQuery] = useState('');
  const [selectedName, setSelectedName] = useState(components[0]?.name ?? '');
  const [copied, setCopied] = useState(false);
  const { dark } = useTheme();
  const filtered = components.filter((component) =>
    `${component.title} ${component.name}`.toLowerCase().includes(query.toLowerCase())
  );
  const selected = components.find((component) => component.name === selectedName) ?? components[0];
  if (!selected) return null;
  const storyId = `ui-${selected.title.toLowerCase().replace(/\s+/g, '-')}--playground`;
  const command = `npx @ternetin/ui add ${selected.name}`;
  const storybookOrigin =
    typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)
      ? 'http://localhost:6006'
      : PRODUCTION_STORYBOOK_ORIGIN;
  const storyUrl = `${storybookOrigin}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${dark ? 'dark' : 'light'}`;
  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="grid min-h-[calc(100dvh-57px)] lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-b border-border bg-card lg:border-r lg:border-b-0">
        <div className="sticky top-0">
          <div className="border-b border-border p-3">
            <label htmlFor="component-search" className="sr-only">
              Search components
            </label>
            <Input
              id="component-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components"
              type="search"
            />
          </div>
          <nav
            aria-label="Components"
            className="max-h-56 space-y-0.5 overflow-y-auto p-2 lg:max-h-[calc(100dvh-121px)]"
          >
            {filtered.map((component) => (
              <button
                type="button"
                key={component.name}
                aria-pressed={selected.name === component.name}
                onClick={() => setSelectedName(component.name)}
                className={`ui-control flex min-h-9 w-full cursor-pointer items-center rounded-control px-3 py-2 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected.name === component.name ? 'bg-accent font-medium text-accent-foreground' : 'hover:bg-muted'}`}
              >
                {component.title}
              </button>
            ))}
            {!filtered.length && <p className="p-4 text-sm text-muted-foreground">No matching components.</p>}
          </nav>
        </div>
      </aside>
      <article className="min-w-0 space-y-8 p-5 sm:p-8 lg:p-10">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{selected.title}</h1>
            <p className="mt-3 max-w-prose text-sm leading-6 text-muted-foreground">{selected.description}</p>
          </div>
          <a
            href={`${storybookOrigin}/?path=/story/${storyId}`}
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Open in Storybook
          </a>
        </header>
        <section aria-labelledby="install-heading">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="install-heading" className="text-sm font-semibold">
              Installation
            </h2>
            <a
              href={`/r/${selected.name}.json`}
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Registry JSON
            </a>
          </div>
          <div className="flex items-center gap-2 rounded-surface border border-border bg-card p-2 pl-4">
            <code className="min-w-0 flex-1 overflow-x-auto py-1 font-mono text-sm">{command}</code>
            <Button variant="ghost" size="sm" onClick={copyCommand}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </section>
        <section aria-labelledby="example-heading">
          <h2 id="example-heading" className="mb-3 text-sm font-semibold">
            Example
          </h2>
          <div className="overflow-hidden rounded-surface border border-border bg-card">
            <iframe
              key={`${selected.name}-${dark}`}
              src={storyUrl}
              title={`${selected.title} example`}
              className="h-[34rem] w-full"
            />
          </div>
        </section>
        <p className="text-xs leading-5 text-muted-foreground">
          Fixed house styles. Corners, elevation, and spacing are shared across the library.{' '}
          <a href="/examples" className="text-primary hover:underline">
            Explore complete layouts.
          </a>
        </p>
      </article>
    </div>
  );
}
