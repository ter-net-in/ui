import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem } from '@/ui/combobox';

const FRAMEWORKS = ['Next.js', 'React', 'Remix', 'SolidStart', 'SvelteKit', 'Astro', 'Nuxt', 'Qwik'];

const meta = {
  title: 'UI/Combobox',
  component: Combobox,
  tags: ['autodocs']
} satisfies Meta<typeof Combobox>;

export default meta;

export const Playground: StoryObj<{ radius: 'none' | 'sm' | 'md' | 'lg' }> = {
  args: { radius: 'md' },
  argTypes: { radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] } },
  render: ({ radius }) => {
    const [inputValue, setInputValue] = useState('');
    const filtered = FRAMEWORKS.filter((framework) => framework.toLowerCase().includes(inputValue.toLowerCase()));

    return (
      <div className="w-full max-w-xs">
        <Combobox items={filtered} inputValue={inputValue} onInputValueChange={setInputValue}>
          <ComboboxInput placeholder="Pick a framework" radius={radius} />
          <ComboboxContent radius={radius}>
            {filtered.map((framework) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            ))}
          </ComboboxContent>
        </Combobox>
      </div>
    );
  }
};
