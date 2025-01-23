 import { createClient } from '@/libs/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { workspaceId } = await request.json();

    // Create new page
    const { data: page, error } = await supabase
      .from('pages')
      .insert({
        workspace_id: workspaceId,
        title: 'Untitled',
        content: [],
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error creating page:', error);
    return new NextResponse('Error creating page', { status: 500 });
  }
} 