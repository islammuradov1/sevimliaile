const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const publicDir = fs.existsSync(path.join(dist, "index.html")) ? dist : root;

const app = express();
app.use(express.static(publicDir));
app.use((req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Static site running on http://${HOST}:${PORT} (serving ${publicDir})`);
});
