import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://api.coingecko.com/api/v3";

const coingeckoInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default coingeckoInstance;

export const getCoins = async (endpoint: string) => {
  try {
    const res = await coingeckoInstance.get(endpoint);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(`API Error: ${error.message}`);
      throw new Error();
    }
  }
};
export const getCoin = async (endpoint: string, id: string | undefined) => {
  try {
    if (id === undefined) {
      throw new Error("Coin ID is undefined");
    }
    const res = await coingeckoInstance.get(`${endpoint}/${id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(`API Error: ${error.message}`);
    }
  }
};

export const getCoinsMarketData = async (vsCurrency: string) => {
  try {
    const params = {
      vs_currency: vsCurrency,
    };

    const res = await coingeckoInstance.get("/coins/markets", { params });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching coins market data:", error.message);
    throw new Error(
      "Failed to fetch coins market data. Please try again later."
    );
  }
};
export const getCoinMarketChart = async (
  id: string | undefined,
  vsCurrency: string,
  days: string
) => {
  try {
    if (id === undefined) {
      throw new Error("Coin ID is undefined");
    }
    const params = {
      vs_currency: vsCurrency,
      days: days,
    };
    const res = await coingeckoInstance.get(`/coins/${id}/market_chart`, {
      params,
    });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching coin market chart data:", error.message);
    throw new Error(
      "Failed to fetch coin market chart data. Please try again later."
    );
  }
};
