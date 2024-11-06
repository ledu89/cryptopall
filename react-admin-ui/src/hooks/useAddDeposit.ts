// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addDeposit } from "../api/axiosInstance";
// import { toast } from "react-toastify";

// interface DepositPayload {
//   userId: number;
//   deposit: number;
// }

// const useAddDeposit = () => {
//   const queryClient = useQueryClient();

//   // Use mutation to manage the deposit operation
//   return useMutation({
//     mutationFn: ({ userId, deposit }: DepositPayload) =>
//       addDeposit(userId, deposit),

//     onSuccess: () => {
//       // Invalidate the user query to refetch user data
//       queryClient.invalidateQueries(["user"]);
//       toast.success("Deposit successful");
//     },

//     onError: (error: any) => {
//       // Display an error message on failure
//       toast.error(`Failed to deposit: ${error.message}`);
//     },
//   });
// };

// export default useAddDeposit;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeposit } from "../api/axiosInstance";
import { toast } from "react-toastify";

interface DepositPayload {
  userId: number;
  deposit: number;
}

const useAddDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, deposit }: DepositPayload) =>
      addDeposit(userId, deposit),

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },

    onError: (error: any) => {
      toast.error(`Failed to deposit: ${error.message}`);
    },
  });
};
export default useAddDeposit;
