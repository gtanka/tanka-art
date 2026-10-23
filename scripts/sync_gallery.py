#!/usr/bin/env python3
"""Sync artwork folders into the existing static gallery catalog."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
catalog = root / "content/items.json"
data = json.loads(catalog.read_text(encoding="utf-8"))
extensions = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}

for folder, category in (("jewelry", "jewelry"), ("paintings", "artworks")):
    entries = []
    base = root / "images" / folder
    if base.exists():
        for item_dir in sorted(p for p in base.iterdir() if p.is_dir()):
            photos = sorted(
                (p for p in item_dir.iterdir() if p.is_file() and p.suffix.lower() in extensions),
                key=lambda p: (not p.name.startswith("01"), p.name.lower())
            )
            if not photos:
                continue
            meta_path = item_dir / "info.json"
            meta = json.loads(meta_path.read_text(encoding="utf-8")) if meta_path.exists() else {}
            entry = {"slug": item_dir.name, "title": item_dir.name.replace("-", " ").title(),
                     "images": [p.relative_to(root).as_posix() for p in photos]}
            entry.update({k: v for k, v in meta.items() if k not in ("slug", "images")})
            entries.append(entry)
    # Keep existing manually maintained entries; update automatically managed folder entries.
    managed = {e["slug"] for e in entries}
    data[category] = [e for e in data.get(category, []) if e.get("slug") not in managed] + entries

catalog.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
