import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import { Toaster, ToastProvider, useToast } from '@/ui/toast';

const meta = {
  title: 'UI/Toast',
  component: ToastProvider,
  tags: ['autodocs']
} satisfies Meta<typeof ToastProvider>;
export default meta;
function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast.add({
            title: 'Deployed',
            description: 'Your changes are live on the internet.'
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.add({
            title: 'Build failed',
            description: 'Check the logs and try again.',
            priority: 'high'
          })
        }
      >
        Show error toast
      </Button>
    </div>
  );
}
export const Playground: StoryObj<{
  position: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center';
}> = {
  args: { position: 'bottom-right' },
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left', 'top-center']
    }
  },
  render: ({ position }) => (
    <ToastProvider>
      <ToastDemo />
      <Toaster position={position} />
    </ToastProvider>
  )
};
