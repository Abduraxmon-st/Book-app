import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  SEARCH_BOOKS,
  SEARCH_BOOKS_2,
  SEARCH_BOOKS_3,
} from "../constants";
import { getRandomGenre } from "./useRandomGenre";
import { books } from "../data/books";

const SEARCH_APIS = [
  SEARCH_BOOKS,
  SEARCH_BOOKS_2,
  SEARCH_BOOKS_3,
];

export const useGetGenreBooks = (genre: string, setGenre: (genre: string) => void) => {

  return useQuery({
    queryKey: ["genre-books", genre],
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
    queryFn: async () => {
      // let lastError: unknown;

      for (const api of SEARCH_APIS) {
        try {
          const res = await axios(`${api}&genres=${genre}&min-rating=0.7&number=30&offset=0`);
          return res.data.books;
        } catch (error) {
          // lastError = error;

          if (
            !(error instanceof AxiosError) ||
            error.response?.data?.code === 400
          ) {
            const genreMore = getRandomGenre(); // Example genre, this could be passed as a prop
            setGenre(genreMore);
          } else if (!(error instanceof AxiosError) ||
            error.response?.data?.code !== 402) {
            break;
          }
          // 402 error ? try next API
        }
      }

      // all APIs failed
      // toast.error(
      //   lastError instanceof AxiosError
      //     ? lastError.response?.data?.message || "Error"
      //     : "Error"
      // );

      return books
      // throw lastError;
    },
  });
};