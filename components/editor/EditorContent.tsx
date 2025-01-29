'use client';

import { useEffect, useState } from 'react';
import { Tables } from '@/types/database';
import { useStore } from '@/hooks/useStore';
import { getClient } from '@/libs/supabase/client';
import { Editor as TiptapEditor, EditorContent as TiptapEditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

interface EditorContentProps {
  page: Tables<'pages'>;
  onSave: (content: any) => void;
}

export default function EditorContent({ page, onSave }: EditorContentProps) {
  const supabase = getClient();
  const [autoSaveTimer, setAutoSaveTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: Array.isArray(page.content) ? page.content : [],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert focus:outline-none max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      // Clear existing timer
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }

      // Set new timer for auto-save
      const timer = setTimeout(() => {
        onSave(editor.getJSON());
      }, 1000);

      setAutoSaveTimer(timer);
    },
  });

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [autoSaveTimer]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert">
          {editor.isEditable && (
            <div className="not-prose mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${
                  editor.isActive('bold')
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                </svg>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${
                  editor.isActive('italic')
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="4" x2="10" y2="4" />
                  <line x1="14" y1="20" x2="5" y2="20" />
                  <line x1="15" y1="4" x2="9" y2="20" />
                </svg>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded ${
                  editor.isActive('strike')
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <path d="M16 6C16 6 14.366 4 12 4C9.634 4 8 6 8 6" />
                  <path d="M8 18C8 18 9.634 20 12 20C14.366 20 16 18 16 18" />
                </svg>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded ${
                  editor.isActive('heading', { level: 1 })
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                H1
              </button>

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded ${
                  editor.isActive('heading', { level: 2 })
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                H2
              </button>

              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${
                  editor.isActive('bulletList')
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="9" y1="6" x2="20" y2="6" />
                  <line x1="9" y1="12" x2="20" y2="12" />
                  <line x1="9" y1="18" x2="20" y2="18" />
                  <circle cx="4" cy="6" r="2" />
                  <circle cx="4" cy="12" r="2" />
                  <circle cx="4" cy="18" r="2" />
                </svg>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded ${
                  editor.isActive('orderedList')
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="10" y1="6" x2="21" y2="6" />
                  <line x1="10" y1="12" x2="21" y2="12" />
                  <line x1="10" y1="18" x2="21" y2="18" />
                  <path d="M4 6h1v4" />
                  <path d="M4 10h2" />
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                </svg>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={`p-2 rounded ${
                  editor.isActive('taskList')
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </button>

              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded ${
                  editor.isActive('blockquote')
                    ? 'bg-zinc-200 dark:bg-zinc-700'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </button>
            </div>
          )}

          <TiptapEditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
} 