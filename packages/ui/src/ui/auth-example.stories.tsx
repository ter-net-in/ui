import type { Meta, StoryObj } from '@storybook/react';
import { AuthExample } from '@/ui/auth-example';

const meta = {
  title: 'Examples/Authentication Example',
  component: AuthExample,
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof AuthExample>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
