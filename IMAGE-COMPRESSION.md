# Images

The site is a static export (`output: 'export'`), so Next.js can't resize images at
request time. Responsive variants are generated ahead of time with `cwebp` and
committed. Both scripts need `brew install webp`.

## Photos (`public/images/photos`, `public/images/photos/team`)

`next/image` uses the custom loader in `lib/photo-loader.ts`, which points every
srcset entry at `{name}-{width}.webp` next to the original. After adding or
replacing a photo, regenerate the variants:

```bash
node scripts/optimize-photos.mjs
```

Widths live in `PHOTO_WIDTHS` (`lib/photo-loader.ts`) and must match
`deviceSizes` + `imageSizes` in `next.config.mjs`. `lib/photos.test.ts` fails if a
variant is missing or over its byte budget.

## Release covers (`public/images/covers`)

The work carousel builds its own srcset (`COVER_WIDTHS` in `lib/releases.ts`):

```bash
node scripts/optimize-covers.mjs "<folder with covers>"
```

`lib/releases.test.ts` checks every cover's variants against a byte budget.

## Tests against the exported site

```bash
npm run test:build
```

Builds the site and checks `out/`: srcsets, hero preload priority, and that the
`.htaccess` redirect and cache rules are exported.
