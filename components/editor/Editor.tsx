'use client';

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import { useEffect, useState, useCallback, useRef } from 'react'
import { getClient } from '@/libs/supabase/client'
import { Bold, Italic, Code, Link, Type, List, ListOrdered, Quote } from 'lucide-react'

// Add debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export interface EditorProps {
  pageId: string
  initialTitle?: string
  initialContent?: string
  onTitleChange?: (title: string) => void
}

export default function Editor({ 
  pageId, 
  initialTitle = 'New page',
  initialContent = '',
  onTitleChange 
}: EditorProps) {
  const [title, setTitle] = useState('')  // Start with empty title
  const titleInputRef = useRef<HTMLInputElement>(null)
  const supabase = getClient()

  // Focus the title input when component mounts, but don't select it
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-4',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-4',
        },
      }),
      ListItem,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none prose-p:my-2 prose-blockquote:border-l-2 prose-blockquote:border-[#2f2f2f] prose-blockquote:pl-4 prose-blockquote:my-2 prose-pre:bg-[#2f2f2f] prose-pre:p-2 prose-pre:rounded',
      },
    },
    onUpdate: ({ editor }) => {
      // Save content to database
      updatePage(title, editor.getHTML())
    },
    immediatelyRender: false
  })

  // Update editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent)
    }
  }, [editor, initialContent])

  const updatePage = async (newTitle: string, content?: string) => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update({
          title: newTitle,
          content: content || editor?.getHTML(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', pageId)
        .select()
        .single()

      if (error) throw error
      
      // Ensure the parent component is updated
      onTitleChange?.(newTitle)
    } catch (error) {
      console.error('Error updating page:', error)
    }
  }

  // Create a debounced version of the update function
  const debouncedUpdatePage = useCallback(
    debounce(async (newTitle: string) => {
      try {
        // If title is empty, use 'New page'
        const titleToSave = newTitle.trim() || 'New page'
        
        const { data, error } = await supabase
          .from('pages')
          .update({ title: titleToSave, updated_at: new Date().toISOString() })
          .eq('id', pageId)
          .select()
          .single()

        if (error) throw error
        
        // Only update the title state if the database update was successful
        setTitle(newTitle) // Keep empty in editor if empty
        onTitleChange?.(titleToSave) // Send 'New page' to parent if empty
      } catch (error) {
        console.error('Error updating page title:', error)
        // Revert to the last known good title from the database
        const { data } = await supabase
          .from('pages')
          .select('title')
          .eq('id', pageId)
          .single()
        if (data) {
          setTitle(data.title === 'New page' ? '' : data.title)
          onTitleChange?.(data.title)
        }
      }
    }, 500),
    [pageId, supabase, onTitleChange]
  )

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    debouncedUpdatePage(newTitle)
  }

  // Update local title when initialTitle changes
  useEffect(() => {
    // If initialTitle is 'New page', keep the input empty
    setTitle(initialTitle === 'New page' ? '' : initialTitle)
  }, [initialTitle])

  return (
    <div className="space-y-8">
      <input
        ref={titleInputRef}
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="New page"
        className="text-4xl font-bold bg-transparent border-none outline-none w-full text-white placeholder-gray-500"
      />
      
      <div className="prose prose-invert prose-lg">
        {editor && (
          <BubbleMenu 
            editor={editor} 
            tippyOptions={{ duration: 100 }}
            className="bg-[#2f2f2f] rounded-lg shadow-lg border border-[#3f3f3f] flex overflow-hidden"
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 hover:bg-[#3f3f3f] ${editor.isActive('bold') ? 'bg-[#3f3f3f]' : ''}`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 hover:bg-[#3f3f3f] ${editor.isActive('italic') ? 'bg-[#3f3f3f]' : ''}`}
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 hover:bg-[#3f3f3f] ${editor.isActive('code') ? 'bg-[#3f3f3f]' : ''}`}
            >
              <Code size={16} />
            </button>
            <div className="w-px bg-[#3f3f3f]" />
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 hover:bg-[#3f3f3f] ${editor.isActive('bulletList') ? 'bg-[#3f3f3f]' : ''}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 hover:bg-[#3f3f3f] ${editor.isActive('orderedList') ? 'bg-[#3f3f3f]' : ''}`}
            >
              <ListOrdered size={16} />
            </button>
            <div className="w-px bg-[#3f3f3f]" />
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 hover:bg-[#3f3f3f] ${editor.isActive('blockquote') ? 'bg-[#3f3f3f]' : ''}`}
            >
              <Quote size={16} />
            </button>
          </BubbleMenu>
        )}
        <EditorContent 
          editor={editor} 
          className="min-h-[500px] focus:outline-none text-gray-300"
        />
      </div>
    </div>
  )
} 