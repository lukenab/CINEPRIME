import type { ClusterResponse } from "../api/movieApi";

// Mock cinema clusters for the landing page (CinemaLocations / SearchBar)
// so it renders without a live backend.
export const mockClusters: ClusterResponse[] = [
  { clusterId: 1, clusterName: "CinePrime Quận 1",    province: "TP. Hồ Chí Minh", address: "123 Nguyễn Huệ, Quận 1",        phoneNumber: "028 3822 1234", status: "ACTIVE", totalRooms: 5, totalSeats: 650 },
  { clusterId: 2, clusterName: "CinePrime Thủ Đức",   province: "TP. Hồ Chí Minh", address: "456 Võ Văn Ngân, TP. Thủ Đức", phoneNumber: "028 3896 5678", status: "ACTIVE", totalRooms: 4, totalSeats: 480 },
  { clusterId: 3, clusterName: "CinePrime Hoàn Kiếm", province: "Hà Nội",          address: "78 Hàng Bài, Hoàn Kiếm",       phoneNumber: "024 3936 9012", status: "ACTIVE", totalRooms: 6, totalSeats: 820 },
  { clusterId: 4, clusterName: "CinePrime Cầu Giấy",  province: "Hà Nội",          address: "22 Xuân Thủy, Cầu Giấy",       phoneNumber: "024 3768 3456", status: "ACTIVE", totalRooms: 4, totalSeats: 510 },
  { clusterId: 5, clusterName: "CinePrime Hải Châu",  province: "Đà Nẵng",         address: "30 Trần Phú, Hải Châu",        phoneNumber: "0236 382 7890", status: "ACTIVE", totalRooms: 3, totalSeats: 360 },
  { clusterId: 6, clusterName: "CinePrime Ninh Kiều", province: "Cần Thơ",         address: "15 Hai Bà Trưng, Ninh Kiều",   phoneNumber: "0292 381 2345", status: "ACTIVE", totalRooms: 2, totalSeats: 220 },
];

export default mockClusters;
