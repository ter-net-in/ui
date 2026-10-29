import type { Meta, StoryObj } from '@storybook/react';
import { AdminExample } from '@/ui/admin-example';

const meta = {
  title: 'Examples/Admin Example',
  component: AdminExample,
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof AdminExample>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
