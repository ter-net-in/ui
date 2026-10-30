import { PageContainer, PageDescription, PageHeader, PageTitle } from '@/ui/page-layout';
import { SiteHeader } from '../site-header';

const examples = [
  ['auth', 'Authentication', 'A centered form with accessible fields and local feedback.'],
  ['admin', 'Administration', 'Metrics, semantic statuses, and a searchable, sortable service table.'],
  ['settings', 'Settings', 'Grouped settings, joined inputs, switches, and form feedback.'],
  ['editor', 'Rich text editor', 'Classic formatting controls with HTML and plain-text output.'],
  ['workspace', 'Workspace', 'Responsive navigation, a message list, and a detail pane.']
];

export default function ExamplesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer>
          <PageHeader>
            <div>
              <PageTitle>Layouts and examples</PageTitle>
              <PageDescription>
                Compose your application from shared foundations. These complete examples use fictional data and run
                without a backend.
              </PageDescription>
            </div>
          </PageHeader>
          <div className="divide-y divide-border rounded-surface border border-border bg-card">
            {examples.map(([name, title, description]) => (
              <a
                key={name}
                href={`/examples/${name}`}
                className="group block space-y-2 p-5 transition-colors first:rounded-t-surface last:rounded-b-surface hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring sm:p-6"
              >
                <h2 className="text-lg font-semibold group-hover:text-primary">{title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                <code className="block overflow-x-auto pt-1 text-xs text-muted-foreground">
                  npx @ternetin/ui add {name === 'editor' ? 'rich-text-editor' : `${name}-example`}
                </code>
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Each example installs editable source and declares the layout components it needs. Keep your app’s own
            navigation, authentication, and data fetching.
          </p>
        </PageContainer>
      </main>
    </>
  );
}
