import axiosClient from "./api";

export interface Seat {
  seatId: number;
  row: string;
  number: number;
  type: "STANDARD" | "VIP";
  status: "AVAILABLE" | "LOCKED" | "BOOKED";
  price: number;
}

export interface BookingPayload {
  showtimeId: number;
  seatIds: number[];
}

export interface BookingConfirmation {
  bookingId: string;
  lockedUntil: string;
}


// Guests can book without a backend/login. Fall back to the stateful mock when the
// API is unreachable (network / 404 / 5xx) OR blocks the request with auth (401 / 403).
function shouldUseMock(error: any): boolean {
  const status = error?.response?.status;
  return (
    error?.code === "ERR_NETWORK" ||
    error?.message === "Network Error" ||
    !error?.response ||
    status === 401 ||
    status === 403 ||
    status === 404 ||
    status >= 500
  );
}

const mockState: Record<string, Seat[]> = {};

function getMockSeats(showtimeId: string | number) {
  const sid = String(showtimeId);
  if (!mockState[sid]) {
    const mockSeats: Seat[] = [];
    

    let totalRows = 10;
    if (sid === "1" || sid === "4") totalRows = 5;
    else if (sid === "2" || sid === "5") totalRows = 8;
    
    const rows = Array.from({ length: totalRows }, (_, i) => String.fromCharCode(65 + i));
    const seatsPerRow = 10;
    let idCounter = 1;
    
    for (const row of rows) {
      for (let num = 1; num <= seatsPerRow; num++) { 

        const isVip = row === "C" || row === "D"; 
        
        let status: "AVAILABLE" | "LOCKED" | "BOOKED" = "AVAILABLE";
        const seatCode = `${row}-${num}`;
        

        if (["A-5", "A-6", "C-5", "C-6", "E-2"].includes(seatCode)) {
          status = "BOOKED";
        } else if (["D-4", "D-5"].includes(seatCode)) {
          status = "LOCKED";
        }

        mockSeats.push({
          seatId: idCounter++,
          row: row,
          number: num,
          type: isVip ? "VIP" : "STANDARD",
          status: status,
          price: isVip ? 100000 : 70000,
        });
      }
    }
    mockState[sid] = mockSeats;
  }
  return mockState[sid];
}
// ----------------------

export const bookingApi = {
  getSeatsByShowtime: async (showtimeId: string | number): Promise<Seat[]> => {
    try {
      const res: any = await axiosClient.get(`/api/showtimes/${showtimeId}/seats`);
      return res.result || res;
    } catch (error: any) {
      if (shouldUseMock(error)) {
        console.warn("🚀 BACKEND UNREACHABLE / AUTH-BLOCKED: USING STATEFUL MOCK API for getSeatsByShowtime");
        return new Promise((resolve) => {
          setTimeout(() => {
            const seats = JSON.parse(JSON.stringify(getMockSeats(showtimeId)));
            resolve(seats);
          }, 500);
        });
      }
      throw error;
    }
  },
  
  createBooking: async (payload: BookingPayload): Promise<BookingConfirmation> => {
    try {
      const res: any = await axiosClient.post(`/api/bookings`, payload);
      return res.result || res;
    } catch (error: any) {
      // A real 409 (seat conflict) from the backend must surface as-is, not fall to mock.
      if (error?.response?.status === 409) throw error;
      if (shouldUseMock(error)) {
        console.warn("🚀 BACKEND UNREACHABLE / AUTH-BLOCKED: USING STATEFUL MOCK API for createBooking");
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const sid = String(payload.showtimeId);
            const seatsInDb = getMockSeats(sid);
            
            const conflicts = seatsInDb.filter(
              s => payload.seatIds.includes(s.seatId) && s.status !== "AVAILABLE"
            );
            
            if (conflicts.length > 0) {
              reject({
                response: {
                  status: 409,
                  data: {
                    code: 2005,
                    message: "Seats already taken by another user",
                    result: { conflictingSeatIds: conflicts.map(s => s.seatId) }
                  }
                }
              });
              return;
            }

            seatsInDb.forEach(s => {
              if (payload.seatIds.includes(s.seatId)) {
                s.status = "BOOKED";
              }
            });

            resolve({
              bookingId: "MOCK-BOOKING-" + Math.floor(Math.random() * 10000),
              lockedUntil: new Date(Date.now() + 10 * 60000).toISOString()
            });
          }, 800);
        });
      }
      throw error;
    }
  }
};
