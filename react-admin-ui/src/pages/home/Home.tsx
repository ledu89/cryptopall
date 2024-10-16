import React from "react";
import "./home.scss";
import TopBox from "../../components/trendingCoins/TrendingCoins";
import ChartBox from "../../components/chartBox/ChartBox";
import chroma from "chroma-js";
// import {
//   barChartBoxRevenue,
//   barChartBoxVisit,
//   chartBoxConversion,
//   chartBoxProduct,
//   chartBoxRevenue,
//   chartBoxUser,
// } from "../../data";

// import BarChartBox from "../../components/barChartBox/BarChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import { useFetchCoins } from "../../hooks/useFetchCoins";
import Loader from "../../components/loader/Loader";
import { useFetchUserAssets } from "../../hooks/useFetchUserAssets";
import { CryptoCoin } from "../../types/Types";

type Asset = {
  attributes: CryptoCoin;
};
const Home = () => {
  const {
    data: trending,
    isLoading: trendingLoading,
    error,
  } = useFetchCoins("/search/trending");
  const { data: userAssets, isLoading } = useFetchUserAssets("crypto-assets");
  if (isLoading) return <Loader />;

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

  if (trendingLoading) return <Loader />;
  if (error) return <div>Error</div>;

  return (
    <div className="home">
      <div className="box box1">
        <TopBox trendingCoins={trending.coins} />
      </div>{" "}
      <div className="box box7">
        <BigChartBox userAssets={userAssets} />
      </div>
      {!userAssets.data ? (
        <h1>No assets yet... Buy some here</h1>
      ) : (
        <>
          {" "}
          <div className="box box4">
            {" "}
            <PieChartBox sortedAssets={sortedAssets} />
          </div>
          <div className="box box2">
            {sortedAssets.length > 0 || sortedAssets.length === 1 ? (
              <ChartBox sortedAssets={sortedAssets[0]} />
            ) : (
              <h2>Please buy more coins</h2>
            )}
          </div>
          <div className="box box3">
            {sortedAssets.length > 1 || sortedAssets.length === 2 ? (
              <ChartBox sortedAssets={sortedAssets[1]} />
            ) : (
              <h2>Please buy more coins</h2>
            )}
          </div>
          <div className="box box5">
            {sortedAssets.length > 2 || sortedAssets.length === 3 ? (
              <ChartBox sortedAssets={sortedAssets[2]} />
            ) : (
              <h2>Please buy more coins</h2>
            )}
          </div>
          <div className="box box6">
            {" "}
            {sortedAssets.length > 3 || sortedAssets.length === 4 ? (
              <ChartBox sortedAssets={sortedAssets[3]} />
            ) : (
              <h2>Please buy more coins</h2>
            )}
          </div>
        </>
      )}
      {/* <div className="box box8">
        {" "}
        <BarChartBox {...barChartBoxVisit} />
      </div> */}
      {/* <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div> */}
    </div>
  );
};

export default Home;
