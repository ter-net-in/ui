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

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; value: number }> = {
  args: { radius: 'md', value: 60 },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    value: { control: { type: 'range', min: 0, max: 100 } }
  },
  render: ({ radius, value }) => <Progress radius={radius} value={value} className="max-w-xs" />
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

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <Progress key={r} radius={r} value={60} />
      ))}
    </div>
  )
};
