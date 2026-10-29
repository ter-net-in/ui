import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from '@/ui/popover';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs']
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>Anchored content on the internet.</PopoverContent>
    </Popover>
  )
};
export const WithTitle: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Details</Button>} />
      <PopoverContent>
        <div className="flex flex-col gap-1">
          <PopoverTitle>Protocol</PopoverTitle>
          <PopoverDescription>Anchored, portalled, and sharp by default.</PopoverDescription>
        </div>
      </PopoverContent>
    </Popover>
  )
};
