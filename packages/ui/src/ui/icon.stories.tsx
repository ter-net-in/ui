import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Check, Copy, Mail, Plus, Search, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/ui/button';
import { Icon } from '@/ui/icon';

const meta = { title: 'UI/Icon', component: Icon, tags: ['autodocs'] } satisfies Meta<typeof Icon>;
export default meta;
export const Playground: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-5">
        {[Mail, Search, Settings, Copy, Check, Trash2].map((icon, i) => (
          <Icon key={i} icon={icon} />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>
          <Icon icon={Plus} />
          Add domain
        </Button>
        <Button variant="outline">
          Continue
          <Icon icon={ArrowRight} />
        </Button>
      </div>
    </div>
  )
};
