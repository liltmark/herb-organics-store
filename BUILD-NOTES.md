# Herb & Organics Co. — Store Build Notes

**Site:** https://herborganic.store (canonical base)
**Type:** Static HTML/CSS/JS — no build tools, no frameworks, no trackers, no external CDNs/fonts.
**Ordering model:** WhatsApp (+92 343 7124768) + Cash on Delivery across Pakistan. No backend, no fake checkout.

## Files

| File | Purpose |
|---|---|
| `index.html` | Homepage: hero, featured products (both + NABAT Hair Oil coming-soon card), why-choose-us, order form, FAQ |
| `products/nabat-shampoo.html` | NABAT Herbal & Organic Shampoo product page (Rs. 999, 300 ml) |
| `products/beldi-black-soap.html` | Beldi Black Soap product page (price intentionally NOT shown — WhatsApp enquiry CTA) |
| `about.html` | Brand story (verified facts only) |
| `assets/style.css` | Single shared stylesheet (deep green #1e4d2b / cream #faf6ee / gold) |
| `assets/script.js` | Mobile nav, order-form → WhatsApp composer, service-worker registration, Install App prompt |
| `manifest.webmanifest` | PWA manifest |
| `sw.js` | Service worker (offline support) |
| `icons/icon-192.png`, `icons/icon-512.png`, `icons/apple-touch-icon.png` | App icons (generated: green rounded square, gold leaf, cream "H&O" monogram) |
| `sitemap.xml`, `robots.txt` | SEO (robots allows all + sitemap line) |
| `images/` | Real product photos go here (see `images/README.txt`) |

## SEO implemented

- Unique keyword-natural `<title>` + meta description on every page, targeting Pakistan searches: *organic shampoo in Pakistan, sulphate free shampoo, herbal shampoo Pakistan, Moroccan black soap, beldi soap Pakistan, natural skincare Pakistan*.
- Canonical URL per page (`https://herborganic.store/...`), `meta robots: index, follow`, `theme-color`.
- Open Graph + Twitter Card tags on every page.
- JSON-LD structured data:
  - Homepage: `Organization` + `WebSite`; `FAQPage`.
  - Shampoo page: `Product` **with** `offers` (price 999, PKR, InStock) + `BreadcrumbList` + `FAQPage`.
  - Beldi page: `Product` **without** any offers/price (price not set by owner) + `BreadcrumbList` + `FAQPage`.
  - About: `BreadcrumbList`.
  - Visible FAQ text matches the `FAQPage` schema word-for-word on every page that shows FAQs.
- Semantic HTML5, exactly one `<h1>` per page, logical heading order, aria labels on visuals/nav/buttons.
- Full internal linking: header nav + footer links on every page; product pages cross-link each other.
- Performance: one CSS file, one tiny vanilla JS file, zero external requests, mobile-first responsive.

## Ordering UX

- Every product has an **Order on WhatsApp** button → `https://wa.me/923437124768?text=...` with a prefilled message (shampoo message includes "Rs. 999"; Beldi message asks for the price).
- Order form (homepage + both product pages): name, mobile, city, complete address, product select, quantity. On submit, `script.js` composes the full order into a WhatsApp message and opens wa.me. The form clearly states it is a **Cash on Delivery order via WhatsApp** — no payment is taken on the site.
- Floating WhatsApp button on every page.

## PWA (installable app)

- `manifest.webmanifest`: name "Herb & Organics Co.", short_name "Herb&Organics", `start_url "/"`, `scope "/"`, `display "standalone"`, background `#faf6ee`, theme `#1e4d2b`, icons 192/512 + maskable 512.
- `sw.js`: cache-first for core pages/assets/icons/images, network-first for everything else, offline navigation fallback to the homepage. Registered from `assets/script.js` on all pages.
- When Chrome offers installation, a gold **"📲 Install App"** button appears in the footer; it hides after install.

**How customers install the app:**
- **Android (Chrome):** open herborganic.store → tap the **Install App** button in the footer, or Chrome menu (⋮) → "Install app" / "Add to Home screen". The store then opens full-screen from the home-screen icon, and works offline for the main pages.
- **iPhone (Safari):** open herborganic.store in Safari → tap **Share** → **Add to Home Screen** → Add. (iOS does not show an install button; the home-screen icon uses `icons/apple-touch-icon.png`.)

## Photo swap instructions (pending)

The design intentionally uses **pure-CSS product visuals** (no broken image links). Real photos will be supplied by the owner — drop them into `images/` with these exact names:

- `images/nabat-shampoo.jpg`
- `images/beldi-black-soap.jpg`
- `images/nabat-oil.jpg` (when the oil launches)

These paths are already referenced by the Open Graph/Twitter tags and the Product JSON-LD, so social previews and Google results will use the photos automatically once uploaded. To display a photo inside a page, follow the snippet in `images/README.txt`.

## Deliberate content rules (do not "fix")

- **No price anywhere for Beldi Black Soap** — owner has not set it; its CTA is a WhatsApp price/order enquiry, and its Product schema omits `offers` on purpose.
- **No reviews, ratings, or testimonials** — none were provided; none were invented.
- **NABAT Hair Oil** appears only as a name + "Coming Soon" teaser — no details or price exist yet.
- All product facts (ingredients, benefits, usage, cautions) come from the brand's verified Instagram material.

## Validation performed

- Every internal `href`/`src` resolves to an existing file.
- Every page has `<title>`, meta description, canonical, exactly one `<h1>`.
- All JSON-LD blocks parse as valid JSON; `manifest.webmanifest` parses as valid JSON; `sitemap.xml` parses as valid XML.
- No placeholder filler text anywhere on the site.
- Beldi pages contain no price; shampoo price (Rs. 999) appears only where intended.

## Reviews section (added 2026-10-21)
- Homepage #reviews: 3 embedded Instagram review reels (official IG embed, permalinks DcoqWIUtL4T, Daa1Ur1MDrf, DaLTmuLMPqa) with the reviewers' own caption quotes + handles, plus 3 text quote cards (@whimsy.byfatima post DZ-BvItsHsd; two quotes from the brand's Reviews highlight). Creators' permission was confirmed by the owner as already obtained. No star ratings were added (no verified numeric ratings exist).
- Shampoo page carries a compact "What Customers Say" band linking to the homepage videos.
- Real product photo live: images/nabat-shampoo.jpg (brand's own Instagram launch post image).

## Business email (decided 2026-10-21)
- info@herborganic.store is displayed on the store (footer, all pages) and in the Organization schema. Mail forwarding to the family's Gmail is to be configured at Namecheap (free email forwarding) in the same session as the go-live DNS changes — no purchased mailbox. Destination Gmail to be confirmed by the owner.
- Real Beldi Black Soap photo live: images/beldi-black-soap.jpg (brand's Instagram carousel slide 1).
