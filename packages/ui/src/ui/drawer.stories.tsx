import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/ui/drawer';

const meta = {
  title: 'UI/Drawer',
  component: Drawer,
  tags: ['autodocs']
} satisfies Meta<typeof Drawer>;
export default meta;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
      <DrawerContent>
        <DrawerTitle>Settings</DrawerTitle>
        <DrawerDescription>Slides in from the edge of the screen.</DrawerDescription>
        <div className="mt-auto flex justify-end gap-2">
          <DrawerClose render={<Button variant="ghost">Close</Button>} />
          <DrawerClose render={<Button>Save</Button>} />
        </div>
      </DrawerContent>
    </Drawer>
  )
};
