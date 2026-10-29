import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarLink } from '@/ui/sidebar';

const meta = { title: 'UI/Sidebar', component: Sidebar, tags: ['autodocs'] } satisfies Meta<typeof Sidebar>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <Sidebar className="h-96">
      <SidebarHeader>Workspace</SidebarHeader>
      <SidebarContent aria-label="Example navigation">
        <SidebarLink href="#overview" active>
          Overview
        </SidebarLink>
        <SidebarLink href="#settings">Settings</SidebarLink>
      </SidebarContent>
      <SidebarFooter>Example workspace</SidebarFooter>
    </Sidebar>
  )
};
