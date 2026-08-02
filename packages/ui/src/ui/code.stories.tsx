import type { Meta, StoryObj } from '@storybook/react';

import { Code, CodeStack } from '@/ui/code';

const INSTALL = 'npx @ternetin/ui add code';

const SNIPPET = `import { Code } from '@/ui/code';

export function Install() {
  return <Code>npx @ternetin/ui add code</Code>;
}`;

const meta = {
  title: 'UI/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline', 'muted', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    language: {
      control: 'select',
      options: [undefined, 'shell', 'ts', 'tsx', 'js', 'jsx', 'json', 'css', 'html']
    },
    title: { control: 'text' },
    multiline: { control: 'inline-radio', options: [undefined, false, true] },
    copy: { control: 'boolean' }
  },
  args: { variant: 'default', size: 'default', radius: 'none', copy: true }
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="max-w-lg">
      <Code {...args}>{INSTALL}</Code>
    </div>
  )
};

/** One line, and it stays one line: a long command scrolls sideways rather than wrapping. */
export const SingleLine: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      <Code>{INSTALL}</Code>
      <Code>npx @ternetin/ui add accordion button card code dialog popover select tooltip</Code>
    </div>
  )
};

/** Inferred from the snippet — a string with a newline in it becomes a block. */
export const MultiLine: Story = {
  render: () => (
    <div className="max-w-lg">
      <Code>{SNIPPET}</Code>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      {(['default', 'outline', 'muted', 'ghost'] as const).map((v) => (
        <Code key={v} variant={v}>{`variant="${v}"`}</Code>
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      {(['sm', 'default', 'lg'] as const).map((s) => (
        <Code key={s} size={s}>{`size="${s}"`}</Code>
      ))}
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="grid max-w-md gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
        <Code key={r} radius={r}>{`radius="${r}"`}</Code>
      ))}
    </div>
  )
};

/** A sequence to type in order. */
export const Stack: Story = {
  render: () => (
    <CodeStack className="max-w-md">
      <Code>npx @ternetin/ui init</Code>
      <Code>npx @ternetin/ui add code</Code>
      <Code>npm run dev</Code>
    </CodeStack>
  )
};

/** The title strip takes the copy button off the code itself. */
export const WithTitle: Story = {
  render: () => (
    <div className="grid max-w-lg gap-4">
      <Code title="Terminal">{INSTALL}</Code>
      <Code title="components/install.tsx" language="tsx">
        {SNIPPET}
      </Code>
    </div>
  )
};

/**
 * `language` colours the snippet — three inks off the theme, so it reads as page
 * text with accents rather than a rainbow. Plain-string children only.
 */
export const Highlighting: Story = {
  render: () => (
    <div className="grid max-w-lg gap-4">
      <Code language="shell">npx @ternetin/ui add code --overwrite # takes the latest</Code>
      <Code title="code.tsx" language="tsx">
        {SNIPPET}
      </Code>
      <Code title="registry.json" language="json">
        {`{
  "name": "code",
  "type": "registry:ui",
  "dependencies": ["motion"],
  "highlight": true
}`}
      </Code>
      <Code title="globals.css" language="css">
        {`:root {
  /* one loud accent */
  --primary: #0047ff;
  --radius: 0px;
}`}
      </Code>
    </div>
  )
};

/** `copy={false}` for a snippet nobody needs on their clipboard. */
export const WithoutCopy: Story = {
  render: () => (
    <div className="max-w-md">
      <Code copy={false}>GET /v1/components/code</Code>
    </div>
  )
};

/**
 * The `outline` variant reads as a value to take away rather than a command to run:
 * an API key, an ID, a generated URL.
 */
export const Token: Story = {
  render: () => (
    <div className="max-w-md">
      <Code variant="outline" size="lg">
        tr_9f2c41ab7d0e4c8fbb61
      </Code>
    </div>
  )
};
