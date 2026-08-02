import type { Meta, StoryObj } from '@storybook/react';

import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from '@/ui/accordion';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs']
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<{ variant: 'default' | 'ghost'; radius: 'none' | 'sm' | 'md' | 'lg' }> = {
  args: { variant: 'default', radius: 'none' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'ghost'] },
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] }
  },
  render: ({ variant, radius }) => (
    <Accordion variant={variant} radius={radius} className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>What is this?</AccordionTrigger>
        <AccordionPanel>A copy-paste component library.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Built on?</AccordionTrigger>
        <AccordionPanel>Base UI + Tailwind.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>How do I install?</AccordionTrigger>
        <AccordionPanel>Run npx @ternetin/ui add accordion.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
        <Accordion key={r} radius={r} className="w-full max-w-md">
          <AccordionItem>
            <AccordionTrigger>{r}</AccordionTrigger>
            <AccordionPanel>A copy-paste component library.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
};

export const Ghost: Story = {
  render: () => (
    <Accordion variant="ghost" className="w-full max-w-md">
      <AccordionItem>
        <AccordionTrigger>What is this?</AccordionTrigger>
        <AccordionPanel>A copy-paste component library.</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Built on?</AccordionTrigger>
        <AccordionPanel>Base UI + Tailwind.</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>How do I install?</AccordionTrigger>
        <AccordionPanel>Run npx @ternetin/ui add accordion.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion defaultValue={['a']} className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionPanel>This panel is expanded by default.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionPanel>This one starts collapsed.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
};
