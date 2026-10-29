import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs']
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
        <TooltipContent>On the internet</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};
export const Multiple: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Copy</Button>} />
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Delete</Button>} />
          <TooltipContent>Remove forever</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
};
