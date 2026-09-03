import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useId } from 'react';

import { Switch } from '@/ui/switch';

function SwitchOption({
  label,
  labelClassName,
  ...props
}: ComponentProps<typeof Switch> & { label: string; labelClassName?: string }) {
  const id = useId();

  return (
    <span className={`flex items-center gap-2 ${labelClassName ?? ''}`}>
      <Switch id={id} {...props} />
      <label htmlFor={id} className={props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
        {label}
      </label>
    </span>
  );
}

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs']
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full'; disabled: boolean }> = {
  args: { radius: 'md', disabled: false },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' }
  },
  render: ({ radius, disabled }) => (
    <SwitchOption
      radius={radius}
      disabled={disabled}
      defaultChecked
      label="Notifications"
      labelClassName={`text-sm ${disabled ? 'opacity-60' : ''}`}
    />
  )
};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch defaultChecked />
      <Switch />
      <Switch defaultChecked disabled />
      <Switch disabled />
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <SwitchOption key={r} radius={r} defaultChecked label={r} labelClassName="text-sm" />
      ))}
    </div>
  )
};
