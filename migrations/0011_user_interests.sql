CREATE TABLE IF NOT EXISTS user_interests (
  user_id INTEGER NOT NULL,
  interest TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (user_id, interest),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_interests_user ON user_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_updated ON user_interests(updated_at);
