import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/ui/button';
import { SidebarDrawer } from '@/ui/sidebar-drawer';

const meta = { title: 'UI/Sidebar Drawer', component: SidebarDrawer, tags: ['autodocs'] } satisfies Meta<
  typeof SidebarDrawer
>;
export default meta;
function SidebarDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open navigation</Button>
      <SidebarDrawer open={open} onOpenChange={setOpen}>
        <nav className="p-4" aria-label="Example navigation">
          <a href="#overview">Overview</a>
        </nav>
      </SidebarDrawer>
    </>
  );
}
export const Playground: StoryObj = { render: () => <SidebarDrawerDemo /> };
