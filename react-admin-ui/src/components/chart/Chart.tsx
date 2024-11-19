import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Box, Skeleton } from "@mui/material";
import { useFetchCoinMarketChart } from "../../hooks/useFetchCoinMarkerChart";
import { ChangeEvent, useState } from "react";
import { formatPrice } from "../../helpers/formatPrice";

type ChartData = {
  timestamp: string;
  price: number;
};

type ChartProps = {
  id: string | undefined;
  selectedCurrency: string;
  handleCurrencyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Chart = ({ id, selectedCurrency, handleCurrencyChange }: ChartProps) => {
  const [chartDays, setChartDays] = useState<string>("30");

  const {
    data: marketChartData,
    isLoading: isMarketChartLoading,
    error: marketChartError,
  } = useFetchCoinMarketChart({
    id,
    vsCurrency: selectedCurrency,
    days: chartDays,
  });

  const handleChartDaysChange = (days: string) => {
    setChartDays(days);
  };

  if (isMarketChartLoading)
    return (
      <div className="chart">
        <Box
          sx={{
            width: 800,
            height: 300,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ height: "100%", borderRadius: 2 }}
          />
        </Box>
      </div>
    );

  const transformMarketChartData = (data: any) => {
    if (!data || !data.prices) {
      return [];
    }
    const { prices } = data;

    return prices.map((pricePoint: any) => {
      const [timestamp, price] = pricePoint;
      return {
        timestamp: new Date(timestamp).toLocaleDateString(),
        price,
      };
    });
  };

  const transformedData: ChartData[] =
    transformMarketChartData(marketChartData);

  return (
    <div className="chart">
      <div className="chartFilters">
        <div className="currency">
          <label htmlFor="currencySelect">
            Select Currency:
            <select
              id="currencySelect"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
            >
              <option value="usd">USD - United States Dollar</option>
              <option value="eur">EUR - Euro</option>
              <option value="jpy">JPY - Japanese Yen</option>
              <option value="gbp">GBP - British Pound Sterling</option>
              <option value="chf">CHF - Swiss Franc</option>
              <option value="cad">CAD - Canadian Dollar</option>
              <option value="aud">AUD - Australian Dollar</option>
              <option value="cny">CNY - Chinese Yuan</option>
              <option value="inr">INR - Indian Rupee</option>
              <option value="brl">BRL - Brazilian Real</option>
            </select>
          </label>
        </div>
        <div className="days">
          <label>
            Select Chart Duration:
            <select
              value={chartDays}
              onChange={(e) => handleChartDaysChange(e.target.value)}
            >
              <option value="1">1 Day</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="365">1 Year</option>
            </select>
          </label>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="timestamp" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333", // Dark background
              color: "#fff", // Light text color
            }}
            formatter={(value: number) =>
              `${formatPrice(value)} ${selectedCurrency}`
            }
          />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <Line
            type="monotone"
            dataKey="market_cap"
            stroke="#82ca9d"
            dot={false}
          />
          <Line type="monotone" dataKey="volume" stroke="#ffc658" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
