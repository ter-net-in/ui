'use client';

import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
  Unlink
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Icon } from '@/ui/icon';
import { Input } from '@/ui/input';
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/ui/toolbar';

export type RichTextValue = { html: string; text: string };
export interface RichTextEditorProps {
  id?: string;
  value: string;
  onChange: (value: RichTextValue) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/** HTML is an editing format, not trusted markup. Sanitize it at the application's send/render boundary. */
export function RichTextEditor({
  id,
  value,
  onChange,
  required,
  disabled = false,
  className,
  ...labels
}: RichTextEditorProps) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [linkError, setLinkError] = useState('');
  const linkInput = useRef<HTMLInputElement>(null);
  const restoreEditorFocus = useRef(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        link: {
          openOnClick: false,
          isAllowedUri: (uri) => /^(https?:\/\/|mailto:)/i.test(uri),
          HTMLAttributes: { target: null, rel: 'noopener noreferrer' }
        }
      })
    ],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-label': labels['aria-label'] ?? 'Rich text editor',
        ...(labels['aria-labelledby'] ? { 'aria-labelledby': labels['aria-labelledby'] } : {}),
        'aria-required': String(Boolean(required)),
        class:
          'min-h-56 p-4 text-base sm:text-sm leading-6 outline-none break-words [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li_p]:my-0 [&_blockquote]:border-l [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2'
      }
    },
    onUpdate: ({ editor }) => onChange({ html: editor.getHTML(), text: editor.getText({ blockSeparator: '\n' }) })
  });
  const state = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor
        ? {
            bold: editor.isActive('bold'),
            italic: editor.isActive('italic'),
            underline: editor.isActive('underline'),
            strike: editor.isActive('strike'),
            bulletList: editor.isActive('bulletList'),
            orderedList: editor.isActive('orderedList'),
            blockquote: editor.isActive('blockquote'),
            link: editor.isActive('link'),
            undo: editor.can().undo(),
            redo: editor.can().redo()
          }
        : null
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);
  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);
  useEffect(() => {
    if (linkOpen) linkInput.current?.focus();
  }, [linkOpen]);

  const controls = [
    { label: 'Bold', icon: Bold, active: state?.bold, run: () => editor?.chain().focus().toggleBold().run() },
    { label: 'Italic', icon: Italic, active: state?.italic, run: () => editor?.chain().focus().toggleItalic().run() },
    {
      label: 'Underline',
      icon: Underline,
      active: state?.underline,
      run: () => editor?.chain().focus().toggleUnderline().run()
    },
    {
      label: 'Strikethrough',
      icon: Strikethrough,
      active: state?.strike,
      run: () => editor?.chain().focus().toggleStrike().run()
    },
    {
      label: 'Bullet list',
      icon: List,
      active: state?.bulletList,
      run: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      label: 'Numbered list',
      icon: ListOrdered,
      active: state?.orderedList,
      run: () => editor?.chain().focus().toggleOrderedList().run()
    },
    {
      label: 'Block quote',
      icon: Quote,
      active: state?.blockquote,
      run: () => editor?.chain().focus().toggleBlockquote().run()
    }
  ];
  useEffect(() => {
    if (linkOpen || !restoreEditorFocus.current) return;
    restoreEditorFocus.current = false;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => editor?.commands.focus());
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [editor, linkOpen]);
  function closeLink() {
    restoreEditorFocus.current = true;
    setLinkOpen(false);
    setLinkError('');
  }
  function applyLink() {
    if (!/^(https?:\/\/[^\s]+|mailto:[^\s@]+@[^\s@]+)$/i.test(url.trim())) {
      setLinkError('Enter a full https://, http://, or mailto: address.');
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
    closeLink();
  }
  return (
    <div
      className={cn(
        'min-w-0 rounded-control border border-border bg-background focus-within:border-ring focus-within:ring-1 focus-within:ring-ring',
        disabled && 'opacity-60',
        className
      )}
    >
      <Toolbar
        aria-label="Text formatting"
        className="grid grid-cols-[repeat(auto-fit,minmax(2.75rem,1fr))] gap-1 rounded-b-none rounded-t-control border-0 border-b bg-muted/50 p-1.5 sm:flex sm:flex-wrap"
      >
        {controls.map(({ label, icon, active, run }, i) => (
          <span key={label} className="contents">
            {i === 4 && <ToolbarSeparator className="hidden sm:block" />}
            <ToolbarButton
              type="button"
              aria-label={label}
              title={label}
              aria-pressed={Boolean(active)}
              disabled={!editor || disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={run}
              className="h-11 w-full p-0 sm:size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11 aria-pressed:bg-accent aria-pressed:text-accent-foreground"
            >
              <Icon icon={icon} />
            </ToolbarButton>
          </span>
        ))}
        <ToolbarSeparator className="hidden sm:block" />
        <ToolbarButton
          type="button"
          aria-label="Insert link"
          title="Insert link"
          aria-pressed={Boolean(state?.link)}
          disabled={!editor || disabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setUrl(editor?.getAttributes('link').href ?? '');
            setLinkError('');
            setLinkOpen(true);
          }}
          className="h-11 w-full p-0 sm:size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11 aria-pressed:bg-accent aria-pressed:text-accent-foreground"
        >
          <Icon icon={Link} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          aria-label="Remove link"
          title="Remove link"
          disabled={!state?.link || disabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor?.chain().focus().extendMarkRange('link').unsetLink().run()}
          className="h-11 w-full p-0 sm:size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11"
        >
          <Icon icon={Unlink} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          aria-label="Clear formatting"
          title="Clear formatting"
          disabled={!editor || disabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
          className="h-11 w-full p-0 sm:size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11"
        >
          <Icon icon={RemoveFormatting} />
        </ToolbarButton>
        <ToolbarSeparator className="hidden sm:block" />
        <ToolbarButton
          type="button"
          aria-label="Undo"
          title="Undo"
          disabled={!state?.undo || disabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor?.chain().focus().undo().run()}
          className="h-11 w-full p-0 sm:size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11"
        >
          <Icon icon={Undo2} />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          aria-label="Redo"
          title="Redo"
          disabled={!state?.redo || disabled}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor?.chain().focus().redo().run()}
          className="h-11 w-full p-0 sm:size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11"
        >
          <Icon icon={Redo2} />
        </ToolbarButton>
      </Toolbar>
      {linkOpen && (
        <fieldset
          aria-label="Edit link"
          className="border-b border-border p-3"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              e.stopPropagation();
              closeLink();
            }
            if (e.key === 'Enter' && e.target === linkInput.current) {
              e.preventDefault();
              e.stopPropagation();
              applyLink();
            }
          }}
        >
          <label className="mb-2 block text-xs font-medium" htmlFor={`${id ?? 'editor'}-link`}>
            Link URL
          </label>
          <div className="flex flex-wrap gap-2">
            <Input
              ref={linkInput}
              id={`${id ?? 'editor'}-link`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="min-w-0 flex-1"
              disabled={disabled}
            />
            <Button type="button" size="sm" onClick={applyLink} disabled={disabled}>
              Apply link
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={closeLink}>
              Cancel
            </Button>
          </div>
          {linkError && (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {linkError}
            </p>
          )}
        </fieldset>
      )}
      <EditorContent editor={editor} className="min-h-56" />
    </div>
  );
}
