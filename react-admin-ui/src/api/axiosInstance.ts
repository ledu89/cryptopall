import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { CryptoCoin, User } from "../types/Types";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const buyCoin = async (newCryptoAsset: CryptoCoin) => {
  try {
    const response = await axiosInstance.post("/crypto-assets", {
      data: newCryptoAsset,
    });

    return response.data;
  } catch (error: any) {
    toast(`Error ${error.message}`);
  }
};
export const getUserCryptoAssets = async (
  endpoint: string,
  user: User | null
) => {
  if (!user) {
    throw new Error("User is not logged in");
  }

  try {
    const res = await axiosInstance.get(endpoint, {
      params: {
        "filters[users_permissions_users]": user.id,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching user's CryptoAssets:", error);
    throw error;
  }
};
export const updateCoinAmount = async (coinId: string, newAmount: number) => {
  try {
    if (newAmount === 0) {
      const response = await axiosInstance.delete(`/crypto-assets/${coinId}`);
      toast.info("You sold full amount  of coin.");
      return response.data;
    }

    const response = await axiosInstance.put(`/crypto-assets/${coinId}`, {
      data: { amount: newAmount },
    });

    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
    throw error;
  }
};
export const addDeposit = async (userId: number, deposit: number) => {
  try {
    const userResponse = await axiosInstance.get(`users/${userId}`);
    const currentDeposit = userResponse.data.deposit || 0;
    const updatedDeposit = currentDeposit + deposit;
    const depositResponse = await axiosInstance.put(`/users/${userId}`, {
      deposit: updatedDeposit,
    });
    return depositResponse.data.deposit;
  } catch (error) {
    toast.error(`Error while depositing `);
  }
};
