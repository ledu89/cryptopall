import { useQuery } from "@tanstack/react-query";
import { getCoin } from "../api/coingeckoApi";
type UseFetchSingleCoinProps = {
  endpoint: string;
  id: string | undefined;
};
export const useFetchSingleCoin = ({
  endpoint,
  id,
}: UseFetchSingleCoinProps) => {
  return useQuery({
    queryKey: ["coin", id],
    queryFn: () => getCoin(endpoint, id),
    staleTime: 60000,
  });
};
