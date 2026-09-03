import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useId } from 'react';

import { Checkbox } from '@/ui/checkbox';

type CheckboxOptionProps = ComponentProps<typeof Checkbox> & {
  label: string;
  labelClassName?: string;
};

function CheckboxOption({ label, labelClassName, ...props }: CheckboxOptionProps) {
  const id = useId();

  return (
    <span className={`flex items-center gap-2 ${labelClassName ?? ''}`}>
      <Checkbox id={id} {...props} />
      <label htmlFor={id} className={props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
        {label}
      </label>
    </span>
  );
}

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs']
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; disabled: boolean }> = {
  args: { radius: 'md', disabled: false },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' }
  },
  render: ({ radius, disabled }) => (
    <CheckboxOption
      radius={radius}
      disabled={disabled}
      defaultChecked
      label="Accept the terms"
      labelClassName={`text-sm ${disabled ? 'opacity-60' : ''}`}
    />
  )
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <CheckboxOption label="Unchecked" />
      <CheckboxOption defaultChecked label="Checked" />
      <CheckboxOption disabled label="Disabled" labelClassName="opacity-60" />
      <CheckboxOption disabled defaultChecked label="Disabled checked" labelClassName="opacity-60" />
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <CheckboxOption key={r} radius={r} defaultChecked label={r} labelClassName="text-sm" />
      ))}
    </div>
  )
};
