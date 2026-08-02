import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' | 'full' }> = {
  args: { radius: 'md' },
  argTypes: { radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] } },
  render: ({ radius }) => (
    <Avatar radius={radius}>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="User avatar" />
      <AvatarFallback>VG</AvatarFallback>
    </Avatar>
  )
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>VG</AvatarFallback>
    </Avatar>
  )
};

export const Group: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/80?img=1" alt="First user" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar className="size-14 text-base">
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
        <div key={r} className="flex flex-col items-center gap-2">
          <Avatar radius={r}>
            <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="User avatar" />
            <AvatarFallback>VG</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{r}</span>
        </div>
      ))}
    </div>
  )
};
