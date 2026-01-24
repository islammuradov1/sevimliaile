
## Build a single deployable HTML

If your host can't serve separate CSS/JS files (or you just want one file), run:

```
npm run build
```

This writes `dist/index.html` with the contents of `styles.css` and `app.js` inlined. Deploy `dist/index.html` as the standalone site.
