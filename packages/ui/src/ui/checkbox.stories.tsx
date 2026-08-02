import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@/ui/checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs']
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; disabled: boolean }> = {
  args: { radius: 'md', disabled: false },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' }
  },
  render: ({ radius, disabled }) => (
    <span className="flex items-center gap-2 text-sm">
      <Checkbox radius={radius} disabled={disabled} defaultChecked /> Accept the terms
    </span>
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <span className="flex items-center gap-2">
        <Checkbox /> Unchecked
      </span>
      <span className="flex items-center gap-2">
        <Checkbox defaultChecked /> Checked
      </span>
      <span className="flex items-center gap-2 opacity-60">
        <Checkbox disabled /> Disabled
      </span>
      <span className="flex items-center gap-2 opacity-60">
        <Checkbox disabled defaultChecked /> Disabled checked
      </span>
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <span key={r} className="flex items-center gap-2 text-sm">
          <Checkbox radius={r} defaultChecked /> {r}
        </span>
      ))}
    </div>
  )
};
