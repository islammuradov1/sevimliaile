const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const publicDir = fs.existsSync(path.join(dist, "index.html")) ? dist : root;

const blocked = new Set([
  "/.env",
  "/server.js",
  "/package.json",
  "/package-lock.json",
  "/wrangler.toml"
]);

const app = express();
app.disable("x-powered-by");
app.use((req, res, next) => {
  const pathName = req.path || "";
  if (
    blocked.has(pathName) ||
    pathName.startsWith("/.git") ||
    pathName.startsWith("/scripts") ||
    pathName.startsWith("/src") ||
    pathName.startsWith("/migrations") ||
    pathName.includes("..")
  ) {
    return res.status(404).end();
  }
  next();
});
app.use(express.static(publicDir));
app.use((req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Static site running on http://${HOST}:${PORT} (serving ${publicDir})`);
});
