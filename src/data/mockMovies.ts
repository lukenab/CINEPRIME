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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/twsxsfao6ZOVvT8LfudH603MMi6.jpg",
      "https://image.tmdb.org/t/p/w1280/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
    ],
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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/6XjMwQTvnICBz6TguiDKkDVHvgS.jpg",
      "https://image.tmdb.org/t/p/w1280/1XyIHrP7X7rn3UBkNy9hPb9vCUf.jpg",
    ],
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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
      "https://image.tmdb.org/t/p/w1280/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    ],
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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/fypydCipcWDKDTTCoPucBsdGYXW.jpg",
      "https://image.tmdb.org/t/p/w1280/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    ],
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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/cOoVcVQ3i1m5b2xtqKBtoTSbxC1.jpg",
      "https://image.tmdb.org/t/p/w1280/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    ],
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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/3q01ACG0MWm0DekhvkPFCXyPZSu.jpg",
      "https://image.tmdb.org/t/p/w1280/tncbMvfV0V07UZozXdBEq4Wu9HH.jpg",
    ],
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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg",
      "https://image.tmdb.org/t/p/w1280/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
    ],
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
    backdrops: [
      "https://image.tmdb.org/t/p/w1280/P82NAcEsLIYgQtrtn36tYsj41m.jpg",
      "https://image.tmdb.org/t/p/w1280/a3lkC7qTYqSA8FqZAyKZzQMECGc.jpg",
    ],
    movieType: ["Animation", "Family"],
    showTimes: [
      { showTimeId: 108, showDate: "2026-07-08", startTime: "17:30", endTime: "19:11", cinemaRoomId: 1, cinemaRoomName: "IMAX", updateAt: "2026-06-25" },
    ],
    createAt: "2026-06-08",
  },
];

// Attach a gallery to each movie: real poster first, then its own real backdrop
// stills (actual scenes from that film, sourced per-movie — not generic filler).
export const mockMovies: MovieApiResponse[] = baseMovies.map((movie) => ({
  ...movie,
  gallery: [movie.largeImage, ...(movie.backdrops ?? [])],
}));

export default mockMovies;
