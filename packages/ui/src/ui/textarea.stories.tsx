import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@/ui/textarea';

const meta = { title: 'UI/Textarea', component: Textarea, tags: ['autodocs'] } satisfies Meta<typeof Textarea>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <label htmlFor="textarea-example">Message</label>
      <Textarea id="textarea-example" placeholder="Write your message…" />
    </div>
  )
};
