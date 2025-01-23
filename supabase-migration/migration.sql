-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create workspaces table
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  settings JSONB DEFAULT '{}'::jsonb
);

-- Create workspace_members table for collaboration
CREATE TABLE workspace_members (
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (workspace_id, user_id)
);

-- Create pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  parent_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  is_published BOOLEAN DEFAULT false,
  published_settings JSONB DEFAULT '{}'::jsonb,
  icon TEXT,
  cover_image TEXT
);

-- Create files table
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  size INTEGER NOT NULL,
  type TEXT NOT NULL,
  path TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE
);

-- Create user_settings table
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'light',
  notification_preferences JSONB DEFAULT '{}'::jsonb,
  last_workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create analytics table for published pages
CREATE TABLE page_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE NOT NULL,
  views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  analytics_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create sync_logs table
CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  sync_type TEXT NOT NULL,
  status TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for workspaces
CREATE POLICY "Users can view workspaces they are members of" ON workspaces
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM workspace_members WHERE workspace_id = workspaces.id
    ) OR owner_id = auth.uid()
  );

CREATE POLICY "Workspace owners can update their workspaces" ON workspaces
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Users can create workspaces" ON workspaces
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Only owners can delete workspaces" ON workspaces
  FOR DELETE USING (owner_id = auth.uid());

-- Create policies for workspace_members
CREATE POLICY "Members can view workspace members" ON workspace_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workspace_members wm
      WHERE wm.workspace_id = workspace_members.workspace_id
      AND wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Owners and admins can manage workspace members" ON workspace_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM workspace_members wm
      WHERE wm.workspace_id = workspace_members.workspace_id
      AND wm.user_id = auth.uid()
      AND wm.role IN ('owner', 'admin')
    )
  );

-- Create policies for pages
CREATE POLICY "Users can view pages in their workspaces" ON pages
  FOR SELECT USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    ) OR 
    is_published = true
  );

CREATE POLICY "Members can create pages" ON pages
  FOR INSERT WITH CHECK (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'member')
    )
  );

CREATE POLICY "Members can update pages" ON pages
  FOR UPDATE USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'member')
    )
  );

CREATE POLICY "Members can delete pages" ON pages
  FOR DELETE USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'member')
    )
  );

-- Create policies for files
CREATE POLICY "Users can view files in their workspaces" ON files
  FOR SELECT USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can upload files" ON files
  FOR INSERT WITH CHECK (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'member')
    )
  );

CREATE POLICY "File owners can delete their files" ON files
  FOR DELETE USING (uploaded_by = auth.uid());

-- Create policies for user_settings
CREATE POLICY "Users can manage their own settings" ON user_settings
  FOR ALL USING (user_id = auth.uid());

-- Create policies for page_analytics
CREATE POLICY "Workspace members can view analytics" ON page_analytics
  FOR SELECT USING (
    page_id IN (
      SELECT id FROM pages WHERE workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
      )
    )
  );

-- Create policies for sync_logs
CREATE POLICY "Users can view their own sync logs" ON sync_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create sync logs" ON sync_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_workspaces_updated_at
    BEFORE UPDATE ON workspaces
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create function to automatically add owner as workspace member
CREATE OR REPLACE FUNCTION add_workspace_owner()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO workspace_members (workspace_id, user_id, role)
    VALUES (NEW.id, NEW.owner_id, 'owner');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER workspace_owner_trigger
    AFTER INSERT ON workspaces
    FOR EACH ROW
    EXECUTE PROCEDURE add_workspace_owner();

-- Create indexes for better performance
CREATE INDEX idx_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX idx_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX idx_pages_workspace_id ON pages(workspace_id);
CREATE INDEX idx_pages_parent_id ON pages(parent_id);
CREATE INDEX idx_files_workspace_id ON files(workspace_id);
CREATE INDEX idx_files_page_id ON files(page_id);
CREATE INDEX idx_sync_logs_user_id ON sync_logs(user_id);
CREATE INDEX idx_sync_logs_workspace_id ON sync_logs(workspace_id); 