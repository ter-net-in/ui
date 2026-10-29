import type { Meta, StoryObj } from '@storybook/react';
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from '@/ui/preview-card';

const meta = {
  title: 'UI/PreviewCard',
  component: PreviewCard,
  tags: ['autodocs']
} satisfies Meta<typeof PreviewCard>;
export default meta;
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => (
    <p className="max-w-sm text-sm">
      Built on{' '}
      <PreviewCard>
        <PreviewCardTrigger href="#" className="font-medium underline underline-offset-4">
          Base UI
        </PreviewCardTrigger>
        <PreviewCardContent>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold uppercase tracking-wide">Base UI</span>
            <span className="text-sm text-muted-foreground">
              Unstyled, accessible primitives for building your own design system.
            </span>
          </div>
        </PreviewCardContent>
      </PreviewCard>{' '}
      and Tailwind.
    </p>
  )
};
