import type { Meta, StoryObj } from '@storybook/react';
import { Field, FieldControl, FieldLabel } from '@/ui/field';
import { Fieldset, FieldsetLegend } from '@/ui/fieldset';

const meta = {
  title: 'UI/Fieldset',
  component: Fieldset,
  tags: ['autodocs']
} satisfies Meta<typeof Fieldset>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj<{
  variant: 'default' | 'ghost';
}> = {
  args: { variant: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'ghost'] }
  },
  render: ({ variant }) => (
    <Fieldset variant={variant} className="max-w-sm">
      <FieldsetLegend>Billing address</FieldsetLegend>
      <Field name="street">
        <FieldLabel>Street</FieldLabel>
        <FieldControl placeholder="1 Internet Way" />
      </Field>
      <Field name="city">
        <FieldLabel>City</FieldLabel>
        <FieldControl placeholder="Brussels" />
      </Field>
    </Fieldset>
  )
};
export const Ghost: Story = {
  render: () => (
    <Fieldset variant="ghost" className="max-w-sm">
      <FieldsetLegend>Billing address</FieldsetLegend>
      <Field name="street">
        <FieldLabel>Street</FieldLabel>
        <FieldControl placeholder="1 Internet Way" />
      </Field>
      <Field name="city">
        <FieldLabel>City</FieldLabel>
        <FieldControl placeholder="Brussels" />
      </Field>
    </Fieldset>
  )
};
