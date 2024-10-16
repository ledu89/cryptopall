import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../api/coingeckoApi";

export const useFetchCoins = (endpoint: string) => {
  return useQuery({
    queryKey: ["coins", endpoint],
    queryFn: () => getCoins(endpoint),
    staleTime: 6000,
  });
};
