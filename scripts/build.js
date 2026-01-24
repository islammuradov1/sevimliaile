const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const cssPath = path.join(root, "styles.css");
const jsPath = path.join(root, "app.js");
const distDir = path.join(root, "dist");
const distIndexPath = path.join(distDir, "index.html");

function injectAssets() {
  const html = fs.readFileSync(indexPath, "utf8");
  const css = fs.readFileSync(cssPath, "utf8");
  const js = fs.readFileSync(jsPath, "utf8");

  const withCss = html.replace(
    '<link rel="stylesheet" href="styles.css">',
    `<style>\n${css}\n</style>`
  );

  const withJs = withCss.replace(
    '<script src="app.js"></script>',
    `<script>\n${js}\n</script>`
  );

  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(distIndexPath, withJs, "utf8");
  const staticAssets = ["logo.png", "bg.png", "offline.html", "sw.js"];
  staticAssets.forEach((asset) => {
    const source = path.join(root, asset);
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, path.join(distDir, asset));
    }
  });
  console.log("Built dist/index.html with inlined CSS/JS");
}

injectAssets();
