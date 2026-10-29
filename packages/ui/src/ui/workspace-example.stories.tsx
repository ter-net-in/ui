import type { Meta, StoryObj } from '@storybook/react';
import { WorkspaceExample } from '@/ui/workspace-example';

const meta = {
  title: 'Examples/Workspace Example',
  component: WorkspaceExample,
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof WorkspaceExample>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
