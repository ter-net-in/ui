import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from '@/ui/toggle';
import { ToggleGroup } from '@/ui/toggle-group';

const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs']
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' }> = {
  args: { radius: 'md' },
  argTypes: { radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] } },
  render: ({ radius }) => (
    <ToggleGroup radius={radius} defaultValue={['left']}>
      <Toggle value="left">Left</Toggle>
      <Toggle value="center">Center</Toggle>
      <Toggle value="right">Right</Toggle>
    </ToggleGroup>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
        <ToggleGroup key={r} radius={r} defaultValue={['left']}>
          <Toggle value="left">{r}</Toggle>
          <Toggle value="center">Center</Toggle>
          <Toggle value="right">Right</Toggle>
        </ToggleGroup>
      ))}
    </div>
  )
};

export const Single: Story = {
  render: () => (
    <ToggleGroup defaultValue={['left']}>
      <Toggle value="left">Left</Toggle>
      <Toggle value="center">Center</Toggle>
      <Toggle value="right">Right</Toggle>
    </ToggleGroup>
  )
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={['bold', 'italic']}>
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  )
};
