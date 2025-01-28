-- Add position_index column to pages table
ALTER TABLE pages ADD COLUMN position_index FLOAT DEFAULT 1000;

-- Create index for position_index
CREATE INDEX idx_pages_position_index ON pages(position_index);

-- Update existing pages with sequential position_index values
WITH numbered_pages AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY created_at) * 1000 as new_position
  FROM pages
)
UPDATE pages
SET position_index = numbered_pages.new_position
FROM numbered_pages
WHERE pages.id = numbered_pages.id; 