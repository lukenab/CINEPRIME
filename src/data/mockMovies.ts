import type { MovieApiResponse } from "../api/movieApi";

// Mock movie data for the landing page so it renders without a live backend.
// Shape matches MovieApiResponse so it drops straight into NowShowing / ComingSoon.
const baseMovies: MovieApiResponse[] = [
  {
    movieId: 1,
    movieNameVn: "Kẻ Cắp Mặt Trăng 4",
    movieNameEnglish: "Despicable Me 4",
    director: "Chris Renaud",
    actor: "Steve Carell, Kristen Wiig",
    content:
      "Gru, Lucy và bầy Minion trở lại với một kẻ thù mới buộc cả gia đình phải bỏ trốn và bắt đầu cuộc sống ẩn danh đầy hỗn loạn.",
    duration: 95,
    version: "2D",
    status: true,
    movieProductionCompany: "Illumination",
    largeImage: "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    movieType: ["Animation", "Comedy"],
    showTimes: [
      { showTimeId: 101, showDate: "2026-07-02", startTime: "19:30", endTime: "21:05", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-01",
  },
  {
    movieId: 2,
    movieNameVn: "Vùng Đất Câm Lặng: Ngày Một",
    movieNameEnglish: "A Quiet Place: Day One",
    director: "Michael Sarnoski",
    actor: "Lupita Nyong'o, Joseph Quinn",
    content:
      "Trải nghiệm ngày tận thế khi thành phố New York rơi vào im lặng tuyệt đối trước những sinh vật săn mồi theo âm thanh.",
    duration: 100,
    version: "IMAX",
    status: true,
    movieProductionCompany: "Paramount Pictures",
    largeImage: "https://image.tmdb.org/t/p/w500/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",
    movieType: ["Horror", "Sci-Fi"],
    showTimes: [
      { showTimeId: 102, showDate: "2026-07-03", startTime: "20:00", endTime: "21:40", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-02",
  },
  {
    movieId: 3,
    movieNameVn: "Những Mảnh Ghép Cảm Xúc 2",
    movieNameEnglish: "Inside Out 2",
    director: "Kelsey Mann",
    actor: "Amy Poehler, Maya Hawke",
    content:
      "Riley bước vào tuổi dậy thì và trung tâm điều khiển cảm xúc đón nhận những vị khách mới, dẫn đầu là Lo Âu.",
    duration: 96,
    version: "3D",
    status: true,
    movieProductionCompany: "Pixar",
    largeImage: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    movieType: ["Animation", "Family"],
    trailerUrl: "https://www.youtube.com/watch?v=LEjhY15eCx0",
    showTimes: [
      { showTimeId: 103, showDate: "2026-07-01", startTime: "18:15", endTime: "19:51", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-03",
  },
  {
    movieId: 4,
    movieNameVn: "Vương Quốc Hành Tinh Khỉ",
    movieNameEnglish: "Kingdom of the Planet of the Apes",
    director: "Wes Ball",
    actor: "Owen Teague, Freya Allan",
    content:
      "Nhiều thế hệ sau triều đại Caesar, một thủ lĩnh khỉ trẻ lên đường tìm sự thật quyết định tương lai của cả khỉ lẫn người.",
    duration: 145,
    version: "IMAX",
    status: true,
    movieProductionCompany: "20th Century Studios",
    largeImage: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    movieType: ["Sci-Fi", "Action"],
    showTimes: [
      { showTimeId: 104, showDate: "2026-07-04", startTime: "21:00", endTime: "23:25", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-04",
  },
  {
    movieId: 5,
    movieNameVn: "Deadpool & Wolverine",
    movieNameEnglish: "Deadpool & Wolverine",
    director: "Shawn Levy",
    actor: "Ryan Reynolds, Hugh Jackman",
    content:
      "Wade Wilson bị TVA lôi vào một nhiệm vụ đa vũ trụ, buộc phải thuyết phục một Wolverine miễn cưỡng cùng cứu lấy thế giới của anh.",
    duration: 128,
    version: "2D",
    status: true,
    movieProductionCompany: "Marvel Studios",
    largeImage: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    movieType: ["Action", "Comedy"],
    showTimes: [
      { showTimeId: 105, showDate: "2026-07-05", startTime: "20:30", endTime: "22:38", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-05",
  },
  {
    movieId: 6,
    movieNameVn: "Bad Boys: Một Lần Cuối",
    movieNameEnglish: "Bad Boys: Ride or Die",
    director: "Adil & Bilall",
    actor: "Will Smith, Martin Lawrence",
    content:
      "Hai thám tử Miami kỳ cựu đối mặt với cáo buộc nhắm vào người cố vấn đã khuất và lần đầu trở thành kẻ bị truy nã.",
    duration: 115,
    version: "2D",
    status: true,
    movieProductionCompany: "Columbia Pictures",
    largeImage: "https://image.tmdb.org/t/p/w500/oGythE98MYleE6mZlGs5oBGkux1.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/oGythE98MYleE6mZlGs5oBGkux1.jpg",
    movieType: ["Action", "Crime"],
    showTimes: [
      { showTimeId: 106, showDate: "2026-07-06", startTime: "19:45", endTime: "21:40", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-06",
  },
  {
    movieId: 7,
    movieNameVn: "Furiosa: Câu Chuyện Từ Max Điên",
    movieNameEnglish: "Furiosa: A Mad Max Saga",
    director: "George Miller",
    actor: "Anya Taylor-Joy, Chris Hemsworth",
    content:
      "Bị bắt khỏi vùng đất Xanh, Furiosa trẻ tuổi phải sống sót qua vùng hoang mạc khốc liệt và lên kế hoạch trở về nhà.",
    duration: 148,
    version: "IMAX",
    status: true,
    movieProductionCompany: "Warner Bros.",
    largeImage: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    movieType: ["Action", "Adventure"],
    showTimes: [
      { showTimeId: 107, showDate: "2026-07-07", startTime: "20:15", endTime: "22:43", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-07",
  },
  {
    movieId: 8,
    movieNameVn: "Garfield: Mèo Béo Siêu Quậy",
    movieNameEnglish: "The Garfield Movie",
    director: "Mark Dindal",
    actor: "Chris Pratt, Samuel L. Jackson",
    content:
      "Chú mèo lười Garfield tái ngộ người cha thất lạc và bị cuốn vào một phi vụ trộm sữa đầy mạo hiểm cùng chú chó Odie.",
    duration: 101,
    version: "2D",
    status: true,
    movieProductionCompany: "Sony Pictures",
    largeImage: "https://image.tmdb.org/t/p/w500/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
    smallImage: "https://image.tmdb.org/t/p/w300/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
    movieType: ["Animation", "Family"],
    showTimes: [
      { showTimeId: 108, showDate: "2026-07-08", startTime: "17:30", endTime: "19:11", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-08",
  },
];

// Cinematic still images used to pad each movie's gallery so the detail carousel
// has multiple interactive slides. (Placeholder stills for the mock — the first
// slide is always the real movie poster.)
const CINEMATIC_STILLS = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1280&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1280&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1280&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1280&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=1280&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1280&q=80&auto=format&fit=crop",
];

// Attach a gallery to each movie: real poster first, then two rotating stills.
export const mockMovies: MovieApiResponse[] = baseMovies.map((movie, i) => ({
  ...movie,
  gallery: [
    movie.largeImage,
    CINEMATIC_STILLS[(i * 2) % CINEMATIC_STILLS.length],
    CINEMATIC_STILLS[(i * 2 + 1) % CINEMATIC_STILLS.length],
  ],
}));

export default mockMovies;
