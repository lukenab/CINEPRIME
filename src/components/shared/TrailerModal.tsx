import { useEffect } from "react";
import { X, Play } from "lucide-react";
import type { MovieApiResponse } from "../../api/movieApi";

type Props = {
  movie: MovieApiResponse | null;
  onClose: () => void;
};

// Turn a YouTube watch / youtu.be / embed link into an embeddable URL.
function toEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const idMatch =
    url.match(/[?&]v=([\w-]{6,})/) ||
    url.match(/youtu\.be\/([\w-]{6,})/) ||
    url.match(/\/embed\/([\w-]{6,})/);
  const id = idMatch?.[1];
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
}

export function TrailerModal({ movie, onClose }: Props) {
  useEffect(() => {
    if (!movie) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const title = movie.movieNameEnglish || movie.movieNameVn || "Movie";
  const embed = toEmbedUrl(movie.trailerUrl);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} official trailer`
  )}`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur transition-colors hover:bg-black/80 hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        {embed ? (
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src={embed}
              title={`${title} — Trailer`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          // Fallback when no trailer link is available for this movie.
          <div className="relative flex flex-col items-center justify-center text-center" style={{ aspectRatio: "16 / 9" }}>
            <img
              src={movie.largeImage || movie.smallImage}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
            <div className="relative flex flex-col items-center gap-4 px-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30">
                <Play size={26} className="text-[#FFD700] ml-0.5" fill="#FFD700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm text-white/55">Trailer chưa được cập nhật cho phim này.</p>
              </div>
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] px-5 py-2.5 text-sm font-bold text-black transition-all hover:brightness-110 hover:scale-[1.03]"
              >
                <Play size={15} fill="#050505" /> Xem trên YouTube
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
