import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/ui/skeleton';

const meta = { title: 'UI/Skeleton', component: Skeleton, tags: ['autodocs'] } satisfies Meta<typeof Skeleton>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div role="status" aria-label="Loading messages" className="max-w-sm space-y-3">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
};
