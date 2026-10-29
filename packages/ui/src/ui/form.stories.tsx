import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import { Field, FieldControl, FieldError, FieldLabel } from '@/ui/field';
import { Form } from '@/ui/form';

const meta = {
  title: 'UI/Form',
  component: Form,
  tags: ['autodocs']
} satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {
  render: () => (
    <Form
      className="max-w-xs"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl type="email" required placeholder="you@internet.in" />
        <FieldError match>Enter a valid email.</FieldError>
      </Field>
      <Field name="password">
        <FieldLabel>Password</FieldLabel>
        <FieldControl type="password" required placeholder="••••••••" />
      </Field>
      <Button type="submit">Sign in</Button>
    </Form>
  )
};
