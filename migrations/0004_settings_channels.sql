ALTER TABLE user_settings ADD COLUMN allowed_channels TEXT;
ALTER TABLE user_settings ADD COLUMN channel_mode TEXT NOT NULL DEFAULT 'allow';
