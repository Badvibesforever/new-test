import { getDiscoverMovies } from "@/lib/getMovies";
import HeroCarosel from "./HeroCarosel";

interface Props {
  id?: string;
  keywords?: string;
}

const CaroselBanner = async ({ id, keywords }: Props) => {
  const movies = await getDiscoverMovies(id, keywords);

  return <HeroCarosel movies={movies} />; 
};

export default CaroselBanner;
