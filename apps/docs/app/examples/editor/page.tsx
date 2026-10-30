'use client';
import { useState } from 'react';
import { Button } from '@/ui/button';
import { PageContainer, PageDescription, PageHeader, PageTitle } from '@/ui/page-layout';
import { RichTextEditor, type RichTextValue } from '@/ui/rich-text-editor';
import { SiteHeader } from '../../site-header';
export default function EditorExample() {
  const [value, setValue] = useState<RichTextValue>({ html: '', text: '' });
  const [preview, setPreview] = useState('');
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="max-w-3xl">
          <PageHeader>
            <div>
              <PageTitle>Write a message</PageTitle>
              <PageDescription>
                Classic formatting, keyboard shortcuts, and a plain-text alternative. Try the editor used in Mail.
              </PageDescription>
            </div>
          </PageHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setPreview(value.text);
            }}
          >
            <div id="message-label" className="block text-sm font-medium">
              Message
            </div>
            <RichTextEditor id="message" aria-labelledby="message-label" value={value.html} onChange={setValue} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <a href="/components" className="text-sm text-primary hover:underline">
                Install rich-text-editor
              </a>
              <Button type="submit">Preview message</Button>
            </div>
            <pre
              role="status"
              hidden={!preview}
              className="whitespace-pre-wrap rounded-surface border border-border p-4 text-sm"
            >
              {preview}
            </pre>
          </form>
        </PageContainer>
      </main>
    </>
  );
}
