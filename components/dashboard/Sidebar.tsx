'use client';

import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { createClient } from '@/libs/supabase/client'
import { Tables } from '@/types/database'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Home, Inbox, Calendar, Settings, Trash, HelpCircle, Users } from 'lucide-react'

const sidebarItems = [
  { icon: Search, label: 'Search', type: 'search' },
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Inbox, label: 'Inbox', href: '/dashboard/inbox' },
]

const privatePages = [
  { label: 'Testing', href: '/dashboard/testing' },
  { label: 'Habit Tracker', href: '/dashboard/habit-tracker' },
  { label: 'Getting Started', href: '/dashboard/getting-started' },
  { label: 'Reading List', href: '/dashboard/reading-list' },
  { label: 'Journal', href: '/dashboard/journal' },
  { label: 'Project Planner', href: '/dashboard/project-planner' },
]

const systemPages = [
  { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: Trash, label: 'Trash', href: '/dashboard/trash' },
  { icon: HelpCircle, label: 'Help', href: '/dashboard/help' },
  { icon: Users, label: 'Invite members', href: '/dashboard/invite' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, currentWorkspace, setCurrentWorkspace } = useStore()
  const [workspaces, setWorkspaces] = useState<Tables<'workspaces'>[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Fetch workspaces
  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const { data: workspaces, error } = await supabase
          .from('workspaces')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setWorkspaces(workspaces || [])
        
        // Set current workspace if none selected
        if (!currentWorkspace && workspaces?.length > 0) {
          setCurrentWorkspace(workspaces[0])
        }
      } catch (error) {
        console.error('Error fetching workspaces:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkspaces()
  }, [currentWorkspace, setCurrentWorkspace])

  if (!sidebarOpen) return null

  return (
    <div className="w-60 h-screen bg-gray-900 text-gray-300 flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Top section */}
      <div className="p-4">
        {sidebarItems.map((item) => (
          <div key={item.label} className="mb-2">
            {item.type === 'search' ? (
              <div className="flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-gray-800 cursor-pointer">
                <item.icon size={18} />
                <span>Search</span>
              </div>
            ) : (
              <Link href={item.href} className="flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-gray-800">
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Private pages section */}
      <div className="px-4 py-2">
        <div className="text-xs font-semibold text-gray-500 mb-2 px-2">PRIVATE</div>
        {privatePages.map((page) => (
          <Link
            key={page.label}
            href={page.href}
            className="block px-2 py-1.5 rounded hover:bg-gray-800 mb-1"
          >
            {page.label}
          </Link>
        ))}
      </div>

      {/* System pages section */}
      <div className="mt-auto px-4 py-2">
        {systemPages.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-gray-800 mb-1"
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
} 