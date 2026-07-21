# Brand page layout & wiring rules

How a brand page (`#/brand/:slug`) is assembled, using **Torhop** (`1. TORHOP`)
as the reference implementation. Follow this checklist when wiring the
remaining brands.

## Golden rules

1. **Never invent content.** Every piece of text (names, prices, volumes,
   headlines, story) must come from a delivered `text*.txt` file or be visible
   in the delivered images. If a file doesn't provide a field, omit it — all
   info rows/sections render conditionally and simply disappear.
2. **Wire by looking at the images, not folder names.** Delivered subfolder
   names (`JP_Thumb*` vs `JP_Detailed`) are unreliable — Torhop product 1 has
   them inverted on disk. Gallery = square-ish thumbnail shots; details =
   long full-width catalog pages.
3. **Paths go through `u()` (`encodeURI`)** — folder/file names contain
   spaces, parentheses and Korean. Use the `u()` / `BR` / `seq()` / `pad2()`
   helpers in `src/data/brands.ts`; keep the raw (unencoded) name in the
   template string.
4. **Restart the dev server after adding/renaming files** under `src/public`.
   Vite 5 caches the public-file list at startup; new files 404 (the request
   falls through to `index.html`, which shows up as a broken image) until
   restart.
5. **Normalize Korean filenames to NFC.** Some delivered files (e.g.
   LubyLab's) arrive NFD-decomposed (macOS-style), so the NFC strings in
   `brands.ts` don't match and the URL silently falls back to `index.html`.
   After copying a new brand folder in, run:

   ```bash
   node -e "const fs=require('fs'),p=require('path');(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=p.join(d,e.name);if(e.isDirectory())w(f);const n=e.name.normalize('NFC');if(n!==e.name)fs.renameSync(f,p.join(d,n));}})('src/public/brands')"
   ```

   then restart the dev server (rule 4).

## Asset folder → page mapping

Assets live in `frontend/src/public/brands/<n>. <BRAND>/` and are served at
`/brands/...` (vite `publicDir: 'src/public'`).

> **Exact file names differ per brand** — logo, set image, catalog pages and
> product shots all carry brand-specific (often Korean) names, and folder
> spellings vary slightly (`PRODUCT USP` vs `PRODUCTS USP`, `JP_Thumb` vs
> `JP_Thumbnail`, `text.txt` vs `text (1).txt`). Image formats also vary
> (`.jpg`, `.png`, `.avif`, `.gif` all occur) — don't assume an extension; use
> whatever the folder contains. If an asset arrives as a **PDF** (Beplain's
> PRODUCT USP did), pre-render its pages to PNGs next to it and wire those:
>
> ```bash
> # in a scratch dir: npm i pdf-to-png-converter, then
> node -e "require('pdf-to-png-converter').pdfToPng('<file>.pdf',{viewportScale:2}).then(ps=>ps.forEach(p=>require('fs').writeFileSync('<dir>/USP_page-'+p.pageNumber+'.png',p.content)))"
> ```
>
> What stays constant is the
> **structure below**: which folder sits where and what role each file plays.
> Match files by location and role (the loose image, the txt file, the two
> image subfolders), not by name.

```
<n>. <BRAND>/
├── <logo>.png              → BrandContent.logoUrl        (intro logo)
├── text2.txt               → BrandContent.story          (brand story)
├── TOKUPACK SET/
│   ├── <set image>         → tokupack.imageUrl
│   └── text*.txt           → tokupack.subtitle / items / pricing
├── PRODUCT USP/  (naming varies: "PRODUCTS USP", etc.)
│   └── <catalog pages>     → usps[].imageUrl             (stacked full-width)
└── DETAILS/
    ├── text.txt            → productsHeadline            (carousel headline)
    └── <n>/                 (one folder per product, n = product id)
        ├── text.txt        → products[n].name / listPrice (定価) / volume (内容量)
        ├── <loose image>   → products[n].imageUrl        (carousel card shot)
        ├── <thumbnails>/   → products[n].galleryImages   (detail-page gallery)
        └── <long pages>/   → products[n].detailImages    (商品詳細 stack)
```

## Page section order (standard layout)

`BrandPage.tsx` renders, in order:

1. **`BrandVideoHero`** — brand video (served from Cloudflare R2).
2. **`BrandIntro`** — logo image (`logoUrl`, falls back to `name` text if the
   brand has no logo file) + `tagline` + `story` from `text2.txt`.
   Line breaks in the txt are preserved (`\n` in the string,
   `whitespace-pre-line` in the component) — copy the file's exact lines.
3. **`BrandTokupackSet`** — set image + subtitle/items/pricing from the
   `TOKUPACK SET/text*.txt`. The "Explore" button scrolls to the PRODUCT USP
   section (`id="brand-usp"`) on the same page — programmatically via
   `scrollIntoView`, since a plain `#anchor` href would change the hash route.
4. **`BrandProductsUsp`** — the USP catalog pages stacked full-width in
   reading order (`id="brand-usp"`, scroll target of the button above). The
   3-card grid is only the placeholder when a brand has no USP images yet.
5. **`BrandProductsCarousel`** (when `products[]` exists, else
   `BrandSingleProduct`) — left column shows **only** the headline from
   `DETAILS/text.txt` (justified, top-aligned, no "Set includes" list);
   right side is the looping card carousel (image + 詳しく見る →
   `#/brand/:slug/product/:id`).
6. **`BrandCta`** — collaboration CTA; the button routes to the booking page
   (`#/reserve` — note the leading slash; `#reserve` would be treated as a
   homepage anchor by the hash router).

Brands with `layout: 'featured'` (VT, Purito) use the `featured/*` components
instead — different structure, not covered by these rules. VT, Celonia and
Purito also have multiple `TOKUPACK SET 1/2/3` folders (multiple sets) that
need special handling.

## Product detail page (`#/brand/:slug/product/:id`)

`ProductDetailPage.tsx` renders per product:

- **Gallery** — vertical thumbnail rail (desktop) fed by `galleryImages`,
  main image with hover-zoom. The rail height follows the main image and
  scrolls internally; don't feed it long catalog pages.
- **Info panel** — `name`, then conditional rows: 定価 (`listPrice`),
  販売価格 (`salePrice`), 内容量 (`volume`). The list price is struck
  through **only** when a `salePrice` exists. A single "Details"
  (商品詳細を見る) button scrolls to the 商品詳細 section below
  (`id="product-details"`); it renders only when the product has
  `detailImages`. There are no buy/cart/favorite buttons.
- **商品詳細** — `detailImages` stacked full-width.

## Wiring a new brand, step by step

1. List the brand folder; read every `text*.txt` (root, TOKUPACK SET,
   DETAILS, DETAILS/<n>).
2. Copy the Torhop entry in `src/data/brands.ts` as a template; fill in
   `slug`, `name`, `logoUrl`, `tagline`, `story`, `tokupack`,
   `productsHeadline`, `usps`, `products[]`.
3. For each `DETAILS/<n>` folder: id = folder number, main shot = loose
   image, then open both image subfolders and assign thumbnails →
   `galleryImages`, long pages → `detailImages` (rule 2 above).
4. Verify in the browser: brand page top to bottom, then every product
   detail page. Check that no image 404s (devtools network tab) and no
   section shows borrowed/placeholder text.
