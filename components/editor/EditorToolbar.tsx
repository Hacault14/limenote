'use client';

import { Tables } from '@/types/database';
import { useStore } from '@/hooks/useStore';
import { createClient } from '@/libs/supabase/client';
import { useState } from 'react';

interface EditorToolbarProps {
  page: Tables<'pages'>;
  saving: boolean;
}

export default function EditorToolbar({ page, saving }: EditorToolbarProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const supabase = createClient();

  const togglePublish = async () => {
    setIsPublishing(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({
          is_published: !page.is_published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', page.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error toggling publish:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-medium text-zinc-900 dark:text-white truncate">
            {page.title}
          </h1>
        </div>
        <div className="ml-4 flex items-center space-x-3">
          {/* Status indicator */}
          <div className="flex items-center">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {saving ? 'Saving...' : 'Saved'}
            </span>
            <span
              className={`ml-2 h-2 w-2 rounded-full ${
                saving
                  ? 'bg-yellow-400'
                  : 'bg-green-400'
              }`}
            />
          </div>

          {/* Publish button */}
          <button
            type="button"
            onClick={togglePublish}
            disabled={isPublishing}
            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
              page.is_published
                ? 'text-lime-700 dark:text-lime-300 bg-lime-100 dark:bg-lime-900 hover:bg-lime-200 dark:hover:bg-lime-800'
                : 'text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
          >
            {isPublishing ? (
              'Publishing...'
            ) : page.is_published ? (
              'Published'
            ) : (
              'Publish'
            )}
          </button>

          {/* Settings button */}
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center p-2 border border-transparent rounded-md text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="page-title"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Page title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="page-title"
                  id="page-title"
                  value={page.title}
                  onChange={async (e) => {
                    const { error } = await supabase
                      .from('pages')
                      .update({
                        title: e.target.value,
                        updated_at: new Date().toISOString(),
                      })
                      .eq('id', page.id);

                    if (error) console.error('Error updating title:', error);
                  }}
                  className="shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="page-icon"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Page icon
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="page-icon"
                  id="page-icon"
                  value={page.icon || ''}
                  onChange={async (e) => {
                    const { error } = await supabase
                      .from('pages')
                      .update({
                        icon: e.target.value,
                        updated_at: new Date().toISOString(),
                      })
                      .eq('id', page.id);

                    if (error) console.error('Error updating icon:', error);
                  }}
                  placeholder="Emoji or icon URL"
                  className="shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 