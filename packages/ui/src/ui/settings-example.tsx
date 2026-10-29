'use client';

import * as React from 'react';
import { Alert } from '@/ui/alert';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { InputAddon, InputGroup } from '@/ui/input-group';
import { PageContainer, PageDescription, PageHeader, PageTitle } from '@/ui/page-layout';
import { SettingsSection } from '@/ui/settings-section';
import { Switch } from '@/ui/switch';

export function SettingsExample() {
  const [saved, setSaved] = React.useState(false);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader>
        <div>
          <PageTitle>Workspace settings</PageTitle>
          <PageDescription>Example settings. Changes stay in this page and are not sent to a server.</PageDescription>
        </div>
        <Button variant="outline" render={<a href="/examples" />}>
          All examples
        </Button>
      </PageHeader>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <SettingsSection title="General" description="The name and address people use to identify this workspace.">
          <div className="max-w-md space-y-2">
            <label htmlFor="workspace-name" className="font-medium">
              Workspace name
            </label>
            <Input id="workspace-name" defaultValue="Development" required />
          </div>
          <div className="max-w-md space-y-2">
            <label htmlFor="workspace-address" className="font-medium">
              Address
            </label>
            <InputGroup>
              <Input id="workspace-address" defaultValue="development" required />
              <InputAddon>.example.com</InputAddon>
            </InputGroup>
          </div>
        </SettingsSection>
        <SettingsSection title="Notifications" description="Choose which updates matter to you.">
          <label className="flex max-w-md items-center justify-between gap-4">
            <span>Service status changes</span>
            <Switch defaultChecked aria-label="Notify about service status changes" />
          </label>
        </SettingsSection>
        <div className="flex items-center justify-end pt-6">
          <Button type="submit">Save changes</Button>
        </div>
        {saved && (
          <Alert tone="success" role="status" className="mt-4">
            Saved in this example only.
          </Alert>
        )}
      </form>
    </PageContainer>
  );
}
