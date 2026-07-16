# HW Agency in a Box

## Product identity

- **Public product name:** HW Agency in a Box
- **Internal tool title:** Client Content Engine
- **Hello World Studio division:** Business Hub
- **Product type:** Licensed browser-based agency workflow tool
- **Current status:** Beta / technical hardening required
- **Source package:** `hw-agency-box-deploy.zip`
- **Current source format:** Single self-contained `index.html`
- **Checkout:** Beacons product URL still to be confirmed
- **Deployment URL:** Vercel project URL still to be confirmed

## What it does

HW Agency in a Box helps a solo agency or social-media manager create and organise client-specific content prompts. The user enters a client brief, chooses platforms and generates a reusable prompt library for content calendars, captions, platform-specialist content, engagement workflows, image prompts and video prompts.

The product supports:

- Client library with search
- Save, update and delete client records
- Import and export of the client library as JSON
- Multi-platform selection
- Instant built-in prompt generation
- Optional Claude-powered “Deep AI” generation
- Custom agency naming
- License-key activation
- Saved prompt history
- Copy-ready output grouped by platform

## Target users

- Solo social-media managers
- Small African and diaspora agencies
- Freelance content strategists
- Creator-management teams
- Consultants handling several client brands
- New agencies that need a repeatable delivery workflow

## Core value proposition

**Turn one client brief into a structured, reusable content prompt system—without rebuilding your process for every client.**

## Current platform coverage

- Instagram
- TikTok
- Facebook
- LinkedIn
- X / Twitter
- YouTube
- WhatsApp

## Current workflow

1. Activate the product with a license key.
2. Name the agency workspace.
3. Add a client brief.
4. Select the platforms ordered.
5. Choose Instant or Deep AI mode.
6. Generate platform-specific prompts.
7. Save the client and prompt history.
8. Export the library for backup.

## Product positioning

This belongs under **Hello World Business Hub**, with secondary connections to:

- Content Studio
- Digital Products
- AI Academy
- Creator OS membership

It should be positioned as a **system**, not a simple prompt pack.

## Recommended commercial model

The package strategy classifies multi-feature tools in Band B, generally suitable for a one-time purchase or lightweight monthly access. Final pricing must be based on the real Beacons price, support load and API costs before publishing.

Potential structure:

- **Core edition:** Instant mode, local client library and export/import
- **Pro edition:** Secure hosted AI generation, updates and premium templates
- **Agency setup service:** Done-for-you configuration and onboarding
- **Creator OS inclusion:** Core access inside the future membership

## Technical audit

### Strengths

- Fully self-contained and easy to deploy
- Works without a database in Instant mode
- Mobile-aware responsive layout
- Reduced-motion support
- Useful client import/export
- Clear, distinctive Hello World Studio visual identity
- Practical platform-specific prompt logic
- No server cost for the built-in generation mode

### Important risks before public launch

1. **Anthropic API keys are entered in the browser and stored in localStorage.**
   This is not suitable for a polished public SaaS product. A secure server-side Vercel function should call Anthropic instead.

2. **The Anthropic request is made directly from frontend JavaScript.**
   Browser calls may fail because of API security or CORS restrictions, and the user's key is exposed to the page runtime.

3. **Licensing is enforced entirely in the browser.**
   The license hashes and validation logic are present in the delivered HTML. A technically capable user could bypass the gate. This is acceptable only as light deterrence, not secure licensing.

4. **Client data is stored only on the current device.**
   Clearing browser storage, changing devices or using private browsing may remove the library unless the user exports a backup.

5. **No account system or cloud synchronisation exists.**
   The current product is a licensed local web app, not yet a multi-device SaaS.

6. **No privacy notice is shown inside the app.**
   Users need to understand that client information stays in browser storage and that Deep mode sends brief data to the selected AI provider.

7. **Hard-coded service-package prices appear inside the client brief.**
   These should be reviewed before public sale because they may not match the final agency packages.

## Recommended technical roadmap

### Release 1 — Safe sellable core

- Keep Instant mode
- Keep local client library
- Add a privacy and data-storage notice
- Add backup reminders
- Remove direct browser API-key collection
- Label the product clearly as device-based
- Add version and support information
- Confirm Vercel and Beacons URLs

### Release 2 — Secure AI edition

- Add a Vercel serverless API route
- Store Anthropic key only in Vercel environment variables
- Add per-license usage limits
- Add server-side license verification
- Add basic error logging
- Add rate limiting

### Release 3 — Agency cloud

- User accounts
- Encrypted cloud client library
- Multi-device access
- Team roles
- Shared templates
- Usage dashboard
- Subscription billing

## Website messaging

### Headline

**Run Your Content Agency From One Clear Workspace.**

### Supporting line

Save every client brief, generate platform-specific content systems and reuse the work without starting from zero each month.

### Primary CTA

**Get Agency in a Box**

### Secondary CTA

**See How It Works**

## Information still required

- Exact Vercel deployment URL
- Exact Beacons product checkout URL
- Confirmed public price
- Support email
- Whether buyers bring their own API key or Deep mode will be hosted
- Final license-delivery process
- Product version number
