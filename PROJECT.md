# Tanka Art — Project Map

Last verified against GitHub main: 2026-10-24.
Repository: gtanka/tanka-art. Public site: https://tankaart.com/. Default branch: main.

## READ THIS FIRST before editing
1. Fetch this PROJECT.md and inspect the CURRENT files you intend to edit; do not reconstruct the site from memory or overwrite unrelated changes.
2. Work on the existing vanilla HTML/CSS/JavaScript site. No React, build pipeline, or server backend is present in the inspected entry files.
3. Preserve bilingual English/Hebrew UI, Hebrew RTL, existing layout and artwork image proportions.
4. When changing visible JavaScript or CSS, check cache-busting version parameters in index.html; verify published site after commit. Do not claim deployment success without checking.
5. Keep sitemap.xml in sync with any added/removed public artwork or project pages; include both English and Hebrew routes.
6. Never commit secrets to this public repository.

## Main files and responsibilities
- index.html — HTML shell, navigation/header/footer, EN/HE language buttons, empty <main id="main">, script and CSS includes. The page content is rendered dynamically by app.js.
- app.js — ALL page rendering, routing, translation dictionary, language switching, lightbox, contact form and content fetching.
- styles.css — global styling, galleries, mobile layout, Hebrew RTL.
- content/site.json — global editable copy, about text, home intro, contact/social/shop settings; Hebrew variants use suffix He.
- content/items.json — jewelry, artworks, journal and digitalProject data.
- images/ — logo and banner images. Jewelry item photos live in images/jewelry/<slug>/.
- sitemap.xml — manually maintained URL listing and hreflang EN/HE counterparts.
- robots.txt — links to sitemap.
- README.md — existing Formspree integration documentation.

## Routes and page logic
- / and /he/ -> home() in app.js; Artworks tile FIRST, Jewelry SECOND.
- /artworks and /he/artworks -> artworksOverview(): New Works section and a digital series category.
- /artworks/project-1 and /he/artworks/project-1 -> digitalProject(): series intro and grid of works, caption under each work.
- /jewelry and /he/jewelry -> list('jewelry'); /jewelry/<slug> -> detail().
- /artworks/<slug> -> detail() for regular artworks in content/items.json.
- /journal, /journal/<slug>, /about, /contact with /he counterparts.
- Routing uses pathname; Hebrew is selected with /he prefix. localStorage stores tanka-language.
- EN/HE interface strings are in app.js translations.en and translations.he; localized item fields use titleHe, descriptionHe, etc.
- app.js loads /content/site.json and /content/items.json via Promise.all. If either request fails, the main area shows a load error; diagnose both fetches if only header is visible.

## Agreed artwork series naming (2026-10-24)
- English: Cycles
- Hebrew: סחרורים
- REPLACES Patternness / תבניתיות (and any earlier Patterns naming).
- Current implementation labels this project via translations.en.projectOne and translations.he.projectOne in app.js. Its current route remains /artworks/project-1 unless a route migration is explicitly requested.
- The user requested square artwork presentation and preservation of original proportions; do not alter artwork shapes or details.
- Digital project text and works are stored under digitalProject in content/items.json; the works grid is rendered by digitalProject() in app.js.

## Current design decisions
- Site is bilingual English and Hebrew only (no Russian).
- Artworks precede Jewelry on home page.
- New Works and the digital project are vertically stacked on the Artworks page.
- Jewelry uses a grid; individual jewelry entries have dedicated detail pages.
- Keep original photographic proportions and details; do not enlarge beads or distort artwork.
- Existing hero/banner assets and styling should not be changed without request.

## Adding content
- New jewelry item: add an object to content/items.json jewelry with unique slug, bilingual text, images array, then add EN/HE detail URLs to sitemap.xml.
- New regular artwork: similarly add to artworks array.
- New Cycles piece: add to digitalProject.works with image, title and titleHe; currently this displays in the project grid with captions, NOT separate detail pages. If separate detail pages are requested, implement routes and pages and update sitemap.xml.
- For changes to project description, edit content/items.json digitalProject.description / descriptionHe; for fallback text, see app.js translations.

## Contact
- Contact form is handled in app.js via Formspree. See README.md for integration details. Do not put credentials in repo.

## Known issue to investigate
- The user reported that on Safari and Chrome only the top menu appeared. Inspect browser console/network for app.js and content JSON errors, routing and cache versions before changing layout.

## Update this file after structural changes
Document new routes, content schemas, deployment settings, and architectural decisions here, so future sessions can resume reliably.
