import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const useGetUserDeposit = () => {
  const { user } = useAuth();

  // Query function to fetch user data
  const fetchUser = async () => {
    if (!user?.id) {
      toast.error("User ID is not available");
    }
    try {
      const userDeposit = await axiosInstance.get(`users/${user?.id}`);
      return userDeposit.data.deposit ?? 0;
    } catch (error: any) {
      toast.error(`Error buying crypto asset: ${error.message}`);
      return 0; // Return 0 in case of error
    }
  };

  // Using React Query to fetch the user data
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!user?.id, // Only run the query if user ID is available
    onError: (error: any) => {
      console.error("Error fetching user:", error.message);
    },
  });
};

export default useGetUserDeposit;
