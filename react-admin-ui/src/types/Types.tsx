export type CryptoCoin = {
  coin_uid: string;
  name: string;
  symbol: string;
  description: string;
  current_price: number;
  market_cap_rank: number | string;
  image_url?: string;
  amount: number;
  users_permissions_users: number[];
  image?: string;
  totalAmount?: number;
  color: string;
};
export type User = {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
  deposit: string;
};
export type AuthContextType = {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: any;
  updateUser: (data: Partial<User>) => Promise<void>;
};
export type LoginData = {
  username: string;
  password: string;
};
export type RegisterData = {
  username: string;
  email: string;
  password: string;
};
export type TrendingCoin = {
  item: {
    coin_id: number | string;
    name: string;
    symbol: string;
    id: number;
    market_cap_rank: number;
    data: {
      price: number;
      market_cap: string;
    };
    small: string;
  };
};

export type TrendingCoinsType = {
  trendingCoins: TrendingCoin[];
};

export type SelectedCoin = {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: 67.81;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null;
  symbol: string;
  total_supply: number;
  total_volume: number;
};
