'use client';

import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { createClient } from '@/libs/supabase/client'
import { Tables } from '@/types/database'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/dashboard" className="font-naturaly text-2xl text-lime-500">
                LimeNote
              </Link>
            </div>

            {/* Workspace selector */}
            <div className="mt-5 px-3">
              <select
                value={currentWorkspace?.id}
                onChange={(e) => {
                  const workspace = workspaces.find(w => w.id === e.target.value)
                  if (workspace) setCurrentWorkspace(workspace)
                }}
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
              >
                {workspaces.map((workspace) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                href="/dashboard"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === '/dashboard'
                    ? 'bg-lime-50 dark:bg-lime-900/50 text-lime-600 dark:text-lime-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    pathname === '/dashboard'
                      ? 'text-lime-500'
                      : 'text-zinc-400 group-hover:text-zinc-500'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </Link>

              <Link
                href="/dashboard/pages"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === '/dashboard/pages'
                    ? 'bg-lime-50 dark:bg-lime-900/50 text-lime-600 dark:text-lime-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    pathname === '/dashboard/pages'
                      ? 'text-lime-500'
                      : 'text-zinc-400 group-hover:text-zinc-500'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Pages
              </Link>

              <Link
                href="/dashboard/settings"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === '/dashboard/settings'
                    ? 'bg-lime-50 dark:bg-lime-900/50 text-lime-600 dark:text-lime-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 ${
                    pathname === '/dashboard/settings'
                      ? 'text-lime-500'
                      : 'text-zinc-400 group-hover:text-zinc-500'
                  }`}
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
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 