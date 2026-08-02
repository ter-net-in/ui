import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui/dialog';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs']
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg'; shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' }> =
  {
    args: { radius: 'md', shadow: 'lg' },
    argTypes: {
      radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
      shadow: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'xl'] }
    },
    render: ({ radius, shadow }) => (
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
        <DialogContent radius={radius} shadow={shadow}>
          <DialogHeader>
            <DialogTitle>Ship it?</DialogTitle>
            <DialogDescription>This will deploy to the internet.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost">Cancel</Button>} />
            <DialogClose render={<Button>Confirm</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  };

export const WithBody: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your details and save when you are done.</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Any content can live inside a dialog — forms, lists, or plain copy like this.
        </p>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <DialogClose render={<Button>Save changes</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
