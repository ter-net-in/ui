import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline', 'muted', 'ghost'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    corners: { control: 'inline-radio', options: ['none', 'diagonal', 'all'] },
    cornerTone: { control: 'inline-radio', options: ['split', 'primary', 'foreground'] }
  },
  args: { variant: 'default', padding: 'md', corners: 'none', cornerTone: 'split' }
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Protocol</CardTitle>
        <CardDescription>Tune the card to your use-case.</CardDescription>
      </CardHeader>
      <CardContent>Adjust variant, padding and public-page corners from the Controls panel.</CardContent>
      <CardFooter>
        <Button size="sm">Accept</Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['default', 'outline', 'muted', 'ghost'] as const).map((v) => (
        <Card key={v} variant={v} className="h-28 w-40 items-center justify-center text-center">
          <CardTitle className="text-sm">{v}</CardTitle>
        </Card>
      ))}
    </div>
  )
};
export const Corners: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {(['none', 'diagonal', 'all'] as const).map((c) => (
        <Card key={c} corners={c} className="h-28 w-40 items-center justify-center text-center">
          <CardTitle className="text-sm">{c}</CardTitle>
        </Card>
      ))}
    </div>
  )
};
export const CornerTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {(['split', 'primary', 'foreground'] as const).map((t) => (
        <Card key={t} corners="all" cornerTone={t} className="h-28 w-40 items-center justify-center text-center">
          <CardTitle className="text-sm">{t}</CardTitle>
        </Card>
      ))}
    </div>
  )
};
/** Brackets read from CSS variables, so any instance can retune them. */
export const CornerSizing: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <Card
        corners="diagonal"
        className="h-28 w-44 items-center justify-center text-center [--card-corner-size:2.5rem] [--card-corner-width:1px]"
      >
        <CardTitle className="text-sm">long &amp; thin</CardTitle>
      </Card>
      <Card
        corners="all"
        cornerTone="primary"
        className="h-28 w-44 items-center justify-center text-center [--card-corner-size:0.75rem] [--card-corner-width:5px]"
      >
        <CardTitle className="text-sm">short &amp; heavy</CardTitle>
      </Card>
      <Card
        corners="diagonal"
        className="h-28 w-44 items-center justify-center text-center [--card-corner-accent:var(--color-destructive)]"
      >
        <CardTitle className="text-sm">custom accent</CardTitle>
      </Card>
    </div>
  )
};
export const Padding: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
        <Card key={p} padding={p} className="w-40">
          <CardTitle className="text-sm">padding={p}</CardTitle>
        </Card>
      ))}
    </div>
  )
};
