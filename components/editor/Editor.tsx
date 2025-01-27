'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState, useCallback } from 'react'
import { getClient } from '@/libs/supabase/client'

export interface EditorProps {
  pageId: string
  initialTitle?: string
  initialContent?: string
  onTitleChange?: (title: string) => void
}

export default function Editor({ 
  pageId, 
  initialTitle = 'Untitled',
  initialContent = '',
  onTitleChange 
}: EditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const supabase = getClient()

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      // Save content to database
      updatePage(title, editor.getHTML())
    },
    immediatelyRender: false
  })

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

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle)
    updatePage(newTitle)
  }, [])

  // Update title when initialTitle changes (switching pages)
  useEffect(() => {
    if (initialTitle && initialTitle !== title) {
      setTitle(initialTitle)
      onTitleChange?.(initialTitle)
    }
  }, [initialTitle, pageId])

  return (
    <div className="space-y-8">
      <input
        type="text"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Untitled"
        className="text-4xl font-bold bg-transparent border-none outline-none w-full text-white placeholder-gray-500"
      />
      
      <EditorContent 
        editor={editor} 
        className="min-h-[500px] focus:outline-none"
      />
    </div>
  )
} 