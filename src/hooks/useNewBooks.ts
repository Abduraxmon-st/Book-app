import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  SEARCH_BOOKS,
  SEARCH_BOOKS_2,
  SEARCH_BOOKS_3,
} from "../constants";

const SEARCH_APIS = [
  SEARCH_BOOKS,
  SEARCH_BOOKS_2,
  SEARCH_BOOKS_3,
];

export const useGetNewBooks = () => {
  const currentYear = new Date().getFullYear();

  return useQuery({
    queryKey: ["new-books"],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: async () => {
      let lastError: unknown;

      for (const api of SEARCH_APIS) {
        try {
          const res = await axios(`${api}&earliest-publish-year=${currentYear}&number=10&offset=0`);
          if (res.data?.available > 0) {
            return res.data.books;
          } else {
            const res = await axios(`${api}&earliest-publish-year=${currentYear - 1}&number=10&offset=0`);
            return res.data.books;
          }
        } catch (error) {
          lastError = error;

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
      toast.error(
        lastError instanceof AxiosError
          ? lastError.response?.data?.message || "Error"
          : "Error"
      );

      throw lastError;
    },
  });
};