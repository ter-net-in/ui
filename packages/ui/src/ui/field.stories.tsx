import type { Meta, StoryObj } from '@storybook/react';

import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from '@/ui/field';

const meta = {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs']
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full' }> = {
  args: { radius: 'md' },
  argTypes: { radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] } },
  render: ({ radius }) => (
    <Field name="email" className="max-w-xs">
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" radius={radius} placeholder="you@internet.in" />
      <FieldDescription>We will never share your address.</FieldDescription>
    </Field>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <Field key={r} name={r} className="max-w-xs">
          <FieldLabel>{r}</FieldLabel>
          <FieldControl radius={r} placeholder="you@internet.in" />
        </Field>
      ))}
    </div>
  )
};

export const WithError: Story = {
  render: () => (
    <Field name="username" className="max-w-xs">
      <FieldLabel>Username</FieldLabel>
      <FieldControl required placeholder="handle" />
      <FieldError match>This field is required.</FieldError>
    </Field>
  )
};
