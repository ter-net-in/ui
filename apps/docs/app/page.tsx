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

        <a
          href="https://storybook.ui.ter.net.in"
          className="group grid gap-8 p-6 transition-colors hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none sm:grid-cols-[1fr_auto] sm:items-end sm:p-10"
        >
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-background/60 group-focus-visible:text-background/60">
              Component catalog
            </p>
            <p className="text-2xl font-bold sm:text-4xl">Open Storybook</p>
          </div>
          <span className="font-mono text-sm">storybook.ui.ter.net.in</span>
        </a>
      </div>
    </main>
  );
}
