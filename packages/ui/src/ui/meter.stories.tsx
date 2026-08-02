import type { Meta, StoryObj } from '@storybook/react';

import { Meter, MeterLabel, MeterValue } from '@/ui/meter';

const meta = {
  title: 'UI/Meter',
  component: Meter,
  tags: ['autodocs'],
  args: { value: 60 }
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; value: number }> = {
  args: { radius: 'md', value: 60 },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    value: { control: { type: 'range', min: 0, max: 100 } }
  },
  render: ({ radius, value }) => (
    <Meter radius={radius} value={value} className="max-w-xs">
      <div className="flex items-center justify-between">
        <MeterLabel>Storage</MeterLabel>
        <MeterValue />
      </div>
    </Meter>
  )
};

export const Formatted: Story = {
  render: () => (
    <Meter value={0.42} min={0} max={1} format={{ style: 'percent' }} className="max-w-xs">
      <div className="flex items-center justify-between">
        <MeterLabel>Completion</MeterLabel>
        <MeterValue />
      </div>
    </Meter>
  )
};

export const Levels: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      {[20, 55, 90].map((v) => (
        <Meter key={v} value={v}>
          <div className="flex items-center justify-between">
            <MeterLabel>{`value ${v}`}</MeterLabel>
            <MeterValue />
          </div>
        </Meter>
      ))}
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <Meter key={r} radius={r} value={60}>
          <div className="flex items-center justify-between">
            <MeterLabel>{r}</MeterLabel>
            <MeterValue />
          </div>
        </Meter>
      ))}
    </div>
  )
};
