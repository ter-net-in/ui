import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Autocomplete, AutocompleteContent, AutocompleteInput, AutocompleteItem } from '@/ui/autocomplete';

const FRUITS = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Mango', 'Orange', 'Peach', 'Pear'];

const meta = {
  title: 'UI/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs']
} satisfies Meta<typeof Autocomplete>;

export default meta;

export const Playground: StoryObj<{
  radius: 'none' | 'sm' | 'md' | 'lg';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}> = {
  args: { radius: 'md', shadow: 'sm' },
  argTypes: {
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    shadow: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'xl'] }
  },
  render: ({ radius, shadow }) => {
    const [value, setValue] = useState('');
    const filtered = FRUITS.filter((fruit) => fruit.toLowerCase().includes(value.toLowerCase()));

    return (
      <div className="w-full max-w-xs">
        <Autocomplete items={filtered} value={value} onValueChange={setValue}>
          <AutocompleteInput placeholder="Search a fruit" radius={radius} />
          <AutocompleteContent radius={radius} shadow={shadow}>
            {filtered.map((fruit) => (
              <AutocompleteItem key={fruit} value={fruit}>
                {fruit}
              </AutocompleteItem>
            ))}
          </AutocompleteContent>
        </Autocomplete>
      </div>
    );
  }
};
