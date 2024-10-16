import { useQuery } from "@tanstack/react-query";
import { getCoinsMarketData } from "../api/coingeckoApi";

const useCoinsMarketData = (vsCurrency: string) => {
  return useQuery({
    queryKey: ["coinsMarketData", vsCurrency],
    queryFn: () => getCoinsMarketData(vsCurrency),

    staleTime: 60000,
  });
};

export default useCoinsMarketData;
