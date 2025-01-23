'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/libs/supabase/client";
import Editor from "@/components/editor/Editor";
import { useRouter } from 'next/navigation';
import { Tables } from '@/types/database';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [page, setPage] = useState<Tables<'pages'> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch page data
        const { data: page } = await supabase
          .from("pages")
          .select(`
            *,
            workspaces (
              name
            )
          `)
          .eq("id", params.id)
          .single();

        if (!page) {
          router.push("/dashboard/pages");
          return;
        }

        setPage(page);
      } catch (error) {
        console.error('Error fetching page:', error);
        router.push("/dashboard/pages");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id, router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!page) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="h-full">
        <Editor pageId={params.id} />
      </div>
    </DashboardLayout>
  );
} 