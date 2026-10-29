import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from '@/ui/toolbar';

const meta = {
  title: 'UI/Toolbar',
  component: Toolbar,
  tags: ['autodocs']
} satisfies Meta<typeof Toolbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarButton>Italic</ToolbarButton>
        <ToolbarButton>Underline</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton>Share</ToolbarButton>
      <ToolbarLink href="#">Docs</ToolbarLink>
    </Toolbar>
  )
};
