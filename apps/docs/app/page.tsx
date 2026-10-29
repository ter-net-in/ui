import registry from '../../../packages/ui/registry.json';
import { SiteHeader } from './site-header';

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10 flex min-h-screen items-center px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto w-full max-w-6xl border border-border bg-background">
          <header className="border-b border-border p-5 sm:p-8">
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
              Base UI + Tailwind CSS
            </p>
            <h1 className="break-words display-title text-[clamp(3rem,10vw,6rem)]">ui.ter.net.in</h1>
          </header>

          <div className="grid md:grid-cols-2">
            <a
              href="/components"
              className="group grid gap-5 border-b border-border p-5 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none md:border-r md:border-b-0 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8"
            >
              <div>
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-background/60 group-focus-visible:text-background/60">
                  Docs
                </p>
                <p className="text-2xl font-bold sm:text-4xl">Browse components</p>
              </div>
              <span className="font-mono text-sm">
                {registry.items.filter((item) => item.type === 'registry:ui').length} components
              </span>
            </a>
            <a
              href="https://storybook.ui.ter.net.in"
              className="group grid gap-5 p-5 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none sm:grid-cols-[1fr_auto] sm:items-end sm:p-8"
            >
              <div>
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-background/60 group-focus-visible:text-background/60">
                  Catalog
                </p>
                <p className="text-2xl font-bold sm:text-4xl">Open Storybook</p>
              </div>
              <span className="font-mono text-sm">External</span>
            </a>
          </div>

          <section className="grid border-t border-border lg:grid-cols-2">
            <div className="border-b border-border p-5 lg:border-r lg:border-b-0 lg:p-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">CLI</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Copy source, not dependency.</h2>
              <p className="mb-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Initialize once, then add only components your project needs. CLI resolves shared registry files,
                rewrites aliases, installs package dependencies, and leaves editable source in your repository.
              </p>
              <pre className="overflow-x-auto border border-border bg-muted px-4 py-3 font-mono text-sm leading-7">
                <code>{`npx @ternetin/ui init
npx @ternetin/ui add button input dialog`}</code>
              </pre>
            </div>

            <div className="p-5 lg:p-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                internet-ui.json
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Your paths. Shared foundations.</h2>
              <p className="mb-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Config records your registry, import aliases, and output paths. Components and layouts share the same
                corners, spacing, and elevation, with no visual configuration to maintain.
              </p>
              <pre className="overflow-x-auto border border-border bg-muted px-4 py-3 font-mono text-sm leading-6">
                <code>{`{
  "registry": "https://ui.ter.net.in",
  "tsx": true,
  "aliases": {
    "ui": "@/components/ui",
    "lib": "@/lib",
    "utils": "@/lib/utils"
  },
  "paths": {
    "ui": "src/components/ui",
    "lib": "src/lib",
    "css": "src/app/globals.css"
  }
}`}</code>
              </pre>
            </div>
          </section>

          <section className="border-t border-border p-5 sm:p-8">
            <h2 className="text-2xl font-semibold">Build a complete workspace.</h2>
            <p className="mt-3 max-w-prose leading-6 text-muted-foreground">
              Start from installable page layouts, navigation, settings, and feedback. Explore complete authentication,
              admin, and mail-style examples.
            </p>
            <a
              href="/examples"
              className="mt-4 inline-block font-medium text-primary underline-offset-4 hover:underline"
            >
              Explore layouts and examples
            </a>
          </section>
          <section className="grid border-t border-border sm:grid-cols-3">
            {[
              ['1 / Init', 'Creates config and installs the shared theme and utilities.'],
              ['2 / Add', 'Fetches registry items, resolves dependencies, and writes component source.'],
              ['3 / Own', 'Edit generated files directly. Updates never require a runtime library.']
            ].map(([title, body]) => (
              <div
                key={title}
                className="border-b border-border p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <h3 className="mb-3 font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </section>

          <a
            href="/llms.txt"
            className="group flex flex-col justify-between gap-5 border-t border-border p-5 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none sm:flex-row sm:items-center lg:p-8"
          >
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-background/60 group-focus-visible:text-background/60">
                For agents and LLMs
              </p>
              <p className="text-2xl font-bold">Read plain-text registry</p>
            </div>
            <span className="font-mono text-sm">/llms.txt</span>
          </a>
        </div>
      </main>
    </>
  );
}
