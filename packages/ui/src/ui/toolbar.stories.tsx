import type { Meta, StoryObj } from '@storybook/react';

import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink, ToolbarSeparator } from '@/ui/toolbar';

const meta = {
  title: 'UI/Toolbar',
  component: Toolbar,
  tags: ['autodocs']
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' }> = {
  args: { radius: 'md' },
  argTypes: { radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] } },
  render: ({ radius }) => (
    <Toolbar radius={radius}>
      <ToolbarGroup>
        <ToolbarButton radius={radius}>Bold</ToolbarButton>
        <ToolbarButton radius={radius}>Italic</ToolbarButton>
        <ToolbarButton radius={radius}>Underline</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton radius={radius}>Share</ToolbarButton>
      <ToolbarLink href="#">Docs</ToolbarLink>
    </Toolbar>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
        <Toolbar key={r} radius={r}>
          <ToolbarGroup>
            <ToolbarButton radius={r}>{r}</ToolbarButton>
            <ToolbarButton radius={r}>Italic</ToolbarButton>
            <ToolbarButton radius={r}>Underline</ToolbarButton>
          </ToolbarGroup>
        </Toolbar>
      ))}
    </div>
  )
};
