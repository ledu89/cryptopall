import "./bigChartBox.scss";
import { formatPrice } from "../../helpers/formatPrice";
import { CryptoCoin } from "../../api/axiosInstance";
import useGetUserDeposit from "../../hooks/useGetUserDeposit";
import Loader from "../loader/Loader";

const BigChartBox = ({ userAssets }) => {
  const { data: userDeposit = 0, isLoading } = useGetUserDeposit();

  const totalAssets = userAssets.data.map(
    (asset: CryptoCoin) =>
      asset.attributes.amount * asset.attributes.current_price
  );

  const totalBalance = totalAssets.reduce((acc, curr) => acc + curr, 0);

  if (isLoading) return <Loader />;

  return (
    <div className="totalAssetsWorth">
      <h2>Total assets worth</h2>
      <div className="balance">
        <h2>{formatPrice(totalBalance)}</h2>
      </div>
      <div className="balanceDetails">
        <h6>Deposit: {formatPrice(userDeposit)}</h6>
      </div>
    </div>
  );
};

export default BigChartBox;
