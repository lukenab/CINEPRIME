import { useEffect, useState } from "react";
import { movieApi, type MovieApiResponse } from "../../api/movieApi";
import { mockMovies } from "../../data/mockMovies";
import { HeroSection } from "../../components/shared/HeroSection";
import { SearchBar } from "../../components/shared/SearchBar";
import { NowShowing } from "../../components/shared/NowShowing";
import { CinemaLocations } from "../../components/shared/CinemaLocations";
import { ExperienceBanner } from "../../components/shared/ExperienceBanner";
import { ComingSoon } from "../../components/shared/ComingSoon";
import { MoviePreviewModal } from "../../components/shared/MoviePreviewModal";

// Backend movies may lack a trailer/gallery — enrich them from the mock catalogue
// (matched by English title) so the preview can autoplay a trailer.
function enrichMovie(m: MovieApiResponse): MovieApiResponse {
  const mock = mockMovies.find(
    (mm) => mm.movieNameEnglish?.toLowerCase() === m.movieNameEnglish?.toLowerCase()
  );
  return {
    ...m,
    trailerUrl: m.trailerUrl ?? mock?.trailerUrl,
    gallery: m.gallery ?? mock?.gallery,
  };
}

export default function HomePage() {
  const [movies, setMovies] = useState<MovieApiResponse[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [movieError, setMovieError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieApiResponse | null>(null);

  useEffect(() => {
    let active = true;

    const loadMovies = async () => {
      setLoadingMovies(true);
      setMovieError("");
      try {
        const res = await movieApi.getAllMovies();
        const data = res.result ?? [];
        // Fall back to mock data when the backend returns no movies,
        // so the landing page always has content to show.
        if (active) setMovies(data.length > 0 ? data : mockMovies);
      } catch {
        // Backend unavailable — show mock movies instead of an error.
        if (active) setMovies(mockMovies);
      } finally {
        if (active) setLoadingMovies(false);
      }
    };

    loadMovies();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <HeroSection />
      <SearchBar />
      <NowShowing
        movies={movies}
        loading={loadingMovies}
        error={movieError}
        onBook={(m) => setSelectedMovie(enrichMovie(m))}
      />
      <CinemaLocations />
      <ExperienceBanner />
      <ComingSoon movies={movies} />

      <MoviePreviewModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </>
  );
}
