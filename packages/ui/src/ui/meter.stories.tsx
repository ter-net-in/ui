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
export const Playground: StoryObj<{
  value: number;
}> = {
  args: { value: 60 },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } }
  },
  render: ({ value }) => (
    <Meter value={value} className="max-w-xs">
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
