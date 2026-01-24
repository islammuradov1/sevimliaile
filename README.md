
## Local usage

- `npm start` — serves the frontend statically (prefers `dist/index.html` if present; otherwise uses the repo root). No database required. Uses `HOST=127.0.0.1` and `PORT=4173` by default (override via env).
- `npm run build` — produces `dist/index.html` with CSS/JS inlined for static hosting.
- `npm run api` — runs the legacy Express API in `server.js` (requires `DATABASE_URL` Postgres + Firebase admin creds).

## Deploy

- Cloudflare Workers + Pages: deploy `src/worker.js` via `wrangler publish` (D1) and host the frontend on Pages (use `dist/index.html` for a single file).
- Node/Postgres: run `npm run api` with `DATABASE_URL` set and a running Postgres instance; serve the frontend from your host of choice or `npm start`.
