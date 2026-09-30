import type { Post } from "@/lib/blog"

const post: Post = {
  slug: "skriva-lat-till-melodifestivalen",
  locale: "sv",
  title: "Så skriver du en låt till Melodifestivalen – vad letar man efter?",
  description:
    "Rätt röst, rätt story och en låt som är lätt för media att bevaka. Så tänker du när du skriver en låt till Melodifestivalen, från en musikstudio i Malmö.",
  published: "2026-09-30",
  blocks: [
    {
      type: "p",
      text: "Varje år skickas tusentals låtar in till Melodifestivalen, men bara en bråkdel når scenen. Skillnaden mellan de låtar som går vidare och de som inte gör det handlar sällan bara om hur bra låten är. Det handlar om helheten: låten, artisten, storyn och teamet bakom. Här går vi igenom vad vi på Hydra Studios har lärt oss av att jobba med tävlingslåtar.",
    },
    { type: "h2", text: "Tävlingen letar efter en helhet, inte bara en låt" },
    {
      type: "p",
      text: "De som väljer ut bidragen tittar på hur låten, artisten och framförandet fungerar tillsammans. En stark låt med fel röst, eller en bra artist utan en tydlig idé, har svårt att sticka ut i ett startfält där alla är proffs. Fråga dig tidigt: vem ska sjunga det här, och varför just den personen?",
    },
    { type: "h2", text: "Rätt röst och rätt story" },
    {
      type: "p",
      text: "Melodifestivalen är lika mycket tv som musik. Tittarna ska förstå vem artisten är på tre minuter, och media ska vilja skriva om hen veckorna innan. Därför väger artistens story tungt. Vad gör artisten intressant just nu? Är det en comeback, en debut, en ovanlig bakgrund eller ett ämne som berör? Låt gärna storyn märkas i texten också, särskilt om artisten debuterar.",
    },
    {
      type: "ul",
      items: [
        "Rösten ska bära låten live, inte bara på inspelningen.",
        "Storyn ska gå att berätta i en mening.",
        "Det ska vara enkelt för media att vilja bevaka artisten.",
      ],
    },
    { type: "h2", text: "Vilka låtar brukar ha lättare att komma med?" },
    {
      type: "p",
      text: "Det finns inget facit, men vissa mönster återkommer. Glada, energiska låtar med en tydlig refräng har en tendens att premieras i Melodifestivalen. Samtidigt behöver startfältet variation, så en avvikande genre eller något oväntat kan vara precis det som gör att din låt väljs. Eurovision är ofta ännu mer öppet för det udda och urflippade än Melodifestivalen.",
    },
    {
      type: "p",
      text: "Tävlingen har också ofta ett eget sound: tydliga hooks tidigt, ett lyft mot slutet och en produktion som fungerar både i tv-rutan och i en stor arena. Det lönar sig att lyssna igenom de senaste årens bidrag och förstå formatet innan du skriver.",
    },
    { type: "h2", text: "Jobba med folk som kan formatet" },
    {
      type: "p",
      text: "Att komma med handlar lika mycket om att ha rätt team som om att vara bra. Samarbeta med etablerade låtskrivare och producenter som har erfarenhet av tävlingen och vet hur en tävlingslåt ska byggas. De vet också vilka personer som brukar vara involverade i urvalet och hur processen ser ut.",
    },
    {
      type: "p",
      text: "Våra låtskrivare och producenter har jobbat med låtar i både Melodifestivalen och Eurovision. [Se ett urval av vårt arbete](/#work) eller [hör av dig om en session](/#contact) i någon av våra musikstudior i Malmö.",
    },
    { type: "h2", text: "Kom ihåg reglerna" },
    {
      type: "p",
      text: "Läs alltid SVT:s aktuella regler för bidrag innan du skickar in, eftersom de kan ändras från år till år. Om låten ska vidare till Eurovision gäller dessutom EBU:s regler, bland annat att låten får vara högst tre minuter lång och att högst sex personer får stå på scenen.",
    },
  ],
}

export default post
