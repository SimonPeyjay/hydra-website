export type Release = {
  artist: string
  title: string
  /** Basename of the cover files in /public/images/covers (`{cover}-{width}.webp`). */
  cover: string
  spotify: string
  /** Contests the song competed in, e.g. "Melodifestivalen 2019". Shown under the caption. */
  contests?: string[]
}

/** Widths generated for every cover by scripts/optimize-covers.mjs. */
export const COVER_WIDTHS = [400, 640, 960] as const

export const releases: Release[] = [
  { artist: "Laurell", title: "Habit", cover: "laurell-habit", spotify: "https://open.spotify.com/track/4bnutybG1itDcpyoQo2Uoc" },
  { artist: "John Lundvik", title: "Too Late For Love", cover: "john-lundvik-too-late-for-love", spotify: "https://open.spotify.com/track/6kIdjk3D8XxA2UafE0THGK", contests: ["Melodifestivalen 2019", "Eurovision 2019"] },
  { artist: "CD9", title: "ROCKSTAR", cover: "cd9-rockstar", spotify: "https://open.spotify.com/track/2cmtrnmQcChmE0Pb4cmO0L" },
  { artist: "Dhurata Dora, INNA", title: "Ale Ale (feat. INNA)", cover: "dhurata-dora-inna-ale-ale-feat-inna", spotify: "https://open.spotify.com/track/49jBY6EH8v94kloRQbZv7i" },
  { artist: "CD9", title: "Otra Vez (One More Time)", cover: "cd9-otra-vez-one-more-time", spotify: "https://open.spotify.com/track/0nbxWA3JkDrg7x5fBFMnaj" },
  { artist: "Samir & Viktor", title: "Shuffla", cover: "samir-viktor-shuffla", spotify: "https://open.spotify.com/track/3bnS9O5Q9Zn9MD4Z3zDV62", contests: ["Melodifestivalen 2018"] },
  { artist: "Imminence", title: "This Is Goodbye", cover: "imminence-this-is-goodbye", spotify: "https://open.spotify.com/track/64hjZJqbq6Q4h4u3AcDfN6" },
  { artist: "OH MY GIRL", title: "Nonstop", cover: "oh-my-girl-nonstop", spotify: "https://open.spotify.com/track/4ljXOIFNSjnGA2VuCYHQTS" },
  { artist: "NCT DREAM", title: "Dream Run", cover: "nct-dream-dream-run", spotify: "https://open.spotify.com/track/6ByGZGm5Y5VwrQheIUlw1N" },
  { artist: "Günther, GPF", title: "XXX", cover: "gunther-gpf-xxx", spotify: "https://open.spotify.com/track/34WUnf1dilxGY0Mo5Xcd0x" },
  { artist: "Maximus", title: "Om du nånsin", cover: "maximus-om-du-nansin", spotify: "https://open.spotify.com/track/1NJ8Fyfb8dS5WYB5tpIaiZ" },
  { artist: "TVXQ!", title: "ARK", cover: "tvxq-ark", spotify: "https://open.spotify.com/track/19UfChoWlC3pM57YBEWFEl" },
  { artist: "Outtrigger", title: "Echo", cover: "outtrigger-echo", spotify: "https://open.spotify.com/track/3AaWIOo4xB7EqNGzFeIqQr" },
  { artist: "OH MY GIRL", title: "Miracle", cover: "oh-my-girl-miracle", spotify: "https://open.spotify.com/track/3rIagOesmqGV4xpWu7GpUR" },
  { artist: "Luca Hänni", title: "Love Me Better", cover: "luca-hanni-love-me-better", spotify: "https://open.spotify.com/track/3VKKs2Usdi4cVIEE1qHzF2" },
  { artist: "SHINee", title: "From Now On", cover: "shinee-from-now-on", spotify: "https://open.spotify.com/track/1naapoRLiIo2duWwDE08fL" },
  { artist: "Dolly Style", title: "Tjofadderittanlej", cover: "dolly-style-tjofadderittanlej", spotify: "https://open.spotify.com/track/5T4RwLmpqbuUQlXxzIlRuS" },
  { artist: "Elecktra", title: "Banne Maj", cover: "elecktra-banne-maj", spotify: "https://open.spotify.com/track/4uXocNcZx96XkuaqfE43HD" },
  { artist: "Alvaro Estrella", title: "ABAJO", cover: "alvaro-estrella-abajo", spotify: "https://open.spotify.com/track/1GXd4kZSdrJEBo11WgQiDi" },
  { artist: "Costa Leon, TYLER", title: "Here Without You", cover: "costa-leon-tyler-here-without-you", spotify: "https://open.spotify.com/track/1nr7x5mxvD8RO4vd4w4e8R" },
  { artist: "TAEMIN", title: "ECLIPSE", cover: "taemin-eclipse", spotify: "https://open.spotify.com/track/0r5JPP3ly5B5jyJiwTp3lj" },
  { artist: "Rival, JAMICA, Costa Leon", title: "Lost in Life", cover: "rival-jamica-costa-leon-lost-in-life", spotify: "https://open.spotify.com/track/74yhbLEMzWSZAUqHMt2auS" },
  { artist: "Benjamin Ingrosso", title: "Worst In Me", cover: "benjamin-ingrosso-worst-in-me", spotify: "https://open.spotify.com/track/3Fx73ctGeJDwtwz8wsxITR" },
  // Both singles share the same artwork, so the cover is shown once and links to the first.
  { artist: "Tingsek", title: "Paragon / Inspiration", cover: "tingsek-paragon", spotify: "https://open.spotify.com/track/4Qp8pmT2pTe6m7LnAuKcth" },
  { artist: "Will Young", title: "Light It Up", cover: "will-young-light-it-up", spotify: "https://open.spotify.com/track/6IBByJTdiHFWttmOqnWQ19" },
  { artist: "Dolly Style", title: "Celebration", cover: "dolly-style-celebration", spotify: "https://open.spotify.com/track/6lm3XwMpKCBSYL1pPNqcDI" },
  { artist: "Laurell", title: "Best Night Ever", cover: "laurell-best-night-ever", spotify: "https://open.spotify.com/track/3WPLO5uBmbT050ogKdxT5C" },
  { artist: "Elsie Bay", title: "Death Of Us", cover: "elsie-bay-death-of-us", spotify: "https://open.spotify.com/track/1b7kH8a40bQ0ttYPNdxrn6" },
  { artist: "Dolly Style", title: "Mermaid", cover: "dolly-style-mermaid", spotify: "https://open.spotify.com/track/4r6yqniacnQJnKxOF25n2X" },
  { artist: "Rival, Egzod, Andreas Stone", title: "Live A Lie", cover: "rival-egzod-andreas-stone-live-a-lie", spotify: "https://open.spotify.com/track/5ju27PIipSqeCpkHgg4Gwz" },
  { artist: "Laurell", title: "Love It", cover: "laurell-love-it", spotify: "https://open.spotify.com/track/1kouzhwaBEwmTfMahAZufo" },
  { artist: "EMMY", title: "Sykt Fin", cover: "emmy-sykt-fin", spotify: "https://open.spotify.com/track/01fNuptG1EwUvoKPjJiUds" },
  { artist: "Medina", title: "Säg Nåt", cover: "medina-sag-nat", spotify: "https://open.spotify.com/track/3hAIrp15bxo8QUC7NwcBhQ" },
  { artist: "EXO", title: "Lady Luck", cover: "exo-lady-luck", spotify: "https://open.spotify.com/track/5DbtKcO2DnUEqvMzxxnpBE" },
  { artist: "Andreas Stone, Denniz Jamm", title: "Black Sunrise", cover: "andreas-stone-denniz-jamm-black-sunrise", spotify: "https://open.spotify.com/track/37FfX7i0XGaVLgD11R6T1O" },
]
