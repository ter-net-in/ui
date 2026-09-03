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

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg'; shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' }> =
  {
    args: { radius: 'md', shadow: 'sm' },
    argTypes: {
      radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
      shadow: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'xl'] }
    },
    render: ({ radius, shadow }) => (
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
        <PopoverContent radius={radius} shadow={shadow}>
          Anchored content on the internet.
        </PopoverContent>
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
