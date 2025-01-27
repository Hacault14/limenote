'use client';

import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { getClient } from '@/libs/supabase/client'
import { Tables } from '@/types/database'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Home, Inbox, Calendar, Settings, Trash, HelpCircle, Users, ChevronDown, Plus, ChevronsLeft, Star, Copy, FileEdit, FolderInput, Trash2, FileUp, ExternalLink } from 'lucide-react'
import * as ContextMenu from '@radix-ui/react-context-menu'

type Page = Tables<'pages'>

const sidebarItems = [
  { icon: Search, label: 'Search', type: 'search' },
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Inbox, label: 'Inbox', href: '/dashboard/inbox' },
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
  const { sidebarOpen, setSidebarOpen, currentWorkspace, setCurrentWorkspace } = useStore()
  const [workspaces, setWorkspaces] = useState<Tables<'workspaces'>[]>([])
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [showCollapseButton, setShowCollapseButton] = useState(false)
  const router = useRouter()
  const supabase = getClient()

  // Fetch workspaces
  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const { data: workspaces, error } = await supabase
          .from('workspaces')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        console.log('Fetched workspaces:', workspaces)
        setWorkspaces(workspaces || [])
        
        // Set current workspace if none selected
        if ((!currentWorkspace || !currentWorkspace.id) && workspaces && workspaces.length > 0) {
          console.log('Setting current workspace:', workspaces[0])
          setCurrentWorkspace(workspaces[0])
        } else {
          console.log('Current workspace:', currentWorkspace)
        }
      } catch (error) {
        console.error('Error fetching workspaces:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkspaces()
  }, [currentWorkspace, setCurrentWorkspace])

  // Fetch pages and subscribe to changes
  useEffect(() => {
    if (!currentWorkspace?.id) return

    // Initial fetch
    const fetchPages = async () => {
      try {
        const { data: pages, error } = await supabase
          .from('pages')
          .select('*')
          .eq('workspace_id', currentWorkspace.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setPages(pages || [])
      } catch (error) {
        console.error('Error fetching pages:', error)
      }
    }

    fetchPages()

    // Subscribe to page changes
    const channel = supabase.channel(`pages:${currentWorkspace.id}`)
    
    const subscription = channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pages',
          filter: `workspace_id=eq.${currentWorkspace.id}`
        },
        (payload: any) => {
          console.log('Received page update:', payload)
          if (payload.eventType === 'UPDATE') {
            setPages(prevPages => 
              prevPages.map(page => 
                page.id === payload.new.id ? { ...page, ...payload.new } as Page : page
              )
            )
          } else if (payload.eventType === 'INSERT') {
            setPages(prevPages => [payload.new as Page, ...prevPages])
          } else if (payload.eventType === 'DELETE') {
            setPages(prevPages => prevPages.filter(page => page.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      console.log('Unsubscribing from pages channel')
      channel.unsubscribe()
    }
  }, [currentWorkspace?.id, supabase])

  // Debug current workspace state
  useEffect(() => {
    console.log('Current workspace state:', currentWorkspace)
  }, [currentWorkspace])

  const createNewPage = async () => {
    console.log('Creating new page with workspace:', currentWorkspace)
    
    if (!currentWorkspace?.id) {
      console.error('No workspace selected')
      // Create a default workspace if none exists
      try {
        const { data: userData } = await supabase.auth.getUser()
        if (!userData.user) {
          console.error('No user found')
          return
        }

        const { data: newWorkspace, error: workspaceError } = await supabase
          .from('workspaces')
          .insert({
            name: 'My Workspace',
            owner_id: userData.user.id,
            settings: {},
            updated_at: new Date().toISOString()
          })
          .select()
          .single()

        if (workspaceError) throw workspaceError
        
        setCurrentWorkspace(newWorkspace)
        return // Return and let the user try creating a page again
      } catch (error) {
        console.error('Error creating default workspace:', error)
        return
      }
    }

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        console.error('No user found')
        return
      }

      const { data: newPage, error } = await supabase
        .from('pages')
        .insert({
          title: 'Untitled',
          content: '',
          workspace_id: currentWorkspace.id,
          created_by: userData.user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Add the new page to the state
      setPages(prevPages => [newPage, ...prevPages])
      router.push(`/dashboard/${newPage.id}`)
    } catch (error) {
      console.error('Error creating new page:', error)
    }
  }

  const handleDuplicate = async (page: Page) => {
    try {
      const { data: newPage, error } = await supabase
        .from('pages')
        .insert({
          ...page,
          id: undefined,
          title: `${page.title} (Copy)`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      router.push(`/dashboard/${newPage.id}`)
    } catch (error) {
      console.error('Error duplicating page:', error)
    }
  }

  const handleDelete = async (pageId: string) => {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId)

      if (error) throw error
      
      // Update local state to remove the deleted page
      setPages(prevPages => prevPages.filter(p => p.id !== pageId))
      
      // Only navigate if we're currently on the deleted page
      if (pathname === `/dashboard/${pageId}`) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  if (!sidebarOpen) return null

  return (
    <div 
      className="group w-52 h-screen bg-[#1f1f1f] text-gray-300 flex flex-col fixed left-0 top-0 border-r border-[#2f2f2f] text-sm"
      onMouseEnter={() => setShowCollapseButton(true)}
      onMouseLeave={() => setShowCollapseButton(false)}
    >
      {/* Workspace header */}
      <div className="p-3 pb-1 flex items-center">
        {/* Workspace name and buttons container */}
        <div className="flex-1 flex items-center min-w-0">
          {/* Workspace name with logo and dropdown */}
          <div className="flex items-center space-x-2 hover:bg-[#2f2f2f] px-2 py-1 rounded cursor-pointer flex-1 min-w-0 group/workspace">
            <div className="w-4 h-4 flex-shrink-0 rounded bg-gray-600 flex items-center justify-center text-[10px] text-white">
              N
            </div>
            <div className="flex items-center space-x-1 min-w-0 flex-1">
              <span className="truncate">{currentWorkspace?.name || 'Loading...'}</span>
              <ChevronDown size={14} className="flex-shrink-0" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center w-[46px] justify-end">
            {showCollapseButton ? (
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-[#2f2f2f] rounded opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
              >
                <ChevronsLeft size={14} />
              </button>
            ) : (
              // Placeholder for collapse button
              <div className="w-6"></div>
            )}
            <button 
              onClick={createNewPage}
              className="p-1 hover:bg-[#2f2f2f] rounded ml-0.5"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Rest of the sidebar content */}
      <div className="p-1.5 pt-0">
        {sidebarItems.map((item) => (
          <div key={item.label} className="mb-1">
            {item.type === 'search' ? (
              <div className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-[#2f2f2f] cursor-pointer">
                <item.icon size={16} />
                <span>Search</span>
              </div>
            ) : (
              <Link href={item.href} className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-[#2f2f2f]">
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#2f2f2f] [&::-webkit-scrollbar-track]:bg-transparent">
        {/* Pages section */}
        <div className="px-3 py-2">
          <div className="text-[11px] font-semibold text-gray-500 mb-2 px-2">PAGES</div>
          {pages.map((page) => (
            <ContextMenu.Root key={page.id}>
              <ContextMenu.Trigger>
                <Link
                  href={`/dashboard/${page.id}`}
                  className={`block px-2 py-1 rounded hover:bg-[#2f2f2f] mb-1 truncate ${
                    pathname === `/dashboard/${page.id}` ? 'bg-[#2f2f2f]' : ''
                  }`}
                >
                  {page.title}
                </Link>
              </ContextMenu.Trigger>

              <ContextMenu.Portal>
                <ContextMenu.Content 
                  className="min-w-[220px] bg-[#2f2f2f] rounded-md overflow-hidden p-1 shadow-xl border border-[#3f3f3f] text-white"
                >
                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                  >
                    <Star size={16} className="mr-2" />
                    Add to Favorites
                  </ContextMenu.Item>

                  <ContextMenu.Separator className="h-px bg-[#3f3f3f] my-1" />

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/dashboard/${page.id}`)}
                  >
                    <Copy size={16} className="mr-2" />
                    Copy link
                  </ContextMenu.Item>

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                    onClick={() => handleDuplicate(page)}
                  >
                    <FileEdit size={16} className="mr-2" />
                    Duplicate
                    <span className="ml-auto text-xs text-gray-400">Ctrl+D</span>
                  </ContextMenu.Item>

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                  >
                    <FileEdit size={16} className="mr-2" />
                    Rename
                    <span className="ml-auto text-xs text-gray-400">Ctrl+⇧+R</span>
                  </ContextMenu.Item>

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                  >
                    <FolderInput size={16} className="mr-2" />
                    Move to
                    <span className="ml-auto text-xs text-gray-400">Ctrl+⇧+P</span>
                  </ContextMenu.Item>

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm text-red-400 cursor-pointer"
                    onClick={() => handleDelete(page.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Move to Trash
                  </ContextMenu.Item>

                  <ContextMenu.Separator className="h-px bg-[#3f3f3f] my-1" />

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                  >
                    <FileUp size={16} className="mr-2" />
                    Turn into wiki
                  </ContextMenu.Item>

                  <ContextMenu.Separator className="h-px bg-[#3f3f3f] my-1" />

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Open in new tab
                    <span className="ml-auto text-xs text-gray-400">Ctrl+⇧+⏎</span>
                  </ContextMenu.Item>

                  <ContextMenu.Item 
                    className="flex items-center px-2 py-1.5 hover:bg-[#3f3f3f] rounded text-sm cursor-pointer text-white"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Open in side peek
                    <span className="ml-auto text-xs text-gray-400">Alt+Click</span>
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </ContextMenu.Root>
          ))}
        </div>

        {/* System pages section */}
        <div className="px-3 py-2 mb-4">
          {systemPages.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-[#2f2f2f] mb-1"
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 