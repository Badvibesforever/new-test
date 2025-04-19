"use client";
import { useFavorites } from "@/context/FavoritesContext";
import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/getImagePath";

export default function FavoritesGrid() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {favorites.map((movie) => (
        <div key={movie.id} className="relative group">
          <Link href={`/movie/${movie.id}`}>
            <Image
              src={getImagePath(movie.poster_path)}
              alt={movie.title}
              width={300}
              height={450}
              className="w-full h-auto object-cover rounded-md"
            />
          </Link>
          <button
            className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 text-xs shadow"
            onClick={() => removeFavorite(movie.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
