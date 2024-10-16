import { useQuery } from "@tanstack/react-query";
import { getCoinMarketChart } from "../api/coingeckoApi";

type UseFetchCoinMarketChartProps = {
  id: string | undefined;
  vsCurrency: string;
  days: string;
};

export const useFetchCoinMarketChart = ({
  id,
  vsCurrency,
  days,
}: UseFetchCoinMarketChartProps) => {
  return useQuery({
    queryKey: ["coinMarketChart", id, vsCurrency, days],
    queryFn: () => getCoinMarketChart(id, vsCurrency, days),
    staleTime: 60000,
  });
};
