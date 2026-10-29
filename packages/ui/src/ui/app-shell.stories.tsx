import type { Meta, StoryObj } from '@storybook/react';
import { AppBody, AppHeader, AppMain, AppShell } from '@/ui/app-shell';

const meta = { title: 'UI/App Shell', component: AppShell, tags: ['autodocs'] } satisfies Meta<typeof AppShell>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <AppShell className="h-96">
      <AppHeader>
        <strong>Workspace</strong>
      </AppHeader>
      <AppBody>
        <AppMain className="p-6">
          <h1 className="text-xl">Your application</h1>
          <p className="mt-2 text-muted-foreground">A shared frame, with app-owned content.</p>
        </AppMain>
      </AppBody>
    </AppShell>
  )
};
