export type CinemaEvent = {
  eventId: number;
  title: string;
  subtitle: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  cluster: string;
  image: string;
  tag: string;
  accentColor: string;
};

// Mock cinema events for the landing/Events page — premieres, marathons,
// fan meetups. No backend event model exists yet, so this is UI-only.
export const mockEvents: CinemaEvent[] = [
  {
    eventId: 1,
    title: "Midnight Premiere: Deadpool & Wolverine",
    subtitle: "Exclusive first screening",
    description:
      "Be among the first in the country to watch Deadpool & Wolverine at midnight, with a costume contest and prize giveaways before the show.",
    date: "2026-07-10",
    time: "23:30",
    cluster: "CinePrime Quận 1",
    image: "https://image.tmdb.org/t/p/w1280/cOoVcVQ3i1m5b2xtqKBtoTSbxC1.jpg",
    tag: "Premiere",
    accentColor: "#FF4500",
  },
  {
    eventId: 2,
    title: "Mad Max Marathon",
    subtitle: "All 5 films, back to back",
    description:
      "A full-day marathon of the Mad Max saga culminating in Furiosa, with retro posters, merchandise stalls, and a Q&A on franchise lore.",
    date: "2026-07-12",
    time: "10:00",
    cluster: "CinePrime Thủ Đức",
    image: "https://image.tmdb.org/t/p/w1280/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg",
    tag: "Marathon",
    accentColor: "#8A2BE2",
  },
  {
    eventId: 3,
    title: "Animation Family Day",
    subtitle: "Inside Out 2 + Despicable Me 4 double feature",
    description:
      "A family-friendly double feature with face painting, a Minion mascot meet-and-greet, and discounted kids' combos all day.",
    date: "2026-07-13",
    time: "09:30",
    cluster: "CinePrime Hoàn Kiếm",
    image: "https://image.tmdb.org/t/p/w1280/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
    tag: "Family",
    accentColor: "#00CED1",
  },
  {
    eventId: 4,
    title: "IMAX Director's Talk",
    subtitle: "Kingdom of the Planet of the Apes",
    description:
      "A special IMAX screening followed by a live-streamed conversation with the visual effects team about building the film's ape performances.",
    date: "2026-07-18",
    time: "19:00",
    cluster: "CinePrime Cầu Giấy",
    image: "https://image.tmdb.org/t/p/w1280/fypydCipcWDKDTTCoPucBsdGYXW.jpg",
    tag: "Special Screening",
    accentColor: "#FFD700",
  },
];

export default mockEvents;
