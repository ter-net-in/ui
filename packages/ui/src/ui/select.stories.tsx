import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs']
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <Select>
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Pick a protocol" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="http">HTTP</SelectItem>
        <SelectItem value="ws">WebSocket</SelectItem>
        <SelectItem value="ftp">FTP</SelectItem>
      </SelectContent>
    </Select>
  )
};
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="ws">
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Pick a protocol" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="http">HTTP</SelectItem>
        <SelectItem value="ws">WebSocket</SelectItem>
        <SelectItem value="ftp">FTP</SelectItem>
      </SelectContent>
    </Select>
  )
};
