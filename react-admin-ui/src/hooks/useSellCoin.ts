import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCoinAmount } from "../api/axiosInstance";
import { toast } from "react-toastify";

const useSellCoin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ coinId, newAmount }) => updateCoinAmount(coinId, newAmount),
    onSuccess: () => {
      queryClient.invalidateQueries("crypto-assets");
      //   toast.success("Coin sold successfully!");
    },

    onError: (error: any) => {
      toast.error(`Error selling crypto asset: ${error.message}`);
    },
  });
};
export default useSellCoin;
