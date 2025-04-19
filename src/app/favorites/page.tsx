"use client";
import { useEffect } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import FavoritesGrid from "@/components/FavoritesGrid";
import { usePathname } from "next/navigation";

export default function FavoritesPage() {
  const { refreshFavorites } = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    refreshFavorites();
  }, [pathname]);

  return (
    <div className="p-10 space-y-4">
      <h2 className="text-3xl font-bold">Favorite Movies</h2>
      <FavoritesGrid />
    </div>
  );
}
