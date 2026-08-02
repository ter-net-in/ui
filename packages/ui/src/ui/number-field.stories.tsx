import type { Meta, StoryObj } from '@storybook/react';

import { NumberField } from '@/ui/number-field';

const meta = {
  title: 'UI/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  args: { defaultValue: 1 }
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; disabled: boolean }> = {
  args: { radius: 'md', disabled: false },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' }
  },
  render: ({ radius, disabled }) => <NumberField radius={radius} disabled={disabled} defaultValue={1} />
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <NumberField key={r} radius={r} defaultValue={1} />
      ))}
    </div>
  )
};

export const WithBounds: Story = {
  args: { defaultValue: 5, min: 0, max: 10, step: 1 }
};

export const Currency: Story = {
  args: {
    defaultValue: 100,
    step: 10,
    format: { style: 'currency', currency: 'USD' }
  }
};
