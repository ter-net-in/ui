import type { Meta, StoryObj } from '@storybook/react';
import { Slider, SliderValue } from '@/ui/slider';

const meta = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs']
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => <Slider defaultValue={40} className="max-w-xs" />
};
export const WithValue: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">Volume</span>
        <SliderValue />
      </div>
      <Slider defaultValue={60} />
    </div>
  )
};
export const Range: Story = {
  render: () => <Slider defaultValue={[25, 75]} className="max-w-xs" />
};
