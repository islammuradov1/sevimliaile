ALTER TABLE users ADD COLUMN points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN pro_expires_at TEXT;
ALTER TABLE users ADD COLUMN bio TEXT;

CREATE TABLE IF NOT EXISTS game_wins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  game_id TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  won_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slot TEXT NOT NULL,
  title TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ad_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ad_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  viewed_at TEXT NOT NULL,
  FOREIGN KEY (ad_id) REFERENCES ads(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS points_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_game_wins_user ON game_wins(user_id);
CREATE INDEX IF NOT EXISTS idx_game_wins_time ON game_wins(won_at);
CREATE INDEX IF NOT EXISTS idx_ads_slot ON ads(slot);
CREATE INDEX IF NOT EXISTS idx_ad_views_ad ON ad_views(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_views_user ON ad_views(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_views_time ON ad_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_points_events_user ON points_events(user_id);
CREATE INDEX IF NOT EXISTS idx_points_events_time ON points_events(created_at);
