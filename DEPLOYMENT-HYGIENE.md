# Deployment Hygiene v5.1

Internal QA reports, release notes, configuration files and production scripts remain in the GitHub repository for maintenance.

Vercel redirects direct public requests for these files to the site's 404 route.

The standards-based `.well-known/security.txt` remains publicly accessible.

Preview noindex protection remains enabled.
