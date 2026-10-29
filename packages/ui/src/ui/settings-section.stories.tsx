import type { Meta, StoryObj } from '@storybook/react';
import { SettingsSection } from '@/ui/settings-section';

const meta = { title: 'UI/Settings Section', component: SettingsSection, tags: ['autodocs'] } satisfies Meta<
  typeof SettingsSection
>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div className="max-w-xl">
      <SettingsSection title="General" description="Settings related to your workspace.">
        <label className="flex gap-3">
          <input type="checkbox" defaultChecked />
          Enable updates
        </label>
      </SettingsSection>
    </div>
  )
};
