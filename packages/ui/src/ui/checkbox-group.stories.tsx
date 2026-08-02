import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@/ui/checkbox';
import { CheckboxGroup } from '@/ui/checkbox-group';

const meta = {
  title: 'UI/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs']
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ orientation: 'vertical' | 'horizontal' }> = {
  args: { orientation: 'vertical' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
  render: ({ orientation }) => (
    <CheckboxGroup orientation={orientation} defaultValue={['ws']}>
      <span className="flex items-center gap-2 text-sm">
        <Checkbox name="http" /> HTTP
      </span>
      <span className="flex items-center gap-2 text-sm">
        <Checkbox name="ws" /> WebSocket
      </span>
      <span className="flex items-center gap-2 text-sm">
        <Checkbox name="ftp" /> FTP
      </span>
    </CheckboxGroup>
  )
};

export const Horizontal: Story = {
  render: () => (
    <CheckboxGroup orientation="horizontal" defaultValue={['ws']}>
      <span className="flex items-center gap-2 text-sm">
        <Checkbox name="http" /> HTTP
      </span>
      <span className="flex items-center gap-2 text-sm">
        <Checkbox name="ws" /> WebSocket
      </span>
      <span className="flex items-center gap-2 text-sm">
        <Checkbox name="ftp" /> FTP
      </span>
    </CheckboxGroup>
  )
};
