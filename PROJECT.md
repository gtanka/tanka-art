# Tanka Art — Project Map

Updated 2026-10-28. Site is fully static HTML, deployed from GitHub main to Cloudflare Pages.

## Architecture (IMPORTANT)
- Each public page has a real index.html file with complete visible content; no JavaScript rendering, routing, translation or data fetching.
- English pages are under /, Hebrew pages under /he/. Every page has its own complete translated header, native navigation links and language links.
- styles.css contains global styling. static.js is ONLY for mobile menu toggling and enlarging jewelry photos in the lightbox.
- Do NOT use app.js, client-side rendering, JSON fetches, or localStorage language selection. Old content/*.json are legacy reference data, NOT live site content.
- New items must be added as English and Hebrew HTML detail pages, linked in both gallery HTML files and sitemap.xml. Update canonical and hreflang as appropriate.
- Existing URL routes must stay stable. Keep RTL Hebrew, original image proportions, and original design.
- Journal article pages use additional article-specific inline CSS plus global styles.css for navigation.
- Contact uses a native HTML POST form to Formspree; no JavaScript required.
- Cloudflare Pages deploys from main; verify published output after commits before claiming it is live.

## Routes
- / and /he/ — home; Artworks first, Jewelry second.
- /artworks and /he/artworks — New Works and Cycles / סחרורים.
- /artworks/project-1 and /he/artworks/project-1 — digital series.
- /jewelry and /he/jewelry — galleries; /jewelry/pearl-necklace-001 and /he/jewelry/pearl-necklace-001 — detail.
- /journal and /he/journal — article index; /journal/discovering-alicja-kwade and Hebrew counterpart — article.
- /about, /contact and Hebrew counterparts.

## Content and publishing
- Edit actual HTML, not legacy content JSON, for visible text, galleries and descriptions.
- Add new public URLs to sitemap.xml, preserving English/Hebrew counterparts.
- Keep metadata, canonical, alternate hreflang, and accessibility consistent.
- Do not commit secrets. Preserve image assets and layout.
