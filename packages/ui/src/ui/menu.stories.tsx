import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuSubmenuTrigger,
  MenuTrigger,
  SubmenuRoot
} from '@/ui/menu';

const meta = {
  title: 'UI/Menu',
  component: Menu,
  tags: ['autodocs']
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Open menu</Button>} />
      <MenuContent>
        <MenuItem>New file</MenuItem>
        <MenuItem>Open…</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuSeparator />
        <MenuItem disabled>Delete</MenuItem>
      </MenuContent>
    </Menu>
  )
};
export const WithGroupsAndSubmenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Actions</Button>} />
      <MenuContent>
        <MenuGroup>
          <MenuGroupLabel>Edit</MenuGroupLabel>
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <SubmenuRoot>
          <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
          <MenuContent>
            <MenuItem>Copy link</MenuItem>
            <MenuItem>Email</MenuItem>
          </MenuContent>
        </SubmenuRoot>
      </MenuContent>
    </Menu>
  )
};
