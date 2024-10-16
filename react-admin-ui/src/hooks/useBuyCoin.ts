import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyCoin } from "../api/axiosInstance";
import { toast } from "react-toastify";

const useBuyCoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: buyCoin,
    onSuccess: () => {
      queryClient.invalidateQueries("crypto-assets");
    },

    onError: (error: any) => {
      toast.error(`Error buying crypto asset: ${error.message}`);
    },
  });
};

export default useBuyCoin;
