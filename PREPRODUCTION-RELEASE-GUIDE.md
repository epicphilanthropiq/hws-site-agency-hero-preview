# Hello World Studio Preproduction Release Candidate v5

## What this release does
- Keeps the isolated preview protected from indexing.
- Removes inherited active-state labels from announcement links.
- Generates a complete route registry.
- Generates automated JSON and Markdown QA reports.
- Includes a safe production-preparation script.
- Does not guess the final domain.
- Does not enable analytics or the voice assistant.

## Production switch
After the final domain is confirmed, run:

```bash
python scripts/prepare-production.py --domain https://YOUR-DOMAIN --enable-indexing
```

Run it only on the release copy intended for the public domain.

## Still needed before public launch
- Final product screenshots and approved artwork.
- Confirmed Beacons URLs for every paid product.
- Approved client testimonials and visuals.
- Legal review of policy drafts.
- Final domain confirmation.
- Accessibility testing and later voice-assistant implementation.
