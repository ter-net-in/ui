import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/ui/input';
import { InputAddon, InputGroup } from '@/ui/input-group';

const meta = { title: 'UI/Input Group', component: InputGroup, tags: ['autodocs'] } satisfies Meta<typeof InputGroup>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <label htmlFor="group-example">Workspace address</label>
      <InputGroup>
        <Input id="group-example" defaultValue="development" />
        <InputAddon>.example.com</InputAddon>
      </InputGroup>
    </div>
  )
};
