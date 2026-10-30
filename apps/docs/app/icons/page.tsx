import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  File,
  Folder,
  Inbox,
  Link,
  LoaderCircle,
  LogOut,
  Mail,
  Menu,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  Sun,
  Trash2,
  Upload,
  User,
  X
} from 'lucide-react';
import { Button } from '@/ui/button';
import { Code } from '@/ui/code';
import { Icon } from '@/ui/icon';
import { PageContainer, PageDescription, PageHeader, PageTitle } from '@/ui/page-layout';
import { SiteHeader } from '../site-header';

const icons = {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  File,
  Folder,
  Inbox,
  Link,
  LoaderCircle,
  LogOut,
  Mail,
  Menu,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  Sun,
  Trash2,
  Upload,
  User,
  X
};
export default function IconsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer>
          <PageHeader>
            <div>
              <PageTitle>Icons</PageTitle>
              <PageDescription>
                Lucide is our shared icon library. Named imports, a 16px default size, and a consistent 1.75px stroke
                keep actions familiar across apps.
              </PageDescription>
            </div>
            <a href="https://lucide.dev/icons/" className="text-sm text-primary hover:underline">
              Browse all Lucide icons
            </a>
          </PageHeader>
          <Code language="shell">npx @ternetin/ui add icon</Code>
          <div className="grid grid-cols-2 divide-border overflow-hidden rounded-surface border border-border sm:grid-cols-4 lg:grid-cols-6">
            {Object.entries(icons).map(([name, icon]) => (
              <div key={name} className="flex min-w-0 flex-col items-center gap-3 border-b border-r border-border p-5">
                <Icon icon={icon} size={20} />
                <span className="text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Use the same icons everywhere</h2>
            <p className="max-w-prose text-sm leading-6 text-muted-foreground">
              Import only the icons you need. Pair decorative icons with visible text; name icon-only buttons with
              aria-label. You can also import directly from lucide-react.
            </p>
            <Code language="tsx">{`import { Plus, Settings } from 'lucide-react';
import { Icon } from '@/components/ui/icon';

<Button><Icon icon={Plus} />Add domain</Button>
<Button variant="outline" size="icon" aria-label="Settings">
  <Icon icon={Settings} />
</Button>`}</Code>
            <div className="flex gap-3">
              <Button>
                <Icon icon={Plus} />
                Add domain
              </Button>
              <Button variant="outline" size="icon" aria-label="Settings">
                <Icon icon={Settings} />
              </Button>
            </div>
          </section>
        </PageContainer>
      </main>
    </>
  );
}
