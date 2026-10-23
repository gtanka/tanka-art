# Tanka Art — content guide

A lightweight static portfolio built with HTML, CSS and vanilla JavaScript. No database, framework, or paid services required.

## Collections
Edit `content/items.json`. Add entries to `jewelry`, `artworks`, or `journal`. Each entry must have a unique URL-friendly `slug`.

Example jewelry:
```json
{
  "slug": "quartz-bracelet-01",
  "title": "Quartz Bracelet",
  "materials": "Quartz, sterling silver",
  "dimensions": "18 cm",
  "description": "An original bracelet.",
  "images": ["images/jewelry/quartz-01.webp", "images/jewelry/quartz-02.webp"],
  "etsyUrl": ""
}
```
Example artwork:
```json
{
  "slug": "study-01",
  "title": "Study No. 1",
  "medium": "Watercolor on paper",
  "dimensions": "21 × 30 cm",
  "year": "2026",
  "description": "",
  "images": ["images/artworks/study-01.webp"]
}
```
Example journal:
```json
{
  "slug": "about-quartz",
  "title": "Notes on Quartz",
  "date": "2026-10-22",
  "cover": "images/journal/quartz.webp",
  "paragraphs": ["First paragraph.", "Second paragraph."]
}
```
Upload referenced image files to the same paths in the repository. Images are never cropped in the gallery's detail view or lightbox.

## Site settings
Edit `content/site.json` to set the hero image, biography, contact email, Etsy shop URL and Instagram URL. Leave unset values empty.

## Preview and deploy
For local preview, serve the repository folder with a static HTTP server (opening index.html directly from the filesystem can prevent JSON fetches). For example: `python3 -m http.server 8000`, then open localhost:8000.

Cloudflare Pages: connect this GitHub repository, use production branch `main`, choose no framework, no build command, and output directory `/` (repository root). If the Cloudflare UI requires a build output directory, use `.`. Add your custom domain in Cloudflare Pages after the preview is approved.

## Notes
- The gallery currently has empty collections by design. No fake products or images are published.
- Hash-based URLs (`#/jewelry/item-slug`) keep navigation compatible with basic static hosting.
- The artist can ask a coding assistant to add content by editing JSON and uploading images; no HTML pages are needed.
- This initial version has not yet been browser-tested in production.


## Folder-based photo library (automatic)

Every individual piece gets its own permanent folder. The folder name is its unique ID.

```text
images/
├── jewelry/
│   ├── pearl-necklace-001/
│   │   ├── 01-main.jpg
│   │   ├── 02-detail.jpg
│   │   ├── 03-model.jpg
│   │   └── info.json
│   └── bracelet-002/
│       ├── 01-main.jpg
│       └── 02-detail.jpg
└── paintings/
    └── painting-001/
        ├── 01-main.jpg
        └── 02-detail.jpg
```

- Upload photos into the matching item's folder on GitHub. Keep the original proportions and colors; square photos are recommended, not required.
- `01-main.jpg` is the gallery cover. Add as many numbered photos as desired.
- Optional `info.json` contains the title, materials/medium, dimensions, description, Etsy URL and Hebrew translations (`titleHe`, `materialsHe`, `descriptionHe`).
- The GitHub Actions workflow `.github/workflows/sync-gallery.yml` runs `scripts/sync_gallery.py` after photo uploads, updating `content/items.json` automatically. GitHub Actions must be enabled with permission to write repository contents.
- The site itself still reads `content/items.json`; a bare folder does not show in the gallery until at least one photo is present and the sync succeeds.
- Existing demo entries are preserved for now; remove them separately when ready to publish real pieces.
