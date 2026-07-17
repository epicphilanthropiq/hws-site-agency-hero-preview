#!/usr/bin/env python3
from pathlib import Path
from bs4 import BeautifulSoup
import json

root = Path(__file__).resolve().parents[1]
domain = "https://helloworldstudio.co.zw"

for page in root.glob("*.html"):
    soup = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")
    robots = soup.find("meta", attrs={"name": "robots"})
    if robots:
        robots["content"] = "index,follow,max-image-preview:large"
    page.write_text(str(soup), encoding="utf-8")

(root / "robots.txt").write_text(
    f"User-agent: *\nAllow: /\nSitemap: {domain}/sitemap.xml\n",
    encoding="utf-8"
)

vp = root / "vercel.json"
v = json.loads(vp.read_text(encoding="utf-8"))
for rule in v.get("headers", []):
    for header in rule.get("headers", []):
        if header.get("key", "").lower() == "x-robots-tag":
            header["value"] = "index, follow"
vp.write_text(json.dumps(v, indent=2), encoding="utf-8")

cp = root / "site-config.json"
cfg = json.loads(cp.read_text(encoding="utf-8"))
cfg["environment"] = "production"
cfg["indexing_enabled"] = True
cp.write_text(json.dumps(cfg, indent=2), encoding="utf-8")
print("Public indexing enabled for", domain)
