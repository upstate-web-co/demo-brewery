# Launch Checklist — Clinker Brewing Co.

## Legal & Content

- [x] `noindex` removed from all pages
- [x] No "Iron Rail Brewing" text anywhere in source
- [x] No placeholder text (Lorem ipsum, TODO, INSERT, Coming Soon)
- [x] Demo disclaimer banner removed
- [x] All addresses show 412 S Main St, Greenville, SC 29601
- [x] Social links verified: @clinkerbrewing (Instagram), Clinker Brewing Co. (Untappd)
- [x] No unverified social handles linked (TikTok removed — not confirmed as owned)
- [x] No fake metrics, invented testimonials, or fabricated review counts
- [x] No booking platforms or payment portals linked
- [x] ATTRIBUTION.md complete with all image sources
- [ ] **BLOCKER:** Replace Unsplash stock photos with real taproom photography (see ATTRIBUTION.md)
- [ ] **BLOCKER:** Get real phone number from Marcus (currently uses 555 placeholder)

## SEO

- [x] Unique `<title>` on every page
- [x] `<meta name="description">` on every page (under 160 chars)
- [x] Open Graph tags on every page (og:title, og:description, og:image, og:url)
- [x] JSON-LD `Brewery` schema on homepage with address, hours, social profiles
- [x] Canonical tags on all pages
- [x] `sitemap-index.xml` generated with all pages at clinkerbrewing.com
- [x] `robots.txt` allows indexing (`Allow: /`) with sitemap reference
- [x] `favicon.svg` present

## Technical

- [x] `npm run build` completes with zero errors
- [x] All pages in build output: Home, About, Gallery, Contact, Blog (index + 2 posts)
- [x] Contact form API route (`POST /api/contact`) wired to Resend
- [x] AI chat API route (`POST /api/chat`) functional with fallback responses
- [x] No secrets in version control (`.dev.vars` and `.env` in `.gitignore`)
- [x] `wrangler.toml` configured: `name = "clinker-brewing"`, output dir `dist`
- [ ] Set `RESEND_API_KEY` in CF Pages environment variables
- [ ] Set `ANTHROPIC_API_KEY` in CF Pages environment variables
- [ ] Send test contact form submission and verify delivery

## Accessibility

- [x] Skip-to-content link as first focusable element
- [x] Focus-visible styles (amber outline) on all interactive elements
- [x] Keyboard navigation: Escape closes mobile menu
- [x] All images have descriptive alt text
- [x] All form inputs have associated `<label>` elements
- [x] Heading hierarchy correct (one h1 per page)
- [x] ARIA attributes: aria-current, aria-label, aria-expanded, aria-controls
- [x] Minimum 44x44px tap targets on mobile
- [x] Color contrast: slag #A8A29E on coal #1C1917 passes AA (5.4:1)
- [x] `prefers-reduced-motion` disables animations

## Deployment

- [ ] Connect GitHub repo to Cloudflare Pages
- [ ] Add custom domain `clinkerbrewing.com` in CF Pages
- [ ] Verify SSL certificate is active (Cloudflare auto-provisions)
- [ ] Verify HTTP → HTTPS redirect
- [ ] Verify www → apex redirect
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

## Post-Launch Monitoring

- [ ] Test all 5 pages load over HTTPS
- [ ] Test contact form end-to-end in production
- [ ] Test AI chat in production
- [ ] Verify no mixed content warnings
- [ ] Check Google Search Console for crawl errors after 48 hours
