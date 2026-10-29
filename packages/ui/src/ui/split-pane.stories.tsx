import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/ui/button';
import { SplitPane, SplitPanePrimary, SplitPaneSecondary } from '@/ui/split-pane';

const meta = { title: 'UI/Split Pane', component: SplitPane, tags: ['autodocs'] } satisfies Meta<typeof SplitPane>;
export default meta;
function SplitPaneDemo() {
  const [pane, setPane] = useState<'primary' | 'secondary'>('primary');
  return (
    <SplitPane className="h-80" activePane={pane}>
      <SplitPanePrimary className="p-4" aria-label="List">
        <Button variant="outline" onClick={() => setPane('secondary')}>
          Read item
        </Button>
      </SplitPanePrimary>
      <SplitPaneSecondary className="gap-4 p-4" aria-label="Detail">
        <Button variant="outline" onClick={() => setPane('primary')}>
          Back
        </Button>
        <p>Detail content.</p>
      </SplitPaneSecondary>
    </SplitPane>
  );
}
export const Playground: StoryObj = { render: () => <SplitPaneDemo /> };
