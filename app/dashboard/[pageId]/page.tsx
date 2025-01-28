'use client'

import { useEffect, useState } from 'react'
import { getClient } from '@/libs/supabase/client'
import TopNav from '@/components/dashboard/TopNav'
import Editor from '@/components/editor/Editor'

interface Page {
  id: string;
  title: string;
  content: any;
  workspace_id: string;
  created_by: string;
  updated_at: string;
  created_at: string;
  parent_id: string;
  is_published: boolean;
  published_settings: any;
  icon: string;
  cover_image: string;
  is_favorite: boolean;
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'edge'

export default function Page({ params }: { params: { pageId: string } }) {
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getClient()

  useEffect(() => {
    const getPage = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', params.pageId)
          .single()

        if (error) throw error
        setPage(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    getPage()
  }, [params.pageId, supabase])

  const handleTitleChange = (newTitle: string) => {
    setPage(prev => prev ? { ...prev, title: newTitle } : null)
  }

  const handleFavoriteChange = (isFavorite: boolean) => {
    setPage(prev => prev ? { ...prev, is_favorite: isFavorite } : null)
  }

  return (
    <>
      <TopNav 
        title={page?.title} 
        pageId={params.pageId} 
        isFavorite={page?.is_favorite}
        onFavoriteChange={handleFavoriteChange}
      />
      
      <main className="pl-52 pt-12">
        <div className="max-w-4xl mx-auto p-8">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-[#2f2f2f] rounded w-1/3"></div>
              <div className="h-4 bg-[#2f2f2f] rounded w-full"></div>
              <div className="h-4 bg-[#2f2f2f] rounded w-2/3"></div>
            </div>
          ) : (
            <Editor 
              pageId={params.pageId} 
              initialTitle={page?.title}
              initialContent={page?.content as string}
              onTitleChange={handleTitleChange}
            />
          )}
        </div>
      </main>
    </>
  )
} 