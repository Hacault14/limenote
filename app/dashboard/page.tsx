'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/libs/supabase/client'
import Sidebar from '@/components/dashboard/Sidebar'
import TopNav from '@/components/dashboard/TopNav'
import { Waves } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          router.push('/signin')
          return
        }

        if (!session) {
          console.error('No session found')
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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <Sidebar />
      <TopNav />
      
      <main className="pl-60 pt-12">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-6">Getting Started</h1>
          
          <div className="flex items-center space-x-2 text-xl mb-8">
            <Waves className="text-yellow-500" />
            <p>Welcome to LimeNote!</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Here are the basics:</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <p>Click anywhere and just start typing</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <p>Hit / to see all the types of content you can add - headers, tables, images, and more</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <p>Highlight any text and use the menu that pops up to style your writing</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <p>Click + New Page in the sidebar to add a new page to your workspace</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <p>Use dark mode for a more comfortable writing experience at night</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 