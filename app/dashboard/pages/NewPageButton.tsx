'use client';

import { useState } from 'react';
import { Tables } from '@/types/database';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface NewPageButtonProps {
  workspaces: Tables<'workspaces'>[];
}

export default function NewPageButton({ workspaces }: NewPageButtonProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const createPage = async (workspaceId: string) => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workspaceId }),
      });

      if (!response.ok) throw new Error('Failed to create page');

      const page = await response.json();
      router.push(`/dashboard/pages/${page.id}`);
    } catch (error) {
      console.error('Error creating page:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (workspaces.length === 0) {
    return (
      <button
        disabled
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lime-600 opacity-50 cursor-not-allowed"
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create workspace first
      </button>
    );
  }

  if (workspaces.length === 1) {
    return (
      <button
        onClick={() => createPage(workspaces[0].id)}
        disabled={isCreating}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        {isCreating ? 'Creating...' : 'New page'}
      </button>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          disabled={isCreating}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          {isCreating ? 'Creating...' : 'New page'}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {workspaces.map((workspace) => (
              <Menu.Item key={workspace.id}>
                {({ active }) => (
                  <button
                    onClick={() => createPage(workspace.id)}
                    className={`${
                      active
                        ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white'
                        : 'text-zinc-700 dark:text-zinc-200'
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    {workspace.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 