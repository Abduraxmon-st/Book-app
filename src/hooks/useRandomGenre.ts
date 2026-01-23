import { genres } from "../data/genres";

export function getRandomGenre(): string {
  const randomIndex = Math.floor(Math.random() * genres.length);
  return genres[randomIndex];
}
