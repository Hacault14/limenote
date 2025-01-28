'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClient } from '@/libs/supabase/client'
import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = getClient()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session) {
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
      <div className="min-h-screen bg-[#191919] text-gray-300">
        <Sidebar />
        <main className="pl-52">
          <div className="animate-pulse">Loading...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#191919] text-gray-300">
      <Sidebar />
      {children}
    </div>
  )
} 