import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/ui/separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs']
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj<{
  orientation: 'horizontal' | 'vertical';
}> = {
  args: { orientation: 'horizontal' },
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
  render: ({ orientation }) =>
    orientation === 'vertical' ? (
      <div className="flex h-6 items-center gap-4 text-sm">
        <span>HTTP</span>
        <Separator orientation={orientation} />
        <span>WS</span>
        <Separator orientation={orientation} />
        <span>FTP</span>
      </div>
    ) : (
      <div className="w-64">
        <p className="text-sm">Above</p>
        <Separator orientation={orientation} className="my-4" />
        <p className="text-sm">Below</p>
      </div>
    )
};
export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-4 text-sm">
      <span>HTTP</span>
      <Separator orientation="vertical" />
      <span>WS</span>
      <Separator orientation="vertical" />
      <span>FTP</span>
    </div>
  )
};
