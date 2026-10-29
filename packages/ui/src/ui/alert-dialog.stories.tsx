import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/ui/alert-dialog';
import { Button } from '@/ui/button';

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs']
} satisfies Meta<typeof AlertDialog>;
export default meta;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive">Delete account</Button>} />
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from the
          internet.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost">Cancel</Button>} />
          <AlertDialogClose render={<Button variant="destructive">Delete</Button>} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};
