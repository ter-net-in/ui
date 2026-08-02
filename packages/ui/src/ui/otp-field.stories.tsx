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

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full' }> = {
  args: { radius: 'md' },
  argTypes: { radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] } },
  render: ({ radius }) => <OtpField radius={radius} length={6} />
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <div key={r} className="flex items-center gap-3">
          <OtpField radius={r} length={6} />
          <span className="text-xs text-muted-foreground">{r}</span>
        </div>
      ))}
    </div>
  )
};

export const FourDigits: Story = {
  args: { length: 4 }
};

export const Prefilled: Story = {
  args: { length: 6, defaultValue: '123456' }
};
