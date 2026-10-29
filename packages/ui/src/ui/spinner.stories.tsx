import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@/ui/spinner';

const meta = { title: 'UI/Spinner', component: Spinner, tags: ['autodocs'] } satisfies Meta<typeof Spinner>;
export default meta;
export const Playground: StoryObj = { render: () => <Spinner label="Saving changes…" /> };
