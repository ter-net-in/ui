import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useId } from 'react';
import { Input } from '@/ui/input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'you@internet.in' }
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj<{
  disabled: boolean;
  placeholder: string;
}> = {
  args: { disabled: false, placeholder: 'you@internet.in' },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' }
  },
  render: (args) => <InputPlayground {...args} />
};
function InputPlayground({ disabled, placeholder }: { disabled: boolean; placeholder: string }) {
  const id = useId();
  return (
    <div className="flex max-w-xs flex-col gap-1.5">
      <label htmlFor={id} className="cursor-pointer text-xs font-medium uppercase tracking-[0.08em] text-foreground">
        Email
      </label>
      <Input id={id} disabled={disabled} placeholder={placeholder} />
    </div>
  );
}
export const Disabled: Story = {
  render: () => <InputWithLabel label="Disabled" disabled placeholder="Disabled" />
};
function InputWithLabel({
  label,
  ...props
}: ComponentProps<typeof Input> & {
  label: string;
}) {
  const id = useId();
  return (
    <div className="flex max-w-xs flex-col gap-1.5">
      <label htmlFor={id} className="cursor-pointer text-xs font-medium uppercase tracking-[0.08em] text-foreground">
        {label}
      </label>
      <Input id={id} {...props} />
    </div>
  );
}
export const Types: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <InputWithLabel label="Text" type="text" placeholder="Text" />
      <InputWithLabel label="Email" type="email" placeholder="Email" />
      <InputWithLabel label="Password" type="password" placeholder="Password" />
      <InputWithLabel label="Number" type="number" placeholder="Number" />
    </div>
  )
};
