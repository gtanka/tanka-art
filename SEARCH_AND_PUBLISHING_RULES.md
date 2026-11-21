# Tanka Art — Search, AI Discovery & Publishing Rules
Updated: 2026-11-19

## Purpose
Keep Tanka Art discoverable through traditional search engines, image search, Pinterest and AI-assisted product discovery (including ChatGPT). These are best practices, NOT a guarantee that an AI assistant will recommend a product.

## Source of truth
- Read PROJECT.md before modifying the site. The live site is static HTML, not content JSON.
- The guide in tmp/CONTENT_GUIDE.md documents the archived JSON-driven prototype.
- Inspect current files before changes; never assume old route lists or product counts are accurate.
- As of 2026-11-19 there are three jewelry products: two necklaces and one bracelet. Do not invent additional products.

## SEO and AI-readable content
- Each product needs its own crawlable English and Hebrew static HTML detail page, linked from its respective jewelry listing.
- Keep product names, concise original descriptions, material names, and relevant geographic information in visible HTML text, not solely in images, alt attributes, CSS, or JavaScript.
- Write factual, specific product copy. Use terms such as handmade jewelry, artist-made, freshwater pearls, sterling silver 925, gold-filled, mother-of-pearl ONLY where true for the item.
- Describe the artist/business accurately: Tanka Art, independent artist, Tel Aviv–Yafo, Israel. Make it clear that the website showcases original artwork as well as handmade jewelry.
- Do not claim products are available to purchase or promise shipping until checkout/shop availability and shipping destinations are confirmed. Use honest 'Shop coming soon' language where appropriate.
- Ensure each page has a unique descriptive <title>, meta description, canonical URL, correct EN/HE hreflang links, and meaningful headings.
- Use descriptive image filenames and accurate alt text for each meaningful product image, including multiple views/details. Never keyword-stuff or repeat identical alt text for every photo.
- Product images must be accessible via normal image URLs; keep clear photos and avoid altering the appearance of stones or materials.
- Where appropriate, use valid Schema.org JSON-LD (Product for actual items; Organization/Person or WebSite for brand/site) with only verifiable attributes. Do not invent prices, availability, ratings, reviews, shipping policies, or offers. Validate markup.
- Preserve robots.txt and sitemap.xml; include new canonical pages and image URLs where applicable. Check that important pages and images are not blocked from indexing. Submit/inspect URLs via Google Search Console after significant changes.
- Crawling/indexing and inclusion in ChatGPT recommendations are not guaranteed. Never imply that adding a special file, tags, or markup guarantees AI visibility.

## Jewelry layout and UX rules (2026-11-19)
- On jewelry listing cards, show the item name and a short, subtle description below the thumbnail.
- Inside each jewelry detail page, show title and shop status/link first, then descriptive text, then a grid of consistently sized smaller image previews; clicking opens a larger view.
- Image zoom must allow panning the enlarged photo without moving the whole page; reset UI must not overlap controls or remain visible after reset.
- Use typography consistent with the artwork galleries across EN/HE pages.
- Keep only one 'Coming Soon' notice in the intended top position; avoid duplicate lower notices.
- Keep product URLs and image-folder names clean and hyphenated, without spaces or %20; preserve old routes with redirects if renaming.
- Hebrew product text must use the correct item type: צמיד for bracelet, שרשרת for necklace. For pearl and mother-of-pearl necklace, prefer 'שרשרת פנינים וצדף' where appropriate; check the actual page wording.
- Do not duplicate artwork image libraries unnecessarily; preserve image quality, original materials, and consistent thumbnails.

## Pinterest and external discovery
- Publish original Pins using a product photo, accurate title and description, and a direct URL to that product's page (not just the homepage).
- Organize Pins in public Boards such as Tanka Art | Handmade Jewelry and Tanka Art | Original Artworks.
- Pinterest topic tags must be selected from Pinterest's available suggestions; do not assume custom tags exist.
- Where accurate, include search-friendly phrases in prose: artist-made, handcrafted in Tel Aviv, freshwater pearl necklace, sterling silver, mother-of-pearl, gold-filled components.
- Multiple photos/angles can be separate Pins pointing to the same product page. Do not misrepresent stock or availability.

## Change checklist
1. Read PROJECT.md and this file; inspect actual current pages, images, scripts and routes.
2. Make EN and HE updates together; verify language links, RTL and text correctness.
3. Keep product facts accurate, static visible HTML, and metadata/schema consistent.
4. Check responsive grid, image lightbox/zoom and browser back/scroll behavior.
5. Update sitemap.xml and relevant internal links when adding/changing pages.
6. Commit to main and verify deployed pages before saying changes are live.
7. Update this document when new SEO, AI discovery, product presentation or Pinterest rules are agreed.
