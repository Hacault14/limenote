'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/libs/supabase/client'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)

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

        setLoading(false)
      } catch (error) {
        console.error('Session check error:', error)
        router.push('/signin')
      }
    }

    checkSession()
  }, [router, supabase.auth])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#191919]">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#191919] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Pages</h2>
            <p className="text-gray-400">No pages yet</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Workspaces</h2>
            <p className="text-gray-400">No workspaces yet</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                Create new page
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                Create new workspace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 