import { ThemeToggle } from './theme';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <nav aria-label="Main" className="flex min-h-14 flex-wrap items-center gap-4 px-4 py-2 sm:px-6">
        <a href="/" className="mr-auto font-semibold tracking-tight">
          internet-ui
        </a>
        <a href="/components" className="text-sm hover:text-primary">
          Components
        </a>
        <a href="/icons" className="text-sm hover:text-primary">
          Icons
        </a>
        <a href="/examples" className="text-sm hover:text-primary">
          Examples
        </a>
        <a href="/migration" className="hidden text-sm hover:text-primary sm:inline">
          Migration
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
