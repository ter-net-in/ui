import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from '@/ui/accordion';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Checkbox } from '@/ui/checkbox';
import { Code, CodeStack } from '@/ui/code';
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

/** Same heading treatment as {@link Section}, but stacks prose and snippets instead of a component row. */
function Prose({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-10">
      <h2 className="mb-6 text-xs font-extrabold uppercase tracking-[0.1em] text-muted-foreground">{title}</h2>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
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
          <code className="bg-muted px-1 text-foreground">npx @ternetin/ui add &lt;name&gt;</code>.
        </p>
      </header>

      <Prose title="Defaults — set the house style once">
        <p>
          Components ship sharp-cornered with a hard offset shadow. Rather than passing{' '}
          <code className="bg-muted px-1 text-foreground">radius</code> and{' '}
          <code className="bg-muted px-1 text-foreground">shadow</code> at every call site, declare them once in{' '}
          <code className="bg-muted px-1 text-foreground">internet-ui.json</code>:
        </p>

        <Code title="internet-ui.json" language="json">{`{
  "defaults": {
    "radius": "md",
    "shadow": "sm"
  }
}`}</Code>

        <p>
          The CLI substitutes those values when it writes{' '}
          <code className="bg-muted px-1 text-foreground">lib/ui-defaults.ts</code>. Both keys are optional and fall
          back to <code className="bg-muted px-1 text-foreground">none</code> /{' '}
          <code className="bg-muted px-1 text-foreground">md</code>; an unknown value fails the install rather than
          writing a file that will not compile.
        </p>

        <Code title="src/lib/ui-defaults.ts" language="tsx">{`export const UI_DEFAULTS = {
  radius: 'md',
  containerRadius: 'md',
  shadow: 'sm'
} as const;`}</Code>

        <p>
          <code className="bg-muted px-1 text-foreground">containerRadius</code> covers boxy surfaces — dialogs, menus,
          cards — and is derived from <code className="bg-muted px-1 text-foreground">radius</code>, capped at{' '}
          <code className="bg-muted px-1 text-foreground">lg</code> because a 9999px radius turns a rectangle into a
          lozenge. Set it explicitly to decouple the two.
        </p>

        <p>
          Every component leaves its own prop undefined, so these land as the{' '}
          <code className="bg-muted px-1 text-foreground">defaultVariants</code> of the shared scales in{' '}
          <code className="bg-muted px-1 text-foreground">lib/utils.ts</code> — 34 components take{' '}
          <code className="bg-muted px-1 text-foreground">radius</code>, 5 take{' '}
          <code className="bg-muted px-1 text-foreground">shadow</code>, and all of them follow. Nothing below passes
          either prop, so this row shows whatever this site currently defaults to:
        </p>

        <div className="flex flex-wrap items-center gap-4 py-2">
          <Button>Button</Button>
          <Button variant="outline">Outline</Button>
          <Card className="flex h-16 w-28 items-center justify-center text-center text-xs text-foreground">Card</Card>
        </div>

        <p>
          Values are baked in at write time, so editing{' '}
          <code className="bg-muted px-1 text-foreground">internet-ui.json</code> afterwards takes one command to
          re-apply. It rewrites only that one file:
        </p>

        <Code>npx @ternetin/ui add ui-defaults -o</Code>

        <p>
          Or edit <code className="bg-muted px-1 text-foreground">lib/ui-defaults.ts</code> directly — it is your code.
        </p>
      </Prose>

      <Section title="Button">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Button — radius (sharp by default, round per use-case)">
        {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
          <Button key={r} variant="outline" radius={r}>
            {r}
          </Button>
        ))}
      </Section>

      <Section title="Card — radius (sharp by default, round per use-case)">
        {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
          <Card key={r} radius={r} className="h-24 w-32 items-center justify-center text-center">
            <CardTitle className="text-sm">{r}</CardTitle>
          </Card>
        ))}
      </Section>

      <Section title="Card — variants">
        {(['default', 'outline', 'muted', 'ghost'] as const).map((v) => (
          <Card key={v} variant={v} className="h-24 w-32 items-center justify-center text-center">
            <CardTitle className="text-sm">{v}</CardTitle>
          </Card>
        ))}
      </Section>

      <Section title="Card — corners (bracket detail, tuned per instance)">
        {(['diagonal', 'all'] as const).map((c) => (
          <Card key={c} corners={c} className="h-24 w-32 items-center justify-center text-center">
            <CardTitle className="text-sm">{c}</CardTitle>
          </Card>
        ))}
        <Card corners="all" cornerTone="foreground" className="h-24 w-32 items-center justify-center text-center">
          <CardTitle className="text-sm">foreground</CardTitle>
        </Card>
        <Card
          corners="diagonal"
          className="h-24 w-32 items-center justify-center text-center [--card-corner-size:2.5rem] [--card-corner-width:1px]"
        >
          <CardTitle className="text-sm">retuned</CardTitle>
        </Card>
      </Section>

      <Section title="Card — composed">
        <Card corners="diagonal" className="max-w-sm">
          <CardHeader>
            <CardTitle>Protocol</CardTitle>
            <CardDescription>Bracketed corners when your use-case wants it.</CardDescription>
          </CardHeader>
          <CardContent>Compose header, content and footer inside a single padded container.</CardContent>
          <CardFooter>
            <Button size="sm">Accept</Button>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Code — single-line (scrolls, never wraps)">
        <CodeStack>
          <Code>npx @ternetin/ui init</Code>
          <Code>npx @ternetin/ui add code</Code>
        </CodeStack>
        <Code variant="outline">tr_9f2c41ab7d0e4c8fbb61</Code>
      </Section>

      <Section title="Code — multi-line">
        <Code>{`import { Code } from '@/ui/code';

export function Install() {
  return <Code>npx @ternetin/ui add code</Code>;
}`}</Code>
      </Section>

      <Section title="Code — title strip and highlighting">
        <Code language="shell">npx @ternetin/ui add code --overwrite # takes the latest</Code>
        <Code title="components/install.tsx" language="tsx">{`import { Code } from '@/ui/code';

export function Install() {
  return <Code language="shell">npx @ternetin/ui add code</Code>;
}`}</Code>
        <Code title="registry.json" language="json">{`{
  "name": "code",
  "type": "registry:ui",
  "dependencies": ["motion"],
  "highlight": true
}`}</Code>
      </Section>

      <Section title="Code — variants / sizes">
        {(['default', 'outline', 'muted', 'ghost'] as const).map((v) => (
          <Code key={v} variant={v}>{`variant="${v}"`}</Code>
        ))}
        {(['sm', 'default', 'lg'] as const).map((s) => (
          <Code key={s} size={s}>{`size="${s}"`}</Code>
        ))}
        <Code copy={false}>copy={'{false}'}</Code>
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
          <TabsPanel value="install">npx @ternetin/ui add tabs</TabsPanel>
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
