import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from '@/ui/accordion';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui/dialog';
import { Input } from '@/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Progress } from '@/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Slider } from '@/ui/slider';
import { Switch } from '@/ui/switch';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/ui/tabs';
import { Toggle } from '@/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-10">
      <h2 className="mb-6 text-xs font-extrabold uppercase tracking-[0.1em] text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 py-16">
      <header className="border-b border-border pb-10">
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.1em] text-muted-foreground">
          Established 2026 · Base UI + Tailwind
        </p>
        <h1 className="text-[clamp(3rem,10vw,6rem)] font-bold">internet&#8288;-&#8288;ui</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          A place on the internet for components. Copy-paste into your project with{' '}
          <code className="bg-muted px-1 text-foreground">npx internet-ui add &lt;name&gt;</code>.
        </p>
      </header>

      <Section title="Button">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Input">
        <Input placeholder="you@internet.in" className="max-w-xs" />
      </Section>

      <Section title="Switch">
        <Switch defaultChecked />
        <Switch />
      </Section>

      <Section title="Select">
        <Select>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Pick a protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="http">HTTP</SelectItem>
            <SelectItem value="ws">WebSocket</SelectItem>
            <SelectItem value="ftp">FTP</SelectItem>
          </SelectContent>
        </Select>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTab value="overview">Overview</TabsTab>
            <TabsTab value="install">Install</TabsTab>
          </TabsList>
          <TabsPanel value="overview">Unstyled primitives, sharp edges.</TabsPanel>
          <TabsPanel value="install">npx internet-ui add tabs</TabsPanel>
        </Tabs>
      </Section>

      <Section title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ship it?</DialogTitle>
              <DialogDescription>This will deploy to the internet.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost">Cancel</Button>} />
              <DialogClose render={<Button>Confirm</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Tooltip">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
            <TooltipContent>On the internet</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Section>

      <Section title="Checkbox / Radio / Toggle">
        <span className="flex items-center gap-2 text-sm">
          <Checkbox defaultChecked /> Accept
        </span>
        <RadioGroup defaultValue="a" className="flex-row">
          <span className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="a" /> A
          </span>
          <span className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="b" /> B
          </span>
        </RadioGroup>
        <Toggle>Bold</Toggle>
      </Section>

      <Section title="Avatar / Progress / Slider">
        <Avatar>
          <AvatarFallback>VG</AvatarFallback>
        </Avatar>
        <Progress value={60} className="max-w-xs" />
        <Slider defaultValue={40} className="max-w-xs" />
      </Section>

      <Section title="Popover">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
          <PopoverContent>Anchored content on the internet.</PopoverContent>
        </Popover>
      </Section>

      <Section title="Accordion">
        <Accordion className="w-full">
          <AccordionItem>
            <AccordionTrigger>What is this?</AccordionTrigger>
            <AccordionPanel>A copy-paste component library.</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Built on?</AccordionTrigger>
            <AccordionPanel>Base UI + Tailwind.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Section>
    </main>
  );
}
