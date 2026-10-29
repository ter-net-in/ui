import type { Meta, StoryObj } from '@storybook/react';
import { SettingsExample } from '@/ui/settings-example';

const meta = {
  title: 'Examples/Settings Example',
  component: SettingsExample,
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof SettingsExample>;
export default meta;
export const Playground: StoryObj<typeof meta> = {};
