export type Offer = {
  offerId: number;
  title: string;
  description: string;
  discount: string; // display label, e.g. "20% OFF"
  validUntil: string; // YYYY-MM-DD
  code: string;
  accentColor: string;
};

// Mock promotions/offers for the customer-facing Offers page.
// No backend promotion API is exposed to customers yet, so this is UI-only.
export const mockOffers: Offer[] = [
  {
    offerId: 1,
    title: "Tuesday Ticket Special",
    description: "Every Tuesday, all standard tickets are 20% off — no code needed at checkout, just book on the day.",
    discount: "20% OFF",
    validUntil: "2026-08-31",
    code: "TUESDAY20",
    accentColor: "#FFD700",
  },
  {
    offerId: 2,
    title: "Combo Deal: Popcorn & Drink",
    description: "Grab a large popcorn and two soft drinks for a fixed price when you buy any 2 tickets in the same order.",
    discount: "SAVE 50,000₫",
    validUntil: "2026-07-31",
    code: "COMBO50",
    accentColor: "#FF4500",
  },
  {
    offerId: 3,
    title: "Student Discount",
    description: "Show a valid student ID at the counter for 15% off any showtime, any day of the week.",
    discount: "15% OFF",
    validUntil: "2026-12-31",
    code: "STUDENT15",
    accentColor: "#00CED1",
  },
  {
    offerId: 4,
    title: "Member Birthday Treat",
    description: "CinePrime members get a free ticket during their birthday month — just log in and claim it in your account.",
    discount: "FREE TICKET",
    validUntil: "2026-12-31",
    code: "BIRTHDAY",
    accentColor: "#8A2BE2",
  },
  {
    offerId: 5,
    title: "Group Booking Bonus",
    description: "Book 6 or more seats for the same showtime and get an extra 10% off the entire order.",
    discount: "10% OFF",
    validUntil: "2026-09-30",
    code: "GROUP10",
    accentColor: "#34d399",
  },
];

export default mockOffers;
