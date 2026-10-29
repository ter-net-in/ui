import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useId } from 'react';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';

function RadioOption({
  label,
  ...props
}: ComponentProps<typeof RadioGroupItem> & {
  label: string;
}) {
  const id = useId();
  return (
    <span className="flex items-center gap-2 text-sm">
      <RadioGroupItem id={id} {...props} />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </span>
  );
}
const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs']
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj<{
  orientation: 'vertical' | 'horizontal';
}> = {
  args: { orientation: 'vertical' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
  render: ({ orientation }) => (
    <RadioGroup defaultValue="http" orientation={orientation}>
      <RadioOption value="http" label="HTTP" />
      <RadioOption value="ws" label="WebSocket" />
      <RadioOption value="ftp" label="FTP" />
    </RadioGroup>
  )
};
export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="a" orientation="horizontal">
      <RadioOption value="a" label="A" />
      <RadioOption value="b" label="B" />
    </RadioGroup>
  )
};
