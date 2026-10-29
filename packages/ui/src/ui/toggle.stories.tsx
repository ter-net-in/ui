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
export const Playground: StoryObj<{
  disabled: boolean;
}> = {
  args: { disabled: false },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  render: ({ disabled }) => <Toggle disabled={disabled}>Bold</Toggle>
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
