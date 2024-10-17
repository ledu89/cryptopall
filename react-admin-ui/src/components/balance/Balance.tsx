import "./balance.scss";
import { formatPrice } from "../../helpers/formatPrice";

import useGetUserDeposit from "../../hooks/useGetUserDeposit";
import Loader from "../loader/Loader";
import { Asset } from "../../pages/home/Home";

type BalanceProps = {
  userAssets: Asset[];
};
const Balance = ({ userAssets }: BalanceProps) => {
  const { data: userDeposit = 0, isLoading } = useGetUserDeposit();

  const totalAssets = userAssets.map(
    (asset: Asset) => asset.attributes.amount * asset.attributes.current_price
  );

  const totalBalance = totalAssets.reduce((acc: number, curr) => acc + curr, 0);

  if (isLoading) return <Loader />;

  return (
    <div className="totalAssetsWorth">
      <h2>Total coin's worth</h2>
      <div className="balance">
        <h2>{formatPrice(totalBalance)}</h2>
      </div>
      <div className="balanceDetails">
        <h6>Deposit: {formatPrice(userDeposit)}</h6>
      </div>
    </div>
  );
};

export default Balance;
