# Tanka Art — Project Map

Updated 2026-10-28. Site is fully static HTML, deployed from GitHub main to Cloudflare Pages.

## Architecture (IMPORTANT)
- Each public page has a real index.html file with complete visible content; no JavaScript rendering, routing, translation or data fetching.
- English pages are under /, Hebrew pages under /he/. Every page has its own complete translated header, native navigation links and language links.
- styles.css contains global styling, responsive CSS Grid layouts and media queries. Grid resizing on desktop/tablet/mobile and on orientation changes is CSS-only, never JavaScript. static.js currently handles mobile menu toggling and enlarging jewelry photos in the lightbox. Desired next simplification: replace mobile menu toggle with native HTML <details>/<summary>, then keep JavaScript ONLY for image enlargement. Do not claim this last simplification has been implemented until it has been committed and tested.
- Do NOT use app.js, client-side rendering, JSON fetches, or localStorage language selection. The legacy catalog is archived under tmp/content/.
- New items must be added as English and Hebrew HTML detail pages, linked in both gallery HTML files and sitemap.xml. Update canonical and hreflang as appropriate.
- Existing URL routes must stay stable. Keep RTL Hebrew, original image proportions, and original design.
- Journal article pages use additional article-specific inline CSS plus global styles.css for navigation.
- Contact uses a native HTML POST form to Formspree; no JavaScript required.
- Cloudflare Pages deploys from main; verify published output after commits before claiming it is live.

## Routes
- / and /he/ — home; Artworks first, Jewelry second.
- /artworks and /he/artworks — New Works and Cycles / סחרורים.
- /artworks/cycles and /he/artworks/cycles — digital series.
- /jewelry and /he/jewelry — galleries; /jewelry/<slug> and /he/jewelry/<slug> — detail.
- /journal and /he/journal — article index; /journal/discovering-alicja-kwade and Hebrew counterpart — article.
- /about, /contact and Hebrew counterparts.

## Content and publishing
- Edit actual HTML, not legacy content JSON, for visible text, galleries and descriptions.
- Add new public URLs to sitemap.xml, preserving English/Hebrew counterparts.
- Keep metadata, canonical, alternate hreflang, and accessibility consistent.
- Do not commit secrets. Preserve image assets and layout.

## Artwork gallery update (2026-11-11)
- Each artwork series has a static HTML image grid in English and Hebrew; images are explicitly listed from `images/artworks/<series>/` in the page HTML (no runtime directory fetching).
- Square thumbnails use CSS `object-fit: cover`; lightbox shows complete original image with `object-fit: contain`, and supports previous/next/Escape.
- `cycles` image folder maps to `/artworks/cycles` and `/he/artworks/cycles`; former `project-1` URLs redirect permanently to these routes.
- `new-works` image folder currently contains no JPEGs, so its pages remain placeholders until images are uploaded.
- When adding new images later, regenerate the HTML lists in both languages; static hosting does not automatically enumerate folders.

## Jewelry photos
- Each product uses one folder in `images/jewelry/`: `mother-of-pearl-necklace`, `small-pearl-necklace`, or `quartz-silver-bracelet`.
- Both languages share the same photos. `set.jpg` is the cover on both jewelry listings and also appears in the detail gallery. Each folder also contains `Onpack.jpg`, `Hold.jpg`, `Model.jpg`, and `Pic.jpg`.
- To replace a photo, upload the new JPEG to the same path with the exact same filename, including capitalization. To add a new gallery photo, add an image entry to both static product pages.
- Archived photos and the legacy catalog workflow are under `tmp/`.
