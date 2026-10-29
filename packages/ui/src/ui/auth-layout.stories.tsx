import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from '@/ui/auth-layout';

const meta = { title: 'UI/Auth Layout', component: AuthLayout, tags: ['autodocs'] } satisfies Meta<typeof AuthLayout>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <AuthLayout className="min-h-96">
      <div className="rounded-surface border border-border bg-card p-6">
        <h1 className="text-lg font-semibold">Sign in</h1>
        <p className="mt-2 text-muted-foreground">Your authentication form belongs here.</p>
      </div>
    </AuthLayout>
  )
};
