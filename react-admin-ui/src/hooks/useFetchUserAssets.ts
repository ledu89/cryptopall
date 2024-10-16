import { useQuery } from "@tanstack/react-query";
import { getUserCryptoAssets } from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export const useFetchUserAssets = (endpoint: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["crypto-assets", endpoint],
    queryFn: () => getUserCryptoAssets(endpoint, user),
    staleTime: 6000,
  });
};
