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
export const Playground: StoryObj<{
  disabled: boolean;
}> = {
  args: { disabled: false },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  render: ({ disabled }) => <NumberField disabled={disabled} defaultValue={1} />
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
