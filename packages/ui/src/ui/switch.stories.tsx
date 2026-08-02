import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/ui/switch';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs']
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; disabled: boolean }> = {
  args: { radius: 'md', disabled: false },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' }
  },
  render: ({ radius, disabled }) => <Switch radius={radius} disabled={disabled} defaultChecked />
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch defaultChecked />
      <Switch />
      <Switch defaultChecked disabled />
      <Switch disabled />
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <span key={r} className="flex items-center gap-2 text-sm">
          <Switch radius={r} defaultChecked /> {r}
        </span>
      ))}
    </div>
  )
};
