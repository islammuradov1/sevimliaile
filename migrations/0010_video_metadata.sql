ALTER TABLE videos ADD COLUMN description TEXT;
ALTER TABLE videos ADD COLUMN category TEXT;
ALTER TABLE videos ADD COLUMN visibility TEXT DEFAULT 'public';
CREATE INDEX IF NOT EXISTS idx_videos_visibility ON videos(visibility);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
