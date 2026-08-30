# Launch checklist

The site is **live at https://swiftconsultancy.us**. Items marked DONE are
finished; the rest need a business decision, a real credential, or legal review.

Run `grep -rn "PLACEHOLDER" src/` at any time to re-derive this list.

---

## 1. Business details — DONE

Set in [`src/lib/site.ts`](src/lib/site.ts): email `swiftsupports@gmail.com`, phone
`+91 89561 10805`, WhatsApp `918956110805`. Changing that file updates the header,
footer, contact page, WhatsApp button, and structured data together.

Still open: the LinkedIn URL in `social` is `#`, and business hours still read
"Mon–Fri, 9:00 AM – 7:00 PM ET" — confirm that matches how you actually operate.

## 2. Legal pages — publishable, one open decision

All three pages are complete and dated 30 August 2026. The "Template notice"
banners are gone, and every bracketed gap is filled.

The privacy policy now describes what the site actually does — Vercel Analytics
(cookieless), Resend for delivering enquiries, Cloudflare Turnstile for spam,
no database, no accounts, no uploads. **Keep it in step with the stack:** adding
a CRM, an ads pixel, or a CMS means updating sections 2 and 4.

Terms and the service agreement point fee, cancellation, and refund detail at
the individual written agreement given to each candidate before payment, which
matches how you actually work.

**Open decision — governing law.** Both pages currently say "the jurisdiction in
which Swift Consultancy is established" rather than naming one, because the
registered entity and country have not been confirmed. Once you know (the phone
is +91 while the domain is `.us`, so it matters), name it in
[`terms/page.tsx`](src/app/terms/page.tsx) §11 and
[`service-agreement/page.tsx`](src/app/service-agreement/page.tsx) §10. If the
registered name differs from "Swift Consultancy", update it in both files and in
the privacy policy §1.

These pages are written to be honest and readable, not to replace legal advice.
If the business grows, having a professional read them is still worthwhile.

## 3. Testimonials — DONE

Six real quotes are live in
[`src/content/testimonials.ts`](src/content/testimonials.ts), attributed by
technology domain rather than by name. The "Example placeholder" badges are gone.

Before launch, confirm each candidate has given permission for their words to be
published, even anonymously. To name someone who consents, add it to `context`.
Keep the house rules: no employer names, no salary figures, no promised outcomes.

## 4. Pricing FAQ — blocks launch

The payment-terms answer in
[`src/content/faq.ts:58`](src/content/faq.ts) is a placeholder. It needs your
accepted methods, instalment options, currency, and refund terms — and should
match the service agreement exactly.

## 5. Photography — recommended before launch

Five licensed-or-replaceable images in `public/images/`, catalogued in
[`src/lib/images.ts`](src/lib/images.ts). They are currently Unsplash photos:
fine to ship, better replaced with real brand photography.

If you swap the hero, **rename the file**. Next caches optimized variants per
path, so reusing `hero-session.jpg` will keep serving the old image from the
optimizer and any CDN. Keep the subject in the right half — the headline sits on
the left.

## 6. Environment variables — form stays in demo mode without these

Copy `.env.example` to `.env.local` locally, and set the same keys in Vercel
(Production + Preview).

- `RESEND_API_KEY` — **set** in `.env.local` and in Vercel (Production + Preview).
- `CONSULTATION_INBOX` — **set** to `swiftsupports@gmail.com`, locally and in Vercel.
- `CONSULTATION_FROM` — **needs attention.** Resend only sends from a domain you
  have verified, and `gmail.com` cannot be verified, so the sender cannot be the
  Gmail address. It is currently `onboarding@resend.dev`, which works but
  **only delivers to the address that owns the Resend account.** Verify
  `swiftconsultancy.us` in Resend, then change this to
  `Swift Consultancy <hello@swiftconsultancy.us>`.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` — **still missing.**
  Free from the Cloudflare dashboard. With neither key set, Turnstile is treated as switched off and the honeypot
  is the only spam protection. Set both to switch it on — no code change needed.
- `NEXT_PUBLIC_CAL_LINK` — optional. Set it to show a booking calendar beside
  the form; leave empty and the calendar is omitted entirely.

Without Resend/Turnstile the form validates and acknowledges locally in
development, and **fails closed in production when half-configured** with a "please email us
directly" message. It never silently drops an enquiry.

`.env.local` is gitignored and must never be committed. The current Resend key
was shared over chat, so rotate it in the Resend dashboard once delivery is
confirmed working, and update both `.env.local` and Vercel.

## 7. Deployment — DONE

Live at **https://swiftconsultancy.us** and **https://www.swiftconsultancy.us**.

- Vercel project: `swiftsupports-4842/swift-consultancy`
- Repository: https://github.com/swiftsupports-sys/Website
- DNS at Namecheap: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`
- SSL issued for both hostnames, auto-renewing
- Environment variables set for Production and Preview
- GitHub connected to Vercel, so every push to `main` deploys automatically

Verified on the live domain: all 11 pages return 200, the 404 works, sitemap and
robots are served, and the security headers are applied.

Note: from some networks the apex IP `76.76.21.21` can be slow or unreachable
while `www` resolves fine. If that happens, replace the apex A record with an
**ALIAS** record pointing at `cname.vercel-dns.com`.

## 8. Deliberately not done

- **Content-Security-Policy.** Next injects inline bootstrap scripts, so a
  useful policy needs per-request nonces from middleware. A policy with
  `'unsafe-inline'` would look protective while permitting what CSP exists to
  prevent. The other security headers are set in `next.config.ts`. Add the
  nonce middleware once Turnstile and analytics can be tested against it in a
  preview deploy.
- **A CMS.** Content is typed data in `src/content/`. Wire Sanity (or similar)
  behind those same types if non-technical staff need to edit copy.
- **Analytics goals.** Vercel Analytics is installed and collecting page views;
  CTA-level conversion tracking is not configured.
