export type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number; // 1-5
  quote: string;
};

// Mock customer reviews for the landing page — no backend review model
// exists yet, so this is UI-only social proof.
export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Minh Anh",
    role: "CinePrime Member since 2023",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    quote:
      "The recliner seats at the Quận 1 cluster are a game changer. I've stopped going anywhere else for weekend releases.",
  },
  {
    id: 2,
    name: "Duc Trong",
    role: "Verified Booking",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    quote:
      "Booking a seat takes less than a minute and the seat map actually matches the real room. Small thing, but it matters.",
  },
  {
    id: 3,
    name: "Thu Ha",
    role: "IMAX Regular",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    quote:
      "Dolby Atmos at the Thủ Đức screen is unreal for action movies. Worth the extra cost every single time.",
  },
  {
    id: 4,
    name: "Hoang Phuc",
    role: "Family of 4",
    avatar: "https://i.pravatar.cc/100?img=68",
    rating: 4,
    quote:
      "We come for the Animation Family Day events. My kids look forward to it every month and the combo deals help a lot.",
  },
  {
    id: 5,
    name: "Ngoc Lan",
    role: "Student Discount User",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
    quote:
      "The student discount plus Tuesday pricing makes going to the cinema actually affordable on a student budget.",
  },
];

export default mockTestimonials;
