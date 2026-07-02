import type { ShowtimeResponse, ShowtimeAssignPayload, ShowtimeUpdatePayload } from './showtimeApi';
import { mockMovies } from '../data/mockMovies';
import { mockClusters } from '../data/mockClusters';

const timeToMinutes = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const isOverlapping = (startA: string, endA: string, startB: string, endB: string): boolean => {
  return timeToMinutes(startA) < timeToMinutes(endB) && timeToMinutes(startB) < timeToMinutes(endA);
};

// ── Static seed data (used for mock dropdowns and initial state) ──────────────

export const initialMovies = [
  { movieId: 1, movieNameVn: "Hành Tinh Cát: Phần 2",        movieNameEnglish: "Dune: Part Two",              duration: 166 },
  { movieId: 2, movieNameVn: "Deadpool & Wolverine",           movieNameEnglish: "Deadpool & Wolverine",         duration: 127 },
  { movieId: 3, movieNameVn: "Những Mảnh Ghép Cảm Xúc 2",    movieNameEnglish: "Inside Out 2",                 duration: 96  },
  { movieId: 4, movieNameVn: "Furiosa: Câu Chuyện Mad Max",   movieNameEnglish: "Furiosa: A Mad Max Saga",      duration: 148 },
];

export const initialCinemas = [
  { cinemaId: 1, cinemaName: "CinePrime Central", address: "123 Le Loi St, District 1, HCMC" },
  { cinemaId: 2, cinemaName: "CinePrime Plaza",   address: "456 Nguyen Trai St, District 5, HCMC" },
];

export const initialRooms = [
  { cinemaRoomId: 1, cinemaRoomName: "Cinema 1 (IMAX)",     seatQuantity: 120, cinemaId: 1 },
  { cinemaRoomId: 2, cinemaRoomName: "Cinema 2 (3D)",       seatQuantity: 80,  cinemaId: 1 },
  { cinemaRoomId: 3, cinemaRoomName: "Cinema 3 (Standard)", seatQuantity: 100, cinemaId: 2 },
  { cinemaRoomId: 4, cinemaRoomName: "Cinema 4 (Standard)", seatQuantity: 100, cinemaId: 2 },
];

// ── localStorage-backed persistence ──────────────────────────────────────────

const getStored = <T>(key: string, initial: T): T => {
  const val = localStorage.getItem(key);
  if (!val) { localStorage.setItem(key, JSON.stringify(initial)); return initial; }
  return JSON.parse(val);
};

const setStored = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialShowtimes: ShowtimeResponse[] = [
  { showtimeId: 1, movieId: 1, movieName: "Dune: Part Two",       duration: 166, cinemaId: 1, cinemaName: "CinePrime Central", cinemaRoomId: 1, roomName: "Cinema 1 (IMAX)",     showDate: "2026-06-25", startTime: "09:00", endTime: "11:46", basePrice: 90000,  status: "SCHEDULED" },
  { showtimeId: 2, movieId: 2, movieName: "Deadpool & Wolverine", duration: 127, cinemaId: 1, cinemaName: "CinePrime Central", cinemaRoomId: 2, roomName: "Cinema 2 (3D)",       showDate: "2026-06-25", startTime: "14:30", endTime: "16:37", basePrice: 110000, status: "ONGOING"   },
  { showtimeId: 3, movieId: 3, movieName: "Inside Out 2",         duration: 96,  cinemaId: 2, cinemaName: "CinePrime Plaza",   cinemaRoomId: 3, roomName: "Cinema 3 (Standard)", showDate: "2026-06-25", startTime: "18:00", endTime: "19:36", basePrice: 85000,  status: "SCHEDULED" },
];

export const getMockMovies   = () => getStored('mock_movies',    initialMovies);
export const getMockCinemas  = () => getStored('mock_cinemas',   initialCinemas);
export const getMockRooms    = () => getStored('mock_rooms',     initialRooms);
export const getMockShowtimes = () => getStored('mock_showtimes', initialShowtimes);

// ── Mock response helpers ─────────────────────────────────────────────────────

const mockResponse = (data: unknown, status = 200) =>
  Promise.resolve({ data, status, statusText: "OK", headers: {}, config: {} as any });

const mockError = (message: string, status = 400) => {
  const err = new Error(message);
  (err as any).response = { status, data: { code: status, message } };
  return Promise.reject(err);
};

// ── Mock auth (login / logout / refresh) ──────────────────────────────────────
// No backend is deployed with the frontend, so these credentials only exist
// client-side: admin/admin → admin dashboard, user/user → customer landing page.

type MockRole = "ROLE_ADMIN" | "ROLE_MEMBER";

const MOCK_ACCOUNTS: Record<string, { password: string; role: MockRole }> = {
  admin: { password: "admin", role: "ROLE_ADMIN" },
  user: { password: "user", role: "ROLE_MEMBER" },
};

const TOKEN_TTL_SECONDS = 8 * 60 * 60; // 8h

function base64UrlEncode(obj: unknown): string {
  const json = JSON.stringify(obj);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode<T>(segment: string): T {
  const b64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(escape(atob(b64))));
}

// Builds a JWT-shaped (but unsigned) token so jwt-decode on the client can
// read `sub`/`role`/`exp` exactly like a real backend token would.
function createMockToken(username: string, role: MockRole): string {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = { sub: username, role, iat: now, exp: now + TOKEN_TTL_SECONDS };
  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.mock-signature`;
}

const mockAuthError = (message: string, code = 1008, status = 401) => {
  const err = new Error(message);
  (err as any).response = { status, data: { code, message } };
  return Promise.reject(err);
};

// ── Mock request handler (showtime CRUD only) ────────────────────────────────

export const handleMockRequest = (config: any): Promise<any> => {
  const { url, method, data } = config;
  const parsed = data ? (typeof data === 'string' ? JSON.parse(data) : data) : null;

  // POST auth/login — mock credentials: admin/admin (admin dashboard), user/user (landing page)
  if (url?.endsWith('auth/login') && method === 'post') {
    const { username, password } = (parsed ?? {}) as { username?: string; password?: string };
    const account = username ? MOCK_ACCOUNTS[username.toLowerCase()] : undefined;
    if (!account || account.password !== password) {
      return mockAuthError("Incorrect username or password.");
    }
    const token = createMockToken(username!.toLowerCase(), account.role);
    return mockResponse({ code: 1000, result: { token } });
  }

  // POST auth/logout
  if (url?.endsWith('auth/logout') && method === 'post') {
    return mockResponse({ code: 1000, message: "Logged out" });
  }

  // POST auth/refresh — reissue a fresh token for the same subject/role
  if (url?.endsWith('auth/refresh') && method === 'post') {
    const { token } = (parsed ?? {}) as { token?: string };
    if (!token) return mockAuthError("Missing token.", 1008, 400);
    try {
      const [, payloadSeg] = token.split('.');
      const payload = base64UrlDecode<{ sub: string; role: MockRole }>(payloadSeg);
      const newToken = createMockToken(payload.sub, payload.role);
      return mockResponse({ code: 1000, result: { token: newToken } });
    } catch {
      return mockAuthError("Invalid token.", 1008, 400);
    }
  }

  // ── Landing page (read-only) ────────────────────────────────────────────────
  // GET /api/movies/all
  if (url === '/api/movies/all' && method === 'get') {
    return mockResponse({ code: 1000, result: mockMovies });
  }

  // GET /api/cinema-clusters
  if (url === '/api/cinema-clusters' && method === 'get') {
    return mockResponse({ code: 1000, result: mockClusters });
  }

  // GET /api/showtimes
  if (url === '/api/showtimes' && method === 'get') {
    return mockResponse({ code: 1000, result: getMockShowtimes() });
  }

  // POST /api/showtimes/assign
  if (url === '/api/showtimes/assign' && method === 'post') {
    const payload = parsed as ShowtimeAssignPayload;

    if (!payload.movieId || !payload.cinemaRoomId || !payload.showDate || !payload.startTime || !payload.endTime || !payload.basePrice) {
      return mockError("Missing required fields.");
    }
    if (timeToMinutes(payload.startTime) >= timeToMinutes(payload.endTime)) {
      return mockError("Start time must be before end time.");
    }

    const showtimes = getMockShowtimes();
    const rooms     = getMockRooms();
    const movies    = getMockMovies();
    const cinemas   = getMockCinemas();

    const room   = rooms.find(r => r.cinemaRoomId === payload.cinemaRoomId);
    if (!room)   return mockError("Cinema room not found.");
    const movie  = movies.find(m => m.movieId === payload.movieId);
    if (!movie)  return mockError("Movie not found.");
    const cinema = cinemas.find(c => c.cinemaId === room.cinemaId);
    if (!cinema) return mockError("Cinema not found.");

    const conflict = showtimes.find(s =>
      s.cinemaRoomId === payload.cinemaRoomId &&
      s.showDate === payload.showDate &&
      s.status !== 'CANCELLED' &&
      isOverlapping(payload.startTime, payload.endTime, s.startTime, s.endTime)
    );
    if (conflict) {
      return mockError(`Time slot conflict: "${room.cinemaRoomName}" already has "${conflict.movieName}" from ${conflict.startTime}–${conflict.endTime} on this day.`, 409);
    }

    const newId = showtimes.length > 0 ? Math.max(...showtimes.map(s => s.showtimeId)) + 1 : 1;
    const created: ShowtimeResponse = {
      showtimeId: newId,
      movieId: payload.movieId,
      movieName: movie.movieNameEnglish,
      duration: movie.duration,
      cinemaId: room.cinemaId,
      cinemaName: cinema.cinemaName,
      cinemaRoomId: payload.cinemaRoomId,
      roomName: room.cinemaRoomName,
      showDate: payload.showDate,
      startTime: payload.startTime,
      endTime: payload.endTime,
      basePrice: payload.basePrice,
      status: "SCHEDULED",
    };
    showtimes.unshift(created);
    setStored('mock_showtimes', showtimes);
    return mockResponse({ code: 1000, message: "Showtime assigned successfully", result: created });
  }

  const idMatch = url?.match(/^\/api\/showtimes\/(\d+)$/);

  // PUT /api/showtimes/{id}
  if (idMatch && method === 'put') {
    const id = parseInt(idMatch[1]);
    const payload = parsed as ShowtimeUpdatePayload;
    const showtimes = getMockShowtimes();
    const idx = showtimes.findIndex(s => s.showtimeId === id);
    if (idx === -1) return mockError("Showtime not found.", 404);

    const updated = { ...showtimes[idx], ...payload };

    if (updated.startTime && updated.endTime && timeToMinutes(updated.startTime) >= timeToMinutes(updated.endTime)) {
      return mockError("Start time must be before end time.");
    }

    if (payload.movieId) {
      const movie = getMockMovies().find(m => m.movieId === payload.movieId);
      if (!movie) return mockError("Movie not found.");
      updated.movieName = movie.movieNameEnglish;
      updated.duration  = movie.duration;
    }
    if (payload.cinemaRoomId) {
      const room = getMockRooms().find(r => r.cinemaRoomId === payload.cinemaRoomId);
      if (!room) return mockError("Cinema room not found.");
      updated.roomName  = room.cinemaRoomName;
      updated.cinemaId  = room.cinemaId;
      const cinema = getMockCinemas().find(c => c.cinemaId === room.cinemaId);
      if (cinema) updated.cinemaName = cinema.cinemaName;
    }

    if (updated.status !== 'CANCELLED') {
      const conflict = getMockShowtimes().find(s =>
        s.showtimeId !== id &&
        s.cinemaRoomId === updated.cinemaRoomId &&
        s.showDate === updated.showDate &&
        s.status !== 'CANCELLED' &&
        isOverlapping(updated.startTime, updated.endTime, s.startTime, s.endTime)
      );
      if (conflict) {
        return mockError(`Time slot conflict: "${updated.roomName}" already has "${conflict.movieName}" from ${conflict.startTime}–${conflict.endTime} on this day.`, 409);
      }
    }

    showtimes[idx] = updated;
    setStored('mock_showtimes', showtimes);
    return mockResponse({ code: 1000, message: "Showtime updated successfully", result: updated });
  }

  // DELETE /api/showtimes/{id}
  if (idMatch && method === 'delete') {
    const id = parseInt(idMatch[1]);
    const showtimes = getMockShowtimes();
    const filtered = showtimes.filter(s => s.showtimeId !== id);
    if (filtered.length === showtimes.length) return mockError("Showtime not found.", 404);
    setStored('mock_showtimes', filtered);
    return mockResponse({ code: 1000, message: "Showtime deleted successfully" });
  }

  return Promise.reject(new Error(`No mock handler: ${method?.toUpperCase()} ${url}`));
};
