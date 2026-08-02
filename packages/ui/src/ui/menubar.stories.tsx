import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/ui/button';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@/ui/menu';
import { Menubar } from '@/ui/menubar';

const meta = {
  title: 'UI/Menubar',
  component: Menubar,
  tags: ['autodocs']
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' }> = {
  args: { radius: 'md' },
  argTypes: { radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] } },
  render: ({ radius }) => (
    <Menubar radius={radius}>
      <Menu>
        <MenuTrigger render={<Button variant="ghost">File</Button>} />
        <MenuContent>
          <MenuItem>New</MenuItem>
          <MenuItem>Open…</MenuItem>
          <MenuSeparator />
          <MenuItem>Quit</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button variant="ghost">Edit</Button>} />
        <MenuContent>
          <MenuItem>Undo</MenuItem>
          <MenuItem>Redo</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button variant="ghost">View</Button>} />
        <MenuContent>
          <MenuItem>Zoom in</MenuItem>
          <MenuItem>Zoom out</MenuItem>
        </MenuContent>
      </Menu>
    </Menubar>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
        <Menubar key={r} radius={r}>
          <Menu>
            <MenuTrigger render={<Button variant="ghost">{r}</Button>} />
            <MenuContent>
              <MenuItem>New</MenuItem>
              <MenuItem>Open…</MenuItem>
            </MenuContent>
          </Menu>
          <Menu>
            <MenuTrigger render={<Button variant="ghost">Edit</Button>} />
            <MenuContent>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
            </MenuContent>
          </Menu>
        </Menubar>
      ))}
    </div>
  )
};
