# Multi-set brand layout & wiring rules

For brands delivering **several TOKUPACK sets** (VT, Celonia, Purito — one
`TOKUPACK SET <x>/` folder per set). **VT (`7. VT`) is the reference
implementation.** All the golden rules from `BRAND_PAGE_LAYOUT.md` (no fake
info, wire by images not folder names, `u()`/encodeURI, NFC normalization,
dev-server restart, PDF pre-rendering) apply unchanged — read that file first;
this one only covers what differs.

## Page structure

**Brand page** (`#/brand/:slug`) — same opening as a single-set brand, then a
card grid instead of the set/USP/carousel flow:

1. `BrandVideoHero` — brand video.
2. `BrandIntro` — logo + tagline + story from `text2.txt`.
3. `BrandTokupackSetsGrid` — one card per set: the delivered set image, an
   Explore button and the set label (TOKUPACK A / B / C). Both image and
   button link to the set's sub-page.
4. `BrandCta`.

**Set sub-page** (`#/brand/:slug/set/:id`, rendered by `BrandSetPage`) — the
single-set flow *without* video/logo/story; it opens directly with the set:

1. `BrandTokupackSet` — that set's image + subtitle/items/pricing.
2. `BrandProductsUsp` — that set's USP pages.
3. `BrandProductsCarousel` — that set's DETAILS headline + products.
4. `BrandCta`.

The header's back button returns to the brand page. Product cards link to the
normal `#/brand/:slug/product/:id` detail pages.

## Asset folder → data mapping

```
<n>. <BRAND>/
├── <logo>.png                  → logoUrl
├── text2.txt                   → story
├── <set card images>           → tokupackSets[i].cardImageUrl
│     (loose in the brand root, e.g. "Copy of Copy of VT_TPSET_A_RE.jpg")
└── TOKUPACK SET <x>/            (one folder per set; x = 1, 2, 3 …)
    ├── x.1 TOKUPACK SET*/       → tokupackSets[i].tokupack
    │   ├── <set image>            (imageUrl)
    │   └── text*.txt              (subtitle = first line, items, pricing)
    ├── x.2 USP*/                → tokupackSets[i].usps
    │     (set 1's is named "1.1 PRODUCT USP" — numbering is unreliable,
    │      match by the words USP / TOKUPACK SET / DETAILS in the name)
    └── x.3 DETAILS/             → tokupackSets[i].productsHeadline + products
        ├── text*.txt              (headline)
        └── <n>/                   (per-product folder, same rules as
                                    single-set brands: text.txt + main shot
                                    + gallery/detail subfolders)
```

Data lives in `tokupackSets: TokupackSetPage[]` on the brand's entry in
`src/data/brands.ts` (see the `TokupackSetPage` interface). The brand-level
`tokupack`/`usps` fields stay empty — they aren't rendered for multi-set
brands.

## Rules specific to multi-set brands

1. **Set ids = the delivered folder numbers** (`TOKUPACK SET 1` → id `'1'`),
   used in the route. Labels are `TOKUPACK A/B/C` in folder order.
2. **Product ids must be unique across the whole brand** because the product
   route is brand-scoped (`#/brand/:slug/product/:id`). The delivered
   `DETAILS/<n>` numbering is already brand-global for VT (1, 2 in set 1;
   1, 3 in set 2; 4, 5 in set 3) — keep it.
3. **A product shared by two sets is defined once** as a module-level const
   and referenced from both sets' `products` arrays (VT's リードルショット 100,
   `VT_REEDLE_S100`) — its duplicate `DETAILS/1` folder in the second set is
   ignored.
4. **Watch for cross-brand contamination.** VT set 1's `DETAILS/2/JP_Thumb/`
   was full of Celonia images (verified visually) — only the product's own
   `*_Sub.jpg` shot was wired. When a folder's contents look off-brand
   (different logo/products), inspect before wiring and use only what
   belongs.
5. Loose `*_Sub.jpg` files in a product folder are the main shot; the same
   file duplicated inside `JP_Thumb` is the gallery.
6. **Folder naming is wildly inconsistent across brands** — Purito uses
   `TOKUPACK SET 1` / `TOKUPACK SET2` (no space), `Tokupack set1`, `USP`,
   `jp_detailed` / `JP_THUMB` in mixed case, and `DETAILS/text2.txt` for the
   headline. Always list the real folders; never assume the VT names. URLs
   are case-sensitive in production (nginx/Linux) — copy the exact casing.
7. **Empty folders are normal.** Celonia's three `x.2 USP` folders and
   Purito set 2's `USP` are empty → `usps: []` (the section auto-hides).
   Purito product 8's `jp_detailed` is empty → omit `detailImages` (the
   Details button auto-hides).
8. **No per-set image delivered?** Purito only ships root `combo<n>.png`
   files — use them as both the grid card and the sub-page set image.
   Celonia's card↔set mapping is NOT in filename order (set 1 → `…001.png`,
   set 2 → `…003.png`, set 3 → `…002.png`) — match by which file sits inside
   each set's `x.1 TOKUPACK SET` folder.
9. **UUID-named detail pages** (Purito's avif/webp exports) have no readable
   order — keep them naturally sorted and dedupe ` (1)`-suffixed copies of a
   page already in the list.
