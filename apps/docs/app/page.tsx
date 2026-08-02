export default function Page() {
  return (
    <main className="relative z-10 flex min-h-screen items-center px-6 py-12">
      <div className="mx-auto w-full max-w-6xl border border-border bg-background">
        <header className="border-b border-border p-6 sm:p-10">
          <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
            Base UI + Tailwind CSS
          </p>
          <h1 className="break-words text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.85] tracking-[-0.07em]">
            ui.ter.net.in
          </h1>
        </header>

        <div className="grid md:grid-cols-2">
          <a
            href="/components"
            className="group grid gap-8 border-b border-border p-6 transition-colors hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none md:border-r md:border-b-0 sm:grid-cols-[1fr_auto] sm:items-end sm:p-10"
          >
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-background/60 group-focus-visible:text-background/60">
                Docs
              </p>
              <p className="text-2xl font-bold sm:text-4xl">Browse components</p>
            </div>
            <span className="font-mono text-sm">39 items</span>
          </a>
          <a
            href="https://storybook.ui.ter.net.in"
            className="group grid gap-8 p-6 transition-colors hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none sm:grid-cols-[1fr_auto] sm:items-end sm:p-10"
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
          <div className="border-b border-border p-6 lg:border-r lg:border-b-0 lg:p-10">
            <p className="mb-8 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">CLI</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Copy source, not dependency.</h2>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Initialize once, then add only components your project needs. CLI resolves shared registry files, rewrites
              aliases, installs package dependencies, and leaves editable source in your repository.
            </p>
            <pre className="overflow-x-auto border border-border bg-muted p-4 font-mono text-sm leading-7">
              <code>{`npx @ternetin/ui init
npx @ternetin/ui add button input dialog`}</code>
            </pre>
          </div>

          <div className="p-6 lg:p-10">
            <p className="mb-8 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
              internet-ui.json
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Your paths. Your defaults.</h2>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Config records registry URL, TypeScript mode, import aliases, output paths, and project-wide visual
              defaults. Components compile these values into local source; no runtime config package remains.
            </p>
            <pre className="overflow-x-auto border border-border bg-muted p-4 font-mono text-sm leading-6">
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
  },
  "defaults": {
    "radius": "md",
    "containerRadius": "md",
    "shadow": "sm"
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section className="grid border-t border-border sm:grid-cols-3">
          {[
            ['1 / Init', 'Creates config, installs theme, utilities, and project defaults.'],
            ['2 / Add', 'Fetches registry items, resolves dependencies, and writes component source.'],
            ['3 / Own', 'Edit generated files directly. Updates never require a runtime library.']
          ].map(([title, body]) => (
            <div
              key={title}
              className="border-b border-border p-6 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
            >
              <h3 className="mb-3 font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>

        <a
          href="/llms.txt"
          className="group flex flex-col justify-between gap-6 border-t border-border p-6 transition-colors hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none sm:flex-row sm:items-center lg:p-10"
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
  );
}
