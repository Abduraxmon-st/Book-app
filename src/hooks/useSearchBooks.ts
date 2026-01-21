import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SEARCH_BOOKS } from "../constants";
import axios from "axios";

export const useGetSearchBooks = ({ query }: { query: string }) => {
  return useQuery({
    queryKey: ["search-books", query],
    queryFn: async () => {
      try {
        const res = await axios(`${SEARCH_BOOKS}&query=${query}&offset=0`);
        return res.data.books;
      } catch (error) {
        console.log(error);
        toast.error(error instanceof Error ? error.message : "error");
        throw error;
      }
    },
    enabled: query.length > 0,
  });
};