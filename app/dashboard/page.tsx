"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tables } from "@/types/database";
import { createClient } from "@/libs/supabase/client";
import Link from "next/link";
import NewPageButton from "./pages/NewPageButton";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<Tables<'workspaces'>[]>([]);
  const [recentPages, setRecentPages] = useState<Tables<'pages'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        // Fetch workspaces
        const { data: workspaces } = await supabase
          .from("workspaces")
          .select("*")
          .order("created_at", { ascending: false });

        // Fetch recent pages
        const { data: recentPages } = await supabase
          .from("pages")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(5);

        setWorkspaces(workspaces || []);
        setRecentPages(recentPages || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Welcome back, {user?.email}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Here's what's happening in your workspaces
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NewPageButton workspaces={workspaces} />

          <button
            onClick={() => {
              // TODO: Implement new workspace creation
            }}
            className="relative block w-full rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center hover:border-zinc-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
          >
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>
            <span className="mt-2 block text-sm font-semibold text-zinc-900 dark:text-white">
              Create a new workspace
            </span>
          </button>
        </div>

        {/* Recent pages */}
        {recentPages && recentPages.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
              Recent pages
            </h2>
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {recentPages.map((page) => (
                <li key={page.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                        {page.title}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                        Last updated{" "}
                        {new Date(page.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/pages/${page.id}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-lime-700 dark:text-lime-300 bg-lime-100 dark:bg-lime-900 hover:bg-lime-200 dark:hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Workspaces overview */}
        {workspaces && workspaces.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
              Your workspaces
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workspaces.map((workspace) => (
                <li
                  key={workspace.id}
                  className="col-span-1 bg-white dark:bg-zinc-800 rounded-lg shadow divide-y divide-zinc-200 dark:divide-zinc-700"
                >
                  <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-zinc-900 dark:text-white text-sm font-medium truncate">
                          {workspace.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-zinc-500 dark:text-zinc-400 text-sm truncate">
                        Created{" "}
                        {new Date(workspace.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-zinc-200 dark:divide-zinc-700">
                      <div className="w-0 flex-1 flex">
                        <button
                          onClick={() => {
                            // TODO: Implement workspace settings
                          }}
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-zinc-700 dark:text-zinc-300 font-medium border border-transparent rounded-bl-lg hover:text-zinc-500 dark:hover:text-zinc-400"
                        >
                          <svg
                            className="w-5 h-5 text-zinc-400"
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
                          <span className="ml-3">Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
