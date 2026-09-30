# Hydra Studios – hydrastudios.se

Webbplatsen för Hydra Studios, ett kollektiv av musikstudior i Malmö. Byggd med Next.js 15 (App Router), React 19, Tailwind CSS och next-intl. Sajten exporteras som statiska filer och ligger hos one.com.

## Kom igång

Krav: Node.js 20 eller senare (samma som deployen) och **npm**.

```bash
npm ci --legacy-peer-deps   # installera exakt det som står i package-lock.json
npm run dev                 # startar dev-servern på http://localhost:3000
```

> **Använd npm, inte pnpm eller yarn.** Deployen kör `npm ci`, och `package-lock.json` är den lockfil som gäller. Om `pnpm dev` har körts av misstag: `git checkout pnpm-lock.yaml && rm -rf node_modules pnpm-workspace.yaml && npm ci --legacy-peer-deps`.

`--legacy-peer-deps` behövs eftersom några paket ännu inte anger React 19 som tillåten peer dependency.

### Sidor att öppna lokalt

| Adress | Innehåll |
|---|---|
| `http://localhost:3000/` | Startsidan på svenska |
| `http://localhost:3000/en/` | Engelska (även `/de/`, `/ja/`, `/ko/`) |
| `http://localhost:3000/blogg/` | Bloggen (inläggen är på svenska) |

### Miljövariabler

Kontaktformuläret skickas via [Web3Forms](https://web3forms.com). Lägg nyckeln i `.env.local` om du vill testa formuläret lokalt:

```
NEXT_PUBLIC_WEB3FORMS_KEY=din-nyckel
```

I produktion kommer nyckeln från GitHub-secret `WEB3FORMS_KEY`.

## Kommandon

| Kommando | Vad det gör |
|---|---|
| `npm run dev` | Dev-server med hot reload |
| `npm run build` | Statisk export till `out/` (det som deployas) |
| `npm test` | Enhetstester (Vitest) |
| `npm run test:build` | Bygger och kontrollerar den exporterade sajten i `out/` (SEO-taggar, favicon, sitemap, `.htaccess`) |

Förhandsgranska produktionsbygget lokalt med valfri statisk server, t.ex. `npm run build && npx serve out`. Observera att `.htaccess`-reglerna bara körs på one.com.

## Deploy

Varje push till `main` bygger sajten och laddar upp `out/` till one.com via FTP (`.github/workflows/deploy.yml`). Mappen på servern töms först, så allt som ska finnas på sajten måste komma från bygget eller `public/`.

`public/.htaccess` (Apache hos one.com) sköter:

- HTTP → HTTPS
- 301 från gamla `/sv/...`-adresser till motsvarande adress utan `/sv`
- Cache-headers och 404-sidan (`/404/`)

## Projektstruktur

```
app/
  (sv)/               Svenska, på sajtens rot: /, /blogg/, /blogg/[slug]/, /404/
  (intl)/[locale]/    Övriga språk: /en/, /de/, /ja/, /ko/ (+ /blogg/)
  robots.ts           → /robots.txt
  sitemap.ts          → /sitemap.xml
components/           Sektioner på startsidan, blogglayout, locale-shell (<html>, metadata, JSON-LD)
content/blog/         Blogginlägg, ett per fil
i18n/                 next-intl-konfiguration (språk, standardspråk)
lib/                  site.ts (URL:er, ikoner, kontaktuppgifter), blog.ts, releases.ts m.m.
messages/             Översättningar: sv.json, en.json, de.json, ja.json, ko.json
public/               Bilder, favicons, manifest, .htaccess
scripts/              Bildoptimering och ikongenerering
test/build/           Tester som körs mot den byggda sajten
```

## Språk och adresser

Svenska är standardspråket och ligger direkt på roten, övriga språk under sitt prefix. Svenska (`app/(sv)`) och övriga språk (`app/(intl)/[locale]`) är två separata rot-layouter. Därför blir det riktiga statiska filer på rätt adresser, utan omskrivningar på servern.

- Bygg länkar med `localePath(locale, "/sökväg/")` från `lib/site.ts`, aldrig med `/${locale}/` för hand.
- All text ligger i `messages/*.json`. Lägg till en ny nyckel i **alla fem** filerna.

## Vanliga uppgifter

### Skriva ett blogginlägg

1. Skapa `content/blog/<slug>.ts`. Kopiera ett befintligt inlägg som mall. Formatet beskrivs i `lib/blog.ts`: stycken, rubriker och listor, med länkar som `[text](/#contact)`.
2. Lägg till inlägget i listan i `content/blog/index.ts`.
3. Inlägget får automatiskt egen sida, metadata, strukturerad data (`BlogPosting`) och en rad i sitemapen.

### Lägga till en release i "Vårt arbete"

1. Lägg till raden i `lib/releases.ts`. Har låten varit med i en tävling, sätt `contests: ["Melodifestivalen 2019", "Eurovision 2019"]`.
2. Generera omslagen enligt [IMAGE-COMPRESSION.md](IMAGE-COMPRESSION.md).

### Byta bilder, logga eller favicon

- Studiofoton och omslag: se [IMAGE-COMPRESSION.md](IMAGE-COMPRESSION.md) (kräver `brew install webp`).
- Favicons och delningsbild (`og-image.jpg`): ändra `public/favicon.svg` eller hallfotot och kör `node scripts/generate-icons.mjs`.

### Ändra kontaktuppgifter

Adress, telefon och öppettider finns i `lib/site.ts`, `components/locale-shell.tsx` (strukturerad data), `components/footer.tsx` och `components/contact-section.tsx`. De ska stämma exakt med [Google-profilen](https://business.google.com). Olika uppgifter på olika ställen skadar rankningen i Google Maps.

## SEO i korthet

- Varje sida har title, description, canonical och hreflang, samt strukturerad data (`LocalBusiness`, `WebSite`, `BlogPosting`).
- `robots.txt` och `sitemap.xml` genereras vid bygget. Skicka in `https://hydrastudios.se/sitemap.xml` i Google Search Console och Bing Webmaster Tools.
- Rankningen på kartan styrs främst av Google-profilen: kategorier, foton, recensioner och inlägg. Håll den uppdaterad.
