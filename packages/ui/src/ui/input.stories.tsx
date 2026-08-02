import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/ui/input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'you@internet.in' }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  disabled: boolean;
  placeholder: string;
}> = {
  args: { radius: 'md', disabled: false, placeholder: 'you@internet.in' },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' }
  },
  render: ({ radius, disabled, placeholder }) => (
    <Input radius={radius} disabled={disabled} placeholder={placeholder} className="max-w-xs" />
  )
};

export const Disabled: Story = {
  render: () => <Input disabled placeholder="Disabled" className="max-w-xs" />
};

export const Types: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <Input key={r} radius={r} placeholder={r} />
      ))}
    </div>
  )
};
