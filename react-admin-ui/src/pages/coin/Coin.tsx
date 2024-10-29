import { useFetchSingleCoin } from "../../hooks/useFetchSingleCoin";

import { Link, useParams } from "react-router-dom";
import { formatPercentage } from "../../helpers/formatPercentage";

import "./coin.scss";

import { ChangeEvent, useState } from "react";
import Loader from "../../components/loader/Loader";

import Chart from "../../components/chart/Chart";
import { formatPrice } from "../../helpers/formatPrice";
import ErrorPage from "../ErrorPage/ErrorPage";

const Coin = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const { id } = useParams<string>();
  const endpoint: string = `/coins`;

  const {
    data: singleCoinData,
    isLoading: isSingleCoinLoading,
    isError: singleCoinError,
  } = useFetchSingleCoin({ endpoint, id });

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };
  if (isSingleCoinLoading) return <Loader />;
  if (singleCoinError) return <ErrorPage error={singleCoinData} />;

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {singleCoinData?.image && (
              <img src={singleCoinData.image.large} alt="" />
            )}
            <div className="title">
              <div>
                <h1>{singleCoinData.name}</h1>
                <small>{singleCoinData.symbol}</small>
              </div>
              <div className="links">
                {singleCoinData.links.homepage.map((link: string) => (
                  <Link to={link} target="_blank">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            <div className="percentage">
              <span
                className={
                  singleCoinData.market_data.price_change_percentage_24h > 0
                    ? "positiveCell"
                    : "negativeCell"
                }
              >
                {formatPercentage(
                  singleCoinData.market_data.price_change_percentage_24h
                )}{" "}
              </span>
              <small>(24h)</small>
            </div>
            <div className="currentPrice">
              <h1>
                {formatPrice(
                  singleCoinData.market_data.current_price[selectedCurrency]
                )}
              </h1>
              <p> ({selectedCurrency})</p>
            </div>
          </div>

          <p
            className="details"
            dangerouslySetInnerHTML={{
              __html: singleCoinData.description.en.replace(
                /\$([^\s]*)/g,
                '<a href="https://www.coingecko.com/en?hashing_algorithm=$1">$1</a>'
              ),
            }}
          ></p>

          <div className="additionalInfo">
            <p>Market rank: {singleCoinData.market_cap_rank}</p>
            <p>
              All Time high (ath):{" "}
              {singleCoinData.market_data.ath[selectedCurrency]}{" "}
              {selectedCurrency}
            </p>
            <p>
              24h high : {singleCoinData.market_data.high_24h[selectedCurrency]}{" "}
              {selectedCurrency}
            </p>
            <p>
              24h low : {singleCoinData.market_data.low_24h[selectedCurrency]}{" "}
              {selectedCurrency}
            </p>
            <p>
              Total Volume :{" "}
              {singleCoinData.market_data.total_volume[selectedCurrency]}{" "}
              {selectedCurrency}
            </p>
          </div>
        </div>
        <hr />
        <Chart
          id={id}
          selectedCurrency={selectedCurrency}
          handleCurrencyChange={handleCurrencyChange}
        />
      </div>
      {/* <div className="activities">
        <h2>Recent Market Data</h2>
        <ul>
          {transformedData.slice(0, 10).map((data, index) => (
            <li key={index}>
              <p>Date: {data.timestamp}</p>
              <p>
                Price: {data.price.toFixed(4)} {selectedCurrency.toUpperCase()}
              </p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Coin;
