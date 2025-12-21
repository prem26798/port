This repository contains a JSON-driven personal portfolio.

How it works:
- Editable content: `content.json` at repository root. Update this file to change home, about, experiences, projects, skills, contact, and social links.
- Renderer: `script.js` fetches `content.json` and renders sections into placeholder containers in `index.html`. The original HTML is kept as `.fallback-content` to avoid breaking the site if `content.json` is not available.
- Assets: put images, PDFs and other static assets in `assets/` (recommended). The renderer will prefer `assets/<filename>` when available and fall back to the root filename.

Local testing:
1. Run a static server in the project folder, for example:

```bash
python3 -m http.server 8000
# or
npx http-server . -p 8000
```

2. Open `http://localhost:8000` and verify the content loads from `content.json`.

If anything breaks, the original fallback markup remains in the HTML; check browser console for errors.
