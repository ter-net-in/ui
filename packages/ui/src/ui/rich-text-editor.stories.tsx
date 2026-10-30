import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RichTextEditor } from '@/ui/rich-text-editor';

const meta = { title: 'UI/Rich Text Editor', component: RichTextEditor, tags: ['autodocs'] } satisfies Meta<
  typeof RichTextEditor
>;
export default meta;
function Demo() {
  const [value, setValue] = useState('<p>A clear message starts here.</p>');
  return (
    <div className="w-full max-w-2xl">
      <RichTextEditor aria-label="Message" value={value} onChange={({ html }) => setValue(html)} />
    </div>
  );
}
export const Playground: StoryObj = { render: () => <Demo /> };
