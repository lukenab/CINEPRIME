import { useEffect, useState } from "react";
import { movieApi, type MovieApiResponse } from "../../api/movieApi";
import { mockMovies } from "../../data/mockMovies";
import { HeroSection } from "../../components/shared/HeroSection";
import { SearchBar } from "../../components/shared/SearchBar";
import { NowShowing } from "../../components/shared/NowShowing";
import { CinemaLocations } from "../../components/shared/CinemaLocations";
import { ExperienceBanner } from "../../components/shared/ExperienceBanner";
import { ComingSoon } from "../../components/shared/ComingSoon";
import { OffersTeaser } from "../../components/shared/OffersTeaser";
import { UpcomingEvents } from "../../components/shared/UpcomingEvents";
import { Testimonials } from "../../components/shared/Testimonials";
import { MoviePreviewModal } from "../../components/shared/MoviePreviewModal";
import { enrichMovie } from "../../utils/enrichMovie";

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
      <OffersTeaser />
      <ComingSoon movies={movies} />
      <UpcomingEvents />
      <Testimonials />

      <MoviePreviewModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </>
  );
}
