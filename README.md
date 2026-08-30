# Swift Consultancy — swiftconsultancy.us

A premium, responsive informational website for a US-focused technology career
consultancy. Static-rendered marketing pages, a validated consultation form
that emails enquiries, and no accounts, dashboards, or candidate tracking of
any kind.

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file) |
| UI primitives | shadcn-style components on Radix (`src/components/ui`) |
| Animation | Motion for React (`Reveal`, reduced-motion aware) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod, submitted through a Server Action |
| Email | Resend |
| Spam protection | Cloudflare Turnstile (server-verified) |
| Analytics | Vercel Analytics + Speed Insights |
| Tests | Vitest (unit) + Playwright (e2e) |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional for local work — see Environment below
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright suite (builds and serves automatically) |

Playwright runs the full Chromium build rather than the headless shell, so
install it once with `npx playwright install chromium`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Header, footer, fonts, metadata, JSON-LD, analytics
│   ├── page.tsx              Home
│   ├── about|services|how-it-works|domains|pricing|success-stories|contact/
│   ├── privacy-policy|terms|service-agreement/
│   ├── actions/consultation.ts   Server Action: validate → verify → email
│   ├── opengraph-image.tsx   Generated social card (1200×630)
│   ├── sitemap.ts, robots.ts, not-found.tsx
│   └── globals.css           Design tokens + base layer
├── components/
│   ├── site/                 Header, footer, hero, cards, CTA, form, FAB
│   └── ui/                   Button, accordion, sheet, form controls
├── content/                  Typed page content — the CMS-free source of truth
└── lib/                      site config, schemas, images, structured data
```

Content lives in `src/content/*.ts` as typed data, so copy changes never
require touching JSX. A headless CMS can be layered on later if non-technical
staff need to edit services, packages, or testimonials themselves.

## Before launch — replace these placeholders

Search the repo for `PLACEHOLDER` to find every marked spot.

| What | Where |
| --- | --- |
| Email, phone, WhatsApp number, business hours | `src/lib/site.ts` |
| LinkedIn / social URLs | `src/lib/site.ts` (`social`) |
| Testimonials (all six are labelled placeholders) | `src/content/testimonials.ts` |
| Payment-terms FAQ answer | `src/content/faq.ts` |
| Legal wording — company name, dates, jurisdiction | the three pages under `src/app/` |
| Photography | `public/images/*.jpg` + alt text in `src/lib/images.ts` |

The three legal pages are **templates, not legal advice**. Each carries a
visible template notice; have counsel review and adapt them, then delete the
`notice` prop from `LegalBody`.

## Environment

Copy `.env.example` to `.env.local`. All keys are optional locally:

- **No Resend keys** — the form validates and reports "demo mode"; the enquiry
  is logged to the server console instead of emailed. In production, missing
  keys make the action fail closed and tell the visitor to email directly.
- **No Turnstile keys** — the widget is not rendered and verification is
  skipped locally. In production a missing secret rejects submissions rather
  than accepting unverified traffic.

## Consultation form flow

```
Candidate submits
      ↓  React Hook Form + Zod (client-side convenience pass)
Server Action `submitConsultation`
      ↓  Zod re-validates — Server Actions are reachable by direct POST
      ↓  Honeypot check (silently accepted)
      ↓  Turnstile verified server-side against Cloudflare
      ↓  Resend delivers the enquiry to CONSULTATION_INBOX
Success state + toast
```

Nothing is stored: no database, no account, no resume upload.

## Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel — the framework is detected
   automatically.
2. Add the four environment variables from `.env.example` to Production and
   Preview.
3. Point `swiftconsultancy.us` at the project and set it as the primary domain.
4. Confirm `site.url` in `src/lib/site.ts` matches the live domain — canonical
   URLs, the sitemap, robots, and OG tags all derive from it.

## SEO

Per-page `metadata` with canonical URLs, a generated `sitemap.xml` and
`robots.txt`, a build-time Open Graph image, `ProfessionalService` and
`FAQPage` structured data, and semantic headings throughout. Every page is
statically prerendered.

## Positioning guardrails

The copy deliberately avoids job guarantees, named employer claims, fake
partner logos, and invented metrics — and a unit test asserts the FAQ never
promises a guaranteed job. If you edit the content, keep it that way: "we do
not guarantee jobs, offers, interviews, salaries, or placement" appears on the
About, Services, Pricing, and FAQ sections by design.

## Optional next steps

- **Scheduling embed.** Calendly or Cal.com can replace the "confirm a time"
  step — embed it on `/contact` beside the form, or link it from the CTA.
- **CMS.** Sanity or similar, backed by the existing types in `src/content`.
- **Analytics goals.** Vercel Analytics is wired up; add custom events on the
  consultation CTA to measure conversion.
