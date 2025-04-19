"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface FavoritesContextValue {
  favorites: Movie[];
  refreshFavorites: () => void;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  shouldRefresh: boolean;
  clearRefreshFlag: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const fetchFavorites = async () => {
    const res = await fetch("/api/favorites");
    const data = await res.json();
    setFavorites(data);
  };

  const addFavorite = async (movie: Movie) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    const result = await res.json();
    if (result.status === "exists") {
      toast("Already in favorites");
    } else {
      toast.success("Added to favorites");
      setFavorites((prev) => [...prev, movie]);
      setShouldRefresh(true); 
    }
  };

  const removeFavorite = async (id: number) => {
    await fetch("/api/favorites", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setFavorites((prev) => prev.filter((m) => m.id !== id));
    toast.success("Removed from favorites");
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        refreshFavorites: fetchFavorites,
        addFavorite,
        removeFavorite,
        shouldRefresh,
        clearRefreshFlag: () => setShouldRefresh(false),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
