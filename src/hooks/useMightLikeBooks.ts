import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  SEARCH_BOOKS,
  SEARCH_BOOKS_2,
  SEARCH_BOOKS_3,
} from "../constants";
import { books } from "../data/books";

const SEARCH_APIS = [
  SEARCH_BOOKS,
  SEARCH_BOOKS_2,
  SEARCH_BOOKS_3,
];

export const useGetMightLikeBooks = () => {
  const currentYear = new Date().getFullYear();
  const genre = "nonfiction";
  return useQuery({
    queryKey: ["might-like-books"],
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
    queryFn: async () => {
      // let lastError: unknown;

      for (const api of SEARCH_APIS) {
        try {
          const res = await axios(`${api}&genres=${genre}&earliest-publish-year=${currentYear - 1}&latest-publish-year=${currentYear}&min-rating=0.8&number=30&offset=0`);
          return res.data.books;
        } catch (error) {
          // lastError = error;

          // not 402 error ? break;
          if (
            !(error instanceof AxiosError) ||
            error.response?.data?.code !== 402
          ) {
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