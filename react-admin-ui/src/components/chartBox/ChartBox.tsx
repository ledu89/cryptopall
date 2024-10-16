import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatPrice } from "../../helpers/formatPrice";
// type Props = {
//   color: string;
//   icon: string;
//   title: string;
//   dataKey: string;
//   number: number | string;
//   percentage: Number;
//   chartData: object[];
// };
const ChartBox = ({ sortedAssets }) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={sortedAssets?.image_url} alt="" />
          <span>{sortedAssets?.name}</span>
        </div>
        <h1>{formatPrice(sortedAssets?.totalAmount)}</h1>
        <Link
          style={{ color: sortedAssets?.color }}
          to={`/coins/${sortedAssets?.name?.toLowerCase()}`}
        >
          More details
        </Link>
      </div>
      <div className="chartInfo">
        {/* <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{
                  background: "transparent",
                  border: "none",
                }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 60 }}
              />
              <Line
                dot={false}
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
        <div className="texts">
          {/* <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span> */}
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
