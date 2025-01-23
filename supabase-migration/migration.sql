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

-- Create workspace_members table
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
  notification_preferences JSONB DEFAULT '{"email": false}'::jsonb,
  last_workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Simple workspace policies
CREATE POLICY "Users can view their workspaces" ON workspaces
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM workspace_members WHERE workspace_id = id
  ));

CREATE POLICY "Users can create workspaces" ON workspaces
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update workspaces" ON workspaces
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete workspaces" ON workspaces
  FOR DELETE USING (auth.uid() = owner_id);

-- Workspace members policies (simplified)
CREATE POLICY "Members can view workspace members" ON workspace_members
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Owners and admins can insert members" ON workspace_members
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT owner_id FROM workspaces WHERE id = workspace_id
    )
  );

CREATE POLICY "Owners and admins can update members" ON workspace_members
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT owner_id FROM workspaces WHERE id = workspace_id
    )
  );

CREATE POLICY "Owners and admins can delete members" ON workspace_members
  FOR DELETE USING (
    auth.uid() IN (
      SELECT owner_id FROM workspaces WHERE id = workspace_id
    )
  );

-- Page policies
CREATE POLICY "Users can view workspace pages" ON pages
  FOR SELECT USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    ) OR is_published = true
  );

CREATE POLICY "Members can modify pages" ON pages
  FOR ALL USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'member')
    )
  );

-- File policies
CREATE POLICY "Users can view workspace files" ON files
  FOR SELECT USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can manage files" ON files
  FOR ALL USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'member')
    )
  );

-- User settings policies
CREATE POLICY "Users can manage their settings" ON user_settings
  FOR ALL USING (user_id = auth.uid());

-- Create function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
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

-- Auto-add workspace owner trigger
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

-- Create indexes
CREATE INDEX idx_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX idx_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX idx_pages_workspace_id ON pages(workspace_id);
CREATE INDEX idx_pages_parent_id ON pages(parent_id);
CREATE INDEX idx_files_workspace_id ON files(workspace_id);
CREATE INDEX idx_files_page_id ON files(page_id); 