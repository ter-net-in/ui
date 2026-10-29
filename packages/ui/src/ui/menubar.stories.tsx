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
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <Menubar>
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
