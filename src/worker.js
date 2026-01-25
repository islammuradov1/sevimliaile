const JSON_HEADERS = { "Content-Type": "application/json" };
const SCHEMA_TTL_MS = 5 * 60 * 1000;
const schemaCache = {};
const GAME_REWARDS = {
  memory: 12,
  find: 6,
  math: 2
};
const GAME_DAILY_LIMIT = 5;
const GAME_DAILY_POINT_LIMIT = 120;
const GAME_MIN_INTERVAL_MS = 1200;
const PRO_REDEEM_COST = 500;
const PRO_REDEEM_DAYS = 30;
const gameWinBuckets = new Map();

async function getTableColumns(env, table) {
  const cached = schemaCache[table];
  const now = Date.now();
  if (cached && now - cached.checkedAt < SCHEMA_TTL_MS) {
    return cached.columns;
  }
  try {
    const result = await env.DB.prepare(`PRAGMA table_info(${table})`).all();
    const columns = new Set((result.results || []).map((row) => row.name));
    schemaCache[table] = { columns, checkedAt: now };
    return columns;
  } catch (err) {
    return new Set();
  }
}

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
    "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH,OPTIONS",
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

function startOfTodayIso() {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  return now.toISOString();
}

function sanitizeUrl(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "";
    }
    return url.toString();
  } catch (err) {
    return "";
  }
}

function parseLimitInt(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) {
    return null;
  }
  return Math.floor(num);
}

function parseEndDate(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return null;
  }
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    date.setHours(23, 59, 59, 999);
  }
  return date.toISOString();
}

function parseWatchSeconds(value) {
  const hours = Number(value);
  if (!Number.isFinite(hours) || hours <= 0) {
    return null;
  }
  return Math.round(hours * 3600);
}

function adLimitReached(ad, nowMs) {
  if (ad.end_date) {
    const endMs = new Date(ad.end_date).getTime();
    if (Number.isFinite(endMs) && endMs <= nowMs) {
      return true;
    }
  }
  if (ad.max_views && Number(ad.views || 0) >= Number(ad.max_views)) {
    return true;
  }
  if (ad.max_unique_views && Number(ad.kids || 0) >= Number(ad.max_unique_views)) {
    return true;
  }
  if (ad.max_watch_seconds && Number(ad.watch_seconds || 0) >= Number(ad.max_watch_seconds)) {
    return true;
  }
  return false;
}

function isPngUrl(value) {
  if (!value) return false;
  return /\.png($|[?#])/i.test(String(value));
}

function isProActive(expiresAt) {
  if (!expiresAt) return false;
  const expiry = new Date(expiresAt);
  return Number.isFinite(expiry.getTime()) && expiry.getTime() > Date.now();
}

function effectivePlan(user) {
  if (user && user.plan === "pro") return "pro";
  if (user && isProActive(user.pro_expires_at)) return "pro";
  return "free";
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

const HISTORY_RETENTION_DAYS = 30;
const INTEREST_LIMIT = 14;
const RELIGION_DETAILS = new Set(Object.keys(RELIGION_DETAIL_BASE));
const RELIGION_LABELS = {
  none: "No religion",
  islam: "Islam",
  christian: "Christian",
  jews: "Jews",
  buddist: "Buddist",
  shia: "Shia",
  sunni: "Sunni",
  catholic: "Catholic",
  orthodox: "Orthodox",
  protestant: "Protestant",
  jews_orthodox: "Orthodox",
  jews_conservative: "Conservative",
  jews_reform: "Reform",
  buddist_theravada: "Theravada",
  buddist_mahayana: "Mahayana",
  buddist_vajrayana: "Vajrayana"
};

let religionCatalogCache = { loadedAt: 0 };

function resetReligionCatalogCache() {
  religionCatalogCache.loadedAt = 0;
}

async function hydrateReligionCatalog(env) {
  if (!env || !env.DB) return;
  const now = Date.now();
  if (religionCatalogCache.loadedAt && now - religionCatalogCache.loadedAt < 5 * 60 * 1000) {
    return;
  }
  try {
    const result = await env.DB.prepare(
      "SELECT base, detail, label FROM religion_categories"
    ).all();
    const rows = result.results || [];
    if (!rows.length) {
      religionCatalogCache.loadedAt = now;
      return;
    }
    rows.forEach((row) => {
      const base = String(row.base || "").trim().toLowerCase();
      const detail = row.detail ? String(row.detail).trim().toLowerCase() : "";
      if (base) {
        RELIGION_BASES.add(base);
      }
      if (detail) {
        RELIGION_DETAILS.add(detail);
        RELIGION_DETAIL_BASE[detail] = base || RELIGION_DETAIL_BASE[detail] || "";
      }
      if (row.label) {
        RELIGION_LABELS[detail || base] = String(row.label);
      }
    });
    religionCatalogCache.loadedAt = now;
  } catch (err) {
    religionCatalogCache.loadedAt = now;
  }
}

function buildDefaultReligionCatalog() {
  const items = [];
  RELIGION_BASES.forEach((base) => {
    const label = RELIGION_LABELS[base] || base;
    items.push({ base, detail: null, label, active: 1, sort_order: 0 });
  });
  Object.keys(RELIGION_DETAIL_BASE).forEach((detail) => {
    const base = RELIGION_DETAIL_BASE[detail];
    const label = RELIGION_LABELS[detail] || detail;
    items.push({ base, detail, label, active: 1, sort_order: 0 });
  });
  return items;
}

function parseList(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((item) => String(item || "").trim()).filter(Boolean);
  }
  const raw = String(input || "").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item || "").trim()).filter(Boolean);
      }
    } catch (err) {
      return [];
    }
  }
  return raw
    .split(/[|,]/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeReligion(input) {
  if (!input || typeof input !== "string") return "none";
  const value = input.trim().toLowerCase();
  if (RELIGION_BASES.has(value)) return value;
  return RELIGION_DETAIL_BASE[value] || "none";
}

function normalizeReligionDetail(religion, detail) {
  if (!detail || typeof detail !== "string") return "";
  const value = detail.trim().toLowerCase();
  const base = RELIGION_DETAIL_BASE[value];
  if (!base) return "";
  if (!religion || religion === "none") return value;
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
    if (!RELIGION_DETAILS.has(entry) || seen.has(entry)) return;
    result.push(entry);
    seen.add(entry);
  });
  return result;
}

function normalizeAllowedReligions(values) {
  if (!Array.isArray(values)) return [];
  const allowed = [];
  const seen = new Set();
  values.forEach((value) => {
    const v = String(value || "").trim().toLowerCase();
    if ((RELIGION_BASES.has(v) || RELIGION_DETAILS.has(v)) && !seen.has(v)) {
      allowed.push(v);
      seen.add(v);
    }
  });
  if (allowed.includes("none") && allowed.length > 1) {
    return allowed.filter((value) => value !== "none");
  }
  return allowed;
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
    if (!detailBase) continue;
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

function isReligionAllowed(allowedList, mode, religion, detail, religions, religionDetails) {
  if (mode === "off") return true;
  if (!allowedList || !allowedList.length) return true;
  const normalizedAllowed = normalizeAllowedReligions(allowedList);
  const { bases, details } = normalizeReligionArrays(
    religions,
    religionDetails,
    religion,
    detail
  );
  const tokens = new Set([...bases, ...details].map((value) => String(value).toLowerCase()));
  const matches = normalizedAllowed.some((value) => tokens.has(String(value).toLowerCase()));
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
  const regex = /INSERT\s+INTO\s+videos\s*\(([^)]+)\)\s*VALUES\s*/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const columns = match[1]
      .split(",")
      .map((col) => col.trim().replace(/["`]/g, "").toLowerCase());
    let current = "";
    let currentTuple = null;
    let inString = false;
    let depth = 0;
    const startIndex = regex.lastIndex;
    for (let i = startIndex; i <= text.length; i++) {
      const ch = text[i] || "";
      const next = text[i + 1];
      if (ch === "'" && next === "'" && inString) {
        current += "'";
        i += 1;
        continue;
      }
      if (ch === "'") {
        inString = !inString;
        continue;
      }
      if (!inString) {
        if (ch === "(") {
          depth += 1;
          if (depth === 1) {
            currentTuple = [];
            current = "";
            continue;
          }
        }
        if (ch === ")") {
          if (depth === 1 && currentTuple) {
            currentTuple.push(current.trim());
            const row = {};
            columns.forEach((column, index) => {
              row[column] = currentTuple[index] || "";
            });
            rows.push(row);
            currentTuple = null;
            current = "";
          }
          depth = Math.max(depth - 1, 0);
          continue;
        }
        if (depth === 1 && ch === ",") {
          if (currentTuple) {
            currentTuple.push(current.trim());
          }
          current = "";
          continue;
        }
        if (depth === 0) {
          if (ch === ";") {
            regex.lastIndex = i + 1;
            break;
          }
          if (/i/i.test(ch) && text.slice(i).match(/^insert\s+into\s+videos/i)) {
            regex.lastIndex = i;
            break;
          }
        }
      }
      if (depth >= 1) {
        current += ch;
      }
    }
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

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function normalizeDurationValue(value, fallback = 0) {
  if (value === null || value === undefined || value === "") {
    return Number.isFinite(fallback) ? Math.max(0, Math.floor(fallback)) : 0;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.floor(value));
  }
  const text = String(value || "").trim();
  if (!text) {
    return Number.isFinite(fallback) ? Math.max(0, Math.floor(fallback)) : 0;
  }
  if (/^\d+$/.test(text)) {
    return Math.max(0, parseInt(text, 10));
  }
  const parts = text.split(":").map((part) => parseInt(part, 10));
  if (parts.some((part) => Number.isNaN(part))) {
    return Number.isFinite(fallback) ? Math.max(0, Math.floor(fallback)) : 0;
  }
  let total = 0;
  if (parts.length === 2) {
    total = parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    total = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else {
    return Number.isFinite(fallback) ? Math.max(0, Math.floor(fallback)) : 0;
  }
  return Math.max(0, total);
}

function normalizeVisibility(value, fallback = "public") {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "hidden") {
    return "hidden";
  }
  if (normalized === "public") {
    return "public";
  }
  return fallback;
}

function normalizeTextField(value, maxLength) {
  if (value === null || value === undefined) {
    return "";
  }
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }
  if (!Number.isFinite(maxLength)) {
    return text;
  }
  return text.slice(0, Math.max(0, maxLength));
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
  if (!duration) {
    const watchUrl = "https://www.youtube.com/watch?v=" + youtubeId + "&hl=en";
    const response = await fetch(watchUrl);
    if (response.ok) {
      const html = await response.text();
      const secondsMatch = html.match(/"lengthSeconds":"(\d+)"/);
      if (secondsMatch) {
        duration = parseInt(secondsMatch[1], 10) || 0;
      } else {
        const msMatch = html.match(/"approxDurationMs":"(\d+)"/);
        if (msMatch) {
          duration = Math.round(parseInt(msMatch[1], 10) / 1000) || 0;
        }
      }
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

function isUsableTitle(title) {
  const value = String(title || "").trim();
  return value && value.toLowerCase() !== "untitled video";
}

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

async function isRateLimited(env, table, column, userId, windowSeconds) {
  if (!env || !env.DB) return false;
  const row = await env.DB.prepare(
    "SELECT created_at FROM " + table + " WHERE " + column + " = ? ORDER BY created_at DESC LIMIT 1"
  )
    .bind(userId)
    .first();
  if (!row || !row.created_at) return false;
  const last = Date.parse(row.created_at);
  if (!Number.isFinite(last)) return false;
  return Date.now() - last < windowSeconds * 1000;
}

function tokenizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f\u0400-\u04ff\u4e00-\u9fff\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3);
}

function normalizeInterestToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .slice(0, 40);
}

async function pruneHistory(env) {
  const cutoff = new Date(Date.now() - HISTORY_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  await env.DB.prepare("DELETE FROM view_history WHERE watched_at < ?")
    .bind(cutoff.toISOString())
    .run();
}

async function loadUserInterests(env, userId) {
  try {
    const row = await env.DB.prepare(
      "SELECT interest, score, updated_at FROM user_interests WHERE user_id = ? ORDER BY score DESC, updated_at DESC"
    )
      .bind(userId)
      .all();
    return row.results || [];
  } catch (err) {
    return [];
  }
}

async function updateUserInterests(env, userId, topics, title) {
  if (!env || !env.DB || !userId) {
    return;
  }
  const values = Array.isArray(topics) ? topics : safeJsonArray(topics);
  let interestTokens = values
    .map((topic) => normalizeInterestToken(topic))
    .filter(Boolean);
  if (!interestTokens.length) {
    interestTokens = tokenizeText(title).map((token) => normalizeInterestToken(token));
  }
  if (!interestTokens.length) {
    return;
  }
  const now = nowIso();
  const unique = Array.from(new Set(interestTokens)).slice(0, INTEREST_LIMIT);
  for (const interest of unique) {
    try {
      await env.DB.prepare(
        "INSERT INTO user_interests (user_id, interest, score, created_at, updated_at) VALUES (?, ?, ?, ?, ?) " +
          "ON CONFLICT(user_id, interest) DO UPDATE SET score = score + 1, updated_at = excluded.updated_at"
      )
        .bind(userId, interest, 1, now, now)
        .run();
    } catch (err) {
      return;
    }
  }
  try {
    const all = await env.DB.prepare(
      "SELECT interest FROM user_interests WHERE user_id = ? ORDER BY score DESC, updated_at DESC"
    )
      .bind(userId)
      .all();
    const list = (all.results || []).map((row) => row.interest);
    if (list.length > INTEREST_LIMIT) {
      const toRemove = list.slice(INTEREST_LIMIT);
      const placeholders = toRemove.map(() => "?").join(",");
      await env.DB.prepare(
        "DELETE FROM user_interests WHERE user_id = ? AND interest IN (" + placeholders + ")"
      )
        .bind(userId, ...toRemove)
        .run();
    }
  } catch (err) {
    return;
  }
}

async function loadUserSettings(env, userId) {
  try {
    const columns = await getTableColumns(env, "user_settings");
    const select = ["allowed_languages", "allowed_topics", "topic_mode"];
    const hasChannels = columns.has("allowed_channels");
    const hasChannelMode = columns.has("channel_mode");
    const hasReligions = columns.has("allowed_religions");
    const hasReligionMode = columns.has("religion_mode");
    const hasMaxDaily = columns.has("max_daily_minutes");
    if (hasChannels) select.push("allowed_channels");
    if (hasChannelMode) select.push("channel_mode");
    if (hasReligions) select.push("allowed_religions");
    if (hasReligionMode) select.push("religion_mode");
    if (hasMaxDaily) select.push("max_daily_minutes");
    const settings = await env.DB.prepare(
      "SELECT " + select.join(", ") + " FROM user_settings WHERE user_id = ?"
    )
      .bind(userId)
      .first();
    return {
      hasSettings: Boolean(settings),
      allowedLanguages: safeJsonArray(settings?.allowed_languages),
      allowedTopics: safeJsonArray(settings?.allowed_topics),
      allowedChannels: hasChannels ? safeJsonArray(settings?.allowed_channels) : [],
      allowedReligions: hasReligions
        ? normalizeAllowedReligions(safeJsonArray(settings?.allowed_religions))
        : [],
      topicMode: settings?.topic_mode || "allow",
      channelMode: hasChannelMode ? settings?.channel_mode || "allow" : "off",
      religionMode: hasReligionMode ? settings?.religion_mode || "allow" : "off",
      maxDailyMinutes: hasMaxDaily ? settings?.max_daily_minutes || 0 : 0
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

function buildVideoFilters(settings, applyFilters, videoColumns) {
  let where =
    "WHERE videos.youtube_id IS NOT NULL " +
    "AND LENGTH(videos.youtube_id) = 11 " +
    "AND COALESCE(NULLIF(TRIM(videos.title), ''), '') <> 'Untitled video'";
  const binds = [];
  if (videoColumns.has("visibility")) {
    where += " AND COALESCE(videos.visibility, 'public') = 'public'";
  }
  if (applyFilters && settings.allowedChannels.length && settings.channelMode !== "off") {
    const list = settings.allowedChannels.map(() => "?").join(",");
    if (settings.channelMode === "block") {
      where += " AND videos.owner_id NOT IN (" + list + ")";
    } else {
      where += " AND videos.owner_id IN (" + list + ")";
    }
    binds.push(...settings.allowedChannels);
  }
  if (applyFilters) {
    if (settings.allowedLanguages.length) {
      const list = settings.allowedLanguages.map(() => "?").join(",");
      where +=
        " AND (EXISTS (SELECT 1 FROM json_each(videos.languages) WHERE value IN (" +
        list +
        ")) OR videos.language IN (" +
        list +
        "))";
      binds.push(...settings.allowedLanguages, ...settings.allowedLanguages);
    }
    if (settings.allowedTopics.length && settings.topicMode !== "off") {
      const inList = settings.allowedTopics.map(() => "?").join(",");
      if (settings.topicMode === "block") {
        where +=
          " AND NOT EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value IN (" + inList + "))";
      } else {
        where +=
          " AND EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value IN (" + inList + "))";
      }
      binds.push(...settings.allowedTopics);
    }
    if (settings.allowedReligions.length && settings.religionMode !== "off") {
      const list = settings.allowedReligions.map(() => "?").join(",");
      const clauses = [];
      let repeats = 0;
      if (videoColumns.has("religions")) {
        clauses.push(
          "EXISTS (SELECT 1 FROM json_each(videos.religions) WHERE value IN (" + list + "))"
        );
        repeats += 1;
      }
      if (videoColumns.has("religion_details")) {
        clauses.push(
          "EXISTS (SELECT 1 FROM json_each(videos.religion_details) WHERE value IN (" + list + "))"
        );
        repeats += 1;
      }
      if (videoColumns.has("religion")) {
        clauses.push("COALESCE(videos.religion, 'none') IN (" + list + ")");
        repeats += 1;
      }
      if (videoColumns.has("religion_detail")) {
        clauses.push("COALESCE(videos.religion_detail, '') IN (" + list + ")");
        repeats += 1;
      }
      if (clauses.length) {
        where +=
          (settings.religionMode === "block" ? " AND NOT (" : " AND (") +
          clauses.join(" OR ") +
          ")";
        for (let i = 0; i < repeats; i += 1) {
          binds.push(...settings.allowedReligions);
        }
      }
    }
  }
  return { where, binds };
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
        if (path === "/religions" && request.method === "GET") {
          await hydrateReligionCatalog(env);
          const result = await env.DB.prepare(
            "SELECT id, base, detail, label, active, sort_order FROM religion_categories WHERE active = 1 ORDER BY sort_order ASC, label ASC"
          )
            .all()
            .catch(() => null);
          const rows = result && result.results ? result.results : buildDefaultReligionCatalog();
          return jsonResponse({ religions: rows }, 200, withCors({}, origin));
        }
        return jsonResponse({ error: "Unauthorized" }, 401, withCors({}, origin));
      }

      await hydrateReligionCatalog(env);

      const plan = effectivePlan(user);
      if (plan !== user.plan) {
        await env.DB.prepare("UPDATE users SET plan = ? WHERE id = ?")
          .bind(plan, user.id)
          .run();
        user.plan = plan;
      }

    if (path === "/me" && request.method === "GET") {
      const current = await env.DB.prepare(
        "SELECT id, email, role, plan, points, pro_expires_at, display_name, avatar_url, slogan, bio, created_at FROM users WHERE id = ?"
      )
        .bind(user.id)
        .first();
      return jsonResponse({ user: current || user }, 200, withCors({}, origin));
    }

    if (path === "/profile" && request.method === "GET") {
      const current = await env.DB.prepare(
        "SELECT display_name, avatar_url, slogan, bio FROM users WHERE id = ?"
      )
        .bind(user.id)
        .first();
      return jsonResponse({ profile: current || {} }, 200, withCors({}, origin));
    }

    if (path === "/profile" && request.method === "POST") {
      const body = await parseJson(request);
      const displayName = String(body.displayName || "").trim();
      const slogan = String(body.slogan || "").trim();
      const bio = String(body.bio || "").trim();
      const avatarUrl = sanitizeUrl(body.avatarUrl);
      if (avatarUrl && !isPngUrl(avatarUrl)) {
        return jsonResponse({ error: "PNG URL required." }, 400, withCors({}, origin));
      }
      await env.DB.prepare(
        "UPDATE users SET display_name = ?, slogan = ?, avatar_url = ?, bio = ? WHERE id = ?"
      )
        .bind(displayName, slogan, avatarUrl, bio, user.id)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/religions" && request.method === "GET") {
      const result = await env.DB.prepare(
        "SELECT id, base, detail, label, active, sort_order FROM religion_categories WHERE active = 1 ORDER BY sort_order ASC, label ASC"
      )
        .all()
        .catch(() => null);
      const rows = result && result.results ? result.results : buildDefaultReligionCatalog();
      return jsonResponse({ religions: rows }, 200, withCors({}, origin));
    }

    if (path === "/admin/religions" && request.method === "GET") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const result = await env.DB.prepare(
        "SELECT id, base, detail, label, active, sort_order FROM religion_categories ORDER BY sort_order ASC, label ASC"
      )
        .all()
        .catch(() => null);
      const rows = result && result.results ? result.results : [];
      return jsonResponse({ religions: rows }, 200, withCors({}, origin));
    }

    if (path === "/admin/religions" && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const base = normalizeSlug(body.base);
      const detail = normalizeSlug(body.detail || "");
      const label = String(body.label || "").trim();
      const active = body.active === false ? 0 : 1;
      if (!base || !label) {
        return jsonResponse({ error: "Base and label required." }, 400, withCors({}, origin));
      }
      if (detail && !/^[a-z0-9_]+$/.test(detail)) {
        return jsonResponse({ error: "Detail key invalid." }, 400, withCors({}, origin));
      }
      if (!/^[a-z0-9_]+$/.test(base)) {
        return jsonResponse({ error: "Base key invalid." }, 400, withCors({}, origin));
      }
      if (detail) {
        const baseRow = await env.DB.prepare(
          "SELECT id FROM religion_categories WHERE base = ? AND detail IS NULL"
        )
          .bind(base)
          .first();
        if (!baseRow) {
          return jsonResponse({ error: "Base category missing." }, 400, withCors({}, origin));
        }
      }
      const existing = await env.DB.prepare(
        "SELECT id FROM religion_categories WHERE base = ? AND COALESCE(detail, '') = ?"
      )
        .bind(base, detail || "")
        .first();
      if (existing) {
        return jsonResponse({ error: "Category already exists." }, 409, withCors({}, origin));
      }
      await env.DB.prepare(
        "INSERT INTO religion_categories (base, detail, label, active, sort_order, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
        .bind(base, detail || null, label, active, Number(body.sort_order || 0), nowIso())
        .run();
      resetReligionCatalogCache();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/admin/religions/")) {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const id = path.split("/")[3];
      if (!id) {
        return jsonResponse({ error: "Not found." }, 404, withCors({}, origin));
      }
      if (request.method === "PUT") {
        const body = await parseJson(request);
        const label = String(body.label || "").trim();
        const active = body.active === false ? 0 : 1;
        const sortOrder = Number(body.sort_order || 0);
        if (!label) {
          return jsonResponse({ error: "Label required." }, 400, withCors({}, origin));
        }
        await env.DB.prepare(
          "UPDATE religion_categories SET label = ?, active = ?, sort_order = ? WHERE id = ?"
        )
          .bind(label, active, sortOrder, id)
          .run();
        resetReligionCatalogCache();
        return jsonResponse({ success: true }, 200, withCors({}, origin));
      }
      if (request.method === "DELETE") {
        const row = await env.DB.prepare(
          "SELECT base, detail FROM religion_categories WHERE id = ?"
        )
          .bind(id)
          .first();
        if (!row) {
          return jsonResponse({ error: "Not found." }, 404, withCors({}, origin));
        }
        if (!row.detail) {
          await env.DB.prepare(
            "DELETE FROM religion_categories WHERE base = ?"
          )
            .bind(row.base)
            .run();
        } else {
          await env.DB.prepare("DELETE FROM religion_categories WHERE id = ?")
            .bind(id)
            .run();
        }
        resetReligionCatalogCache();
        return jsonResponse({ success: true }, 200, withCors({}, origin));
      }
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
      const columns = await getTableColumns(env, "user_settings");
      const insertCols = ["user_id", "allowed_languages", "allowed_topics"];
      const values = [user.id, JSON.stringify(languages), JSON.stringify(topics)];
      const updates = [
        "allowed_languages = excluded.allowed_languages",
        "allowed_topics = excluded.allowed_topics"
      ];
      if (columns.has("allowed_channels")) {
        insertCols.push("allowed_channels");
        values.push(JSON.stringify(channels));
        updates.push("allowed_channels = excluded.allowed_channels");
      }
      if (columns.has("allowed_religions")) {
        insertCols.push("allowed_religions");
        values.push(JSON.stringify(religions));
        updates.push("allowed_religions = excluded.allowed_religions");
      }
      if (columns.has("topic_mode")) {
        insertCols.push("topic_mode");
        values.push(topicMode);
        updates.push("topic_mode = excluded.topic_mode");
      }
      if (columns.has("channel_mode")) {
        insertCols.push("channel_mode");
        values.push(channelMode);
        updates.push("channel_mode = excluded.channel_mode");
      }
      if (columns.has("religion_mode")) {
        insertCols.push("religion_mode");
        values.push(religionMode);
        updates.push("religion_mode = excluded.religion_mode");
      }
      if (columns.has("max_daily_minutes")) {
        insertCols.push("max_daily_minutes");
        values.push(maxDailyMinutes);
        updates.push("max_daily_minutes = excluded.max_daily_minutes");
      }
      insertCols.push("updated_at");
      values.push(nowIso());
      updates.push("updated_at = excluded.updated_at");
      const placeholders = insertCols.map(() => "?").join(", ");
      await env.DB.prepare(
        "INSERT INTO user_settings (" +
          insertCols.join(", ") +
          ") VALUES (" +
          placeholders +
          ") ON CONFLICT(user_id) DO UPDATE SET " +
          updates.join(", ")
      )
        .bind(...values)
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

    if (path === "/points" && request.method === "GET") {
      const pointsRow = await env.DB.prepare("SELECT points FROM users WHERE id = ?")
        .bind(user.id)
        .first();
      const events = await env.DB.prepare(
        "SELECT type, points, created_at FROM points_events WHERE user_id = ? ORDER BY created_at DESC LIMIT 20"
      )
        .bind(user.id)
        .all();
      return jsonResponse(
        { points: pointsRow ? pointsRow.points : 0, events: events.results || [] },
        200,
        withCors({}, origin)
      );
    }

    if (path === "/leaderboard" && request.method === "GET") {
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);
      const result = await env.DB.prepare(
        "SELECT id, display_name, email, avatar_url, points, created_at FROM users WHERE role != 'admin' ORDER BY points DESC, created_at ASC LIMIT ?"
      )
        .bind(limit)
        .all();
      const leaders = (result.results || []).map((row) => ({
        id: row.id,
        display_name: row.display_name || "",
        name: row.display_name || (row.email ? row.email.split("@")[0] : ""),
        email: row.email || "",
        avatar_url: row.avatar_url || "",
        points: Number(row.points || 0)
      }));
      return jsonResponse({ leaders }, 200, withCors({}, origin));
    }

    if (path === "/ads" && request.method === "GET") {
      const slot = String(url.searchParams.get("slot") || "").trim().toLowerCase();
      const binds = [];
      let where = "WHERE 1=1";
      if (slot) {
        where += " AND ads.slot = ?";
        binds.push(slot);
      }
      const result = await env.DB.prepare(
        "SELECT ads.id, ads.slot, ads.title, ads.image_url, ads.link_url, ads.active, ads.end_date, " +
          "ads.max_views, ads.max_unique_views, ads.max_watch_seconds, " +
          "COUNT(ad_views.id) as views, COUNT(DISTINCT ad_views.user_id) as kids, " +
          "COALESCE(SUM(ad_views.duration_seconds), 0) as watch_seconds " +
          "FROM ads LEFT JOIN ad_views ON ad_views.ad_id = ads.id " +
          where +
          " GROUP BY ads.id ORDER BY ads.created_at DESC"
      )
        .bind(...binds)
        .all();
      const nowMs = Date.now();
      const ads = [];
      for (const ad of result.results || []) {
        if (!ad.active) {
          continue;
        }
        if (adLimitReached(ad, nowMs)) {
          await env.DB.prepare("UPDATE ads SET active = 0 WHERE id = ?").bind(ad.id).run();
          continue;
        }
        ads.push({
          id: ad.id,
          slot: ad.slot,
          title: ad.title,
          image_url: ad.image_url,
          link_url: ad.link_url
        });
      }
      return jsonResponse({ ads }, 200, withCors({}, origin));
    }

    if (path === "/ads/view" && request.method === "POST") {
      const body = await parseJson(request);
      const adId = Number(body.adId);
      let duration = Number(body.durationSeconds);
      if (!Number.isFinite(adId)) {
        return jsonResponse({ error: "ad" }, 400, withCors({}, origin));
      }
      if (!Number.isFinite(duration)) {
        duration = 0;
      }
      duration = Math.max(0, Math.min(6 * 60 * 60, Math.round(duration)));
      if (duration < 3) {
        return jsonResponse({ ignored: true }, 200, withCors({}, origin));
      }
      const adCheck = await env.DB.prepare("SELECT id FROM ads WHERE id = ? AND active = 1")
        .bind(adId)
        .first();
      if (!adCheck) {
        return jsonResponse({ error: "ad" }, 404, withCors({}, origin));
      }
      const lastView = await env.DB.prepare(
        "SELECT viewed_at FROM ad_views WHERE ad_id = ? AND user_id = ? ORDER BY viewed_at DESC LIMIT 1"
      )
        .bind(adId, user.id)
        .first();
      if (lastView && lastView.viewed_at) {
        const lastAt = new Date(lastView.viewed_at).getTime();
        if (Number.isFinite(lastAt) && Date.now() - lastAt < 5000) {
          return jsonResponse({ ignored: true }, 200, withCors({}, origin));
        }
      }
      await env.DB.prepare(
        "INSERT INTO ad_views (ad_id, user_id, duration_seconds, viewed_at) VALUES (?, ?, ?, ?)"
      )
        .bind(adId, user.id, duration, nowIso())
        .run();
      const stats = await env.DB.prepare(
        "SELECT ads.id, ads.end_date, ads.max_views, ads.max_unique_views, ads.max_watch_seconds, " +
          "COUNT(ad_views.id) as views, COUNT(DISTINCT ad_views.user_id) as kids, " +
          "COALESCE(SUM(ad_views.duration_seconds), 0) as watch_seconds " +
          "FROM ads LEFT JOIN ad_views ON ad_views.ad_id = ads.id " +
          "WHERE ads.id = ? GROUP BY ads.id"
      )
        .bind(adId)
        .first();
      if (stats && adLimitReached(stats, Date.now())) {
        await env.DB.prepare("UPDATE ads SET active = 0 WHERE id = ?").bind(adId).run();
      }
      return jsonResponse({ ok: true }, 200, withCors({}, origin));
    }

    if (path === "/games/win" && request.method === "POST") {
      const body = await parseJson(request);
      const gameId = String(body.gameId || "").trim().toLowerCase();
      const reward = GAME_REWARDS[gameId];
      if (!reward) {
        return jsonResponse({ error: "game" }, 400, withCors({}, origin));
      }
      const now = Date.now();
      const bucket = gameWinBuckets.get(user.id) || { last: 0 };
      if (now - bucket.last < GAME_MIN_INTERVAL_MS) {
        return jsonResponse({ error: "limit" }, 429, withCors({}, origin));
      }
      bucket.last = now;
      gameWinBuckets.set(user.id, bucket);
      const today = startOfTodayIso();
      const countResult = await env.DB.prepare(
        "SELECT COUNT(*) as total FROM game_wins WHERE user_id = ? AND game_id = ? AND won_at >= ?"
      )
        .bind(user.id, gameId, today)
        .first();
      const total = countResult ? Number(countResult.total || 0) : 0;
      if (total >= GAME_DAILY_LIMIT) {
        return jsonResponse({ error: "limit" }, 429, withCors({}, origin));
      }
      const pointsResult = await env.DB.prepare(
        "SELECT COALESCE(SUM(points), 0) as total FROM game_wins WHERE user_id = ? AND won_at >= ?"
      )
        .bind(user.id, today)
        .first();
      const dailyPoints = pointsResult ? Number(pointsResult.total || 0) : 0;
      if (dailyPoints >= GAME_DAILY_POINT_LIMIT) {
        return jsonResponse({ error: "limit" }, 429, withCors({}, origin));
      }
      await env.DB.prepare(
        "INSERT INTO game_wins (user_id, game_id, points, won_at) VALUES (?, ?, ?, ?)"
      )
        .bind(user.id, gameId, reward, nowIso())
        .run();
      await env.DB.prepare(
        "INSERT INTO points_events (user_id, type, points, created_at) VALUES (?, ?, ?, ?)"
      )
        .bind(user.id, "game_win", reward, nowIso())
        .run();
      const updated = await env.DB.prepare(
        "UPDATE users SET points = points + ? WHERE id = ?"
      )
        .bind(reward, user.id)
        .run();
      const row = await env.DB.prepare("SELECT points FROM users WHERE id = ?")
        .bind(user.id)
        .first();
      return jsonResponse({ points: row ? row.points : 0, awardedPoints: reward }, 200, withCors({}, origin));
    }

    if (path === "/rewards/redeem-pro" && request.method === "POST") {
      const current = await env.DB.prepare(
        "SELECT points, pro_expires_at FROM users WHERE id = ?"
      )
        .bind(user.id)
        .first();
      if (!current) {
        return jsonResponse({ error: "user" }, 404, withCors({}, origin));
      }
      const currentPoints = Number(current.points || 0);
      if (currentPoints < PRO_REDEEM_COST) {
        return jsonResponse({ error: "points" }, 400, withCors({}, origin));
      }
      const now = new Date();
      const base = isProActive(current.pro_expires_at) ? new Date(current.pro_expires_at) : now;
      const expiresAt = new Date(base.getTime() + PRO_REDEEM_DAYS * 24 * 60 * 60 * 1000);
      await env.DB.prepare(
        "UPDATE users SET points = points - ?, plan = 'pro', pro_expires_at = ? WHERE id = ?"
      )
        .bind(PRO_REDEEM_COST, expiresAt.toISOString(), user.id)
        .run();
      await env.DB.prepare(
        "INSERT INTO points_events (user_id, type, points, created_at) VALUES (?, ?, ?, ?)"
      )
        .bind(user.id, "redeem_pro", -PRO_REDEEM_COST, nowIso())
        .run();
      return jsonResponse(
        { points: currentPoints - PRO_REDEEM_COST, plan: "pro", pro_expires_at: expiresAt.toISOString() },
        200,
        withCors({}, origin)
      );
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
      if (plan === "free") {
        await env.DB.prepare("UPDATE users SET plan = ?, pro_expires_at = NULL WHERE id = ?")
          .bind(plan, body.userId)
          .run();
      } else {
        await env.DB.prepare("UPDATE users SET plan = ? WHERE id = ?")
          .bind(plan, body.userId)
          .run();
      }
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

    if (path === "/admin/ads" && request.method === "GET") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const result = await env.DB.prepare(
        "SELECT ads.id, ads.slot, ads.title, ads.image_url, ads.link_url, ads.active, ads.created_at, " +
          "ads.end_date, ads.max_views, ads.max_unique_views, ads.max_watch_seconds, " +
          "COUNT(ad_views.id) as views, COUNT(DISTINCT ad_views.user_id) as kids, " +
          "COALESCE(SUM(ad_views.duration_seconds), 0) as watch_seconds " +
          "FROM ads LEFT JOIN ad_views ON ad_views.ad_id = ads.id " +
          "GROUP BY ads.id ORDER BY ads.created_at DESC"
      ).all();
      const nowMs = Date.now();
      const ads = [];
      for (const ad of result.results || []) {
        let active = Boolean(ad.active);
        if (active && adLimitReached(ad, nowMs)) {
          await env.DB.prepare("UPDATE ads SET active = 0 WHERE id = ?").bind(ad.id).run();
          active = false;
        }
        ads.push({ ...ad, active: active ? 1 : 0 });
      }
      return jsonResponse({ ads }, 200, withCors({}, origin));
    }

    if (path === "/admin/ads" && request.method === "POST") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const slot = String(body.slot || "").trim().toLowerCase();
      const title = String(body.title || "").trim().slice(0, 120);
      const imageUrl = sanitizeUrl(body.image_url);
      const linkUrl = sanitizeUrl(body.link_url);
      const endDate = parseEndDate(body.end_date);
      const maxViews = parseLimitInt(body.max_views);
      const maxUniqueViews = parseLimitInt(body.max_unique_views);
      const maxWatchSeconds = parseWatchSeconds(body.max_watch_hours);
      const hasLimit = Boolean(endDate || maxViews || maxUniqueViews || maxWatchSeconds);
      const active = hasLimit && (typeof body.active === "boolean" ? body.active : true);
      const allowedSlots = new Set(["games", "video_top", "video_mid"]);
      if (!slot || !allowedSlots.has(slot)) {
        return jsonResponse({ error: "slot" }, 400, withCors({}, origin));
      }
      if (!imageUrl) {
        return jsonResponse({ error: "image" }, 400, withCors({}, origin));
      }
      await env.DB.prepare(
        "INSERT INTO ads (slot, title, image_url, link_url, active, created_at, end_date, max_views, max_unique_views, max_watch_seconds) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
        .bind(
          slot,
          title,
          imageUrl,
          linkUrl || null,
          active ? 1 : 0,
          nowIso(),
          endDate,
          maxViews,
          maxUniqueViews,
          maxWatchSeconds
        )
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/admin/ads/") && request.method === "PATCH") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const id = Number(path.split("/").pop());
      if (!Number.isFinite(id)) {
        return jsonResponse({ error: "id" }, 400, withCors({}, origin));
      }
      const existing = await env.DB.prepare(
        "SELECT ads.id, ads.slot, ads.title, ads.image_url, ads.link_url, ads.active, " +
          "ads.end_date, ads.max_views, ads.max_unique_views, ads.max_watch_seconds, " +
          "COUNT(ad_views.id) as views, COUNT(DISTINCT ad_views.user_id) as kids, " +
          "COALESCE(SUM(ad_views.duration_seconds), 0) as watch_seconds " +
          "FROM ads LEFT JOIN ad_views ON ad_views.ad_id = ads.id " +
          "WHERE ads.id = ? GROUP BY ads.id"
      )
        .bind(id)
        .first();
      if (!existing) {
        return jsonResponse({ error: "missing" }, 404, withCors({}, origin));
      }
      const body = await parseJson(request);
      const fields = [];
      const binds = [];
      if (body.slot) {
        const slot = String(body.slot).trim().toLowerCase();
        const allowedSlots = new Set(["games", "video_top", "video_mid"]);
        if (!allowedSlots.has(slot)) {
          return jsonResponse({ error: "slot" }, 400, withCors({}, origin));
        }
        fields.push("slot = ?");
        binds.push(slot);
      }
      if (typeof body.title === "string") {
        fields.push("title = ?");
        binds.push(body.title.trim().slice(0, 120));
      }
      if (typeof body.image_url === "string") {
        const imageUrl = sanitizeUrl(body.image_url);
        if (!imageUrl) {
          return jsonResponse({ error: "image" }, 400, withCors({}, origin));
        }
        fields.push("image_url = ?");
        binds.push(imageUrl);
      }
      if (typeof body.link_url === "string") {
        const linkUrl = sanitizeUrl(body.link_url);
        fields.push("link_url = ?");
        binds.push(linkUrl || null);
      }
      const hasEndDate = Object.prototype.hasOwnProperty.call(body, "end_date");
      const hasMaxViews = Object.prototype.hasOwnProperty.call(body, "max_views");
      const hasMaxUnique = Object.prototype.hasOwnProperty.call(body, "max_unique_views");
      const hasMaxWatch = Object.prototype.hasOwnProperty.call(body, "max_watch_hours");
      const endDate = hasEndDate ? parseEndDate(body.end_date) : existing.end_date;
      const maxViews = hasMaxViews ? parseLimitInt(body.max_views) : existing.max_views;
      const maxUniqueViews = hasMaxUnique ? parseLimitInt(body.max_unique_views) : existing.max_unique_views;
      const maxWatchSeconds = hasMaxWatch
        ? parseWatchSeconds(body.max_watch_hours)
        : existing.max_watch_seconds;
      if (hasEndDate) {
        fields.push("end_date = ?");
        binds.push(endDate);
      }
      if (hasMaxViews) {
        fields.push("max_views = ?");
        binds.push(maxViews);
      }
      if (hasMaxUnique) {
        fields.push("max_unique_views = ?");
        binds.push(maxUniqueViews);
      }
      if (hasMaxWatch) {
        fields.push("max_watch_seconds = ?");
        binds.push(maxWatchSeconds);
      }
      const hasLimit = Boolean(endDate || maxViews || maxUniqueViews || maxWatchSeconds);
      const desiredActive =
        typeof body.active === "boolean" ? body.active : Boolean(existing.active);
      let finalActive = desiredActive;
      if (!hasLimit) {
        finalActive = false;
      }
      if (
        finalActive &&
        adLimitReached(
          {
            end_date: endDate,
            max_views: maxViews,
            max_unique_views: maxUniqueViews,
            max_watch_seconds: maxWatchSeconds,
            views: existing.views,
            kids: existing.kids,
            watch_seconds: existing.watch_seconds
          },
          Date.now()
        )
      ) {
        finalActive = false;
      }
      const existingActive = Boolean(existing.active);
      if (
        typeof body.active === "boolean" ||
        finalActive !== existingActive ||
        !hasLimit
      ) {
        fields.push("active = ?");
        binds.push(finalActive ? 1 : 0);
      }
      if (!fields.length) {
        return jsonResponse({ error: "payload" }, 400, withCors({}, origin));
      }
      binds.push(id);
      await env.DB.prepare("UPDATE ads SET " + fields.join(", ") + " WHERE id = ?")
        .bind(...binds)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/admin/ads/") && request.method === "DELETE") {
      if (!requireRole(user, "admin")) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const id = Number(path.split("/").pop());
      if (!Number.isFinite(id)) {
        return jsonResponse({ error: "id" }, 400, withCors({}, origin));
      }
      await env.DB.prepare("DELETE FROM ads WHERE id = ?")
        .bind(id)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path === "/videos" && request.method === "GET") {
      const search = url.searchParams.get("search") || "";
      const channelId = url.searchParams.get("channelId") || "";
      const onlySubscribed = url.searchParams.get("subscribed") === "1";
      const since = url.searchParams.get("since") || "";
      const languageFilter = url.searchParams.get("languages") || "";
      const religionFilter = url.searchParams.get("religion") || "";
      const topicFilter = url.searchParams.get("topic") || "";
      const lengthFilter = url.searchParams.get("length") || "";
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
      const videoColumns = await getTableColumns(env, "videos");
      const hasReligions = videoColumns.has("religions");
      const hasReligionDetails = videoColumns.has("religion_details");
      const hasReligion = videoColumns.has("religion");
      const hasReligionDetail = videoColumns.has("religion_detail");
      const hasVisibility = videoColumns.has("visibility");
      const hasCategory = videoColumns.has("category");
      const hasDescription = videoColumns.has("description");
      let where = "WHERE videos.youtube_id IS NOT NULL";
      const binds = [];
      if (hasVisibility) {
        where += " AND COALESCE(videos.visibility, 'public') = 'public'";
      }
      if (onlySubscribed) {
        where += " AND videos.owner_id IN (SELECT channel_id FROM subscriptions WHERE user_id = ?)";
        binds.push(user.id);
      }
      if (channelId) {
        where += " AND videos.owner_id = ?";
        binds.push(channelId);
      }
      if (search) {
        const searchClauses = [
          "videos.title LIKE ?",
          "EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value LIKE ?)"
        ];
        binds.push("%" + search + "%", "%" + search + "%");
        if (hasCategory) {
          searchClauses.push("videos.category LIKE ?");
          binds.push("%" + search + "%");
        }
        if (hasDescription) {
          searchClauses.push("videos.description LIKE ?");
          binds.push("%" + search + "%");
        }
        where += " AND (" + searchClauses.join(" OR ") + ")";
      }
      if (since && since !== "all") {
        const now = new Date();
        const start = new Date(now);
        if (since === "today") {
          start.setHours(0, 0, 0, 0);
        } else if (since === "week") {
          start.setDate(now.getDate() - 7);
        } else if (since === "month") {
          start.setMonth(now.getMonth() - 1);
        } else if (since === "year") {
          start.setFullYear(now.getFullYear() - 1);
        } else {
          start.setTime(Number.NaN);
        }
        if (!Number.isNaN(start.getTime())) {
          where += " AND videos.created_at >= ?";
          binds.push(start.toISOString());
        }
      }
      const languageList = parseList(languageFilter).map((value) => String(value).toLowerCase());
      if (languageList.length) {
        const list = languageList.map(() => "?").join(",");
        where +=
          " AND (EXISTS (SELECT 1 FROM json_each(videos.languages) WHERE value IN (" +
          list +
          ")) OR videos.language IN (" +
          list +
          "))";
        binds.push(...languageList, ...languageList);
      }
      const topicQuery = String(topicFilter || "").trim().toLowerCase();
      if (topicQuery) {
        where += " AND EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE lower(value) LIKE ?)";
        binds.push("%" + topicQuery + "%");
      }
      const lengthValue = String(lengthFilter || "").trim().toLowerCase();
      if (lengthValue) {
        if (lengthValue === "short") {
          where += " AND videos.duration > 0 AND videos.duration < 240";
        } else if (lengthValue === "medium") {
          where += " AND videos.duration >= 240 AND videos.duration <= 1200";
        } else if (lengthValue === "long") {
          where += " AND videos.duration > 1200";
        }
      }
      const religionValue = String(religionFilter || "").trim().toLowerCase();
      if (religionValue) {
        const base = normalizeReligion(religionValue);
        const isDetail = RELIGION_DETAILS.has(religionValue);
        const detailValue = isDetail ? religionValue : "";
        if (base === "none") {
          const clauses = [];
          if (hasReligions) {
            clauses.push(
              "(json_array_length(videos.religions) IS NULL OR json_array_length(videos.religions) = 0)"
            );
          }
          if (hasReligion) {
            clauses.push("COALESCE(videos.religion, 'none') = 'none'");
          }
          if (clauses.length) {
            where += " AND (" + clauses.join(" OR ") + ")";
          }
        } else if (isDetail) {
          const clauses = [];
          if (hasReligions) {
            clauses.push("EXISTS (SELECT 1 FROM json_each(videos.religions) WHERE value = ?)");
            binds.push(base);
          }
          if (hasReligion) {
            clauses.push("COALESCE(videos.religion, 'none') = ?");
            binds.push(base);
          }
          if (hasReligionDetails) {
            clauses.push("EXISTS (SELECT 1 FROM json_each(videos.religion_details) WHERE value = ?)");
            binds.push(detailValue);
          }
          if (hasReligionDetail) {
            clauses.push("COALESCE(videos.religion_detail, '') = ?");
            binds.push(detailValue);
          }
          if (clauses.length) {
            where += " AND (" + clauses.join(" OR ") + ")";
          }
        } else {
          const detailList = Object.keys(RELIGION_DETAIL_BASE).filter(
            (detail) => RELIGION_DETAIL_BASE[detail] === base
          );
          const clauses = [];
          if (hasReligions) {
            clauses.push(
              "EXISTS (SELECT 1 FROM json_each(videos.religions) WHERE value = ?)"
            );
            binds.push(base);
          }
          if (hasReligion) {
            clauses.push("COALESCE(videos.religion, 'none') = ?");
            binds.push(base);
          }
          if (detailList.length && hasReligionDetails) {
            const list = detailList.map(() => "?").join(",");
            clauses.push(
              "EXISTS (SELECT 1 FROM json_each(videos.religion_details) WHERE value IN (" +
                list +
                "))"
            );
            binds.push(...detailList);
          }
          if (detailList.length && hasReligionDetail) {
            const list = detailList.map(() => "?").join(",");
            clauses.push("COALESCE(videos.religion_detail, '') IN (" + list + ")");
            binds.push(...detailList);
          }
          if (clauses.length) {
            where += " AND (" + clauses.join(" OR ") + ")";
          }
        }
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
          const clauses = [];
          let repeats = 0;
          if (hasReligions) {
            clauses.push(
              "EXISTS (SELECT 1 FROM json_each(videos.religions) WHERE value IN (" + list + "))"
            );
            repeats += 1;
          }
          if (hasReligionDetails) {
            clauses.push(
              "EXISTS (SELECT 1 FROM json_each(videos.religion_details) WHERE value IN (" + list + "))"
            );
            repeats += 1;
          }
          if (hasReligion) {
            clauses.push("COALESCE(videos.religion, 'none') IN (" + list + ")");
            repeats += 1;
          }
          if (hasReligionDetail) {
            clauses.push("COALESCE(videos.religion_detail, '') IN (" + list + ")");
            repeats += 1;
          }
          if (clauses.length) {
            where +=
              (religionMode === "block" ? " AND NOT (" : " AND (") +
              clauses.join(" OR ") +
              ")";
            for (let i = 0; i < repeats; i += 1) {
              binds.push(...allowedReligions);
            }
          }
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
        languages: safeJsonArray(row.languages),
        religions: safeJsonArray(row.religions),
        religion_details: safeJsonArray(row.religion_details)
      }));
      return jsonResponse({ videos, hasMore }, 200, withCors({}, origin));
    }

    if (path === "/videos/manage" && request.method === "GET") {
      const ownerId = url.searchParams.get("ownerId") || "";
      const search = url.searchParams.get("search") || "";
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);
      const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);
      const videoColumns = await getTableColumns(env, "videos");
      const hasCategory = videoColumns.has("category");
      const hasDescription = videoColumns.has("description");
      let where = "WHERE 1=1";
      const binds = [];
      if (ownerId) {
        where += " AND videos.owner_id = ?";
        binds.push(ownerId);
      }
      if (search) {
        const clauses = [
          "videos.title LIKE ?",
          "videos.youtube_url LIKE ?",
          "users.email LIKE ?",
          "users.display_name LIKE ?"
        ];
        binds.push("%" + search + "%", "%" + search + "%", "%" + search + "%", "%" + search + "%");
        if (hasCategory) {
          clauses.push("videos.category LIKE ?");
          binds.push("%" + search + "%");
        }
        if (hasDescription) {
          clauses.push("videos.description LIKE ?");
          binds.push("%" + search + "%");
        }
        where += " AND (" + clauses.join(" OR ") + ")";
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
      const videoColumns = await getTableColumns(env, "videos");
      const visibilityClause = videoColumns.has("visibility")
        ? " AND COALESCE(videos.visibility, 'public') = 'public'"
        : "";
      const video = await env.DB.prepare(
        "SELECT videos.*, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE users.email END as channel " +
          "FROM videos JOIN users ON videos.owner_id = users.id WHERE videos.id = ? AND videos.youtube_id IS NOT NULL AND LENGTH(videos.youtube_id) = 11 AND COALESCE(NULLIF(TRIM(videos.title), ''), '') <> 'Untitled video'" +
          visibilityClause
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
              video.religion_detail,
              video.religions,
              video.religion_details
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
        languages: safeJsonArray(video.languages),
        religions: safeJsonArray(video.religions),
        religion_details: safeJsonArray(video.religion_details)
      };
      return jsonResponse({ video: enriched }, 200, withCors({}, origin));
    }

    if (path.startsWith("/videos/") && request.method === "DELETE") {
      const videoId = path.split("/")[2];
      const video = await env.DB.prepare("SELECT owner_id FROM videos WHERE id = ?")
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
      const videoColumns = await getTableColumns(env, "videos");
      const selectCols = [
        "owner_id",
        "title",
        "language",
        "languages",
        "topics",
        "duration",
        "youtube_id",
        "youtube_url"
      ];
      if (videoColumns.has("description")) {
        selectCols.push("description");
      }
      if (videoColumns.has("category")) {
        selectCols.push("category");
      }
      if (videoColumns.has("visibility")) {
        selectCols.push("visibility");
      }
      if (videoColumns.has("religion")) {
        selectCols.push("religion");
      }
      if (videoColumns.has("religion_detail")) {
        selectCols.push("religion_detail");
      }
      if (videoColumns.has("religions")) {
        selectCols.push("religions");
      }
      if (videoColumns.has("religion_details")) {
        selectCols.push("religion_details");
      }
      const video = await env.DB.prepare("SELECT " + selectCols.join(", ") + " FROM videos WHERE id = ?")
        .bind(videoId)
        .first();
      if (!video) return jsonResponse({ error: "Video not found." }, 404, withCors({}, origin));
      if (user.role !== "admin" && Number(video.owner_id) !== Number(user.id)) {
        return jsonResponse({ error: "Forbidden" }, 403, withCors({}, origin));
      }
      const body = await parseJson(request);
      const titleInput = hasOwn(body, "title") ? body.title : video.title;
      const title = String(titleInput || "").trim();
      const languageInput = hasOwn(body, "language") ? body.language : video.language;
      const language = String(languageInput || "").trim().toLowerCase();
      const languagesInput = hasOwn(body, "languages")
        ? body.languages
        : safeJsonArray(video.languages || []);
      const languages = normalizeLanguages(languagesInput || language);
      const storedLanguages = languages.length ? languages : language ? [language] : [];
      const topicsInput = hasOwn(body, "topics") ? body.topics : safeJsonArray(video.topics || []);
      const topics = normalizeTopics(topicsInput);
      const durationInput = hasOwn(body, "duration") ? body.duration : video.duration;
      const existingDuration = Number(video.duration) || 0;
      let duration = normalizeDurationValue(durationInput, existingDuration);
      if (duration <= 0 && existingDuration > 0) {
        duration = existingDuration;
      }
      const descriptionInput = hasOwn(body, "description") ? body.description : video.description;
      const description = normalizeTextField(descriptionInput, 1000);
      const categoryInput = hasOwn(body, "category") ? body.category : video.category;
      const category = normalizeTextField(categoryInput, 80);
      const visibilityInput = hasOwn(body, "visibility") ? body.visibility : video.visibility;
      const visibility = normalizeVisibility(visibilityInput, video.visibility || "public");
      const { bases, details, legacyBase, legacyDetail } = normalizeReligionArrays(
        body.religions || video.religions,
        body.religion_details || video.religion_details,
        body.religion || video.religion || "none",
        body.religion_detail || video.religion_detail || ""
      );
      const updates = ["title = ?", "language = ?", "languages = ?"];
      const values = [
        title || "Untitled video",
        language || "unspecified",
        JSON.stringify(storedLanguages)
      ];
      if (videoColumns.has("description")) {
        updates.push("description = ?");
        values.push(description || null);
      }
      if (videoColumns.has("category")) {
        updates.push("category = ?");
        values.push(category || null);
      }
      if (videoColumns.has("visibility")) {
        updates.push("visibility = ?");
        values.push(visibility || "public");
      }
      if (videoColumns.has("duration")) {
        if (duration <= 0 && video.youtube_id && video.youtube_url) {
          const meta = await fetchYouTubeMeta(env, video.youtube_id, video.youtube_url);
          if (meta.duration > 0) {
            duration = meta.duration;
          }
        }
        updates.push("duration = ?");
        values.push(duration || 0);
      }
      if (videoColumns.has("religion")) {
        updates.push("religion = ?");
        values.push(legacyBase);
      }
      if (videoColumns.has("religion_detail")) {
        updates.push("religion_detail = ?");
        values.push(legacyDetail);
      }
      if (videoColumns.has("religions")) {
        updates.push("religions = ?");
        values.push(JSON.stringify(bases));
      }
      if (videoColumns.has("religion_details")) {
        updates.push("religion_details = ?");
        values.push(JSON.stringify(details));
      }
      updates.push("topics = ?");
      values.push(JSON.stringify(topics));
      values.push(videoId);
      await env.DB.prepare("UPDATE videos SET " + updates.join(", ") + " WHERE id = ?")
        .bind(...values)
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
      if (!isUsableTitle(meta.title)) {
        return jsonResponse({ error: "Video unavailable or restricted." }, 400, withCors({}, origin));
      }
      const language = (body.language || "unspecified").toLowerCase();
      const languages = normalizeLanguages(body.languages);
      const storedLanguages = languages.length ? languages : language ? [language] : [];
      const topics = normalizeTopics(body.topics);
      const description = normalizeTextField(body.description, 1000);
      const category = normalizeTextField(body.category, 80);
      const visibility = normalizeVisibility(body.visibility, "public");
      const { bases, details, legacyBase, legacyDetail } = normalizeReligionArrays(
        body.religions,
        body.religion_details,
        body.religion || "",
        body.religion_detail || ""
      );
      const videoColumns = await getTableColumns(env, "videos");
      const insertCols = [
        "title",
        "youtube_url",
        "youtube_id",
        "owner_id",
        "views",
        "duration",
        "language",
        "languages"
      ];
      const values = [
        meta.title,
        youtubeUrl,
        youtubeId,
        user.id,
        0,
        meta.duration || 0,
        language,
        JSON.stringify(storedLanguages)
      ];
      if (videoColumns.has("religion")) {
        insertCols.push("religion");
        values.push(legacyBase);
      }
      if (videoColumns.has("religion_detail")) {
        insertCols.push("religion_detail");
        values.push(legacyDetail);
      }
      if (videoColumns.has("religions")) {
        insertCols.push("religions");
        values.push(JSON.stringify(bases));
      }
      if (videoColumns.has("religion_details")) {
        insertCols.push("religion_details");
        values.push(JSON.stringify(details));
      }
      if (videoColumns.has("description")) {
        insertCols.push("description");
        values.push(description || null);
      }
      if (videoColumns.has("category")) {
        insertCols.push("category");
        values.push(category || null);
      }
      if (videoColumns.has("visibility")) {
        insertCols.push("visibility");
        values.push(visibility);
      }
      insertCols.push("topics");
      values.push(JSON.stringify(topics));
      insertCols.push("created_at");
      values.push(nowIso());
      const placeholders = insertCols.map(() => "?").join(", ");
      await env.DB.prepare(
        "INSERT INTO videos (" + insertCols.join(", ") + ") VALUES (" + placeholders + ")"
      )
        .bind(...values)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/videos/") && path.endsWith("/view") && request.method === "POST") {
      const videoId = path.split("/")[2];
      await pruneHistory(env);
      await env.DB.prepare("UPDATE videos SET views = views + 1 WHERE id = ?").bind(videoId).run();
      const videoMeta = await env.DB.prepare("SELECT duration, topics, title FROM videos WHERE id = ?")
        .bind(videoId)
        .first();
      const watchSeconds = videoMeta?.duration || 0;
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
      }
      await env.DB.prepare(
        "INSERT INTO view_history (user_id, video_id, watched_at, watch_seconds) VALUES (?, ?, ?, ?)"
      )
        .bind(user.id, videoId, nowIso(), watchSeconds)
        .run();
      await updateUserInterests(env, user.id, safeJsonArray(videoMeta?.topics), videoMeta?.title || "");
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/videos/") && path.endsWith("/like") && request.method === "POST") {
      const videoId = path.split("/")[2];
      const existing = await env.DB.prepare(
        "SELECT 1 FROM likes WHERE user_id = ? AND video_id = ?"
      )
        .bind(user.id, videoId)
        .first();
      if (!existing) {
        const limited = await isRateLimited(env, "likes", "user_id", user.id, 5);
        if (limited) {
          return jsonResponse(
            { error: "Please wait a moment before liking again." },
            429,
            withCors({}, origin)
          );
        }
      }
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

    if (path === "/interests" && request.method === "GET") {
      const interests = await loadUserInterests(env, user.id);
      return jsonResponse({ interests }, 200, withCors({}, origin));
    }

    if (path === "/interests" && request.method === "POST") {
      const body = await parseJson(request);
      const interest = normalizeInterestToken(body && body.interest ? body.interest : "");
      if (!interest) {
        return jsonResponse({ error: "Interest required." }, 400, withCors({}, origin));
      }
      await updateUserInterests(env, user.id, [interest], "");
      const interests = await loadUserInterests(env, user.id);
      return jsonResponse({ interests }, 200, withCors({}, origin));
    }

    if (path === "/interests/reset" && request.method === "POST") {
      await env.DB.prepare("DELETE FROM user_interests WHERE user_id = ?")
        .bind(user.id)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
    }

    if (path.startsWith("/interests/") && request.method === "DELETE") {
      const raw = decodeURIComponent(path.split("/").slice(2).join("/") || "")
        .trim()
        .toLowerCase();
      if (!raw) {
        return jsonResponse({ error: "Interest required." }, 400, withCors({}, origin));
      }
      await env.DB.prepare("DELETE FROM user_interests WHERE user_id = ? AND interest = ?")
        .bind(user.id, raw)
        .run();
      return jsonResponse({ success: true }, 200, withCors({}, origin));
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
      const limited = await isRateLimited(env, "reports", "reporter_id", user.id, 30);
      if (limited) {
        return jsonResponse(
          { error: "Please wait before sending another report." },
          429,
          withCors({}, origin)
        );
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
      await pruneHistory(env);
      const range = url.searchParams.get("range") || "";
      const day = url.searchParams.get("day") || "";
      const now = new Date();
      let start = null;
      let end = new Date(now);
      if (range === "week") {
        start = new Date(now);
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - 6);
      } else if (range === "month") {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
      } else {
        const date = day ? new Date(day) : now;
        if (Number.isNaN(date.getTime())) {
          return jsonResponse({ error: "Invalid day." }, 400, withCors({}, origin));
        }
        start = new Date(date);
        start.setHours(0, 0, 0, 0);
        end = new Date(date);
        end.setHours(23, 59, 59, 999);
      }
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
      const videoColumns = await getTableColumns(env, "videos");
      const hasReligions = videoColumns.has("religions");
      const hasReligionDetails = videoColumns.has("religion_details");
      const hasReligion = videoColumns.has("religion");
      const hasReligionDetail = videoColumns.has("religion_detail");
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
          const clauses = [];
          let repeats = 0;
          if (hasReligions) {
            clauses.push(
              "EXISTS (SELECT 1 FROM json_each(videos.religions) WHERE value IN (" + list + "))"
            );
            repeats += 1;
          }
          if (hasReligionDetails) {
            clauses.push(
              "EXISTS (SELECT 1 FROM json_each(videos.religion_details) WHERE value IN (" + list + "))"
            );
            repeats += 1;
          }
          if (hasReligion) {
            clauses.push("COALESCE(videos.religion, 'none') IN (" + list + ")");
            repeats += 1;
          }
          if (hasReligionDetail) {
            clauses.push("COALESCE(videos.religion_detail, '') IN (" + list + ")");
            repeats += 1;
          }
          if (clauses.length) {
            where +=
              (religionMode === "block" ? " AND NOT (" : " AND (") +
              clauses.join(" OR ") +
              ")";
            for (let i = 0; i < repeats; i += 1) {
              binds.push(...allowedReligions);
            }
          }
        }
      }
      const result = await env.DB.prepare(
        "SELECT videos.*, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
          "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
          "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts " +
          "FROM videos JOIN users ON videos.owner_id = users.id " +
          where +
          " ORDER BY videos.views DESC, hearts DESC LIMIT ? OFFSET ?"
      )
        .bind(...binds, limit + 1, offset)
        .all();
      const rows = result.results || [];
      const hasMore = rows.length > limit;
      const videos = rows.slice(0, limit).map((row) => ({
        ...row,
        topics: safeJsonArray(row.topics),
        languages: safeJsonArray(row.languages),
        religions: safeJsonArray(row.religions),
        religion_details: safeJsonArray(row.religion_details)
      }));
      return jsonResponse({ videos, hasMore }, 200, withCors({}, origin));
    }

    if (path === "/recommendations" && request.method === "GET") {
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "24", 10), 50);
      const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);
      const settings = await loadUserSettings(env, user.id);
      const applyFilters = user.plan === "pro" && settings.hasSettings;
      const videoColumns = await getTableColumns(env, "videos");
      const { where, binds } = buildVideoFilters(settings, applyFilters, videoColumns);
      await pruneHistory(env);
      const interestRows = await loadUserInterests(env, user.id);
      const interestTopics = interestRows
        .map((row) => normalizeInterestToken(row.interest))
        .filter(Boolean);
      const historyResult = await env.DB.prepare(
        "SELECT videos.id, videos.title, videos.owner_id, videos.topics " +
          "FROM view_history JOIN videos ON view_history.video_id = videos.id " +
          "WHERE view_history.user_id = ? " +
          "ORDER BY view_history.watched_at DESC LIMIT 50"
      )
        .bind(user.id)
        .all();
      const history = historyResult.results || [];
      const watchedIds = new Set(history.map((row) => String(row.id)));
      if (!history.length && !interestTopics.length) {
        const fallback = await env.DB.prepare(
          "SELECT videos.*, " +
            "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
            "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
            "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts " +
            "FROM videos JOIN users ON videos.owner_id = users.id " +
            where +
            " ORDER BY videos.views DESC, videos.created_at DESC LIMIT ? OFFSET ?"
        )
          .bind(...binds, limit + 1, offset)
          .all();
        const fallbackRows = fallback.results || [];
        const fallbackHasMore = fallbackRows.length > limit;
        const videos = fallbackRows.slice(0, limit).map((row) => ({
          ...row,
          topics: safeJsonArray(row.topics),
          languages: safeJsonArray(row.languages),
          religions: safeJsonArray(row.religions),
          religion_details: safeJsonArray(row.religion_details)
        }));
        return jsonResponse({ videos, hasMore: fallbackHasMore }, 200, withCors({}, origin));
      }
      const topicScores = new Map();
      const tokenScores = new Map();
      interestRows.forEach((row) => {
        const topic = normalizeInterestToken(row.interest);
        if (!topic) {
          return;
        }
        const score = Math.max(1, Number(row.score) || 1);
        topicScores.set(topic, (topicScores.get(topic) || 0) + score);
        tokenizeText(topic).forEach((token) => {
          tokenScores.set(token, (tokenScores.get(token) || 0) + 1);
        });
      });
      const subsResult = await env.DB.prepare(
        "SELECT channel_id FROM subscriptions WHERE user_id = ?"
      )
        .bind(user.id)
        .all();
      const subscribed = new Set((subsResult.results || []).map((row) => String(row.channel_id)));
      const candidateLimit = Math.min(limit + offset + 80, 300);
      const candidateResult = await env.DB.prepare(
        "SELECT videos.*, " +
          "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
          "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
          "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts " +
          "FROM videos JOIN users ON videos.owner_id = users.id " +
          where +
          " ORDER BY videos.created_at DESC LIMIT ?"
      )
        .bind(...binds, candidateLimit)
        .all();
      const scored = [];
      (candidateResult.results || []).forEach((row) => {
        if (watchedIds.has(String(row.id))) {
          return;
        }
        let score = 0;
        const ownerKey = String(row.owner_id || "");
        if (ownerKey && subscribed.has(ownerKey)) {
          score += 6;
        }
        safeJsonArray(row.topics).forEach((topic) => {
          const key = String(topic || "").toLowerCase();
          if (key && topicScores.has(key)) {
            score += topicScores.get(key) * 3;
          }
        });
        tokenizeText(row.title).forEach((token) => {
          if (tokenScores.has(token)) {
            score += tokenScores.get(token);
          }
        });
        score += Math.min((row.views || 0) / 200, 4);
        scored.push({ row, score });
      });
      if (!scored.length) {
        const fallback = await env.DB.prepare(
          "SELECT videos.*, " +
            "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
            "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
            "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts " +
            "FROM videos JOIN users ON videos.owner_id = users.id " +
            where +
            " ORDER BY videos.views DESC, videos.created_at DESC LIMIT ? OFFSET ?"
        )
          .bind(...binds, limit + 1, offset)
          .all();
        const fallbackRows = fallback.results || [];
        const fallbackHasMore = fallbackRows.length > limit;
        const videos = fallbackRows.slice(0, limit).map((row) => ({
          ...row,
          topics: safeJsonArray(row.topics),
          languages: safeJsonArray(row.languages),
          religions: safeJsonArray(row.religions),
          religion_details: safeJsonArray(row.religion_details)
        }));
        return jsonResponse({ videos, hasMore: fallbackHasMore }, 200, withCors({}, origin));
      }
      scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const viewsA = a.row.views || 0;
        const viewsB = b.row.views || 0;
        if (viewsB !== viewsA) return viewsB - viewsA;
        const dateA = a.row.created_at || "";
        const dateB = b.row.created_at || "";
        return dateB.localeCompare(dateA);
      });
      const sliced = scored.slice(offset, offset + limit).map((item) => ({
        ...item.row,
        topics: safeJsonArray(item.row.topics),
        languages: safeJsonArray(item.row.languages),
        religions: safeJsonArray(item.row.religions),
        religion_details: safeJsonArray(item.row.religion_details)
      }));
      const hasMore = scored.length > offset + limit;
      return jsonResponse({ videos: sliced, hasMore }, 200, withCors({}, origin));
    }

    if (path === "/related" && request.method === "GET") {
      const videoId = url.searchParams.get("videoId") || "";
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "8", 10), 20);
      if (!videoId) {
        return jsonResponse({ videos: [] }, 200, withCors({}, origin));
      }
      const video = await env.DB.prepare("SELECT id, owner_id, topics FROM videos WHERE id = ?")
        .bind(videoId)
        .first();
      if (!video) {
        return jsonResponse({ videos: [] }, 200, withCors({}, origin));
      }
      const settings = await loadUserSettings(env, user.id);
      const applyFilters = user.plan === "pro" && settings.hasSettings;
      const videoColumns = await getTableColumns(env, "videos");
      const base = buildVideoFilters(settings, applyFilters, videoColumns);
      let where = base.where + " AND videos.id <> ?";
      const binds = [...base.binds, videoId];
      const topics = safeJsonArray(video.topics)
        .map((topic) => String(topic || "").toLowerCase())
        .filter(Boolean);
      if (topics.length) {
        const list = topics.map(() => "?").join(",");
        where +=
          " AND (videos.owner_id = ? OR EXISTS (SELECT 1 FROM json_each(videos.topics) WHERE value IN (" +
          list +
          ")))";
        binds.push(video.owner_id, ...topics);
      } else {
        where += " AND videos.owner_id = ?";
        binds.push(video.owner_id);
      }
      const query =
        "SELECT videos.*, " +
        "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
        "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
        "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts " +
        "FROM videos JOIN users ON videos.owner_id = users.id " +
        where +
        " ORDER BY CASE WHEN videos.owner_id = ? THEN 1 ELSE 0 END DESC, videos.views DESC, hearts DESC LIMIT ?";
      const result = await env.DB.prepare(query)
        .bind(...binds, video.owner_id, limit)
        .all();
      let rows = result.results || [];
      if (!rows.length) {
        const fallback = await env.DB.prepare(
          "SELECT videos.*, " +
            "CASE WHEN users.display_name IS NOT NULL AND users.display_name <> '' THEN users.display_name ELSE 'Creator' END as channel_name, " +
            "users.avatar_url as channel_avatar, users.slogan as channel_slogan, users.role as channel_role, " +
            "(SELECT COUNT(*) FROM likes WHERE likes.video_id = videos.id) as hearts " +
            "FROM videos JOIN users ON videos.owner_id = users.id " +
            base.where +
            " AND videos.id <> ? ORDER BY videos.views DESC, hearts DESC LIMIT ?"
        )
          .bind(...base.binds, videoId, limit)
          .all();
        rows = fallback.results || [];
      }
      const videos = rows.map((row) => ({
        ...row,
        topics: safeJsonArray(row.topics),
        languages: safeJsonArray(row.languages),
        religions: safeJsonArray(row.religions),
        religion_details: safeJsonArray(row.religion_details)
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
      const videoColumns = await getTableColumns(env, "videos");
      const hasReligion = videoColumns.has("religion");
      const hasReligionDetail = videoColumns.has("religion_detail");
      const hasReligions = videoColumns.has("religions");
      const hasReligionDetails = videoColumns.has("religion_details");
      const selectCols = ["youtube_url", "language", "languages"];
      if (hasReligion) {
        selectCols.push("religion");
      }
      if (hasReligionDetail) {
        selectCols.push("religion_detail");
      }
      if (hasReligions) {
        selectCols.push("religions");
      }
      if (hasReligionDetails) {
        selectCols.push("religion_details");
      }
      selectCols.push("topics");
      const result = await env.DB.prepare(
        "SELECT " + selectCols.join(", ") + " FROM videos ORDER BY created_at DESC"
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
        const safeReligions = JSON.stringify(safeJsonArray(row.religions)).replace(/'/g, "''");
        const safeReligionDetails = JSON.stringify(safeJsonArray(row.religion_details)).replace(/'/g, "''");
        const columnNames = ["youtube_url", "language", "languages"];
        const valueParts = [`'${safeUrl}'`, `'${safeLanguage}'`, `'${safeLanguages}'`];
        if (hasReligion) {
          columnNames.push("religion");
          valueParts.push(`'${safeReligion}'`);
        }
        if (hasReligionDetail) {
          columnNames.push("religion_detail");
          valueParts.push(`'${safeReligionDetail}'`);
        }
        if (hasReligions) {
          columnNames.push("religions");
          valueParts.push(`'${safeReligions}'`);
        }
        if (hasReligionDetails) {
          columnNames.push("religion_details");
          valueParts.push(`'${safeReligionDetails}'`);
        }
        columnNames.push("topics");
        valueParts.push(`'${safeTopics}'`);
        return (
          "INSERT INTO videos (" +
          columnNames.join(", ") +
          ") VALUES (" +
          valueParts.join(", ") +
          ");"
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
      const videoColumns = await getTableColumns(env, "videos");
      const hasReligion = videoColumns.has("religion");
      const hasReligionDetail = videoColumns.has("religion_detail");
      const hasReligions = videoColumns.has("religions");
      const hasReligionDetails = videoColumns.has("religion_details");
      const insertCols = [
        "title",
        "youtube_url",
        "youtube_id",
        "owner_id",
        "views",
        "duration",
        "language",
        "languages"
      ];
      if (hasReligion) {
        insertCols.push("religion");
      }
      if (hasReligionDetail) {
        insertCols.push("religion_detail");
      }
      if (hasReligions) {
        insertCols.push("religions");
      }
      if (hasReligionDetails) {
        insertCols.push("religion_details");
      }
      insertCols.push("topics");
      insertCols.push("created_at");
      const insertSql =
        "INSERT INTO videos (" + insertCols.join(", ") + ") VALUES (" + insertCols.map(() => "?").join(", ") + ")";
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
        if (!isUsableTitle(meta.title)) {
          skipped.push({ youtubeUrl, reason: "Video unavailable" });
          continue;
        }
        const languages = normalizeLanguages(row.languages || row.language || row.lang);
        const language =
          languages[0] || String(row.language || row.lang || "unspecified").toLowerCase();
        const storedLanguages = languages.length ? languages : language ? [language] : [];
        const topics = normalizeTopics(row.topics || "");
        const { bases, details, legacyBase, legacyDetail } = normalizeReligionArrays(
          row.religions,
          row.religion_details,
          row.religion || row.faith || "",
          row.religion_detail || row.faith_detail || row.religion || row.faith || ""
        );
        const values = [
          meta.title,
          youtubeUrl,
          youtubeId,
          user.id,
          0,
          meta.duration || 0,
          language,
          JSON.stringify(storedLanguages)
        ];
        if (hasReligion) {
          values.push(legacyBase);
        }
        if (hasReligionDetail) {
          values.push(legacyDetail);
        }
        if (hasReligions) {
          values.push(JSON.stringify(bases));
        }
        if (hasReligionDetails) {
          values.push(JSON.stringify(details));
        }
        values.push(JSON.stringify(topics), nowIso());
        const result = await env.DB.prepare(insertSql).bind(...values).run();
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
      const videoColumns = await getTableColumns(env, "videos");
      const hasReligion = videoColumns.has("religion");
      const hasReligionDetail = videoColumns.has("religion_detail");
      const hasReligions = videoColumns.has("religions");
      const hasReligionDetails = videoColumns.has("religion_details");
      const insertCols = [
        "title",
        "youtube_url",
        "youtube_id",
        "owner_id",
        "views",
        "duration",
        "language",
        "languages"
      ];
      if (hasReligion) {
        insertCols.push("religion");
      }
      if (hasReligionDetail) {
        insertCols.push("religion_detail");
      }
      if (hasReligions) {
        insertCols.push("religions");
      }
      if (hasReligionDetails) {
        insertCols.push("religion_details");
      }
      insertCols.push("topics");
      insertCols.push("created_at");
      const insertSql =
        "INSERT INTO videos (" + insertCols.join(", ") + ") VALUES (" + insertCols.map(() => "?").join(", ") + ")";
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
        if (!isUsableTitle(meta.title)) {
          skipped.push({ youtubeUrl, reason: "Video unavailable" });
          continue;
        }
        const languages = normalizeLanguages(row.languages || row.language || row.lang);
        const language =
          languages[0] || String(row.language || row.lang || "unspecified").toLowerCase();
        const storedLanguages = languages.length ? languages : language ? [language] : [];
        const topics = normalizeTopics(row.topics || "");
        const { bases, details, legacyBase, legacyDetail } = normalizeReligionArrays(
          row.religions,
          row.religion_details,
          row.religion || row.faith || "",
          row.religion_detail || row.faith_detail || row.religion || row.faith || ""
        );
        const values = [
          meta.title,
          youtubeUrl,
          youtubeId,
          user.id,
          0,
          meta.duration || 0,
          language,
          JSON.stringify(storedLanguages)
        ];
        if (hasReligion) {
          values.push(legacyBase);
        }
        if (hasReligionDetail) {
          values.push(legacyDetail);
        }
        if (hasReligions) {
          values.push(JSON.stringify(bases));
        }
        if (hasReligionDetails) {
          values.push(JSON.stringify(details));
        }
        values.push(JSON.stringify(topics), nowIso());
        const result = await env.DB.prepare(insertSql).bind(...values).run();
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
