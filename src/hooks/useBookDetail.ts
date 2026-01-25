import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  API_KEY,
  API_KEY_2,
  API_KEY_3,
  DOMAIN,
} from "../constants";
import type { BookDetail } from "../types";
import { book } from "../data/books";

const SEARCH_APIS = [
  API_KEY,
  API_KEY_2,
  API_KEY_3,
];

export const useGetBookDetail = ({ id }: { id: number | null }) => {
  return useQuery({
    queryKey: ["book-detail", id],
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
    enabled: !!id,
    queryFn: async () => {
      // let lastError: unknown;

      for (const api of SEARCH_APIS) {
        try {
          const res = await axios(`${DOMAIN}/${id}/?api-key=${api}`);
          return res.data as BookDetail;
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
      return book

      // throw lastError;
    },
  });
};