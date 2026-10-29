import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/ui/collapsible';

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs']
} satisfies Meta<typeof Collapsible>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj<{
  variant: 'default' | 'ghost';
}> = {
  args: { variant: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'ghost'] }
  },
  render: ({ variant }) => (
    <Collapsible variant={variant} className="w-full max-w-sm">
      <CollapsibleTrigger className="w-full p-3">Show details</CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="p-3">
          These primitives ship unstyled with sharp edges. Copy-paste them into your project and restyle as needed.
        </p>
      </CollapsiblePanel>
    </Collapsible>
  )
};
export const Ghost: Story = {
  render: () => (
    <Collapsible variant="ghost" defaultOpen className="w-full max-w-sm">
      <CollapsibleTrigger className="w-full">Show details</CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="pt-3 text-muted-foreground">
          The ghost variant drops the outer border. The chevron rotates when the panel is open.
        </p>
      </CollapsiblePanel>
    </Collapsible>
  )
};
export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-full max-w-sm">
      <CollapsibleTrigger className="w-full p-3">Toggle</CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="p-3">This panel starts expanded.</p>
      </CollapsiblePanel>
    </Collapsible>
  )
};
