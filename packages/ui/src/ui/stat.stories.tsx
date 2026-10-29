import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from '@/ui/stat';

const meta = { title: 'UI/Stat', component: Stat, tags: ['autodocs'] } satisfies Meta<typeof Stat>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <Stat label="Services" value="12" />
      <Stat label="Connected" value="10" hint="Illustrative data" />
    </div>
  )
};
