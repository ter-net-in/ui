import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from '@/ui/toggle';

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { children: 'Bold' }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; disabled: boolean }> = {
  args: { radius: 'md', disabled: false },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' }
  },
  render: ({ radius, disabled }) => (
    <Toggle radius={radius} disabled={disabled}>
      Bold
    </Toggle>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle>Bold</Toggle>
      <Toggle defaultPressed>Italic</Toggle>
      <Toggle disabled>Underline</Toggle>
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <Toggle key={r} radius={r}>
          {r}
        </Toggle>
      ))}
    </div>
  )
};
