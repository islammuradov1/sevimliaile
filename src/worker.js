const JSON_HEADERS = { "Content-Type": "application/json" };

function jsonResponse(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...extra }
  });
}

function textResponse(data, status = 200, extra = {}) {
  return new Response(data, {
    status,
    headers: { "Content-Type": "text/plain", ...extra }
  });
}

function withCors(headers, origin) {
  return {
    ...headers,
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}

async function parseJson(request) {
  const text = await request.text();
  return text ? JSON.parse(text) : {};
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeTopics(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((t) => String(t).trim().toLowerCase()).filter(Boolean);
  }
  return String(input)
    .split(/[|,]/g)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeChannelIds(input) {
  if (!input) return [];
  const values = Array.isArray(input) ? input : [input];
  const ids = values
    .flat()
    .map((value) => parseInt(String(value), 10))
    .filter((value) => Number.isFinite(value));
  return Array.from(new Set(ids));
}

function normalizeLanguages(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((t) => String(t).trim().toLowerCase()).filter(Boolean);
  }
  const raw = String(input).trim();
  if (raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((t) => String(t).trim().toLowerCase()).filter(Boolean);
      }
    } catch (err) {
      // Fall through to delimiter parsing.
    }
  }
  return raw
    .split(/[|,]/g)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeReligion(input) {
  if (!input || typeof input !== "string") return "none";
  const value = input.trim().toLowerCase();
  if (["islam", "christian", "jews", "buddist", "none"].includes(value)) return value;
  if (value === "shia" || value === "sunni") return "islam";
  return "none";
}

function normalizeReligionDetail(religion, detail) {
  if (!detail || typeof detail !== "string") return "";
  const value = detail.trim().toLowerCase();
  if (religion === "islam" && (value === "shia" || value === "sunni")) return value;
  if (religion === "christian" && ["catholic", "orthodox", "protestant"].includes(value)) {
    return value;
  }
  return "";
}

function normalizeAllowedReligions(values) {
  if (!Array.isArray(values)) return [];
  const allowed = [];
  const seen = new Set();
  values.forEach((value) => {
    const v = String(value || "").trim().toLowerCase();
    if (["none", "islam", "shia", "sunni", "christian", "jews", "buddist"].includes(v) && !seen.has(v)) {
      allowed.push(v);
      seen.add(v);
    }
  });
  return allowed;
}

function isReligionAllowed(allowedList, mode, religion, detail) {
  if (mode === "off") return true;
  if (!allowedList || !allowedList.length) return true;
  const base = (religion || "none").toLowerCase();
  const extra = (detail || "").toLowerCase();
  const matches = allowedList.includes(base) || (extra && allowedList.includes(extra));
  return mode === "block" ? !matches : matches;
}

function parseCsv(text) {
  const rows = [];
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return rows;
  let headers = null;
  for (const line of lines) {
    const fields = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const next = line[i + 1];
      if (ch === '"' && next === '"') {
        current += '"';
        i += 1;
        continue;
      }
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        fields.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    fields.push(current.trim());
    if (!headers) {
      headers = fields.map((field) => field.toLowerCase());
      continue;
    }
    const row = {};
    headers.forEach((header, index) => {
      row[header] = fields[index] || "";
    });
    rows.push(row);
  }
  return rows;
}

function parseSqlInserts(text) {
  const rows = [];
  const regex = /INSERT\s+INTO\s+videos\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/gi;
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

function extractYouTubeId(input) {
  if (!input) return null;
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
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
  } catch (err) {
    return null;
  }
  return null;
}

function parseYouTubeDuration(value) {
  if (!value || typeof value !== "string") return 0;
  const match = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

async function fetchYouTubeMeta(env, youtubeId, youtubeUrl) {
  let title = "";
  let duration = 0;
  if (env.YOUTUBE_API_KEY) {
    const apiUrl =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=" +
      youtubeId +
      "&key=" +
      env.YOUTUBE_API_KEY;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const item = data.items && data.items[0];
      if (item && item.snippet) {
        title = item.snippet.title || title;
      }
      if (item && item.contentDetails && item.contentDetails.duration) {
        duration = parseYouTubeDuration(item.contentDetails.duration);
      }
    }
  }
  if (!title) {
    const oembedUrl =
      "https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent(youtubeUrl);
    const response = await fetch(oembedUrl);
    if (response.ok) {
      const data = await response.json();
      title = data.title || title;
    }
  }
  return { title: title || "Untitled video", duration: duration || 0 };
}

function safeJsonArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

async function loadUserSettings(env, userId) {
  try {
    const settings = await env.DB.prepare(
      "SELECT allowed_languages, allowed_topics, allowed_channels, allowed_religions, topic_mode, channel_mode, religion_mode, max_daily_minutes FROM user_settings WHERE user_id = ?"
    )
      .bind(userId)
      .first();
    return {
      hasSettings: Boolean(settings),
      allowedLanguages: safeJsonArray(settings?.allowed_languages),
      allowedTopics: safeJsonArray(settings?.allowed_topics),
      allowedChannels: safeJsonArray(settings?.allowed_channels),
      allowedReligions: normalizeAllowedReligions(safeJsonArray(settings?.allowed_religions)),
      topicMode: settings?.topic_mode || "allow",
      channelMode: settings?.channel_mode || "allow",
      religionMode: settings?.religion_mode || "allow",
      maxDailyMinutes: settings?.max_daily_minutes || 0
    };
  } catch (err) {
    return {
      hasSettings: false,
      allowedLanguages: [],
      allowedTopics: [],
      allowedChannels: [],
      allowedReligions: [],
      topicMode: "allow",
      channelMode: "allow",
      religionMode: "allow",
      maxDailyMinutes: 0
    };
  }
}

async function verifyFirebaseToken(env, token) {
  if (!env.FIREBASE_API_KEY) return null;
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + env.FIREBASE_API_KEY,
    {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ idToken: token })
    }
  );
  if (!response.ok) return null;
  const data = await response.json();
  const user = data.users && data.users[0];
  if (!user || !user.emailVerified) return null;
  return user;
}

async function upsertUser(env, firebaseUser) {
  const email = String(firebaseUser.email || "").toLowerCase();
  const uid = firebaseUser.localId || firebaseUser.uid;
  if (!email || !uid) return null;
  const existing = await env.DB.prepare(
    "SELECT * FROM users WHERE firebase_uid = ? OR email = ? LIMIT 1"
  )
    .bind(uid, email)
    .first();
  if (existing) {
    if (!existing.firebase_uid) {
      await env.DB.prepare("UPDATE users SET firebase_uid = ? WHERE id = ?")
        .bind(uid, existing.id)
        .run();
    }
    if (env.ADMIN_EMAIL && email === env.ADMIN_EMAIL && existing.role !== "admin") {
      await env.DB.prepare("UPDATE users SET role = 'admin' WHERE id = ?")
        .bind(existing.id)
        .run();
      return { ...existing, role: "admin" };
    }
    return existing;
  }
  const createdAt = nowIso();
  await env.DB.prepare(
    "INSERT INTO users (email, firebase_uid, role, plan, created_at) VALUES (?, ?, 'user', 'free', ?)"
  )
    .bind(email, uid, createdAt)
    .run();
  const created = await env.DB.prepare("SELECT * FROM users WHERE firebase_uid = ?")
    .bind(uid)
    .first();
  if (env.ADMIN_EMAIL && email === env.ADMIN_EMAIL && created.role !== "admin") {
    await env.DB.prepare("UPDATE users SET role = 'admin' WHERE id = ?")
      .bind(created.id)
      .run();
    return { ...created, role: "admin" };
  }
  return created;
}

async function auth(request, env) {
  const header = request.headers.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  const firebaseUser = await verifyFirebaseToken(env, token);
  if (!firebaseUser) return null;
  return upsertUser(env, firebaseUser);
}

function requireRole(user, role) {
  if (!user) return false;
  if (Array.isArray(role)) return role.includes(user.role);
  return user.role === role;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || env.FRONTEND_ORIGIN || "*";
    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: withCors({}, origin) });
      }
      let path = url.pathname.replace(/^\/api/, "");
      if (path.length > 1 && path.endsWith("/")) {
        path = path.slice(0, -1);
      }
      const user = await auth(request, env);
      if (!user) {
        if (path === "/firebase-config") {
          if (!env.FIREBASE_API_KEY || !env.FIREBASE_AUTH_DOMAIN || !env.FIREBASE_PROJECT_ID || !env.FIREBASE_APP_ID) {
            return jsonResponse({ error: "Firebase config missing." }, 500, withCors({}, origin));
          }
          return jsonResponse(
            {
              apiKey: env.FIREBASE_API_KEY,
              authDomain: env.FIREBASE_AUTH_DOMAIN,
              projectId: env.FIREBASE_PROJECT_ID,
              appId: env.FIREBASE_APP_ID
            },
            200,
            withCors({}, origin)
          );
        }
        return jsonResponse({ error: "Unauthorized" }, 401, withCors({}, origin));
      }

    if (path === "/me" && request.method === "GET") {
      const current = await env.DB.prepare(
        "SELECT id, email, role, plan, display_name, avatar_url, slogan, created_at FROM users WHERE id = ?"
      )
        .bind(user.id)
        .first();
      return jsonResponse({ user: current || user }, 200, withCors({}, origin));
    }

    if (path === "/profile" && request.method === "GET") {
      const current = await env.DB.prepare(
        "SELECT display_name, avatar_url, slogan FROM users WHERE id = ?"
      )
        .bind(user.id)
        .first();
      return jsonResponse({ profile: current || {} }, 200, withCors({}, origin));
    }

    if (path === "/profile" && request.method === "POST") {
      if (!requireRole(user, ["artist", "admin"])) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const displayName = String(body.displayName || "").trim();
      const slogan = String(body.slogan || "").trim();
      const avatarUrl = String(body.avatarUrl || "").trim();
      await env.DB.prepare(
        "UPDATE users SET display_name = ?, slogan = ?, avatar_url = ? WHERE id = ?"
      )
        .bind(displayName, slogan, avatarUrl, user.id)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/settings" && request.method === "GET") {
      if (user.plan !== "pro") {
        return jsonResponse({ error: "Settings available on pro plan only." }, 403, withCors({}, origin));
      }
      const data = await loadUserSettings(env, user.id);
      return jsonResponse(
        {
          settings: {
            allowed_languages: data.allowedLanguages,
            allowed_topics: data.allowedTopics,
            allowed_channels: data.allowedChannels,
            allowed_religions: data.allowedReligions,
            topic_mode: data.topicMode,
            channel_mode: data.channelMode,
            religion_mode: data.religionMode,
            max_daily_minutes: data.maxDailyMinutes
          }
        },
        200,
        withCors({}, origin)
      );
    }

    if (path === "/settings" && request.method === "POST") {
      if (user.plan !== "pro") {
        return jsonResponse({ error: "Settings available on pro plan only." }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const languages = normalizeLanguages(body.languages);
      const topics = normalizeTopics(body.topics);
      const channels = normalizeChannelIds(body.channels);
      const topicMode = body.topicMode === "block" ? "block" : body.topicMode === "off" ? "off" : "allow";
      const channelMode =
        body.channelMode === "block" ? "block" : body.channelMode === "off" ? "off" : "allow";
      const religions = normalizeAllowedReligions(body.religions || []);
      const religionMode =
        body.religionMode === "block" ? "block" : body.religionMode === "off" ? "off" : "allow";
      const maxDailyMinutes = Math.max(0, Math.min(24 * 60, parseInt(body.maxDailyMinutes || "0", 10)));
      await env.DB.prepare(
        "INSERT INTO user_settings (user_id, allowed_languages, allowed_topics, allowed_channels, allowed_religions, topic_mode, channel_mode, religion_mode, max_daily_minutes, updated_at) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
          "ON CONFLICT(user_id) DO UPDATE SET allowed_languages = excluded.allowed_languages, allowed_topics = excluded.allowed_topics, allowed_channels = excluded.allowed_channels, allowed_religions = excluded.allowed_religions, topic_mode = excluded.topic_mode, channel_mode = excluded.channel_mode, religion_mode = excluded.religion_mode, max_daily_minutes = excluded.max_daily_minutes, updated_at = excluded.updated_at"
      )
        .bind(
          user.id,
          JSON.stringify(languages),
          JSON.stringify(topics),
          JSON.stringify(channels),
          JSON.stringify(religions),
          topicMode,
          channelMode,
          religionMode,
          maxDailyMinutes,
          nowIso()
        )
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/topics" && request.method === "GET") {
      const result = await env.DB.prepare("SELECT topics FROM videos WHERE topics IS NOT NULL").all();
      const set = new Set();
      result.results.forEach((row) => {
        try {
          const topics = JSON.parse(row.topics || "[]");
          topics.forEach((topic) => set.add(String(topic).toLowerCase()));
        } catch (err) {}
      });
      return jsonResponse({ topics: Array.from(set).sort() }, 200, withCors({}, origin));
    }

    if (path === "/channels" && request.method === "GET") {
      const search = url.searchParams.get("search") || "";
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "30", 10), 100);
      const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);
      const showAll = url.searchParams.get("all") === "1";
      const settings = await loadUserSettings(env, user.id);
      const applyFilters = user.plan === "pro" && settings.hasSettings;
      const allowedChannels = settings.allowedChannels;
      const channelMode = settings.channelMode;
      let where = "WHERE users.role = 'artist'";
      const binds = [];
      if (search) {
        where += " AND (users.display_name LIKE ? OR users.slogan LIKE ?)";
        binds.push("%" + search + "%", "%" + search + "%");
      }
      if (!showAll && applyFilters && allowedChannels.length && channelMode !== "off") {
        if (allowedChannels.length) {
          const list = allowedChannels.map(() => "?").join(",");
          if (channelMode === "block") {
            where += " AND users.id NOT IN (" + list + ")";
          } else {
            where += " AND users.id IN (" + list + ")";
          }
          binds.push(...allowedChannels);
        }
      }
      const result = await env.DB.prepare(
        "SELECT users.id, users.role, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as display_name, " +
          "users.avatar_url, users.slogan, " +
          "COUNT(DISTINCT videos.id) as videos, " +
          "COUNT(DISTINCT subscriptions.channel_id) as subscribers " +
          "FROM users " +
          "LEFT JOIN videos ON users.id = videos.owner_id " +
          "LEFT JOIN subscriptions ON subscriptions.channel_id = users.id " +
          where +
          " GROUP BY users.id ORDER BY videos DESC, users.created_at DESC LIMIT ? OFFSET ?"
      )
        .bind(...binds, limit + 1, offset)
        .all();
      const subs = await env.DB.prepare("SELECT channel_id FROM subscriptions WHERE user_id = ?")
        .bind(user.id)
        .all();
      const subscribed = new Set(subs.results.map((row) => row.channel_id));
      const rows = result.results || [];
      const hasMore = rows.length > limit;
      const channels = rows.slice(0, limit).map((channel) => ({
        ...channel,
        is_subscribed: subscribed.has(channel.id)
      }));
      return jsonResponse({ channels, hasMore }, 200, withCors({}, origin));
    }

    if (path.startsWith("/channels/") && request.method === "GET") {
      const channelId = path.split("/")[2];
      const settings = await loadUserSettings(env, user.id);
      const applyFilters = user.plan === "pro" && settings.hasSettings;
      const allowedChannels = settings.allowedChannels;
      const channelMode = settings.channelMode;
      if (applyFilters && allowedChannels.length && channelMode !== "off") {
          const channelIdNum = parseInt(channelId, 10);
          const isAllowed = allowedChannels.includes(channelIdNum);
          if ((channelMode === "allow" && !isAllowed) || (channelMode === "block" && isAllowed)) {
            return jsonResponse({ error: "Channel not found." }, 404, withCors({}, origin));
          }
      }
      const channel = await env.DB.prepare(
        "SELECT users.id, users.role, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as display_name, " +
          "users.avatar_url, users.slogan, " +
          "COUNT(DISTINCT videos.id) as videos, " +
          "COUNT(DISTINCT subscriptions.channel_id) as subscribers " +
          "FROM users " +
          "LEFT JOIN videos ON users.id = videos.owner_id " +
          "LEFT JOIN subscriptions ON subscriptions.channel_id = users.id " +
          "WHERE users.id = ? AND users.role = 'artist' " +
          "GROUP BY users.id"
      )
        .bind(channelId)
        .first();
      if (!channel) return jsonResponse({ error: "Channel not found." }, 404, withCors({}, origin));
      const sub = await env.DB.prepare(
        "SELECT 1 FROM subscriptions WHERE user_id = ? AND channel_id = ?"
      )
        .bind(user.id, channelId)
        .first();
      return jsonResponse(
        { channel: { ...channel, is_subscribed: Boolean(sub) } },
        200,
        withCors({}, origin)
      );
    }

    if (path === "/users" && request.method === "GET") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const search = url.searchParams.get("search") || "";
      const role = url.searchParams.get("role") || "";
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);
      const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);
      let where = "WHERE 1=1";
      const binds = [];
      if (role) {
        where += " AND role = ?";
        binds.push(role);
      }
      if (search) {
        where += " AND (email LIKE ? OR display_name LIKE ? OR firebase_uid LIKE ?)";
        binds.push("%" + search + "%", "%" + search + "%", "%" + search + "%");
      }
      const result = await env.DB.prepare(
        "SELECT id, email, role, plan, display_name, avatar_url, firebase_uid, created_at " +
          "FROM users " +
          where +
          " ORDER BY created_at DESC LIMIT ? OFFSET ?"
      )
        .bind(...binds, limit + 1, offset)
        .all();
      const rows = result.results || [];
      const hasMore = rows.length > limit;
      return jsonResponse({ users: rows.slice(0, limit), hasMore }, 200, withCors({}, origin));
    }

    if (path === "/admin/grant-artist" && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      if (!body.userId) return jsonResponse({ error: "userId required." }, 400, withCors({}, origin));
      await env.DB.prepare("UPDATE users SET role = 'artist' WHERE id = ?")
        .bind(body.userId)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/admin/plan" && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const plan = body.plan === "pro" ? "pro" : "free";
      if (!body.userId) {
        return jsonResponse({ error: "userId required." }, 400, withCors({}, origin));
      }
      await env.DB.prepare("UPDATE users SET plan = ? WHERE id = ?")
        .bind(plan, body.userId)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/admin/role" && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      if (!body.userId) {
        return jsonResponse({ error: "userId required." }, 400, withCors({}, origin));
      }
      const nextRole = body.role === "artist" ? "artist" : "user";
      await env.DB.prepare("UPDATE users SET role = ? WHERE id = ?")
        .bind(nextRole, body.userId)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/videos" && request.method === "GET") {
      const search = url.searchParams.get("search") || "";
      const channelId = url.searchParams.get("channelId") || "";
      const onlySubscribed = url.searchParams.get("subscribed") === "1";
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "30", 10), 100);
      const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);
      const settings = await loadUserSettings(env, user.id);
      const applyFilters = user.plan === "pro" && settings.hasSettings;
      const allowedLanguages = settings.allowedLanguages;
      const allowedTopics = settings.allowedTopics;
      const topicMode = settings.topicMode;
      const allowedChannels = settings.allowedChannels;
      const channelMode = settings.channelMode;
      const allowedReligions = settings.allowedReligions;
      const religionMode = settings.religionMode;
      let where = "WHERE videos.youtube_id IS NOT NULL";
      const binds = [];
      if (onlySubscribed) {
        where += " AND videos.owner_id IN (SELECT channel_id FROM subscriptions WHERE user_id = ?)";
        binds.push(user.id);
      }
      if (channelId) {
        where += " AND videos.owner_id = ?";
        binds.push(channelId);
      }
      if (search) {
        where +=
          " AND (videos.title LIKE ? OR users.display_name LIKE ? OR EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value LIKE ?))";
        binds.push("%" + search + "%", "%" + search + "%", "%" + search + "%");
      }
      if (applyFilters && allowedChannels.length && channelMode !== "off") {
          const list = allowedChannels.map(() => "?").join(",");
          if (channelMode === "block") {
            where += " AND videos.owner_id NOT IN (" + list + ")";
          } else {
            where += " AND videos.owner_id IN (" + list + ")";
          }
          binds.push(...allowedChannels);
      }
      if (applyFilters) {
        if (allowedLanguages.length) {
          const list = allowedLanguages.map(() => "?").join(",");
          where +=
            " AND (EXISTS (SELECT 1 FROM json_each(videos.languages) WHERE value IN (" +
            list +
            ")) OR videos.language IN (" +
            list +
            "))";
          binds.push(...allowedLanguages, ...allowedLanguages);
        }
        if (allowedTopics.length && topicMode !== "off") {
          const inList = allowedTopics.map(() => "?").join(",");
          if (topicMode === "block") {
            where +=
              " AND NOT EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value IN (" + inList + "))";
          } else {
            where +=
              " AND EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value IN (" + inList + "))";
          }
          binds.push(...allowedTopics);
        }
        if (allowedReligions.length && religionMode !== "off") {
          const list = allowedReligions.map(() => "?").join(",");
          if (religionMode === "block") {
            where +=
              " AND (COALESCE(videos.religion, 'none') NOT IN (" +
              list +
              ") AND (videos.religion_detail IS NULL OR videos.religion_detail = '' OR videos.religion_detail NOT IN (" +
              list +
              ")))";
          } else {
            where +=
              " AND (COALESCE(videos.religion, 'none') IN (" +
              list +
              ") OR COALESCE(videos.religion_detail, '') IN (" +
              list +
              "))";
          }
          binds.push(...allowedReligions, ...allowedReligions);
        }
      }
      const query =
        "SELECT videos.*, " +
        "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
        "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
        "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts, " +
        "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id AND likes.user_id = ?) as liked " +
        "FROM videos JOIN users ON videos.owner_id = users.id " +
        where +
        " ORDER BY videos.created_at DESC LIMIT ? OFFSET ?";
      const result = await env.DB.prepare(query)
        .bind(user.id, ...binds, limit + 1, offset)
        .all();
      const rows = result.results || [];
      const hasMore = rows.length > limit;
      const videos = rows.slice(0, limit).map((row) => ({
        ...row,
        topics: safeJsonArray(row.topics),
        languages: safeJsonArray(row.languages)
      }));
      return jsonResponse({ videos, hasMore }, 200, withCors({}, origin));
    }

    if (path === "/videos/manage" && request.method === "GET") {
      const ownerId = url.searchParams.get("ownerId") || "";
      const search = url.searchParams.get("search") || "";
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);
      const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);
      let where = "WHERE 1=1";
      const binds = [];
      if (ownerId) {
        where += " AND videos.owner_id = ?";
        binds.push(ownerId);
      }
      if (search) {
        where += " AND (videos.title LIKE ? OR videos.youtube_url LIKE ? OR users.email LIKE ? OR users.display_name LIKE ?)";
        binds.push("%" + search + "%", "%" + search + "%", "%" + search + "%", "%" + search + "%");
      }
      const query =
        user.role === "admin"
          ? "SELECT videos.*, CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE users.email END as channel " +
            "FROM videos JOIN users ON videos.owner_id = users.id " +
            where +
            " ORDER BY videos.created_at DESC LIMIT ? OFFSET ?"
          : "SELECT videos.*, CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE users.email END as channel " +
            "FROM videos JOIN users ON videos.owner_id = users.id WHERE owner_id = ? ORDER BY videos.created_at DESC";
      const result = user.role === "admin"
        ? await env.DB.prepare(query).bind(...binds, limit + 1, offset).all()
        : await env.DB.prepare(query).bind(user.id).all();
      if (user.role !== "admin") {
        return jsonResponse({ videos: result.results || [] }, 200, withCors({}, origin));
      }
      const rows = result.results || [];
      const hasMore = rows.length > limit;
      return jsonResponse({ videos: rows.slice(0, limit), hasMore }, 200, withCors({}, origin));
    }

    if (
      path.startsWith("/videos/") &&
      request.method === "GET" &&
      !path.endsWith("/view") &&
      !path.endsWith("/like") &&
      !path.endsWith("/update")
    ) {
      const videoId = path.split("/")[2];
      if (!videoId) return jsonResponse({ error: "Video not found." }, 404, withCors({}, origin));
      const video = await env.DB.prepare(
        "SELECT videos.*, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE users.email END as channel " +
          "FROM videos JOIN users ON videos.owner_id = users.id WHERE videos.id = ? AND videos.youtube_id IS NOT NULL"
      )
        .bind(videoId)
        .first();
      if (!video) return jsonResponse({ error: "Video not found." }, 404, withCors({}, origin));
      const settings = await loadUserSettings(env, user.id);
      const applyFilters = user.plan === "pro" && settings.hasSettings;
      if (applyFilters) {
        if (
          settings.allowedLanguages.length &&
          !settings.allowedLanguages.includes((video.language || "").toLowerCase())
        ) {
          return jsonResponse({ error: "Blocked by language settings." }, 403, withCors({}, origin));
        }
        if (settings.allowedChannels.length && settings.channelMode !== "off") {
          const isAllowedChannel = settings.allowedChannels.includes(Number(video.owner_id));
          if (settings.channelMode === "allow" && !isAllowedChannel) {
            return jsonResponse({ error: "Blocked by channel settings." }, 403, withCors({}, origin));
          }
          if (settings.channelMode === "block" && isAllowedChannel) {
            return jsonResponse({ error: "Blocked by channel settings." }, 403, withCors({}, origin));
          }
        }
        if (settings.religionMode !== "off") {
          if (
            !isReligionAllowed(
              settings.allowedReligions,
              settings.religionMode,
              video.religion,
              video.religion_detail
            )
          ) {
            return jsonResponse({ error: "Blocked by religion settings." }, 403, withCors({}, origin));
          }
        }
        if (settings.allowedTopics.length && settings.topicMode !== "off") {
          const topics = safeJsonArray(video.topics).map((topic) => String(topic || "").toLowerCase());
          const hasTopic = topics.some((topic) => settings.allowedTopics.includes(topic));
          if (settings.topicMode === "allow" && !hasTopic) {
            return jsonResponse({ error: "Blocked by topic settings." }, 403, withCors({}, origin));
          }
          if (settings.topicMode === "block" && hasTopic) {
            return jsonResponse({ error: "Blocked by topic settings." }, 403, withCors({}, origin));
          }
        }
      }
      const enriched = {
        ...video,
        topics: safeJsonArray(video.topics),
        languages: safeJsonArray(video.languages)
      };
      return jsonResponse({ video: enriched }, 200, withCors({}, origin));
    }

    if (path.startsWith("/videos/") && request.method === "DELETE") {
      const videoId = path.split("/")[2];
      const video = await env.DB.prepare("SELECT owner_id, religion, religion_detail FROM videos WHERE id = ?")
        .bind(videoId)
        .first();
      if (!video) return jsonResponse({ error: "Video not found." }, 404, withCors({}, origin));
      if (user.role !== "admin" && Number(video.owner_id) !== Number(user.id)) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      await env.DB.prepare("DELETE FROM videos WHERE id = ?").bind(videoId).run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/videos/") && path.endsWith("/update") && request.method === "POST") {
      const videoId = path.split("/")[2];
      const video = await env.DB.prepare("SELECT owner_id FROM videos WHERE id = ?")
        .bind(videoId)
        .first();
      if (!video) return jsonResponse({ error: "Video not found." }, 404, withCors({}, origin));
      if (user.role !== "admin" && Number(video.owner_id) !== Number(user.id)) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const title = String(body.title || "").trim();
      const language = String(body.language || "").trim().toLowerCase();
      const languages = normalizeLanguages(body.languages || language);
      const storedLanguages = languages.length ? languages : language ? [language] : [];
      const topics = normalizeTopics(body.topics);
      const rawReligion = body.religion;
      const nextReligion = rawReligion ? normalizeReligion(rawReligion) : video.religion || "none";
      const nextReligionDetail = body.religion_detail
        ? normalizeReligionDetail(nextReligion, body.religion_detail)
        : rawReligion
        ? normalizeReligionDetail(nextReligion, rawReligion)
        : video.religion_detail || "";
      await env.DB.prepare(
        "UPDATE videos SET title = ?, language = ?, languages = ?, religion = ?, religion_detail = ?, topics = ? WHERE id = ?"
      )
        .bind(
          title || "Untitled video",
          language || "unspecified",
          JSON.stringify(storedLanguages),
          nextReligion,
          nextReligionDetail,
          JSON.stringify(topics),
          videoId
        )
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/videos" && request.method === "POST") {
      if (!requireRole(user, ["artist", "admin"])) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const youtubeUrl = body.youtubeUrl || "";
      const youtubeId = extractYouTubeId(youtubeUrl);
      if (!youtubeId) return jsonResponse({ error: "Valid YouTube URL required." }, 400, withCors({}, origin));
      const exists = await env.DB.prepare(
        "SELECT id FROM videos WHERE youtube_id = ? AND owner_id = ?"
      )
        .bind(youtubeId, user.id)
        .first();
      if (exists) {
        return jsonResponse({ error: "You already uploaded this video." }, 409, withCors({}, origin));
      }
      const meta = await fetchYouTubeMeta(env, youtubeId, youtubeUrl);
      const language = (body.language || "unspecified").toLowerCase();
      const languages = normalizeLanguages(body.languages);
      const storedLanguages = languages.length ? languages : language ? [language] : [];
      const topics = normalizeTopics(body.topics);
      const rawReligion = body.religion;
      const religion = normalizeReligion(rawReligion);
      const religionDetail = normalizeReligionDetail(religion, body.religion_detail || rawReligion);
      await env.DB.prepare(
        "INSERT INTO videos (title, youtube_url, youtube_id, owner_id, views, duration, language, languages, religion, religion_detail, topics, created_at) " +
          "VALUES (?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?)"
      )
        .bind(
          meta.title,
          youtubeUrl,
          youtubeId,
          user.id,
          meta.duration || 0,
          language,
          JSON.stringify(storedLanguages),
          religion,
          religionDetail,
          JSON.stringify(topics),
          nowIso()
        )
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/videos/") && path.endsWith("/view") && request.method === "POST") {
      const videoId = path.split("/")[2];
      await env.DB.prepare("UPDATE videos SET views = views + 1 WHERE id = ?").bind(videoId).run();
      if (user.plan === "pro") {
        const settings = await loadUserSettings(env, user.id);
        const maxMinutes = settings.maxDailyMinutes || 0;
        if (maxMinutes > 0) {
          const now = new Date();
          const start = new Date(now);
          start.setHours(0, 0, 0, 0);
          const end = new Date(now);
          end.setHours(23, 59, 59, 999);
          const used = await env.DB.prepare(
            "SELECT COALESCE(SUM(watch_seconds), 0) as used FROM view_history WHERE user_id = ? AND watched_at BETWEEN ? AND ?"
          )
            .bind(user.id, start.toISOString(), end.toISOString())
            .first();
          if ((used?.used || 0) >= maxMinutes * 60) {
            return jsonResponse({ error: "Daily watch limit reached." }, 403, withCors({}, origin));
          }
        }
        const video = await env.DB.prepare("SELECT duration FROM videos WHERE id = ?")
          .bind(videoId)
          .first();
        await env.DB.prepare(
          "INSERT INTO view_history (user_id, video_id, watched_at, watch_seconds) VALUES (?, ?, ?, ?)"
        )
          .bind(user.id, videoId, nowIso(), video?.duration || 0)
          .run();
      }
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/videos/") && path.endsWith("/like") && request.method === "POST") {
      const videoId = path.split("/")[2];
      const existing = await env.DB.prepare(
        "SELECT 1 FROM likes WHERE user_id = ? AND video_id = ?"
      )
        .bind(user.id, videoId)
        .first();
      if (existing) {
        await env.DB.prepare("DELETE FROM likes WHERE user_id = ? AND video_id = ?")
          .bind(user.id, videoId)
          .run();
      } else {
        await env.DB.prepare("INSERT INTO likes (user_id, video_id, created_at) VALUES (?, ?, ?)")
          .bind(user.id, videoId, nowIso())
          .run();
      }
      const count = await env.DB.prepare("SELECT COUNT(*) as hearts FROM likes WHERE video_id = ?")
        .bind(videoId)
        .first();
      return jsonResponse(
        { hearts: count?.hearts || 0, liked: !existing },
        200,
        withCors({}, origin)
      );
    }

    if (path === "/subscriptions" && request.method === "GET") {
      const subs = await env.DB.prepare(
        "SELECT users.id, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as display_name, " +
          "users.avatar_url, " +
          "(SELECT COUNT(*) FROM subscriptions subs WHERE subs.channel_id = users.id) as subscribers " +
          "FROM subscriptions JOIN users ON subscriptions.channel_id = users.id WHERE subscriptions.user_id = ? " +
          "ORDER BY subscriptions.created_at DESC"
      )
        .bind(user.id)
        .all();
      return jsonResponse({ subscriptions: subs.results || [] }, 200, withCors({}, origin));
    }

    if (path.startsWith("/subscriptions/") && request.method === "POST") {
      const channelId = path.split("/")[2];
      const existing = await env.DB.prepare(
        "SELECT 1 FROM subscriptions WHERE user_id = ? AND channel_id = ?"
      )
        .bind(user.id, channelId)
        .first();
      if (existing) {
        await env.DB.prepare("DELETE FROM subscriptions WHERE user_id = ? AND channel_id = ?")
          .bind(user.id, channelId)
          .run();
      } else {
        await env.DB.prepare(
          "INSERT INTO subscriptions (user_id, channel_id, created_at) VALUES (?, ?, ?)"
        )
          .bind(user.id, channelId, nowIso())
          .run();
      }
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/notifications" && request.method === "GET") {
      const result = await env.DB.prepare(
        "SELECT id, message, created_at, read_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC"
      )
        .bind(user.id)
        .all();
      return jsonResponse({ notifications: result.results || [] }, 200, withCors({}, origin));
    }

    if (path === "/requests" && request.method === "POST") {
      const body = await parseJson(request);
      const { reason, details, contact } = body || {};
      if (!reason || !details || !contact) {
        return jsonResponse({ error: "reason, details, contact required" }, 400, withCors({}, origin));
      }
      await env.DB.prepare(
        "INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, ?)"
      )
        .bind(user.id, `[REQUEST:${reason}] ${details} | contact: ${contact}`, nowIso())
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/notifications/") && path.endsWith("/read") && request.method === "POST") {
      const id = path.split("/")[2];
      await env.DB.prepare("UPDATE notifications SET read_at = ? WHERE id = ? AND user_id = ?")
        .bind(nowIso(), id, user.id)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/reports" && request.method === "POST") {
      const body = await parseJson(request);
      if (!body.videoId || !body.reason || String(body.reason).trim().length < 5) {
        return jsonResponse({ error: "Reason required (min 5 chars)." }, 400, withCors({}, origin));
      }
      await env.DB.prepare(
        "INSERT INTO reports (video_id, reporter_id, reason, created_at) VALUES (?, ?, ?, ?)"
      )
        .bind(body.videoId, user.id, String(body.reason).trim(), nowIso())
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/reports" && request.method === "GET") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const result = await env.DB.prepare(
        "SELECT reports.id, reports.reason, reports.status, reports.created_at, " +
          "videos.id as video_id, videos.title as video_title, users.email as reporter " +
          "FROM reports JOIN videos ON reports.video_id = videos.id " +
          "JOIN users ON reports.reporter_id = users.id " +
          "ORDER BY reports.created_at DESC"
      ).all();
      return jsonResponse({ reports: result.results || [] }, 200, withCors({}, origin));
    }

    if (path.startsWith("/reports/") && path.endsWith("/resolve") && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const reportId = path.split("/")[2];
      const body = await parseJson(request);
      const report = await env.DB.prepare("SELECT reporter_id FROM reports WHERE id = ?")
        .bind(reportId)
        .first();
      if (!report) return jsonResponse({ error: "Report not found." }, 404, withCors({}, origin));
      await env.DB.prepare("UPDATE reports SET status = 'resolved', resolved_at = ? WHERE id = ?")
        .bind(nowIso(), reportId)
        .run();
      if (body.message && String(body.message).trim()) {
        await env.DB.prepare(
          "INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, ?)"
        )
          .bind(report.reporter_id, String(body.message).trim(), nowIso())
          .run();
      }
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/history" && request.method === "GET") {
      if (user.plan !== "pro") {
        return jsonResponse({ error: "History available on pro plan only." }, 403, withCors({}, origin));
      }
      const day = url.searchParams.get("day") || "";
      const date = day ? new Date(day) : new Date();
      if (Number.isNaN(date.getTime())) {
        return jsonResponse({ error: "Invalid day." }, 400, withCors({}, origin));
      }
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      const result = await env.DB.prepare(
        "SELECT view_history.watched_at, videos.title, videos.youtube_id, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel " +
          "FROM view_history JOIN videos ON view_history.video_id = videos.id " +
          "JOIN users ON videos.owner_id = users.id " +
          "WHERE view_history.user_id = ? AND view_history.watched_at BETWEEN ? AND ? " +
          "ORDER BY view_history.watched_at DESC"
      )
        .bind(user.id, start.toISOString(), end.toISOString())
        .all();
      return jsonResponse({ history: result.results || [] }, 200, withCors({}, origin));
    }

    if (path === "/viral" && request.method === "GET") {
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "8", 10), 20);
      const settings = await loadUserSettings(env, user.id);
      const applyFilters = user.plan === "pro" && settings.hasSettings;
      const allowedLanguages = settings.allowedLanguages;
      const allowedTopics = settings.allowedTopics;
      const topicMode = settings.topicMode;
      const allowedChannels = settings.allowedChannels;
      const channelMode = settings.channelMode;
      const allowedReligions = settings.allowedReligions;
      const religionMode = settings.religionMode;
      let where = "WHERE videos.youtube_id IS NOT NULL";
      const binds = [];
      if (applyFilters && allowedChannels.length && channelMode !== "off") {
          const list = allowedChannels.map(() => "?").join(",");
          if (channelMode === "block") {
            where += " AND videos.owner_id NOT IN (" + list + ")";
          } else {
            where += " AND videos.owner_id IN (" + list + ")";
          }
          binds.push(...allowedChannels);
      }
      if (applyFilters) {
        if (allowedLanguages.length) {
          const list = allowedLanguages.map(() => "?").join(",");
          where +=
            " AND (EXISTS (SELECT 1 FROM json_each(videos.languages) WHERE value IN (" +
            list +
            ")) OR videos.language IN (" +
            list +
            "))";
          binds.push(...allowedLanguages, ...allowedLanguages);
        }
        if (allowedTopics.length && topicMode !== "off") {
          const inList = allowedTopics.map(() => "?").join(",");
          if (topicMode === "block") {
            where +=
              " AND NOT EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value IN (" + inList + "))";
          } else {
            where +=
              " AND EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value IN (" + inList + "))";
          }
          binds.push(...allowedTopics);
        }
        if (allowedReligions.length && religionMode !== "off") {
          const list = allowedReligions.map(() => "?").join(",");
          if (religionMode === "block") {
            where +=
              " AND (COALESCE(videos.religion, 'none') NOT IN (" +
              list +
              ") AND (videos.religion_detail IS NULL OR videos.religion_detail = '' OR videos.religion_detail NOT IN (" +
              list +
              ")))";
          } else {
            where +=
              " AND (COALESCE(videos.religion, 'none') IN (" +
              list +
              ") OR COALESCE(videos.religion_detail, '') IN (" +
              list +
              "))";
          }
          binds.push(...allowedReligions, ...allowedReligions);
        }
      }
      const result = await env.DB.prepare(
        "SELECT videos.*, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
          "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
          "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts " +
          "FROM videos JOIN users ON videos.owner_id = users.id " +
          where +
          " ORDER BY videos.views DESC, hearts DESC LIMIT ?"
      )
        .bind(...binds, limit)
        .all();
      const videos = (result.results || []).map((row) => ({
        ...row,
        topics: safeJsonArray(row.topics),
        languages: safeJsonArray(row.languages)
      }));
      return jsonResponse({ videos }, 200, withCors({}, origin));
    }

    if (path === "/stats" && request.method === "GET") {
      const totals = await env.DB.prepare(
        "SELECT COUNT(*) as videos, COALESCE(SUM(views), 0) as views FROM videos"
      ).first();
      if (user.role === "admin") {
        const usersCount = await env.DB.prepare("SELECT COUNT(*) as users FROM users").first();
        const artistsCount = await env.DB.prepare(
          "SELECT COUNT(*) as artists FROM users WHERE role = 'artist'"
        ).first();
        const artists = await env.DB.prepare(
          "SELECT users.id, " +
            "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE users.email END as email, " +
            "COUNT(videos.id) as videos, COALESCE(SUM(videos.views), 0) as views " +
            "FROM users LEFT JOIN videos ON users.id = videos.owner_id WHERE users.role = 'artist' " +
            "GROUP BY users.id ORDER BY views DESC"
        ).all();
        return jsonResponse(
          {
            totals: {
              videos: totals?.videos || 0,
              views: totals?.views || 0,
              users: usersCount?.users || 0,
              artists: artistsCount?.artists || 0
            },
            artists: artists.results || []
          },
          200,
          withCors({}, origin)
        );
      }
      const owned = await env.DB.prepare(
        "SELECT COUNT(*) as videos, COALESCE(SUM(views), 0) as views FROM videos WHERE owner_id = ?"
      )
        .bind(user.id)
        .first();
      return jsonResponse(
        { totals: { videos: owned?.videos || 0, views: owned?.views || 0 }, artists: [] },
        200,
        withCors({}, origin)
      );
    }

    if (path === "/admin/export-sql" && request.method === "GET") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const result = await env.DB.prepare(
        "SELECT youtube_url, language, languages, religion, religion_detail, topics FROM videos ORDER BY created_at DESC"
      ).all();
      const lines = (result.results || []).map((row) => {
        const safeUrl = String(row.youtube_url || "").replace(/'/g, "''");
        const safeLanguage = String(row.language || "unspecified").replace(/'/g, "''");
        let languages = safeLanguage ? [safeLanguage] : [];
        if (row.languages) {
          try {
            languages = JSON.parse(row.languages);
          } catch (err) {
            languages = safeLanguage ? [safeLanguage] : [];
          }
        }
        const safeLanguages = JSON.stringify(languages).replace(/'/g, "''");
        const topics = row.topics ? JSON.parse(row.topics).join("|") : "";
        const safeTopics = String(topics).replace(/'/g, "''");
        const safeReligion = String(row.religion || "none").replace(/'/g, "''");
        const safeReligionDetail = String(row.religion_detail || "").replace(/'/g, "''");
        return (
          "INSERT INTO videos (youtube_url, language, languages, religion, religion_detail, topics) VALUES ('" +
          safeUrl +
          "', '" +
          safeLanguage +
          "', '" +
          safeLanguages +
          "', '" +
          safeReligion +
          "', '" +
          safeReligionDetail +
          "', '" +
          safeTopics +
          "');"
        );
      });
      const content = lines.join("\n");
      if (env.R2) {
        const key = "exports/videos-" + Date.now() + ".sql";
        await env.R2.put(key, content, { httpMetadata: { contentType: "text/plain" } });
      }
      return textResponse(content, 200, withCors({ "Content-Disposition": "attachment; filename=\"videos.sql\"" }, origin));
    }

    if (path === "/admin/import-csv" && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      if (!body.csv) return jsonResponse({ error: "CSV text required." }, 400, withCors({}, origin));
      const rows = parseCsv(body.csv);
      const inserted = [];
      const skipped = [];
      for (const row of rows) {
        const youtubeUrl = row.youtube_url || row.url || "";
        const youtubeId = extractYouTubeId(youtubeUrl);
        if (!youtubeId) {
          skipped.push({ youtubeUrl, reason: "Invalid URL" });
          continue;
        }
        const exists = await env.DB.prepare("SELECT id FROM videos WHERE youtube_id = ?")
          .bind(youtubeId)
          .first();
        if (exists) {
          skipped.push({ youtubeUrl, reason: "Already exists" });
          continue;
        }
        const meta = await fetchYouTubeMeta(env, youtubeId, youtubeUrl);
        const languages = normalizeLanguages(row.languages || row.language || row.lang);
        const language =
          languages[0] || String(row.language || row.lang || "unspecified").toLowerCase();
        const storedLanguages = languages.length ? languages : language ? [language] : [];
        const topics = normalizeTopics(row.topics || "");
        const religion = normalizeReligion(row.religion || row.faith);
        const religionDetail = normalizeReligionDetail(
          religion,
          row.religion_detail || row.faith_detail || row.religion || row.faith
        );
        const result = await env.DB.prepare(
          "INSERT INTO videos (title, youtube_url, youtube_id, owner_id, views, duration, language, languages, religion, religion_detail, topics, created_at) " +
            "VALUES (?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?)"
        )
          .bind(
            meta.title,
            youtubeUrl,
            youtubeId,
            user.id,
            meta.duration || 0,
            language,
            JSON.stringify(storedLanguages),
            religion,
            religionDetail,
            JSON.stringify(topics),
            nowIso()
          )
          .run();
        inserted.push(result.meta.last_row_id);
      }
      return jsonResponse({ inserted: inserted.length, skipped }, 200, withCors({}, origin));
    }

    if (path === "/admin/import-sql" && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      if (!body.sql) return jsonResponse({ error: "SQL text required." }, 400, withCors({}, origin));
      const rows = parseSqlInserts(body.sql);
      const inserted = [];
      const skipped = [];
      for (const row of rows) {
        const youtubeUrl = row.youtube_url || row.url || "";
        const youtubeId = extractYouTubeId(youtubeUrl);
        if (!youtubeId) {
          skipped.push({ youtubeUrl, reason: "Invalid URL" });
          continue;
        }
        const exists = await env.DB.prepare("SELECT id FROM videos WHERE youtube_id = ?")
          .bind(youtubeId)
          .first();
        if (exists) {
          skipped.push({ youtubeUrl, reason: "Already exists" });
          continue;
        }
        const meta = await fetchYouTubeMeta(env, youtubeId, youtubeUrl);
        const languages = normalizeLanguages(row.languages || row.language || row.lang);
        const language =
          languages[0] || String(row.language || row.lang || "unspecified").toLowerCase();
        const storedLanguages = languages.length ? languages : language ? [language] : [];
        const topics = normalizeTopics(row.topics || "");
        const religion = normalizeReligion(row.religion || row.faith);
        const religionDetail = normalizeReligionDetail(
          religion,
          row.religion_detail || row.faith_detail || row.religion || row.faith
        );
        const result = await env.DB.prepare(
          "INSERT INTO videos (title, youtube_url, youtube_id, owner_id, views, duration, language, languages, religion, religion_detail, topics, created_at) " +
            "VALUES (?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?)"
        )
          .bind(
            meta.title,
            youtubeUrl,
            youtubeId,
            user.id,
            meta.duration || 0,
            language,
            JSON.stringify(storedLanguages),
            religion,
            religionDetail,
            JSON.stringify(topics),
            nowIso()
          )
          .run();
        inserted.push(result.meta.last_row_id);
      }
      return jsonResponse({ inserted: inserted.length, skipped }, 200, withCors({}, origin));
    }

      return jsonResponse({ error: "Not found" }, 404, withCors({}, origin));
    } catch (err) {
      const message = err && err.message ? String(err.message) : "Unknown error";
      console.error("Worker error", {
        path: url.pathname,
        method: request.method,
        message,
        stack: err && err.stack ? String(err.stack) : ""
      });
      if (message.toLowerCase().includes("no such table")) {
        return jsonResponse({ error: "Database not ready. Run migrations." }, 500, withCors({}, origin));
      }
      return jsonResponse({ error: "Server error." }, 500, withCors({}, origin));
    }
  }
};
