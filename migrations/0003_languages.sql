ALTER TABLE videos ADD COLUMN languages TEXT DEFAULT '[]';
UPDATE videos
SET languages = CASE
  WHEN language IS NULL OR language = '' THEN '[]'
  ELSE '["' || REPLACE(language, '"', '') || '"]'
END
WHERE languages IS NULL OR languages = '';
