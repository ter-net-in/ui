import registry from '../../../../packages/ui/registry.json';
import { SiteHeader } from '../site-header';
import { ComponentBrowser } from './component-browser';

const components = registry.items
  .filter((item) => item.type === 'registry:ui')
  .map(({ name, title, description }) => ({ name, title, description }));

export default function ComponentsPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <ComponentBrowser components={components} />
      </main>
    </>
  );
}
