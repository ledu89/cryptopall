import { Link } from "react-router-dom";
import "./coinBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatPrice } from "../../helpers/formatPrice";
import { CryptoCoin } from "../../types/Types";

type CoinBoxProps = {
  sortedAssets: CryptoCoin;
};
const CoinBox = ({ sortedAssets }: CoinBoxProps) => {
  console.log(sortedAssets);

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
        <div className="texts">
          <span title="price" className="duration">
            {formatPrice(sortedAssets.current_price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoinBox;
