'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClient } from '@/libs/supabase/client'
import Sidebar from '@/components/dashboard/Sidebar'
import TopNav from '@/components/dashboard/TopNav'
import Editor from '@/components/editor/Editor'

interface Page {
  id: string;
  title: string;
  content: any;  // Using any for now since content can be various types
  workspace_id: string;
  created_by: string;
  updated_at: string;
  created_at: string;
  parent_id: string;
  is_published: boolean;
  published_settings: any;
  icon: string;
  cover_image: string;
}

export default function Page({ params }: { params: { pageId: string } }) {
  const router = useRouter()
  const supabase = getClient()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [page, setPage] = useState<Page | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session) {
          router.push('/signin')
          return
        }

        setAuthenticated(true)
        setLoading(false)
      } catch (error) {
        console.error('Session check error:', error)
        router.push('/signin')
      }
    }

    checkSession()
  }, [router, supabase.auth])

  useEffect(() => {
    const fetchPage = async () => {
      if (!authenticated) return

      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', params.pageId)
          .single()

        if (error) throw error
        setPage(data)
      } catch (error) {
        console.error('Error fetching page:', error)
      }
    }

    fetchPage()
  }, [authenticated, params.pageId, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#191919]">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#191919] text-gray-300">
      <Sidebar />
      <TopNav title={page?.title || 'Untitled'} pageId={params.pageId} />
      
      <main className="pl-52 pt-12">
        <div className="max-w-4xl mx-auto p-8">
          <Editor 
            initialContent={page?.content}
            initialTitle={page?.title}
            pageId={params.pageId}
            onTitleChange={(title) => setPage(prev => prev ? { ...prev, title } : null)}
          />
        </div>
      </main>
    </div>
  )
} 