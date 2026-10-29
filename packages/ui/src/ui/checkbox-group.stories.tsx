import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useId } from 'react';
import { Checkbox } from '@/ui/checkbox';
import { CheckboxGroup } from '@/ui/checkbox-group';

function CheckboxOption({
  label,
  ...props
}: ComponentProps<typeof Checkbox> & {
  label: string;
}) {
  const id = useId();
  return (
    <span className="flex items-center gap-2 text-sm">
      <Checkbox id={id} {...props} />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </span>
  );
}
const meta = {
  title: 'UI/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs']
} satisfies Meta<typeof CheckboxGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj<{
  orientation: 'vertical' | 'horizontal';
}> = {
  args: { orientation: 'vertical' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
  render: ({ orientation }) => (
    <CheckboxGroup orientation={orientation} defaultValue={['ws']}>
      <CheckboxOption name="http" label="HTTP" />
      <CheckboxOption name="ws" label="WebSocket" />
      <CheckboxOption name="ftp" label="FTP" />
    </CheckboxGroup>
  )
};
export const Horizontal: Story = {
  render: () => (
    <CheckboxGroup orientation="horizontal" defaultValue={['ws']}>
      <CheckboxOption name="http" label="HTTP" />
      <CheckboxOption name="ws" label="WebSocket" />
      <CheckboxOption name="ftp" label="FTP" />
    </CheckboxGroup>
  )
};
