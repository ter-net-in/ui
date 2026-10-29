import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@/ui/alert';

const meta = { title: 'UI/Alert', component: Alert, tags: ['autodocs'] } satisfies Meta<typeof Alert>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div className="max-w-xl space-y-3">
      <Alert>Your changes are ready to review.</Alert>
      <Alert tone="success">Changes saved.</Alert>
      <Alert tone="warning">Your session expires soon.</Alert>
      <Alert tone="danger">The request failed. Try again.</Alert>
    </div>
  )
};
