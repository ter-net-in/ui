import type { Meta, StoryObj } from '@storybook/react';
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from '@/ui/field';

const meta = {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs']
} satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <Field name="email" className="max-w-xs">
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" placeholder="you@internet.in" />
      <FieldDescription>We will never share your address.</FieldDescription>
    </Field>
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
