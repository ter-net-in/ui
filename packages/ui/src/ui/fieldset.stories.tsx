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

export const Playground: StoryObj<{ variant: 'default' | 'ghost'; radius: 'none' | 'sm' | 'md' | 'lg' }> = {
  args: { variant: 'default', radius: 'none' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'ghost'] },
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] }
  },
  render: ({ variant, radius }) => (
    <Fieldset variant={variant} radius={radius} className="max-w-sm">
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

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
        <Fieldset key={r} radius={r} className="max-w-xs">
          <FieldsetLegend>{r}</FieldsetLegend>
          <Field name="street">
            <FieldLabel>Street</FieldLabel>
            <FieldControl placeholder="1 Internet Way" />
          </Field>
        </Fieldset>
      ))}
    </div>
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
