#!/usr/bin/env python3
from pathlib import Path
from bs4 import BeautifulSoup
import argparse, json, re
from urllib.parse import urljoin

parser = argparse.ArgumentParser(
    description="Prepare the static Hello World Studio package for a confirmed production domain."
)
parser.add_argument("--domain", required=True, help="Final HTTPS domain, e.g. https://helloworldstudio.co.zw")
parser.add_argument("--enable-indexing", action="store_true", help="Remove preview noindex controls.")
args = parser.parse_args()

root = Path(__file__).resolve().parents[1]
domain = args.domain.rstrip("/")
if not domain.startswith("https://"):
    raise SystemExit("Use a full HTTPS domain.")

for page in root.glob("*.html"):
    soup = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")
    route = "/" if page.name == "index.html" else f"/{page.stem}"
    canonical_url = domain + route

    canonical = soup.find("link", rel="canonical")
    if not canonical:
        canonical = soup.new_tag("link", rel="canonical")
        soup.head.append(canonical)
    canonical["href"] = canonical_url

    og_url = soup.find("meta", attrs={"property":"og:url"})
    if not og_url:
        og_url = soup.new_tag("meta")
        og_url["property"] = "og:url"
        soup.head.append(og_url)
    og_url["content"] = canonical_url

    robots = soup.find("meta", attrs={"name":"robots"})
    if args.enable_indexing:
        if robots:
            robots["content"] = "index,follow,max-image-preview:large"
    else:
        if not robots:
            robots = soup.new_tag("meta")
            robots["name"] = "robots"
            soup.head.append(robots)
        robots["content"] = "noindex,nofollow,noarchive"

    page.write_text(str(soup), encoding="utf-8")

# Update sitemap.
routes = json.loads((root/"route-registry.json").read_text(encoding="utf-8"))
urls = []
for item in routes:
    route = item["route"]
    if ":" in route or "*" in route or "(" in route:
        continue
    urls.append(domain + (route if route != "/" else "/"))
sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/sitemap/0.9">']
for url in sorted(set(urls)):
    sitemap.append(f"  <url><loc>{url}</loc></url>")
sitemap.append("</urlset>")
(root/"sitemap.xml").write_text("\n".join(sitemap)+"\n", encoding="utf-8")

# Update robots.
if args.enable_indexing:
    robots_text = f"User-agent: *\nAllow: /\nSitemap: {domain}/sitemap.xml\n"
else:
    robots_text = "User-agent: *\nDisallow: /\n"
(root/"robots.txt").write_text(robots_text, encoding="utf-8")

# Update Vercel noindex header.
vercel_path = root/"vercel.json"
vercel = json.loads(vercel_path.read_text(encoding="utf-8"))
for rule in vercel.get("headers", []):
    for header in rule.get("headers", []):
        if header.get("key","").lower() == "x-robots-tag":
            header["value"] = "index, follow" if args.enable_indexing else "noindex, nofollow, noarchive"
vercel_path.write_text(json.dumps(vercel, indent=2), encoding="utf-8")

config_path = root/"site-config.json"
config = json.loads(config_path.read_text(encoding="utf-8"))
config["environment"] = "production"
config["production_domain"] = domain
config["indexing_enabled"] = bool(args.enable_indexing)
config_path.write_text(json.dumps(config, indent=2), encoding="utf-8")

print("Prepared production package for", domain)
print("Indexing enabled:", bool(args.enable_indexing))
