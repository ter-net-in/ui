import { PageContainer, PageDescription, PageHeader, PageTitle } from '@/ui/page-layout';
import { SiteHeader } from '../site-header';

export default function MigrationPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="max-w-3xl">
          <PageHeader>
            <div>
              <PageTitle>Moving to shared house styles</PageTitle>
              <PageDescription>
                internet-ui 0.2 removes selectable corners and elevation. Your components remain local, editable source.
              </PageDescription>
            </div>
          </PageHeader>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Review your local changes first</h2>
            <p className="leading-7 text-muted-foreground">
              Compare installed components with the registry before replacing them. Preserve local fixes, imports, event
              handlers, and application behavior. The CLI keeps its overwrite prompts; unattended installs skip existing
              files unless overwrite is explicitly requested.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Remove cosmetic props</h2>
            <pre className="overflow-x-auto rounded-surface border border-border bg-card p-4 text-sm leading-7">
              <code>{`// Before\n<Button radius="md">Save</Button>\n<DialogContent radius="lg" shadow="md" />\n\n// After\n<Button>Save</Button>\n<DialogContent />`}</code>
            </pre>
            <p className="leading-7 text-muted-foreground">
              Controls use shared corners. Cards stay flat; menus and dialogs receive fixed elevation. Native circular
              controls retain their appropriate shape. Semantic variants, sizes, and className remain available.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Update the configuration and utilities</h2>
            <p className="leading-7 text-muted-foreground">
              The defaults block is obsolete and can be removed from internet-ui.json. The CLI recognizes it without
              rewriting the file or restoring old styling. Remove ui-defaults.ts only after replacing components and
              utilities that import it. Keep registry, aliases, and paths configured for your application.
            </p>
            <p className="leading-7 text-muted-foreground">
              Use the 0.2 CLI with the current registry. A registry that still includes ui-defaults is rejected before
              component files are written. Keep an older CLI and registry together if you need the previous component
              contract.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Use layouts without a new application framework</h2>
            <p className="leading-7 text-muted-foreground">
              Install page-layout, auth-layout, app-shell, sidebar, or split-pane as needed. Your application continues
              to own routes, active navigation, authentication, and data.
            </p>
            <a href="/examples" className="inline-block text-primary hover:underline">
              Explore complete examples
            </a>
          </section>
        </PageContainer>
      </main>
    </>
  );
}
