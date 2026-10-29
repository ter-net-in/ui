import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '@/ui/empty-state';

const meta = { title: 'UI/Empty State', component: EmptyState, tags: ['autodocs'] } satisfies Meta<typeof EmptyState>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <EmptyState
      title="No services yet"
      description="Add a service to start working with this workspace."
      action={
        <button type="button" className="text-primary">
          Add service
        </button>
      }
    />
  )
};
