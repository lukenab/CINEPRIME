import type { MovieApiResponse } from "../api/movieApi";
import { mockMovies } from "../data/mockMovies";

// Backend movies may lack a trailer/gallery/backdrops — enrich them from the
// mock catalogue (matched by English title) so previews still show a trailer
// and a real image gallery instead of falling back to generic placeholders.
export function enrichMovie(m: MovieApiResponse): MovieApiResponse {
  const mock = mockMovies.find(
    (mm) => mm.movieNameEnglish?.toLowerCase() === m.movieNameEnglish?.toLowerCase()
  );
  return {
    ...m,
    trailerUrl: m.trailerUrl ?? mock?.trailerUrl,
    gallery: m.gallery ?? mock?.gallery,
    backdrops: m.backdrops ?? mock?.backdrops,
  };
}
