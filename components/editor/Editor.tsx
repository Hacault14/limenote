'use client';

import { useEffect, useState } from 'react';
import { Tables } from '@/types/database';
import { useStore } from '@/hooks/useStore';
import { createClient } from '@/libs/supabase/client';
import EditorToolbar from './EditorToolbar';
import EditorContent from './EditorContent';

interface EditorProps {
  pageId: string;
}

export default function Editor({ pageId }: EditorProps) {
  const { currentWorkspace } = useStore();
  const [page, setPage] = useState<Tables<'pages'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  // Fetch page data
  useEffect(() => {
    async function fetchPage() {
      try {
        const { data: page, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', pageId)
          .single();

        if (error) throw error;

        setPage(page);
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [pageId]);

  // Save page content
  const savePage = async (content: any) => {
    if (!page) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', page.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">
          Loading...
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-zinc-500 dark:text-zinc-400">Page not found</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar page={page} saving={saving} />
      <EditorContent page={page} onSave={savePage} />
    </div>
  );
} 