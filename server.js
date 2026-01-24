require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const { Pool } = require("pg");
let newDb = null;
try {
  ({ newDb } = require("pg-mem"));
} catch (err) {
  // pg-mem is optional; used only for in-memory fallback.
}

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "";
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL || "";
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY || "";
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || "";
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || "";
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || "";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "";
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 120;

let pool = null;
let dbMode = "memory";

function createPool() {
  const url = process.env.DATABASE_URL;
  if (url) {
    try {
      pool = new Pool({ connectionString: url });
      dbMode = "postgres";
      console.log("Using Postgres via DATABASE_URL.");
      return;
    } catch (err) {
      console.warn("Failed to create Postgres pool, falling back to in-memory DB.", err);
    }
  }
  if (newDb) {
    const mem = newDb({ autoCreateForeignKeyIndices: true });
    const pgMem = mem.adapters.createPg();
    pool = new pgMem.Pool();
    dbMode = "memory";
    console.warn("No DATABASE_URL set or connection failed. Using in-memory database (data resets on restart).");
  } else {
    console.error("DATABASE_URL missing and pg-mem is not installed. API server cannot start.");
    process.exit(1);
  }
}

createPool();

if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    })
  });
} else {
  console.warn("Firebase Admin credentials missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.");
}

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use(express.json({ limit: "2mb" }));
app.use("/api", rateLimit());
app.use((req, res, next) => {
  const blocked = [
    "/.env",
    "/server.js",
    "/package.json",
    "/package-lock.json",
    "/wrangler.toml",
    "/node_modules",
    "/data",
    "/uploads"
  ];
  const isBlocked =
    blocked.includes(req.path) ||
    req.path.startsWith("/.git") ||
    req.path.startsWith("/scripts") ||
    req.path.startsWith("/src") ||
    req.path.startsWith("/migrations") ||
    req.path.includes("..");
  if (isBlocked) {
    return res.status(404).end();
  }
  next();
});
app.use(express.static(__dirname));

const nowIso = () => new Date().toISOString();
const rateBuckets = new Map();

function rateLimit(limit = RATE_LIMIT_MAX, windowMs = RATE_LIMIT_WINDOW_MS) {
  return (req, res, next) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const bucket = rateBuckets.get(key) || { count: 0, resetAt: now + windowMs };
    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }
    bucket.count += 1;
    rateBuckets.set(key, bucket);
    if (bucket.count > limit) {
      return res.status(429).json({ error: "Too many requests. Slow down." });
    }
    next();
  };
}

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      firebase_uid TEXT UNIQUE,
      role TEXT NOT NULL DEFAULT 'user',
      plan TEXT NOT NULL DEFAULT 'free',
      created_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      youtube_url TEXT NOT NULL,
      youtube_id TEXT NOT NULL,
      owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      views INTEGER NOT NULL DEFAULT 0,
      duration INTEGER NOT NULL DEFAULT 0,
      language TEXT,
      religion TEXT,
      religion_detail TEXT,
      religions TEXT[],
      religion_details TEXT[],
      topics TEXT[],
      created_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      channel_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (user_id, channel_id)
    );
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (user_id, video_id)
    );
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
      reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      reason TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      created_at TIMESTAMPTZ NOT NULL,
      resolved_at TIMESTAMPTZ
    );
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      read_at TIMESTAMPTZ
    );
    CREATE TABLE IF NOT EXISTS user_settings (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      allowed_languages TEXT[],
      allowed_topics TEXT[],
      topic_mode TEXT NOT NULL DEFAULT 'allow',
      allowed_channels INTEGER[],
      channel_mode TEXT NOT NULL DEFAULT 'allow',
      max_daily_minutes INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS view_history (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
      watched_at TIMESTAMPTZ NOT NULL,
      watch_seconds INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_videos_created ON videos(created_at);
    CREATE INDEX IF NOT EXISTS idx_videos_owner ON videos(owner_id);
    CREATE INDEX IF NOT EXISTS idx_videos_youtube_id ON videos(youtube_id);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_channel ON subscriptions(channel_id);
    CREATE INDEX IF NOT EXISTS idx_likes_video ON likes(video_id);
    CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
    CREATE INDEX IF NOT EXISTS idx_videos_language ON videos(language);
    CREATE INDEX IF NOT EXISTS idx_history_user ON view_history(user_id);
    CREATE INDEX IF NOT EXISTS idx_history_watched ON view_history(watched_at);
  `);

  await pool.query("ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL");
  await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS firebase_uid TEXT UNIQUE");
  await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'free'");
  await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT");
  await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT");
  await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS slogan TEXT");
  await pool.query("ALTER TABLE videos ADD COLUMN IF NOT EXISTS language TEXT");
  await pool.query("ALTER TABLE videos ADD COLUMN IF NOT EXISTS religion TEXT");
  await pool.query("ALTER TABLE videos ADD COLUMN IF NOT EXISTS religion_detail TEXT");
  await pool.query("ALTER TABLE videos ADD COLUMN IF NOT EXISTS religions TEXT[]");
  await pool.query("ALTER TABLE videos ADD COLUMN IF NOT EXISTS religion_details TEXT[]");
  await pool.query("ALTER TABLE videos ADD COLUMN IF NOT EXISTS topics TEXT[]");
  await pool.query("ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS topic_mode TEXT NOT NULL DEFAULT 'allow'");
  await pool.query("ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS allowed_channels INTEGER[]");
  await pool.query("ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS channel_mode TEXT NOT NULL DEFAULT 'allow'");
  await pool.query("ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS max_daily_minutes INTEGER NOT NULL DEFAULT 0");
  await pool.query("ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS allowed_religions TEXT[]");
  await pool.query("ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS religion_mode TEXT NOT NULL DEFAULT 'allow'");
  await pool.query("ALTER TABLE view_history ADD COLUMN IF NOT EXISTS watch_seconds INTEGER NOT NULL DEFAULT 0");
}

function extractYouTubeId(input) {
  if (!input) {
    return null;
  }
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return id;
      }
      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) {
        return embedMatch[1];
      }
    }
  } catch (err) {
    return null;
  }
  return null;
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let inQuotes = false;
  const lines = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === "\"" && next === "\"" && inQuotes) {
      current += "\"";
      i += 1;
      continue;
    }
    if (char === "\"") {
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (current.trim()) {
        lines.push(current);
      }
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) {
    lines.push(current);
  }

  let headers = null;
  for (const line of lines) {
    const fields = [];
    let field = "";
    let quote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const nxt = line[i + 1];
      if (ch === "\"" && nxt === "\"" && quote) {
        field += "\"";
        i += 1;
        continue;
      }
      if (ch === "\"") {
        quote = !quote;
        continue;
      }
      if (!quote && ch === ",") {
        fields.push(field.trim());
        field = "";
        continue;
      }
      field += ch;
    }
    fields.push(field.trim());
    if (!headers) {
      headers = fields.map((value) => value.toLowerCase());
      if (headers.includes("youtube_url") || headers.includes("url")) {
        continue;
      }
      headers = null;
    }
    if (headers) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = fields[index] || "";
      });
      rows.push(row);
    } else {
      rows.push({
        youtube_url: fields[0] || "",
        title: fields[1] || "",
        description: fields[2] || ""
      });
    }
  }
  return rows;
}

function parseSqlInserts(text) {
  const rows = [];
  const regex = /INSERT\\s+INTO\\s+videos\\s*\\(([^)]+)\\)\\s*VALUES\\s*\\(([^)]+)\\)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const columns = match[1]
      .split(",")
      .map((col) => col.trim().replace(/\"/g, "").toLowerCase());
    const values = [];
    let current = "";
    let inString = false;
    for (let i = 0; i < match[2].length; i++) {
      const ch = match[2][i];
      const next = match[2][i + 1];
      if (ch === "'" && next === "'" && inString) {
        current += "'";
        i += 1;
        continue;
      }
      if (ch === "'") {
        inString = !inString;
        continue;
      }
      if (!inString && ch === ",") {
        values.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    values.push(current.trim());
    const row = {};
    columns.forEach((column, index) => {
      row[column] = values[index] || "";
    });
    rows.push(row);
  }
  return rows;
}

function normalizeLanguage(input) {
  if (!input || typeof input !== "string") {
    return "unspecified";
  }
  return input.trim().toLowerCase() || "unspecified";
}

const RELIGION_BASES = new Set(["none", "islam", "christian", "jews", "buddist"]);
const RELIGION_DETAIL_BASE = {
  shia: "islam",
  sunni: "islam",
  catholic: "christian",
  orthodox: "christian",
  protestant: "christian",
  jews_orthodox: "jews",
  jews_conservative: "jews",
  jews_reform: "jews",
  buddist_theravada: "buddist",
  buddist_mahayana: "buddist",
  buddist_vajrayana: "buddist"
};
const RELIGION_DETAILS = new Set(Object.keys(RELIGION_DETAIL_BASE));

function parseList(input) {
  if (!input) {
    return [];
  }
  if (Array.isArray(input)) {
    return input.map((item) => String(item || "").trim()).filter(Boolean);
  }
  if (typeof input !== "string") {
    return [];
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return [];
  }
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item || "").trim()).filter(Boolean);
      }
    } catch (err) {
      return [];
    }
  }
  return trimmed
    .split(/[|,]/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeReligion(input) {
  if (!input || typeof input !== "string") {
    return "none";
  }
  const value = input.trim().toLowerCase();
  if (RELIGION_BASES.has(value)) {
    return value;
  }
  return RELIGION_DETAIL_BASE[value] || "none";
}

function normalizeReligionDetail(religion, detail) {
  if (!detail || typeof detail !== "string") {
    return "";
  }
  const value = detail.trim().toLowerCase();
  const base = RELIGION_DETAIL_BASE[value];
  if (!base) {
    return "";
  }
  if (!religion || religion === "none") {
    return value;
  }
  return base === religion ? value : "";
}

function normalizeReligionList(input) {
  const values = parseList(input);
  const result = [];
  const seen = new Set();
  let hasNone = false;
  values.forEach((value) => {
    const base = normalizeReligion(value);
    if (base === "none") {
      hasNone = true;
      return;
    }
    if (!seen.has(base)) {
      result.push(base);
      seen.add(base);
    }
  });
  if (!result.length && hasNone) {
    return ["none"];
  }
  return result;
}

function normalizeReligionDetailList(input) {
  const values = parseList(input);
  const result = [];
  const seen = new Set();
  values.forEach((value) => {
    const entry = String(value || "").trim().toLowerCase();
    if (!RELIGION_DETAILS.has(entry) || seen.has(entry)) {
      return;
    }
    result.push(entry);
    seen.add(entry);
  });
  return result;
}

function normalizeAllowedReligions(values) {
  if (!Array.isArray(values)) {
    return [];
  }
  const result = [];
  const seen = new Set();
  values.forEach((value) => {
    const entry = String(value || "").trim().toLowerCase();
    if (!(RELIGION_BASES.has(entry) || RELIGION_DETAILS.has(entry)) || seen.has(entry)) {
      return;
    }
    result.push(entry);
    seen.add(entry);
  });
  if (result.includes("none") && result.length > 1) {
    return result.filter((value) => value !== "none");
  }
  return result;
}

function normalizeReligionArrays(religionsInput, religionDetailsInput, legacyReligion, legacyDetail) {
  const baseSet = new Set(normalizeReligionList(religionsInput));
  const detailSet = new Set(normalizeReligionDetailList(religionDetailsInput));
  const legacyBase = normalizeReligion(String(legacyReligion || ""));
  if (legacyBase) {
    baseSet.add(legacyBase);
  }
  const legacyDetailValue = normalizeReligionDetail(
    legacyBase,
    legacyDetail || legacyReligion
  );
  if (legacyDetailValue) {
    detailSet.add(legacyDetailValue);
  }
  detailSet.forEach((detail) => {
    const base = RELIGION_DETAIL_BASE[detail];
    if (base) {
      baseSet.add(base);
    }
  });
  if (baseSet.has("none") && baseSet.size > 1) {
    baseSet.delete("none");
  }
  if (baseSet.has("none")) {
    detailSet.clear();
  }
  let bases = Array.from(baseSet);
  if (!bases.length) {
    bases = ["none"];
  }
  const details = Array.from(detailSet);
  let legacyBaseFinal = bases[0] || "none";
  let legacyDetailFinal = "";
  for (const detail of details) {
    const detailBase = RELIGION_DETAIL_BASE[detail];
    if (!detailBase) {
      continue;
    }
    if (legacyBaseFinal === "none" || legacyBaseFinal === detailBase) {
      legacyDetailFinal = detail;
      if (legacyBaseFinal === "none") {
        legacyBaseFinal = detailBase;
      }
      break;
    }
  }
  if (!legacyDetailFinal && legacyDetail) {
    legacyDetailFinal = normalizeReligionDetail(legacyBaseFinal, legacyDetail);
  }
  return { bases, details, legacyBase: legacyBaseFinal, legacyDetail: legacyDetailFinal };
}

function normalizeTopics(input) {
  if (!input) {
    return [];
  }
  if (Array.isArray(input)) {
    return input.map((topic) => String(topic).trim().toLowerCase()).filter(Boolean);
  }
  if (typeof input === "string") {
    return input
      .split(/[|,]/g)
      .map((topic) => topic.trim().toLowerCase())
      .filter(Boolean);
  }
  return [];
}

async function fetchYouTubeMeta(youtubeId, youtubeUrl) {
  let title = "";
  let description = "";
  let durationSeconds = 0;
  if (YOUTUBE_API_KEY) {
    try {
      const apiUrl =
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=" +
        youtubeId +
        "&key=" +
        YOUTUBE_API_KEY;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const item = data.items && data.items[0];
        if (item && item.snippet) {
          title = item.snippet.title || title;
          description = item.snippet.description || description;
        }
        if (item && item.contentDetails && item.contentDetails.duration) {
          durationSeconds = parseYouTubeDuration(item.contentDetails.duration);
        }
      }
    } catch (err) {
      // Ignore API errors and fall back to oEmbed.
    }
  }
  if (!title) {
    try {
      const oembedUrl =
        "https://www.youtube.com/oembed?format=json&url=" +
        encodeURIComponent(youtubeUrl);
      const response = await fetch(oembedUrl);
      if (response.ok) {
        const data = await response.json();
        title = data.title || title;
      }
    } catch (err) {
      // Ignore oEmbed errors.
    }
  }
  return {
    title: title || "Untitled video",
    description: description || "",
    duration: durationSeconds || 0
  };
}

function parseYouTubeDuration(value) {
  if (!value || typeof value !== "string") {
    return 0;
  }
  const match = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) {
    return 0;
  }
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

async function getPlanFromFirebase(uid) {
  if (!admin.apps.length) {
    return "free";
  }
  try {
    const doc = await admin.firestore().collection("users").doc(uid).get();
    const plan = (doc.exists && doc.data().plan ? String(doc.data().plan) : "").toLowerCase();
    return plan === "pro" ? "pro" : "free";
  } catch (err) {
    return "free";
  }
}

async function upsertUserFromFirebase(firebaseUser) {
  const email = (firebaseUser.email || "").toLowerCase();
  const uid = firebaseUser.uid;
  if (!email || !uid) {
    throw new Error("Missing email or uid");
  }
  const plan = await getPlanFromFirebase(uid);
  let result = await pool.query("SELECT * FROM users WHERE firebase_uid = $1", [uid]);
  if (result.rowCount === 0) {
    const byEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (byEmail.rowCount > 0) {
      await pool.query(
        "UPDATE users SET firebase_uid = $1, plan = $2 WHERE id = $3",
        [uid, plan, byEmail.rows[0].id]
      );
      result = await pool.query("SELECT * FROM users WHERE id = $1", [byEmail.rows[0].id]);
    } else {
      result = await pool.query(
        "INSERT INTO users (email, password_hash, firebase_uid, role, created_at) " +
          "VALUES ($1, $2, $3, 'user', $4) RETURNING *",
        [email, null, uid, nowIso()]
      );
    }
  }
  let user = result.rows[0];
  if (user.plan !== plan) {
    const updated = await pool.query("UPDATE users SET plan = $1 WHERE id = $2 RETURNING *", [
      plan,
      user.id
    ]);
    user = updated.rows[0];
  }
  if (ADMIN_EMAIL && email === ADMIN_EMAIL && user.role !== "admin") {
    const updated = await pool.query(
      "UPDATE users SET role = 'admin' WHERE id = $1 RETURNING *",
      [user.id]
    );
    user = updated.rows[0];
  }
  return user;
}

async function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!admin.apps.length) {
    return res.status(500).json({ error: "Firebase admin not configured." });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded.email_verified) {
      return res.status(403).json({ error: "Email not verified." });
    }
    const user = await upsertUserFromFirebase(decoded);
    req.user = user;
    req.authTime = decoded.auth_time ? decoded.auth_time * 1000 : 0;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

function requireRecentAuth(maxAgeMs = 5 * 60 * 1000) {
  return (req, res, next) => {
    if (!req.authTime) {
      return res.status(403).json({ error: "Recent authentication required." });
    }
    if (Date.now() - req.authTime > maxAgeMs) {
      return res.status(403).json({ error: "Re-authentication required." });
    }
    next();
  };
}

function requireRole(roles) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

app.get("/api/me", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT id, email, role, plan, display_name, avatar_url, slogan, created_at FROM users WHERE id = $1",
    [req.user.id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ error: "User not found." });
  }
  res.json({ user: result.rows[0] });
});

app.get("/api/profile", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT display_name, avatar_url, slogan FROM users WHERE id = $1",
    [req.user.id]
  );
  res.json({ profile: result.rows[0] || {} });
});

app.post("/api/profile", auth, requireRole(["artist", "admin"]), async (req, res) => {
  const { displayName, slogan, avatarUrl } = req.body || {};
  const safeName = String(displayName || "").trim();
  const safeSlogan = String(slogan || "").trim();
  const safeAvatar = String(avatarUrl || "").trim();
  await pool.query(
    "UPDATE users SET display_name = $1, slogan = $2, avatar_url = $3 WHERE id = $4",
    [safeName, safeSlogan, safeAvatar, req.user.id]
  );
  res.json({ success: true });
});

app.get("/api/firebase-config", (_req, res) => {
  if (!FIREBASE_API_KEY || !FIREBASE_AUTH_DOMAIN || !FIREBASE_PROJECT_ID || !FIREBASE_APP_ID) {
    return res.status(500).json({ error: "Firebase config missing." });
  }
  res.json({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_APP_ID
  });
});

app.get("/api/settings", auth, async (req, res) => {
  if (req.user.plan !== "pro") {
    return res.status(403).json({ error: "Settings available on pro plan only." });
  }
  const result = await pool.query(
    "SELECT allowed_languages, allowed_topics, allowed_channels, allowed_religions, topic_mode, channel_mode, religion_mode, max_daily_minutes FROM user_settings WHERE user_id = $1",
    [req.user.id]
  );
  const row = result.rows[0] || {};
  res.json({
    settings: {
      allowed_languages: row.allowed_languages || [],
      allowed_topics: row.allowed_topics || [],
      allowed_channels: row.allowed_channels || [],
      allowed_religions: row.allowed_religions || [],
      topic_mode: row.topic_mode || "allow",
      channel_mode: row.channel_mode || "allow",
      religion_mode: row.religion_mode || "allow",
      max_daily_minutes: row.max_daily_minutes || 0
    }
  });
});

app.post("/api/settings", auth, requireRecentAuth(), async (req, res) => {
  if (req.user.plan !== "pro") {
    return res.status(403).json({ error: "Settings available on pro plan only." });
  }
  const { languages, topics, channels, topicMode, channelMode, religions, religionMode, maxDailyMinutes } =
    req.body || {};
  const finalLanguages = Array.isArray(languages)
    ? languages.map((lang) => String(lang).trim().toLowerCase()).filter(Boolean)
    : [];
  const finalTopics = Array.isArray(topics)
    ? topics.map((topic) => String(topic).trim().toLowerCase()).filter(Boolean)
    : [];
  const finalChannels = Array.isArray(channels)
    ? channels.map((id) => parseInt(id, 10)).filter((id) => Number.isFinite(id))
    : [];
  const finalTopicMode = topicMode === "block" ? "block" : topicMode === "off" ? "off" : "allow";
  const finalChannelMode =
    channelMode === "block" ? "block" : channelMode === "off" ? "off" : "allow";
  const finalReligions = normalizeAllowedReligions(religions || []);
  const finalReligionMode =
    religionMode === "block" ? "block" : religionMode === "off" ? "off" : "allow";
  const finalMaxDailyMinutes = Math.max(0, Math.min(24 * 60, parseInt(maxDailyMinutes || "0", 10)));
  await pool.query(
    "INSERT INTO user_settings (user_id, allowed_languages, allowed_topics, allowed_channels, allowed_religions, topic_mode, channel_mode, religion_mode, max_daily_minutes, updated_at) " +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) " +
      "ON CONFLICT (user_id) DO UPDATE SET allowed_languages = $2, allowed_topics = $3, allowed_channels = $4, allowed_religions = $5, topic_mode = $6, channel_mode = $7, religion_mode = $8, max_daily_minutes = $9, updated_at = $10",
    [
      req.user.id,
      finalLanguages,
      finalTopics,
      finalChannels,
      finalReligions,
      finalTopicMode,
      finalChannelMode,
      finalReligionMode,
      finalMaxDailyMinutes,
      nowIso()
    ]
  );
  res.json({ success: true });
});

app.get("/api/history", auth, async (req, res) => {
  if (req.user.plan !== "pro") {
    return res.status(403).json({ error: "History available on pro plan only." });
  }
  const day = (req.query.day || "").toString();
  const date = day ? new Date(day) : new Date();
  if (Number.isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid day." });
  }
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const result = await pool.query(
    "SELECT view_history.id, view_history.video_id, view_history.watched_at, videos.title, videos.youtube_id, users.email as channel " +
      "FROM view_history JOIN videos ON view_history.video_id = videos.id " +
      "JOIN users ON videos.owner_id = users.id " +
      "WHERE view_history.user_id = $1 AND view_history.watched_at BETWEEN $2 AND $3 " +
      "ORDER BY view_history.watched_at DESC",
    [req.user.id, start.toISOString(), end.toISOString()]
  );
  res.json({ history: result.rows });
});

app.delete("/api/history/:id", auth, async (req, res) => {
  if (req.user.plan !== "pro") {
    return res.status(403).json({ error: "History available on pro plan only." });
  }
  const result = await pool.query("DELETE FROM view_history WHERE id = $1 AND user_id = $2", [
    req.params.id,
    req.user.id
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json({ ok: true });
});

app.get("/api/topics", auth, async (_req, res) => {
  const result = await pool.query(
    "SELECT DISTINCT LOWER(TRIM(topic)) as topic " +
      "FROM (SELECT UNNEST(topics) as topic FROM videos WHERE topics IS NOT NULL) t " +
      "WHERE TRIM(topic) <> '' ORDER BY topic"
  );
  res.json({ topics: result.rows.map((row) => row.topic) });
});

app.get("/api/users", auth, requireRole("admin"), async (_req, res) => {
  const result = await pool.query(
    "SELECT id, email, role, created_at FROM users ORDER BY created_at DESC"
  );
  res.json({ users: result.rows });
});

app.post("/api/admin/grant-artist", auth, rateLimit(80, RATE_LIMIT_WINDOW_MS), requireRole("admin"), async (req, res) => {
  const { userId } = req.body || {};
  if (!userId) {
    return res.status(400).json({ error: "userId required." });
  }
  const target = await pool.query("SELECT id, role FROM users WHERE id = $1", [userId]);
  if (target.rowCount === 0) {
    return res.status(404).json({ error: "User not found." });
  }
  if (target.rows[0].role === "admin") {
    return res.status(400).json({ error: "Admin already has permissions." });
  }
  await pool.query("UPDATE users SET role = 'artist' WHERE id = $1", [userId]);
  res.json({ success: true });
});

app.get("/api/channels", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT users.id, users.email, users.role, " +
      "COUNT(DISTINCT videos.id)::int as videos, " +
      "COUNT(DISTINCT subscriptions.id)::int as subscribers " +
      "FROM users " +
      "LEFT JOIN videos ON users.id = videos.owner_id " +
      "LEFT JOIN subscriptions ON subscriptions.channel_id = users.id " +
      "WHERE users.role = 'artist' " +
      "GROUP BY users.id ORDER BY videos DESC, users.created_at DESC"
  );
  let subscribed = new Set();
  if (req.user) {
    const subResult = await pool.query(
      "SELECT channel_id FROM subscriptions WHERE user_id = $1",
      [req.user.id]
    );
    subscribed = new Set(subResult.rows.map((row) => row.channel_id));
  }
  const channels = result.rows.map((channel) => ({
    ...channel,
    is_subscribed: subscribed.has(channel.id)
  }));
  res.json({ channels });
});

app.get("/api/channels/:id", auth, async (req, res) => {
  const channelId = req.params.id;
  const result = await pool.query(
    "SELECT users.id, users.email, users.role, " +
      "COUNT(DISTINCT videos.id)::int as videos, " +
      "COUNT(DISTINCT subscriptions.id)::int as subscribers " +
      "FROM users " +
      "LEFT JOIN videos ON users.id = videos.owner_id " +
      "LEFT JOIN subscriptions ON subscriptions.channel_id = users.id " +
      "WHERE users.id = $1 AND users.role = 'artist' " +
      "GROUP BY users.id",
    [channelId]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Channel not found." });
  }
  let isSubscribed = false;
  if (req.user) {
    const subResult = await pool.query(
      "SELECT id FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
      [req.user.id, channelId]
    );
    isSubscribed = subResult.rowCount > 0;
  }
  res.json({ channel: { ...result.rows[0], is_subscribed: isSubscribed } });
});

app.get("/api/videos", auth, async (req, res) => {
  const search = (req.query.search || "").toString().trim();
  const channelId = (req.query.channelId || "").toString().trim();
  const onlySubscribed = req.query.subscribed === "1";
  const limit = Math.min(parseInt(req.query.limit || "30", 10), 100);
  const offset = Math.max(parseInt(req.query.offset || "0", 10), 0);
  const settingsResult = await pool.query(
    "SELECT allowed_languages, allowed_topics, allowed_channels, allowed_religions, topic_mode, channel_mode, religion_mode FROM user_settings WHERE user_id = $1",
    [req.user.id]
  );
  const allowedLanguages = settingsResult.rows[0]?.allowed_languages || [];
  const allowedTopics = settingsResult.rows[0]?.allowed_topics || [];
  const topicMode = settingsResult.rows[0]?.topic_mode || "allow";
  const allowedChannels = settingsResult.rows[0]?.allowed_channels || [];
  const channelMode = settingsResult.rows[0]?.channel_mode || "allow";
  const allowedReligions = normalizeAllowedReligions(
    settingsResult.rows[0]?.allowed_religions || []
  );
  const religionMode = settingsResult.rows[0]?.religion_mode || "allow";
  const params = [];
  let where = "WHERE videos.youtube_id IS NOT NULL";
  if (onlySubscribed) {
    if (!req.user) {
      return res.status(401).json({ error: "Login required for subscribed feed." });
    }
    params.push(req.user.id);
    where += " AND videos.owner_id IN (SELECT channel_id FROM subscriptions WHERE user_id = $" + params.length + ")";
  }
  if (channelId) {
    params.push(channelId);
    where += " AND videos.owner_id = $" + params.length;
  }
  if (search) {
    params.push("%" + search + "%");
    where += " AND videos.title ILIKE $" + params.length;
  }
  if (allowedLanguages.length) {
    params.push(allowedLanguages);
    where += " AND videos.language = ANY($" + params.length + ")";
  }
  if (allowedTopics.length && topicMode !== "off") {
    params.push(allowedTopics);
    if (topicMode === "block") {
      where += " AND NOT (COALESCE(videos.topics, ARRAY[]::text[]) && $" + params.length + ")";
    } else {
      where += " AND COALESCE(videos.topics, ARRAY[]::text[]) && $" + params.length;
    }
  }
  if (allowedChannels.length && channelMode !== "off") {
    params.push(allowedChannels);
    if (channelMode === "block") {
      where += " AND videos.owner_id <> ALL($" + params.length + ")";
    } else {
      where += " AND videos.owner_id = ANY($" + params.length + ")";
    }
  }
  if (allowedReligions.length && religionMode !== "off") {
    params.push(allowedReligions);
    const relParam = params.length;
    const match =
      "COALESCE(videos.religions, ARRAY[]::text[]) && $" +
      relParam +
      " OR COALESCE(videos.religion_details, ARRAY[]::text[]) && $" +
      relParam +
      " OR COALESCE(videos.religion, 'none') = ANY($" +
      relParam +
      ") OR COALESCE(videos.religion_detail, '') = ANY($" +
      relParam +
      ")";
    if (religionMode === "block") {
      where += " AND NOT (" + match + ")";
    } else {
      where += " AND (" + match + ")";
    }
  }
  const limitParam = params.length + 1;
  const offsetParam = params.length + 2;
  const likedParam = params.length + 3;
  const rows = await pool.query(
    "SELECT videos.*, users.email as channel, users.role as channel_role, " +
      "COALESCE(like_counts.count, 0)::int as hearts, " +
      "CASE WHEN $"+likedParam+"::int IS NULL THEN false " +
      "ELSE EXISTS (SELECT 1 FROM likes WHERE likes.video_id = videos.id AND likes.user_id = $" + likedParam + ") END as liked " +
      "FROM videos JOIN users ON videos.owner_id = users.id " +
      "LEFT JOIN (SELECT video_id, COUNT(*) as count FROM likes GROUP BY video_id) like_counts ON like_counts.video_id = videos.id " +
      where +
      " ORDER BY videos.created_at DESC LIMIT $" +
      limitParam +
      " OFFSET $" +
      offsetParam,
    [...params, limit + 1, offset, req.user ? req.user.id : null]
  );
  const hasMore = rows.rows.length > limit;
  const videos = rows.rows.slice(0, limit);
  res.json({ videos, hasMore });
});

app.get("/api/viral", auth, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "8", 10), 20);
  const settingsResult = await pool.query(
    "SELECT allowed_languages, allowed_topics, allowed_channels, allowed_religions, topic_mode, channel_mode, religion_mode FROM user_settings WHERE user_id = $1",
    [req.user.id]
  );
  const allowedLanguages = settingsResult.rows[0]?.allowed_languages || [];
  const allowedTopics = settingsResult.rows[0]?.allowed_topics || [];
  const allowedChannels = settingsResult.rows[0]?.allowed_channels || [];
  const allowedReligions = normalizeAllowedReligions(
    settingsResult.rows[0]?.allowed_religions || []
  );
  const topicMode = settingsResult.rows[0]?.topic_mode || "allow";
  const channelMode = settingsResult.rows[0]?.channel_mode || "allow";
  const religionMode = settingsResult.rows[0]?.religion_mode || "allow";
  const params = [];
  let where = "WHERE videos.youtube_id IS NOT NULL";
  if (allowedChannels.length && channelMode !== "off") {
    params.push(allowedChannels);
    if (channelMode === "block") {
      where += " AND videos.owner_id <> ALL($" + params.length + ")";
    } else {
      where += " AND videos.owner_id = ANY($" + params.length + ")";
    }
  }
  if (allowedLanguages.length) {
    params.push(allowedLanguages);
    where += " AND videos.language = ANY($" + params.length + ")";
  }
  if (allowedTopics.length && topicMode !== "off") {
    params.push(allowedTopics);
    if (topicMode === "block") {
      where += " AND NOT (COALESCE(videos.topics, ARRAY[]::text[]) && $" + params.length + ")";
    } else {
      where += " AND COALESCE(videos.topics, ARRAY[]::text[]) && $" + params.length;
    }
  }
  if (allowedReligions.length && religionMode !== "off") {
    params.push(allowedReligions);
    const relParam = params.length;
    const match =
      "COALESCE(videos.religions, ARRAY[]::text[]) && $" +
      relParam +
      " OR COALESCE(videos.religion_details, ARRAY[]::text[]) && $" +
      relParam +
      " OR COALESCE(videos.religion, 'none') = ANY($" +
      relParam +
      ") OR COALESCE(videos.religion_detail, '') = ANY($" +
      relParam +
      ")";
    if (religionMode === "block") {
      where += " AND NOT (" + match + ")";
    } else {
      where += " AND (" + match + ")";
    }
  }
  params.push(limit);
  const rows = await pool.query(
    "SELECT videos.*, users.email as channel, users.role as channel_role, " +
      "COALESCE(like_counts.count, 0)::int as hearts " +
      "FROM videos JOIN users ON videos.owner_id = users.id " +
      "LEFT JOIN (SELECT video_id, COUNT(*) as count FROM likes GROUP BY video_id) like_counts ON like_counts.video_id = videos.id " +
      where +
      " ORDER BY videos.views DESC, hearts DESC LIMIT $" +
      params.length,
    params
  );
  res.json({ videos: rows.rows, hasMore: false });
});

app.get("/api/videos/:id", auth, async (req, res) => {
  const settingsResult = await pool.query(
    "SELECT allowed_languages, allowed_topics, allowed_channels, allowed_religions, topic_mode, channel_mode, religion_mode FROM user_settings WHERE user_id = $1",
    [req.user.id]
  );
  const allowedLanguages = settingsResult.rows[0]?.allowed_languages || [];
  const allowedTopics = settingsResult.rows[0]?.allowed_topics || [];
  const topicMode = settingsResult.rows[0]?.topic_mode || "allow";
  const allowedChannels = settingsResult.rows[0]?.allowed_channels || [];
  const channelMode = settingsResult.rows[0]?.channel_mode || "allow";
  const allowedReligions = normalizeAllowedReligions(
    settingsResult.rows[0]?.allowed_religions || []
  );
  const religionMode = settingsResult.rows[0]?.religion_mode || "allow";
  const result = await pool.query(
    "SELECT videos.*, users.email as channel FROM videos JOIN users ON videos.owner_id = users.id WHERE videos.id = $1 AND videos.youtube_id IS NOT NULL",
    [req.params.id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Video not found." });
  }
  const video = result.rows[0];
  if (allowedLanguages.length && !allowedLanguages.includes((video.language || "").toLowerCase())) {
    return res.status(403).json({ error: "Blocked by language settings." });
  }
  if (allowedChannels.length && channelMode !== "off") {
    const isAllowedChannel = allowedChannels.includes(Number(video.owner_id));
    if (channelMode === "allow" && !isAllowedChannel) {
      return res.status(403).json({ error: "Blocked by channel settings." });
    }
    if (channelMode === "block" && isAllowedChannel) {
      return res.status(403).json({ error: "Blocked by channel settings." });
    }
  }
  if (allowedReligions.length && religionMode !== "off") {
    const normalizedAllowed = normalizeAllowedReligions(allowedReligions);
    const { bases, details } = normalizeReligionArrays(
      video.religions,
      video.religion_details,
      video.religion || "none",
      video.religion_detail || ""
    );
    const tokens = new Set([...bases, ...details].map((value) => String(value).toLowerCase()));
    const isAllowedReligion = normalizedAllowed.some((value) =>
      tokens.has(String(value).toLowerCase())
    );
    if (religionMode === "allow" && !isAllowedReligion) {
      return res.status(403).json({ error: "Blocked by religion settings." });
    }
    if (religionMode === "block" && isAllowedReligion) {
      return res.status(403).json({ error: "Blocked by religion settings." });
    }
  }
  if (allowedTopics.length && topicMode !== "off") {
    const hasTopic = (video.topics || []).some((topic) =>
      allowedTopics.includes(String(topic || "").toLowerCase())
    );
    if (topicMode === "allow" && !hasTopic) {
      return res.status(403).json({ error: "Blocked by topic settings." });
    }
    if (topicMode === "block" && hasTopic) {
      return res.status(403).json({ error: "Blocked by topic settings." });
    }
  }
  res.json({ video: result.rows[0] });
});

app.post("/api/videos/:id/view", auth, async (req, res) => {
  await pool.query("UPDATE videos SET views = views + 1 WHERE id = $1", [req.params.id]);
  if (req.user.plan === "pro") {
    const settingsResult = await pool.query(
      "SELECT max_daily_minutes FROM user_settings WHERE user_id = $1",
      [req.user.id]
    );
    const maxMinutes = settingsResult.rows[0]?.max_daily_minutes || 0;
    if (maxMinutes > 0) {
      const now = new Date();
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const usedResult = await pool.query(
        "SELECT COALESCE(SUM(watch_seconds), 0)::int as used FROM view_history " +
          "WHERE user_id = $1 AND watched_at BETWEEN $2 AND $3",
        [req.user.id, start.toISOString(), end.toISOString()]
      );
      const usedSeconds = usedResult.rows[0]?.used || 0;
      if (usedSeconds >= maxMinutes * 60) {
        return res.status(403).json({ error: "Daily watch limit reached." });
      }
    }
    const videoResult = await pool.query("SELECT duration FROM videos WHERE id = $1", [req.params.id]);
    const durationSeconds = videoResult.rows[0]?.duration || 0;
    await pool.query(
      "INSERT INTO view_history (user_id, video_id, watched_at, watch_seconds) VALUES ($1, $2, $3, $4)",
      [req.user.id, req.params.id, nowIso(), durationSeconds]
    );
  }
  res.json({ success: true });
});

app.post("/api/videos/:id/like", auth, rateLimit(120, RATE_LIMIT_WINDOW_MS), async (req, res) => {
  const videoId = Number(req.params.id);
  const existing = await pool.query(
    "SELECT 1 FROM likes WHERE user_id = $1 AND video_id = $2",
    [req.user.id, videoId]
  );
  if (existing.rowCount > 0) {
    await pool.query("DELETE FROM likes WHERE user_id = $1 AND video_id = $2", [req.user.id, videoId]);
  } else {
    await pool.query(
      "INSERT INTO likes (user_id, video_id, created_at) VALUES ($1, $2, $3)",
      [req.user.id, videoId, nowIso()]
    );
  }
  const count = await pool.query(
    "SELECT COUNT(*)::int as hearts FROM likes WHERE video_id = $1",
    [videoId]
  );
  res.json({ hearts: count.rows[0].hearts, liked: existing.rowCount === 0 });
});

app.post("/api/reports", auth, rateLimit(60, RATE_LIMIT_WINDOW_MS), async (req, res) => {
  const { videoId, reason } = req.body || {};
  if (!videoId || !reason || reason.trim().length < 5) {
    return res.status(400).json({ error: "Reason required (min 5 chars)." });
  }
  await pool.query(
    "INSERT INTO reports (video_id, reporter_id, reason, created_at) VALUES ($1, $2, $3, $4)",
    [videoId, req.user.id, reason.trim(), nowIso()]
  );
  res.json({ success: true });
});

app.get("/api/reports", auth, requireRole("admin"), async (_req, res) => {
  const result = await pool.query(
    "SELECT reports.id, reports.reason, reports.status, reports.created_at, " +
      "videos.id as video_id, videos.title as video_title, " +
      "users.email as reporter " +
      "FROM reports JOIN videos ON reports.video_id = videos.id " +
      "JOIN users ON reports.reporter_id = users.id " +
      "ORDER BY reports.created_at DESC"
  );
  res.json({ reports: result.rows });
});

app.post("/api/reports/:id/resolve", auth, requireRole("admin"), async (req, res) => {
  const { message } = req.body || {};
  const result = await pool.query(
    "SELECT reporter_id FROM reports WHERE id = $1",
    [req.params.id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Report not found." });
  }
  await pool.query(
    "UPDATE reports SET status = 'resolved', resolved_at = $1 WHERE id = $2",
    [nowIso(), req.params.id]
  );
  if (message && message.trim()) {
    await pool.query(
      "INSERT INTO notifications (user_id, message, created_at) VALUES ($1, $2, $3)",
      [result.rows[0].reporter_id, message.trim(), nowIso()]
    );
  }
  res.json({ success: true });
});

app.get("/api/notifications", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT id, message, created_at, read_at FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json({ notifications: result.rows });
});

app.post("/api/notifications/:id/read", auth, async (req, res) => {
  await pool.query(
    "UPDATE notifications SET read_at = $1 WHERE id = $2 AND user_id = $3",
    [nowIso(), req.params.id, req.user.id]
  );
  res.json({ success: true });
});

app.get("/api/subscriptions", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT users.id, users.email, " +
      "COUNT(DISTINCT subs.id)::int as subscribers " +
      "FROM subscriptions " +
      "JOIN users ON subscriptions.channel_id = users.id " +
      "LEFT JOIN subscriptions subs ON subs.channel_id = users.id " +
      "WHERE subscriptions.user_id = $1 " +
      "GROUP BY users.id, users.email " +
      "ORDER BY MAX(subscriptions.created_at) DESC",
    [req.user.id]
  );
  res.json({ subscriptions: result.rows });
});

app.post("/api/subscriptions/:channelId", auth, async (req, res) => {
  const channelId = Number(req.params.channelId);
  if (!channelId || channelId === req.user.id) {
    return res.status(400).json({ error: "Invalid channel." });
  }
  const existing = await pool.query(
    "SELECT 1 FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
    [req.user.id, channelId]
  );
  if (existing.rowCount > 0) {
    await pool.query(
      "DELETE FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
      [req.user.id, channelId]
    );
    return res.json({ subscribed: false });
  }
  await pool.query(
    "INSERT INTO subscriptions (user_id, channel_id, created_at) VALUES ($1, $2, $3)",
    [req.user.id, channelId, nowIso()]
  );
  res.json({ subscribed: true });
});
app.get("/api/admin/export-sql", auth, requireRole("admin"), async (_req, res) => {
  const result = await pool.query(
    "SELECT youtube_url, language, topics FROM videos ORDER BY created_at DESC"
  );
  const lines = result.rows.map((row) => {
    const safeUrl = row.youtube_url.replace(/'/g, "''");
    const safeLanguage = normalizeLanguage(row.language || "");
    const topics = Array.isArray(row.topics) ? row.topics.join("|") : "";
    const safeTopics = String(topics || "").replace(/'/g, "''");
    return (
      "INSERT INTO videos (youtube_url, language, topics) VALUES ('" +
      safeUrl +
      "', '" +
      safeLanguage +
      "', '" +
      safeTopics +
      "');"
    );
  });
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", "attachment; filename=\"videos.sql\"");
  res.send(lines.join("\n"));
});

app.post("/api/admin/import-csv", auth, requireRole("admin"), async (req, res) => {
  const { csv } = req.body || {};
  if (!csv || typeof csv !== "string") {
    return res.status(400).json({ error: "CSV text required." });
  }
  const rows = parseCsv(csv);
  const inserted = [];
  const skipped = [];
  for (const row of rows) {
    const youtubeUrl = row.youtube_url || row.url || "";
    const finalLanguage = normalizeLanguage(row.language || row.lang || "");
    const finalTopics = normalizeTopics(row.topics || "");
    const { bases, details, legacyBase, legacyDetail } = normalizeReligionArrays(
      row.religions,
      row.religion_details,
      row.religion || row.faith || "",
      row.religion_detail || row.faith_detail || row.religion || row.faith || ""
    );
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      skipped.push({ youtubeUrl, reason: "Invalid URL" });
      continue;
    }
    const exists = await pool.query("SELECT id FROM videos WHERE youtube_id = $1", [youtubeId]);
    if (exists.rowCount > 0) {
      skipped.push({ youtubeUrl, reason: "Already exists" });
      continue;
    }
    const meta = await fetchYouTubeMeta(youtubeId, youtubeUrl);
    const finalTitle = meta.title;
    const finalDescription = "";
    const result = await pool.query(
      "INSERT INTO videos (title, description, youtube_url, youtube_id, owner_id, language, religion, religion_detail, religions, religion_details, topics, duration, created_at) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
      [
        finalTitle,
        finalDescription,
        youtubeUrl,
        youtubeId,
        req.user.id,
        finalLanguage,
        legacyBase,
        legacyDetail,
        bases,
        details,
        finalTopics,
        meta.duration || 0,
        nowIso()
      ]
    );
    inserted.push(result.rows[0].id);
  }
  res.json({ inserted: inserted.length, skipped });
});

app.post("/api/admin/import-sql", auth, requireRole("admin"), async (req, res) => {
  const { sql } = req.body || {};
  if (!sql || typeof sql !== "string") {
    return res.status(400).json({ error: "SQL text required." });
  }
  const rows = parseSqlInserts(sql);
  const inserted = [];
  const skipped = [];
  for (const row of rows) {
    const youtubeUrl = row.youtube_url || row.url || "";
    const finalLanguage = normalizeLanguage(row.language || row.lang || "");
    const finalTopics = normalizeTopics(row.topics || "");
    const { bases, details, legacyBase, legacyDetail } = normalizeReligionArrays(
      row.religions,
      row.religion_details,
      row.religion || row.faith || "",
      row.religion_detail || row.faith_detail || row.religion || row.faith || ""
    );
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      skipped.push({ youtubeUrl, reason: "Invalid URL" });
      continue;
    }
    const exists = await pool.query("SELECT id FROM videos WHERE youtube_id = $1", [youtubeId]);
    if (exists.rowCount > 0) {
      skipped.push({ youtubeUrl, reason: "Already exists" });
      continue;
    }
    const meta = await fetchYouTubeMeta(youtubeId, youtubeUrl);
    const finalTitle = meta.title;
    const finalDescription = "";
    const result = await pool.query(
      "INSERT INTO videos (title, description, youtube_url, youtube_id, owner_id, language, religion, religion_detail, religions, religion_details, topics, duration, created_at) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
      [
        finalTitle,
        finalDescription,
        youtubeUrl,
        youtubeId,
        req.user.id,
        finalLanguage,
        legacyBase,
        legacyDetail,
        bases,
        details,
        finalTopics,
        meta.duration || 0,
        nowIso()
      ]
    );
    inserted.push(result.rows[0].id);
  }
  res.json({ inserted: inserted.length, skipped });
});

app.get("/api/videos/manage", auth, async (req, res) => {
  if (req.user.role === "admin") {
    const result = await pool.query(
      "SELECT videos.*, users.email as channel FROM videos JOIN users ON videos.owner_id = users.id ORDER BY videos.created_at DESC"
    );
    return res.json({ videos: result.rows });
  }
  const result = await pool.query(
    "SELECT videos.*, users.email as channel FROM videos JOIN users ON videos.owner_id = users.id WHERE videos.owner_id = $1 ORDER BY videos.created_at DESC",
    [req.user.id]
  );
  res.json({ videos: result.rows });
});

app.delete("/api/videos/:id", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT owner_id FROM videos WHERE id = $1",
    [req.params.id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Video not found." });
  }
  const ownerId = result.rows[0].owner_id;
  if (req.user.role !== "admin" && ownerId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  await pool.query("DELETE FROM videos WHERE id = $1", [req.params.id]);
  res.json({ success: true });
});

app.get("/api/stats", auth, async (req, res) => {
  if (req.user.role === "admin") {
    const totals = await pool.query(
      "SELECT COUNT(*)::int as users, " +
        "SUM(CASE WHEN role = 'artist' THEN 1 ELSE 0 END)::int as artists " +
        "FROM users"
    );
    const videoTotals = await pool.query(
      "SELECT COUNT(*)::int as videos, COALESCE(SUM(views), 0)::int as views FROM videos"
    );
    const artistStats = await pool.query(
      "SELECT users.id, users.email, users.role, " +
        "COUNT(videos.id)::int as videos, COALESCE(SUM(videos.views), 0)::int as views " +
        "FROM users LEFT JOIN videos ON users.id = videos.owner_id " +
        "WHERE users.role IN ('artist','admin') " +
        "GROUP BY users.id ORDER BY views DESC, videos DESC"
    );
    return res.json({
      totals: {
        users: totals.rows[0].users,
        artists: totals.rows[0].artists,
        videos: videoTotals.rows[0].videos,
        views: videoTotals.rows[0].views
      },
      artists: artistStats.rows
    });
  }
  const videoTotals = await pool.query(
    "SELECT COUNT(*)::int as videos, COALESCE(SUM(views), 0)::int as views FROM videos WHERE owner_id = $1",
    [req.user.id]
  );
  const videos = await pool.query(
    "SELECT id, title, views, created_at FROM videos WHERE owner_id = $1 ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json({
    totals: videoTotals.rows[0],
    videos: videos.rows
  });
});

app.post("/api/videos", auth, rateLimit(80, RATE_LIMIT_WINDOW_MS), requireRole(["artist", "admin"]), async (req, res) => {
  const { youtubeUrl, language, topics, religion, religion_detail, religions, religion_details } = req.body || {};
  const youtubeId = extractYouTubeId(youtubeUrl);
  if (!youtubeId) {
    return res.status(400).json({ error: "Valid YouTube URL required." });
  }
  const canSetMetadata = req.user.role === "admin" || req.user.role === "artist";
  const finalLanguage = canSetMetadata ? normalizeLanguage(language) : "unspecified";
  const { bases, details, legacyBase, legacyDetail } = canSetMetadata
    ? normalizeReligionArrays(religions, religion_details, religion || "", religion_detail || "")
    : { bases: ["none"], details: [], legacyBase: "none", legacyDetail: "" };
  const finalReligion = canSetMetadata ? legacyBase : "none";
  const finalReligionDetail = canSetMetadata ? legacyDetail : "";
  const finalReligions = canSetMetadata ? bases : ["none"];
  const finalReligionDetails = canSetMetadata ? details : [];
  const finalTopics = canSetMetadata ? normalizeTopics(topics) : [];
  const meta = await fetchYouTubeMeta(youtubeId, youtubeUrl);
  const finalTitle = meta.title;
  const finalDescription = "";
  const finalDuration = meta.duration || 0;
  if (!finalTitle) {
    return res.status(400).json({ error: "Unable to fetch a title for this URL." });
  }
  const result = await pool.query(
    "INSERT INTO videos (title, description, youtube_url, youtube_id, owner_id, language, religion, religion_detail, religions, religion_details, topics, duration, created_at) " +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
    [
      finalTitle,
      finalDescription,
      youtubeUrl,
      youtubeId,
      req.user.id,
      finalLanguage,
      finalReligion,
      finalReligionDetail,
      finalReligions,
      finalReligionDetails,
      finalTopics,
      finalDuration,
      nowIso()
    ]
  );
  const owner = await pool.query("SELECT email FROM users WHERE id = $1", [req.user.id]);
  const video = result.rows[0];
  res.json({ video: { ...video, channel: owner.rows[0] ? owner.rows[0].email : "" } });
});

app.post("/api/requests", auth, async (req, res) => {
  const { reason, details, contact } = req.body || {};
  if (!reason || !details || !contact) {
    return res.status(400).json({ error: "reason, details, contact required" });
  }
  await pool.query(
    "INSERT INTO notifications (user_id, message, created_at) VALUES ($1, $2, $3)",
    [req.user.id, `[REQUEST:${reason}] ${details} | contact: ${contact}`, nowIso()]
  );
  res.json({ success: true });
});

async function start() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} (${dbMode})`);
    });
  } catch (err) {
    if (dbMode === "postgres") {
      console.error("Postgres connection failed, retrying with in-memory DB.", err);
      createPool();
      try {
        await initDb();
        app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT} (${dbMode})`);
        });
        return;
      } catch (inner) {
        console.error("Failed to start server after fallback", inner);
        process.exit(1);
      }
    } else {
      console.error("Failed to start server", err);
      process.exit(1);
    }
  }
}

start();
