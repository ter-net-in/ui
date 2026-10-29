import type { Meta, StoryObj } from '@storybook/react';
import { OtpField } from '@/ui/otp-field';

const meta = {
  title: 'UI/OtpField',
  component: OtpField,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 1, max: 8 } }
  },
  args: { length: 6 }
} satisfies Meta<typeof OtpField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => <OtpField length={6} />
};
export const FourDigits: Story = {
  args: { length: 4 }
};
export const Prefilled: Story = {
  args: { length: 6, defaultValue: '123456' }
};
