import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@/ui/scroll-area';

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs']
} satisfies Meta<typeof ScrollArea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <ScrollArea className="h-48 w-64 border border-border">
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: 30 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
          <p key={i} className="text-sm">
            Row {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
};
export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 border border-border">
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: 30 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
          <p key={i} className="text-sm">
            Row {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
};
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="h-24 w-64 border border-border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
            key={i}
            className="flex size-16 shrink-0 items-center justify-center border border-border text-sm"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
};
