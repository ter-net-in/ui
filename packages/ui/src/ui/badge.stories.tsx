import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/ui/badge';

const meta = { title: 'UI/Badge', component: Badge, tags: ['autodocs'] } satisfies Meta<typeof Badge>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Draft</Badge>
      <Badge tone="success">Connected</Badge>
      <Badge tone="warning">Pending</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="info">In progress</Badge>
    </div>
  )
};
