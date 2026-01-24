ALTER TABLE videos ADD COLUMN religion TEXT;
ALTER TABLE videos ADD COLUMN religion_detail TEXT;
ALTER TABLE user_settings ADD COLUMN allowed_religions TEXT;
ALTER TABLE user_settings ADD COLUMN religion_mode TEXT NOT NULL DEFAULT 'allow';
