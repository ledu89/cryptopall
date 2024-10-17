import React from "react";
import "./home.scss";
import TopBox from "../../components/trendingCoins/TrendingCoins";
import CoinBox from "../../components/coinBox/CoinBox";
import chroma from "chroma-js";
import PieChartBox from "../../components/pieChartBox/PieChartBox";

import { useFetchCoins } from "../../hooks/useFetchCoins";
import Loader from "../../components/loader/Loader";
import { useFetchUserAssets } from "../../hooks/useFetchUserAssets";
import { CryptoCoin } from "../../types/Types";
import ErrorPage from "../ErrorPage/ErrorPage";
import Balance from "../../components/balance/Balance";
import { Alert } from "@mui/material";

export type Asset = {
  attributes: CryptoCoin;
};
const Home = () => {
  const {
    data: trending,
    isLoading: trendingLoading,
    error,
  } = useFetchCoins("/search/trending");
  const { data: userAssets, isLoading } = useFetchUserAssets("crypto-assets");
  if (isLoading || trendingLoading) return <Loader />;
  if (error) return <ErrorPage />;

  const assetsValue = userAssets?.data.map((asset: Asset) => {
    const { amount, current_price } = asset.attributes;
    const randomColor = chroma.random().hex();
    return {
      ...asset.attributes,
      totalAmount: amount * current_price,
      color: randomColor,
    };
  });
  const sortedAssets = assetsValue.sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  return (
    <div className="home">
      <div className="box trendingCoinBox">
        <TopBox trendingCoins={trending.coins} />
      </div>{" "}
      <div className="box balanceBox">
        <Balance userAssets={userAssets.data} />
      </div>{" "}
      <div className="box pieChartBox">
        {" "}
        <PieChartBox sortedAssets={sortedAssets} />
      </div>
      <div className="box ">
        {sortedAssets.length > 0 || sortedAssets.length === 1 ? (
          <CoinBox sortedAssets={sortedAssets[0]} />
        ) : (
          <h3>Your coins will show here</h3>
        )}
      </div>
      <div className="box">
        {sortedAssets.length > 1 || sortedAssets.length === 2 ? (
          <CoinBox sortedAssets={sortedAssets[1]} />
        ) : (
          <h3>Your coins will show here</h3>
        )}
      </div>
      <div className="box ">
        {sortedAssets.length > 2 || sortedAssets.length === 3 ? (
          <CoinBox sortedAssets={sortedAssets[2]} />
        ) : (
          <h3>Your coins will show here</h3>
        )}
      </div>
      <div className="box ">
        {" "}
        {sortedAssets.length > 3 || sortedAssets.length === 4 ? (
          <CoinBox sortedAssets={sortedAssets[3]} />
        ) : (
          <h3>Your coins will show here</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
