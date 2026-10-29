'use client';

import * as React from 'react';
import { AppBody, AppHeader, AppMain, AppShell } from '@/ui/app-shell';
import { Button } from '@/ui/button';
import { EmptyState } from '@/ui/empty-state';
import { Input } from '@/ui/input';
import { Sidebar, SidebarButton, SidebarContent, SidebarFooter, SidebarHeader } from '@/ui/sidebar';
import { SidebarDrawer } from '@/ui/sidebar-drawer';
import { SplitPane, SplitPanePrimary, SplitPaneSecondary } from '@/ui/split-pane';

const messages = [
  {
    id: 'release',
    sender: 'Release notes',
    subject: 'Your workspace is ready',
    text: 'This is a complete responsive layout example. The sidebar, list, and detail pane are composed from independent components.'
  },
  {
    id: 'welcome',
    sender: 'Example team',
    subject: 'A quieter place to work',
    text: 'Select a message on a narrow screen, then use Back to return to the list. Keyboard focus returns to the item you selected.'
  },
  {
    id: 'review',
    sender: 'Design review',
    subject: 'Shared foundations',
    text: 'Consistent typography, borders, corners, and spacing let the content lead. This example contains fictional data only.'
  }
];

export function WorkspaceExample() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [folder, setFolder] = React.useState('Inbox');
  const [navigationOpen, setNavigationOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const detail = messages.find((message) => message.id === selected);
  const filtered =
    folder === 'Inbox'
      ? messages.filter((message) =>
          `${message.sender} ${message.subject}`.toLowerCase().includes(search.toLowerCase())
        )
      : [];
  const navigation = (
    <>
      <SidebarContent aria-label="Example folders">
        {['Inbox', 'Archive', 'Trash'].map((name) => (
          <SidebarButton
            key={name}
            active={folder === name}
            onClick={() => {
              setFolder(name);
              setSelected(null);
              setNavigationOpen(false);
            }}
          >
            {name}
          </SidebarButton>
        ))}
      </SidebarContent>
      <SidebarFooter>Fictional example data</SidebarFooter>
    </>
  );

  return (
    <AppShell>
      <AppHeader>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation"
          className="lg:hidden"
          onClick={() => setNavigationOpen(true)}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <span className="font-semibold">Workspace example</span>
        <a className="ml-auto text-sm text-primary hover:underline" href="/examples">
          All examples
        </a>
      </AppHeader>
      <AppBody>
        <Sidebar className="hidden lg:flex">
          <SidebarHeader>
            <span className="font-medium">Folders</span>
          </SidebarHeader>
          {navigation}
        </Sidebar>
        <SidebarDrawer open={navigationOpen} onOpenChange={setNavigationOpen} title="Folders">
          {navigation}
        </SidebarDrawer>
        <AppMain className="flex overflow-hidden">
          <SplitPane activePane={selected ? 'secondary' : 'primary'}>
            <SplitPanePrimary aria-label="Message list">
              <div className="space-y-3 border-b border-border p-4">
                <h1 className="text-base font-semibold">{folder}</h1>
                <Input
                  aria-label="Search messages"
                  type="search"
                  placeholder="Search messages"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {filtered.length ? (
                  filtered.map((message) => (
                    <button
                      type="button"
                      key={message.id}
                      onClick={() => setSelected(message.id)}
                      className={`flex w-full cursor-pointer flex-col gap-1 border-b border-border p-4 text-left outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${selected === message.id ? 'bg-accent' : ''}`}
                    >
                      <span className="text-xs text-muted-foreground">{message.sender}</span>
                      <span className="font-medium">{message.subject}</span>
                      <span className="line-clamp-2 text-xs leading-5 text-muted-foreground">{message.text}</span>
                    </button>
                  ))
                ) : (
                  <EmptyState
                    title={search ? 'No matches' : 'Folder is empty'}
                    description={search ? 'Try another search term.' : 'Choose Inbox to explore the example messages.'}
                  />
                )}
              </div>
            </SplitPanePrimary>
            <SplitPaneSecondary aria-label="Message detail">
              {detail ? (
                <>
                  <div className="flex min-h-14 items-center border-b border-border px-4">
                    <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSelected(null)}>
                      Back to messages
                    </Button>
                    <span className="hidden text-xs text-muted-foreground lg:inline">Illustrative message</span>
                  </div>
                  <article className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-8">
                    <p className="text-sm text-muted-foreground">{detail.sender}</p>
                    <h2 className="text-xl font-semibold">{detail.subject}</h2>
                    <p className="max-w-prose text-sm leading-7">{detail.text}</p>
                  </article>
                </>
              ) : (
                <EmptyState
                  className="flex-1"
                  title="Select a message"
                  description="Choose a message from the list to read it here."
                />
              )}
            </SplitPaneSecondary>
          </SplitPane>
        </AppMain>
      </AppBody>
    </AppShell>
  );
}
