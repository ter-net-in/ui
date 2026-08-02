import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsList, TabsPanel, TabsTab } from '@/ui/tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs']
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ variant: 'default' | 'muted' | 'ghost' }> = {
  args: { variant: 'default' },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'muted', 'ghost'] } },
  render: ({ variant }) => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant={variant}>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="install">Install</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Unstyled primitives, sharp edges.</TabsPanel>
      <TabsPanel value="install">npx @ternetin/ui add tabs</TabsPanel>
    </Tabs>
  )
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="a" className="w-full max-w-md">
      <TabsList>
        <TabsTab value="a">HTTP</TabsTab>
        <TabsTab value="b">WebSocket</TabsTab>
        <TabsTab value="c">FTP</TabsTab>
      </TabsList>
      <TabsPanel value="a">Request/response over the wire.</TabsPanel>
      <TabsPanel value="b">Full-duplex, always on.</TabsPanel>
      <TabsPanel value="c">File transfer, the old way.</TabsPanel>
    </Tabs>
  )
};

export const Muted: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="muted">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="install">Install</TabsTab>
        <TabsTab value="usage">Usage</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Unstyled primitives, sharp edges.</TabsPanel>
      <TabsPanel value="install">npx @ternetin/ui add tabs</TabsPanel>
      <TabsPanel value="usage">Compose the parts however you like.</TabsPanel>
    </Tabs>
  )
};

export const Ghost: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="ghost">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="install">Install</TabsTab>
        <TabsTab value="usage">Usage</TabsTab>
      </TabsList>
      <TabsPanel value="overview">No container, just the rule.</TabsPanel>
      <TabsPanel value="install">npx @ternetin/ui add tabs</TabsPanel>
      <TabsPanel value="usage">Compose the parts however you like.</TabsPanel>
    </Tabs>
  )
};
