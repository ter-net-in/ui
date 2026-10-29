import type { Meta, StoryObj } from '@storybook/react';
import { PageActions, PageContainer, PageDescription, PageHeader, PageSection, PageTitle } from '@/ui/page-layout';

const meta = { title: 'UI/Page Layout', component: PageContainer, tags: ['autodocs'] } satisfies Meta<
  typeof PageContainer
>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <PageContainer>
      <PageHeader>
        <div>
          <PageTitle>Workspace</PageTitle>
          <PageDescription>Shared page hierarchy and spacing.</PageDescription>
        </div>
        <PageActions>
          <button type="button">Manage</button>
        </PageActions>
      </PageHeader>
      <PageSection>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p>Put application content here.</p>
      </PageSection>
    </PageContainer>
  )
};
