import type { Post } from "@/lib/blog"

const post: Post = {
  slug: "checklista-melodifestivalen",
  locale: "sv",
  title: "Checklista: är du redo att söka till Melodifestivalen?",
  description:
    "Kartlägg var du står innan du skickar in din låt. En checklista för artister och låtskrivare som siktar på Melodifestivalen eller Eurovision.",
  published: "2026-09-30",
  blocks: [
    {
      type: "p",
      text: "Att komma med i Melodifestivalen eller ett annat lands Eurovision-uttagning handlar lika mycket om förarbete som om själva låten. Använd den här checklistan för att kartlägga var du är i dag och vad du behöver göra för att bocka av varje steg.",
    },
    { type: "h2", text: "1. Artisten" },
    {
      type: "ul",
      items: [
        "Vet du vem som ska framföra låten, och varför just den artisten?",
        "Håller rösten live, under press och i tv?",
        "Har artisten en publik, till exempel på sociala medier eller genom tidigare släpp?",
      ],
    },
    { type: "h2", text: "2. Storyn" },
    {
      type: "ul",
      items: [
        "Kan du beskriva vad som gör artisten intressant i en mening?",
        "Är storyn något som media vill skriva om?",
        "Märks storyn i låten eller i framträdandet?",
      ],
    },
    { type: "h2", text: "3. Låten" },
    {
      type: "ul",
      items: [
        "Har låten en refräng som fastnar efter en lyssning?",
        "Är den högst tre minuter lång, som krävs i Eurovision?",
        "Sticker den ut i ett startfält, genom energi, genre eller något oväntat?",
        "Är produktionen på en nivå som håller i tv och arena?",
      ],
    },
    { type: "h2", text: "4. Teamet" },
    {
      type: "ul",
      items: [
        "Jobbar du med låtskrivare eller producenter som har erfarenhet av tävlingen?",
        "Har du ett bolag, ett förlag eller management i ryggen?",
        "Finns det en budget för scenshow, styling och promotion?",
      ],
    },
    { type: "h2", text: "5. Förarbetet" },
    {
      type: "ul",
      items: [
        "Har du släppt singlar innan tävlingen?",
        "Har du läst SVT:s aktuella regler, eller det aktuella landets regler, för bidrag?",
        "Vet du hur uttagningen går till i landet du siktar på?",
      ],
    },
    {
      type: "p",
      text: "Saknas det bockar? Det är helt normalt. Läs mer om [hur du skriver en tävlingslåt](/blogg/skriva-lat-till-melodifestivalen/), [hur uttagningen skiljer sig mellan länder](/blogg/hur-kommer-man-med-i-eurovision/) och [vägen som independent-artist](/blogg/independent-eller-major-melodifestivalen/). Vill du ha hjälp med låten eller produktionen är du välkommen att [kontakta oss](/#contact) på Hydra Studios i Malmö.",
    },
  ],
}

export default post
