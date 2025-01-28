-- Add is_favorite column to pages table
ALTER TABLE pages ADD COLUMN is_favorite BOOLEAN DEFAULT false;

-- Create index for is_favorite
CREATE INDEX idx_pages_is_favorite ON pages(is_favorite); 