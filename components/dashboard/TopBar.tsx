'use client';

import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { createClient } from '@/libs/supabase/client'
import { Tables } from '@/types/database'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'

export default function TopBar() {
  const { currentWorkspace, setSidebarOpen, theme, setTheme } = useStore()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        className="px-4 border-r border-zinc-200 dark:border-zinc-800 text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          {/* Workspace name */}
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {currentWorkspace?.name || 'Loading...'}
          </h1>
        </div>

        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Theme toggle */}
          <button
            type="button"
            className="p-1 rounded-full text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <span className="sr-only">Toggle theme</span>
            {theme === 'light' ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="max-w-xs bg-white dark:bg-zinc-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-lime-500 flex items-center justify-center text-white">
                {user?.email?.[0].toUpperCase() || '?'}
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dashboard/settings"
                      className={`${
                        active ? 'bg-zinc-100 dark:bg-zinc-700' : ''
                      } block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200`}
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className={`${
                        active ? 'bg-zinc-100 dark:bg-zinc-700' : ''
                      } block w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
} 