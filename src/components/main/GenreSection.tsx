import { useState } from "react";
import { GenreCarousel } from "../carousel";
import { getRandomGenre } from "../../hooks/useRandomGenre";

export const GenreSection = () => {
  const [genre, setGenre] = useState<string>(() => getRandomGenre());
  return (
    <section className="mt-15">
      <p className="title">Genre: <span className="capitalize">{genre}</span></p>
      <GenreCarousel setGenre={setGenre} genre={genre} />
    </section>
  )
}
