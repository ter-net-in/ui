import type { Meta, StoryObj } from '@storybook/react';

import { AsciiSvg } from '@/ui/ascii-svg';

const meta = {
  title: 'UI/AsciiSvg',
  component: AsciiSvg,
  tags: ['autodocs']
} satisfies Meta<typeof AsciiSvg>;

export default meta;

const Star = (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Star">
    <title>Star</title>
    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.5l7.1-.6z" />
  </svg>
);

export const Static: StoryObj<typeof meta> = {
  args: { cols: 40, children: Star }
};

export const Blocks: StoryObj<typeof meta> = {
  args: { cols: 40, chars: ' ░▒▓█', children: Star }
};

export const Live: StoryObj<typeof meta> = {
  args: {
    cols: 44,
    live: true,
    children: (
      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Pulsing circle">
        <title>Pulsing circle</title>
        <circle cx="12" cy="12" r="10">
          <animate attributeName="r" values="3;10;3" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    )
  }
};
