import { useEffect, useRef } from "react";
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

const MAX_GENRE_ATTEMPTS = 3;

export const useGetGenreBooks = (
  genre: string,
  setGenre: (genre: string) => void
) => {
  const attemptsRef = useRef(0);
  const usedGenresRef = useRef<Set<string>>(new Set());

  const query = useQuery({
    queryKey: ["genre-books", genre],
    staleTime: 1000 * 60 * 60,
    retry: false,

    queryFn: async () => {
      for (const api of SEARCH_APIS) {
        try {
          const res = await axios(
            `${api}&genres=${genre}&min-rating=0.7&number=30&offset=0`
          );
          return res.data.books;
        } catch (error) {
          if (
            error instanceof AxiosError &&
            error.response?.status === 400
          ) {
            throw new Error("INVALID_GENRE");
          }

          if (
            error instanceof AxiosError &&
            error.response?.status === 402
          ) {
            continue;
          }

          throw error;
        }
      }

      return books;
    },
  });

  // 👇 v5 da onError o‘rnini bosadi
  useEffect(() => {
    if (!query.error) return;

    if (
      query.error instanceof Error &&
      query.error.message === "INVALID_GENRE"
    ) {
      if (attemptsRef.current >= MAX_GENRE_ATTEMPTS) return;

      usedGenresRef.current.add(genre);
      attemptsRef.current += 1;

      let newGenre = getRandomGenre();
      while (usedGenresRef.current.has(newGenre)) {
        newGenre = getRandomGenre();
      }

      setGenre(newGenre);
    }
  }, [query.error, genre, setGenre]);

  return query;
};
  