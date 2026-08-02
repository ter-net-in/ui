'use client';

import { useState } from 'react';

interface ComponentItem {
  name: string;
  title: string;
  description: string;
}

const STORYBOOK_ORIGIN = 'https://storybook.ui.ter.net.in';

function storyId(title: string) {
  return `ui-${title.toLowerCase().replace(/[^a-z0-9]/g, '')}--playground`;
}

export function ComponentBrowser({ components }: { components: ComponentItem[] }) {
  const [query, setQuery] = useState('');
  const [selectedName, setSelectedName] = useState(components[0]?.name ?? '');
  const [copied, setCopied] = useState(false);
  const filtered = components.filter((component) =>
    `${component.title} ${component.name}`.toLowerCase().includes(query.toLowerCase())
  );
  const selected = components.find((component) => component.name === selectedName) ?? components[0];

  if (!selected) return null;

  const command = `npx @ternetin/ui add ${selected.name}`;
  const selectedStoryId = storyId(selected.title);
  const storyUrl = `${STORYBOOK_ORIGIN}/iframe.html?id=${selectedStoryId}&viewMode=story`;

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid min-h-[calc(100vh-73px)] border-x border-border bg-background lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="border-b border-border lg:border-r lg:border-b-0">
        <div className="sticky top-0">
          <div className="border-b border-border p-4">
            <label htmlFor="component-search" className="sr-only">
              Search components
            </label>
            <input
              id="component-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components"
              className="w-full border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>
          <nav aria-label="Components" className="max-h-64 overflow-y-auto p-2 lg:max-h-[calc(100vh-138px)]">
            {filtered.map((component, index) => (
              <button
                type="button"
                key={component.name}
                onClick={() => setSelectedName(component.name)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                  selected.name === component.name ? 'bg-foreground text-background hover:bg-foreground' : ''
                }`}
              >
                <span className="w-6 font-mono text-[10px] opacity-50">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-medium">{component.title}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-8 text-center text-sm text-muted-foreground">No match.</p>}
          </nav>
        </div>
      </aside>

      <article className="min-w-0">
        <header className="border-b border-border p-6 sm:p-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Component</p>
            <a
              href={`${STORYBOOK_ORIGIN}/?path=/story/${selectedStoryId}`}
              className="font-mono text-xs underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              Open in Storybook
            </a>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{selected.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
        </header>

        <section className="border-b border-border p-6 sm:p-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Install</h2>
            <a
              href={`/r/${selected.name}.json`}
              className="font-mono text-xs underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              Registry JSON
            </a>
          </div>
          <div className="flex border border-border bg-muted">
            <code className="min-w-0 flex-1 overflow-x-auto p-4 font-mono text-sm">{command}</code>
            <button
              type="button"
              onClick={copyCommand}
              className="border-l border-border px-5 text-xs font-bold uppercase tracking-wider hover:bg-foreground hover:text-background"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </section>

        <section className="p-6 sm:p-10">
          <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Example</h2>
          <div className="overflow-hidden border border-border bg-background">
            <iframe
              key={selected.name}
              src={storyUrl}
              title={`${selected.title} example`}
              className="h-[32rem] w-full"
            />
          </div>
        </section>
      </article>
    </div>
  );
}
