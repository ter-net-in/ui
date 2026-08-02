import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs']
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ orientation: 'vertical' | 'horizontal' }> = {
  args: { orientation: 'vertical' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
  render: ({ orientation }) => (
    <RadioGroup defaultValue="http" orientation={orientation}>
      <span className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="http" /> HTTP
      </span>
      <span className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="ws" /> WebSocket
      </span>
      <span className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="ftp" /> FTP
      </span>
    </RadioGroup>
  )
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="a" orientation="horizontal">
      <span className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="a" /> A
      </span>
      <span className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="b" /> B
      </span>
    </RadioGroup>
  )
};
