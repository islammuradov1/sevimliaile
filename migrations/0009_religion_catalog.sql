CREATE TABLE IF NOT EXISTS religion_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  base TEXT NOT NULL,
  detail TEXT,
  label TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_religion_categories_unique
  ON religion_categories (base, COALESCE(detail, ''));

INSERT OR IGNORE INTO religion_categories (base, detail, label, sort_order, active) VALUES
  ('none', NULL, 'No religion', 0, 1),
  ('islam', NULL, 'Islam', 10, 1),
  ('christian', NULL, 'Christian', 20, 1),
  ('jews', NULL, 'Jews', 30, 1),
  ('buddist', NULL, 'Buddist', 40, 1),
  ('islam', 'shia', 'Shia', 11, 1),
  ('islam', 'sunni', 'Sunni', 12, 1),
  ('christian', 'catholic', 'Catholic', 21, 1),
  ('christian', 'orthodox', 'Orthodox', 22, 1),
  ('christian', 'protestant', 'Protestant', 23, 1),
  ('jews', 'jews_orthodox', 'Orthodox', 31, 1),
  ('jews', 'jews_conservative', 'Conservative', 32, 1),
  ('jews', 'jews_reform', 'Reform', 33, 1),
  ('buddist', 'buddist_theravada', 'Theravada', 41, 1),
  ('buddist', 'buddist_mahayana', 'Mahayana', 42, 1),
  ('buddist', 'buddist_vajrayana', 'Vajrayana', 43, 1);
