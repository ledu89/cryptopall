import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/formatPrice";
import "./trendingCoins.scss";

import { useAuth } from "../../context/AuthContext";
import useBuyCoin from "../../hooks/useBuyCoin";
import { useState } from "react";
import Add from "../add/Add";
import {
  TopBoxProps,
  TrendingCoin,
  TrendingCoinsType,
} from "../../types/Types";
import useGetUserDeposit from "../../hooks/useGetUserDeposit";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { formatPercentage } from "../../helpers/formatPercentage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const TrendingCoins = ({ trendingCoins }: TrendingCoinsType) => {
  const { user } = useAuth();
  const { mutate: buyCoin, error } = useBuyCoin();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<TrendingCoin["item"] | null>(
    null
  );
  const { data: userDeposit, isLoading } = useGetUserDeposit();
  if (isLoading) return <Loader />;
  if (error) return <ErrorPage />;
  const handleBuyCoin = (amount: number) => {
    if (selectedCoin && user) {
      const newCryptoAsset = {
        coin_uid: selectedCoin.id,
        name: selectedCoin.name,
        symbol: selectedCoin.symbol,
        description: "",
        current_price: selectedCoin.data.price,
        market_cap_rank: selectedCoin.market_cap_rank ?? "N/A",
        image_url: selectedCoin.small,
        amount,
        users_permissions_users: [user.id],
      };
      const totalPrice = newCryptoAsset.amount * newCryptoAsset.current_price;
      try {
        if (userDeposit > totalPrice) {
          buyCoin(newCryptoAsset);
          const updatedDeposit = userDeposit - totalPrice;
          axiosInstance.put(`/users/${user?.id}`, {
            deposit: updatedDeposit,
          });
          toast.success(
            `Successfully bought ${amount} ${newCryptoAsset.name} coins!`
          );
        } else {
          toast.warn("Not enought money!Please deposit some");
        }
      } catch (error) {
        toast.error("Failed to complete the purchase. Please try again.");
      }
    }
  };

  return (
    <div className="topBox">
      <div className="top">
        <h2>Trending Coins</h2>
        <Link to="./coins">See More</Link>
      </div>
      <div className="list">
        {trendingCoins
          .map((coin) => {
            const { item } = coin;
            console.log(item);

            return (
              <>
                <Link
                  to={`/coins/${item.id}`}
                  className="listItem"
                  key={item.coin_id}
                >
                  <div className="coin">
                    <img src={item?.small} alt={item.symbol} />
                    <div className="coinTexts">
                      <span className="coinName">{item.name}</span>
                      <span className="price">
                        {formatPrice(item.data.price)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`market ${
                      item.data.price_change_percentage_24h.usd >= 0
                        ? "positive"
                        : "negative"
                    }`}
                    title={`24h change in %`}
                  >
                    {formatPercentage(
                      item.data.price_change_percentage_24h.usd
                    )}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCoin(item);
                      setOpen(true);
                    }}
                  >
                    Buy
                  </button>
                </Link>
                {open && selectedCoin === item && (
                  <Add item={item} setOpen={setOpen} onSubmit={handleBuyCoin} />
                )}
              </>
            );
          })
          .slice(0, 10)}
      </div>
    </div>
  );
};

export default TrendingCoins;
