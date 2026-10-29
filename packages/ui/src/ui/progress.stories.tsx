import type { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressLabel, ProgressValue } from '@/ui/progress';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } }
  },
  args: { value: 60 }
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj<{
  value: number;
}> = {
  args: { value: 60 },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } }
  },
  render: ({ value }) => <Progress value={value} className="max-w-xs" />
};
export const WithLabel: Story = {
  render: (args) => (
    <Progress {...args} className="max-w-xs">
      <div className="flex items-center justify-between">
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  )
};
export const Indeterminate: Story = {
  render: () => <Progress value={null} className="max-w-xs" />
};
