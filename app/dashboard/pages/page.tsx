'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tables } from "@/types/database";
import { createClient } from "@/libs/supabase/client";
import Link from "next/link";
import NewPageButton from "./NewPageButton";

interface PageWithWorkspace extends Tables<'pages'> {
  workspaces?: {
    name: string;
  };
}

export default function PagesPage() {
  const [pages, setPages] = useState<PageWithWorkspace[]>([]);
  const [workspaces, setWorkspaces] = useState<Tables<'workspaces'>[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch pages
        const { data: pages } = await supabase
          .from("pages")
          .select(`
            *,
            workspaces (
              name
            )
          `)
          .order("updated_at", { ascending: false });

        // Fetch workspaces
        const { data: workspaces } = await supabase
          .from("workspaces")
          .select("*")
          .order("created_at", { ascending: false });

        setPages(pages || []);
        setWorkspaces(workspaces || []);
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Pages
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Create and manage your pages
            </p>
          </div>
          <NewPageButton workspaces={workspaces} />
        </div>

        {/* Pages list */}
        {pages && pages.length > 0 ? (
          <div className="bg-white dark:bg-zinc-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {pages.map((page) => (
                <li key={page.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-lime-600 dark:text-lime-400 truncate">
                            {page.title}
                          </p>
                          <p className="ml-1 flex-shrink-0 font-normal text-zinc-500 dark:text-zinc-400">
                            in {page.workspaces?.name}
                          </p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-zinc-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Last modified{" "}
                            {new Date(page.updated_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex -space-x-1 overflow-hidden">
                          <Link
                            href={`/dashboard/pages/${page.id}`}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-lime-700 dark:text-lime-300 bg-lime-100 dark:bg-lime-900 hover:bg-lime-200 dark:hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                          >
                            Open
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">
              No pages
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Get started by creating a new page.
            </p>
            <div className="mt-6">
              <NewPageButton workspaces={workspaces} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 