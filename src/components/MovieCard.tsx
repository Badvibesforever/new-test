"use client";
import { useEffect, useState } from "react";
import { Movie } from "../../type";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((m: Movie) => m.id === movie.id);
        if (match) setIsFavorite(true);
      });
  }, [movie.id]);

  const hanldeRoute = () => {
    router.push(`/movie/${movie?.id}`);
  };

  const handleAddFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      }),
    });
    const result = await res.json();
    if (result.status === "exists") {
      toast("Already in favorites");
    } else {
      toast.success("Added to favorites!");
      setIsFavorite(true);
    }
  };

  return (
    <div
      onClick={hanldeRoute}
      className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80 z-10" />
      <p className="absolute z-20 bottom-5 left-5">{movie?.title}</p>
      <Image
        src={getImagePath(movie?.backdrop_path || movie?.poster_path)}
        alt={movie?.title}
        width={1920}
        height={1080}
        className="w-fit lg:min-w-[400px] h-56 object-cover shadow-md shadow-gray-900 drop-shadow-xl"
      />
      <button
        disabled={isFavorite}
        className={`absolute top-2 left-2 px-2 py-1 text-xs rounded shadow-md z-30 ${
          isFavorite
            ? "bg-gray-200 text-gray-500 cursor-default"
            : "bg-white text-red-600 hover:bg-red-100"
        }`}
        onClick={handleAddFavorite}
      >
        {isFavorite ? "✓ Saved" : "❤️ Favorite"}
      </button>
    </div>
  );
};

export default MovieCard;
