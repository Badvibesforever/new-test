"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { Movie } from "../../type";
import { getImagePath } from "@/lib/getImagePath";
import Image from "next/image";

interface Props {
  movies: Movie[];
}

const HeroCarosel = ({ movies }: Props) => {
  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  };

  const [emblaRef] = useEmblaCarousel(
    { loop: true }, 
    [AutoPlay(autoplayOptions)]
  );

  return (
    <div className="overflow-hidden relative" ref={emblaRef}>
      <div className="flex transition-transform will-change-transform">
        {movies.map((movie) => (
          <div key={movie?.id} className="relative shrink-0 basis-full min-w-0">
            <Image
              src={getImagePath(movie?.backdrop_path, true)}
              alt={movie?.title || "Movie backdrop"}
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="hidden lg:inline absolute top-0 pt-40 xl:pt-72 left-0 bg-transparent z-20 h-full w-full bg-gradient-to-r from-gray-900/90 via-transparent to-transparent p-10 space-y-5 text-white">
              <h2 className="text-5xl font-bold max-w-xl">{movie?.title}</h2>
              <p className="max-w-xl line-clamp-3">{movie?.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-gray--900/100 via-gray-900/30 to-gray-300 dark:to-[#121212]" />
    </div>
  );
};

export default HeroCarosel;
