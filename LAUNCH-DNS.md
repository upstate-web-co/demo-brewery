# Launch DNS & Deployment — clinkerbrewing.com

## 1. Cloudflare Pages Project Setup

### Connect Repository
1. Go to Cloudflare Dashboard → Pages → Create a project
2. Connect the `upstate-web-co/demo-brewery` GitHub repo
3. Set build configuration:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** Set `NODE_VERSION=20` in environment variables

### Environment Variables (CF Pages → Settings → Environment Variables)
| Variable | Value | Environment |
|---|---|---|
| `RESEND_API_KEY` | `re_...` (from Resend dashboard) | Production |
| `ANTHROPIC_API_KEY` | `sk-ant-...` (for AI chat) | Production |

**Never commit these values.** `.dev.vars` is gitignored for local development.

## 2. DNS Records

### Option A: Cloudflare-managed DNS (recommended)
If the domain's nameservers already point to Cloudflare:

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `clinkerbrewing.com` | `clinker-brewing.pages.dev` | Proxied |
| CNAME | `www` | `clinkerbrewing.com` | Proxied |

### Option B: External DNS
If DNS is managed elsewhere (GoDaddy, Namecheap, etc.):

| Type | Name | Content | TTL |
|---|---|---|---|
| CNAME | `@` | `clinker-brewing.pages.dev` | 300 |
| CNAME | `www` | `clinkerbrewing.com` | 300 |

Note: Some registrars don't support CNAME on apex (`@`). In that case, use Cloudflare DNS
(transfer nameservers) or an ALIAS/ANAME record if supported.

## 3. Custom Domain in CF Pages

1. CF Dashboard → Pages → `clinker-brewing` → Custom Domains
2. Click **Set up a custom domain**
3. Enter `clinkerbrewing.com`
4. CF will auto-add DNS records if using Cloudflare DNS
5. Repeat for `www.clinkerbrewing.com`
6. Wait for SSL certificate provisioning (usually < 5 minutes)

## 4. SSL / HTTPS

Cloudflare auto-provisions a Universal SSL certificate. Verify:

1. CF Dashboard → SSL/TLS → Overview → confirm **Full (strict)** mode
2. CF Dashboard → SSL/TLS → Edge Certificates → confirm certificate is **Active**
3. Enable **Always Use HTTPS** under SSL/TLS → Edge Certificates
4. Enable **Automatic HTTPS Rewrites** to catch mixed content

## 5. Verification

After DNS changes propagate (5–60 minutes):

```bash
# Check DNS resolution
dig clinkerbrewing.com CNAME
dig www.clinkerbrewing.com CNAME

# Or with nslookup
nslookup clinkerbrewing.com
nslookup www.clinkerbrewing.com

# Verify HTTPS
curl -I https://clinkerbrewing.com
# Should return 200 with cf-ray header

# Verify HTTP → HTTPS redirect
curl -I http://clinkerbrewing.com
# Should return 301 → https://clinkerbrewing.com

# Verify www redirect
curl -I https://www.clinkerbrewing.com
# Should redirect to https://clinkerbrewing.com
```

## 6. Post-Launch

- [ ] Submit `https://clinkerbrewing.com/sitemap-index.xml` to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify contact form delivers to `hello@clinkerbrewing.com`
- [ ] Verify AI chat works (requires `ANTHROPIC_API_KEY` env var)
- [ ] Test all pages load over HTTPS with no mixed content warnings
