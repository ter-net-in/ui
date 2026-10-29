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
export const Playground: StoryObj = {
  args: {},
  argTypes: {},
  render: () => {
    const [value, setValue] = useState('');
    const filtered = FRUITS.filter((fruit) => fruit.toLowerCase().includes(value.toLowerCase()));
    return (
      <div className="w-full max-w-xs">
        <Autocomplete items={filtered} value={value} onValueChange={setValue}>
          <AutocompleteInput placeholder="Search a fruit" />
          <AutocompleteContent>
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
