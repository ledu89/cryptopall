import { useState } from "react";
import "./coins.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";

import useCoinsMarketData from "../../hooks/useCoinsMarketData";
import { formatPrice } from "../../helpers/formatPrice";

import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { AccountBalanceWallet, RemoveRedEye } from "@mui/icons-material";
// import { buyCoin } from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { CryptoCoin, SelectedCoin } from "../../types/Types";
import useBuyCoin from "../../hooks/useBuyCoin";
import useGetUserDeposit from "../../hooks/useGetUserDeposit";
import Loader from "../../components/loader/Loader";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import ErrorPage from "../ErrorPage/ErrorPage";

const Coins = () => {
  const { mutate: buyCoin } = useBuyCoin();
  const columns: GridColDef[] = [
    {
      field: "img",
      headerName: "Symbol",
      width: 100,
      renderCell: (param) => {
        return <img src={param.row.image || "./noavatar.png"} />;
      },
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 150,
      editable: false,
    },

    {
      field: "current_price",
      headerName: "Price",
      type: "string",
      width: 150,
      editable: false,
      valueFormatter: (params) => formatPrice(params),
    },
    {
      field: "price_change_24h",
      headerName: "24h",
      type: "string",
      width: 100,
      valueFormatter: (params) => `$${params.toFixed(2)}`,
      cellClassName: (params) => {
        const value = Number(params.value);
        return value >= 0 ? "positiveCell" : "negativeCell";
      },
    },
    {
      field: "price_change_percentage_24h",
      headerName: "24h %",
      type: "string",
      width: 100,
      valueFormatter: (params) => `${params.toFixed(2)}%`,
      cellClassName: (params) => {
        const value = Number(params.value);
        return value >= 0 ? "positiveCell" : "negativeCell";
      },
    },
    {
      field: "high_24h",
      headerName: "24h High",
      width: 120,
      type: "number",
      valueFormatter: (params) => `$${params.toLocaleString()}`,
    },
    {
      field: "low_24h",
      headerName: "24h Low",
      width: 120,
      type: "number",
      valueFormatter: (params) => `$${params.toLocaleString()}`,
    },
    {
      field: "total_volume",
      headerName: "24h Volume",
      width: 200,
      type: "number",
      valueFormatter: (params) => `$${params.toLocaleString()}`,
    },
    {
      field: "market_cap",
      headerName: "Market Cap",
      width: 200,
      type: "number",
      valueFormatter: (params) => `$${params.toLocaleString()}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={`${params.row.id}`}>
              <IconButton>
                <RemoveRedEye />
              </IconButton>
            </Link>
            <div
              className="delete"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCoin(params.row);
                setOpen(true);
              }}
            >
              <IconButton>
                <AccountBalanceWallet />
              </IconButton>
            </div>
          </div>
        );
      },
    },
  ];
  const { user } = useAuth();
  const {
    data: userDeposit,
    isLoading: userDepositLoading,
    error: userDepositError,
  } = useGetUserDeposit();
  const [open, setOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<SelectedCoin | null>(null);
  const {
    data: coins,
    isLoading: coinsIsLoading,
    error: marketDataError,
  } = useCoinsMarketData("usd");

  if (coinsIsLoading || userDepositLoading) return <Loader />;
  if (userDepositError || marketDataError)
    return <ErrorPage error={userDepositError || marketDataError} />;
  const handleBuyCoin = (amount: number) => {
    if (selectedCoin && user) {
      const newCryptoAsset = {
        coin_uid: selectedCoin.id,
        name: selectedCoin.name,
        symbol: selectedCoin.symbol,
        description: "",
        current_price: selectedCoin.current_price,
        market_cap_rank: selectedCoin.market_cap_rank ?? "N/A",
        image_url: selectedCoin.image,
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
  console.log(selectedCoin);

  return (
    <div className="coins">
      <div className="info">
        <h2>See all marketplace coins</h2>
      </div>
      <DataTable columns={columns} rows={coins} />
      {open && selectedCoin && (
        <Add item={selectedCoin} setOpen={setOpen} onSubmit={handleBuyCoin} />
      )}
    </div>
  );
};

export default Coins;
