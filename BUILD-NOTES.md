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

## Blog (added 2026-10-21)
- `blog/index.html` — blog home: 3 article cards (date 21 October 2026, excerpts, Read more), BreadcrumbList + ItemList schema, canonical `https://herborganic.store/blog/`.
- `blog/sulphate-free-shampoo-pakistan.html` — "Sulphate-Free Shampoo in Pakistan: Why Gentle Cleansing Matters for Hair Fall, Frizz & Dryness" — features NABAT (Rs. 999) with product link + WhatsApp CTA.
- `blog/beldi-black-soap-benefits.html` — "Moroccan Beldi Black Soap: Benefits, Hammam Ritual & How to Use It" — step-by-step kessa ritual, 1–2×/week; features Beldi with WhatsApp price-enquiry CTA (**no price**, per owner rule).
- `blog/amla-reetha-shikakai-hair.html` — "Amla, Reetha & Shikakai: The Herbal Trio for Naturally Healthy Hair" — features NABAT with product link + WhatsApp CTA.
- Every article: unique keyword title + meta description, canonical, OG/Twitter tags, Article JSON-LD (author/publisher = Herb & Organics Co., datePublished 2026-10-21), BreadcrumbList, one `<h1>`, and a "Keep Reading" box cross-linking the other articles + both product pages. Claims are cosmetic-only ("helps", "supports", "known for") using verified product facts — no medical claims, no invented statistics.
- Site wiring: "Blog" nav link added to index, about and both product pages (footer Explore also links Blog on blog pages); all 4 blog URLs added to `sitemap.xml`; blog styles (`.blog-card`, `.blog-meta`, `.article-body`, `.cta-box`, `.related-box`) appended to `assets/style.css` in the site's existing design system.

## On-site ordering + WhatsApp info-only (2026-10-21)
- Ordering model changed on the owner's order: orders are now placed DIRECTLY on the website. The order forms on `index.html`, `products/nabat-shampoo.html` and `products/beldi-black-soap.html` submit via FormSubmit AJAX (`https://formsubmit.co/ajax/liltgag6@gmail.com`, JSON, `_subject` "New Order — Herb & Organics Store", `_template` "table", `_captcha` "false", `_honey` honeypot field). Orders go to the owner's Gmail (interim, until the family Gmail is provided) — same destination as the info@ forwarding.
- Form fields: name, Pakistani mobile (validated in `assets/script.js`), city, complete address, product, quantity (1–10), optional notes. Live total: shampoo shows Rs. 999 × qty; when Beldi Black Soap is selected NO price is shown — text "Price hamari team confirmation call par bata degi." (Beldi price stays blank site-wide, unchanged hard rule). On success the form is replaced by a thank-you state (order received, team will call to confirm, Cash on Delivery); on error an error line shows the contact number +92 343 7124768.
- WhatsApp is now INFO-ONLY everywhere: every "Order on WhatsApp"/"Send Order on WhatsApp" CTA became "Order Now" linking to the on-page order form; all order/price prefilled wa.me links were removed (remaining wa.me links are the info-question prefill or plain contact). Meta descriptions, OG/Twitter text, FAQ JSON-LD and visible FAQs, hero/benefit copy, about page and blog CTAs/in-text mentions were swept to match: order via the website form + COD; WhatsApp (+92 343 7124768) for questions only.
- Service worker cache bumped to `herb-organics-v2` so returning visitors get the new assets.

## Chatbot — Herb & Organics Assistant (2026-10-21)
- New `assets/chatbot.js` + styles in `assets/style.css`. Fully self-contained (no external APIs, accounts or keys). Floating chat button sits above the WhatsApp float (bottom-right, offset so they never overlap); panel header "Herb & Organics Assistant", quick-reply chips: Products, Prices, Delivery & COD, How to Order, Ingredients, Contact.
- Trilingual by the owner's order: replies in the visitor's own language — Urdu script detected → Urdu; Roman Urdu markers → Roman Urdu; otherwise English. Every knowledge-base answer exists in all three languages.
- Knowledge base = verified facts only (NABAT shampoo 300 ml Rs. 999, sulphate/paraben free, 50+ ingredients; Beldi olive-based Moroccan paste soap, 1–2×/week; COD across Pakistan; orders via the website form). Beldi price is NEVER stated; delivery time/charges are honestly answered as "confirmed by the team on the confirmation call". Order intent returns an answer plus a button that scrolls to the order form. Intent matching + language detection verified with a 22-case local test (all passed).
- Included on every page (index, about, both products, blog index + 3 articles) with the correct relative path; added to the service worker core assets.

## Beldi Black Soap price set — Rs. 500 (2026-10-21)
- Owner set a PROVISIONAL price of Rs. 500 for Beldi Black Soap (was deliberately price-less). Price now shown site-wide exactly like the shampoo's Rs. 999: product page `.price` element + Product JSON-LD `offers` (500 PKR, InStock), homepage product card, order-form options on all three forms (Beldi "— Rs. 500"; "Both" = Rs. 1,499), live order totals in `assets/script.js` (new `BELDI_PRICE = 500`; Beldi is no longer the no-price case), FAQ answers (JSON-LD + visible) on index/both product pages, meta/OG/Twitter descriptions, and the chatbot's price answers in English, Roman Urdu and Urdu. The Beldi blog article body was NOT rewritten — only its closing order paragraph and CTA box now state Rs. 500. All "ask the price / team confirms the price" wording removed (verified by grep). Delivery time/charges wording ("team confirms on the confirmation call") unchanged — that concerns delivery, not product price. Price is provisional: owner will confirm the final price later, then it gets updated everywhere. Service worker cache bumped to herb-organics-v4.

## Clean (extensionless) URLs (2026-10-21)
- Owner disliked ".html" at the end of page addresses. All internal PAGE references converted to clean extensionless URLs site-wide; the files on disk keep their .html names, so the old .html addresses keep working (GitHub Pages serves both).
- Changed: every internal <a href> in all 8 pages (nav, breadcrumbs, cards, footers, article cross-links, CTAs — fragments like #order/#faq preserved), canonical + og:url, all page URLs inside JSON-LD (@id, url, offers.url, BreadcrumbList items), sitemap.xml <loc>s, the chatbot's order-link targets in assets/chatbot.js (../#order / ./#order), and sw.js precache page entries (/about, /products/nabat-shampoo, /products/beldi-black-soap; homepage entry is "/" and the offline navigation fallback now matches "/"). Service worker cache bumped to herb-organics-v5.
- Mapping: / (home), /about, /products/nabat-shampoo, /products/beldi-black-soap, /blog/, /blog/sulphate-free-shampoo-pakistan, /blog/beldi-black-soap-benefits, /blog/amla-reetha-shikakai-hair.
- NOT touched: asset filenames (css/js/images/icons/manifest), external URLs, page content, prices, file names on disk, CNAME.
- Verified locally: zero ".html" page references remain; all 196 old-vs-new href pairs resolve to the same on-disk page; all JSON-LD blocks still parse.

## 2026-10-25 — Beldi Black Soap size variants (owner's order)
- Beldi Black Soap now has TWO sizes everywhere on the site: **Small Packet Rs. 500** and **Large Packet Rs. 700**.
- Order forms (home + both product pages) offer Small and Large as separate options; the bundle option is Shampoo + Beldi **Small** Packet = Rs. 1,499.
- `assets/script.js`: `BELDI_BIG_PRICE = 700` + `beldiUnitFor()` (Large Packet → 700, else 500) used in total calc, live-price option rewrite and submit. Live panel prices still win: Sheet `beldi` row = Small Packet price; if a `beldi_big` row is ever added to the Products tab it will override the Large price automatically.
- Homepage card + Beldi page show "Rs. 500 – Rs. 700" via `data-price-for="beldi-variants"` (JS writes the live range). Beldi page schema is now an AggregateOffer (low 500 / high 700). FAQ answers + chatbot (EN/Roman Urdu/Urdu) updated. Service worker bumped to herb-organics-v9.
- Verified in repo commits 2026-10-25 (6 commits, 13:43:51–13:44:02 UTC). NOTE: GitHub Pages builds for those rapid successive commits errored/stuck ("building" on HEAD for 6+ min) — this notes commit also serves as a fresh build trigger.
