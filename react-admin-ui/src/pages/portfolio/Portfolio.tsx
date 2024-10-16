import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { formatPrice } from "../../helpers/formatPrice";
import { useFetchUserAssets } from "../../hooks/useFetchUserAssets";
import Loader from "../../components/loader/Loader";
import { Alert, Button, IconButton } from "@mui/material";
import { SellOutlined } from "@mui/icons-material";
import { useState } from "react";
import { CryptoCoin } from "../../types/Types";
import Add from "../../components/add/Add";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance, { updateCoinAmount } from "../../api/axiosInstance";
import useSellCoin from "../../hooks/useSellCoin";
import useGetUserDeposit from "../../hooks/useGetUserDeposit";
import { useAuth } from "../../context/AuthContext";

const Portfolio = () => {
  const columns: GridColDef[] = [
    {
      field: "image_url",
      headerName: "Symbol",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ width: "40px", height: "40px" }}
        />
      ),
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "current_price",
      headerName: "Price",
      type: "string",
      width: 150,
      editable: true,
      valueFormatter: (params) => formatPrice(params),
    },
    {
      field: "market_cap_rank",
      headerName: "Market Cap Rank",
      type: "string",
      width: 100,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "string",
      width: 100,
      // cellClassName: (params) => {
      //   const value = Number(params.value);
      //   return value >= 0 ? "positiveCell" : "negativeCell";
      // },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                setSelectedCoin(params.row);
                setOpen(true);
              }}
              title="Sell coin"
            >
              <SellOutlined />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin | null>(null);
  const { user } = useAuth();
  const { data: userAssets, isLoading: userAssetsisLoading } =
    useFetchUserAssets("crypto-assets");
  const { data: userDeposit, isLoading: userDepositIsLoading } =
    useGetUserDeposit();
  const { mutate: sellCoin } = useSellCoin();
  const url = useLocation();

  if (userAssetsisLoading && userDepositIsLoading) return <Loader />;

  const rows = userAssets?.data.map((asset) => ({
    id: asset.id,
    image_url: asset.attributes.image_url,
    name: asset.attributes.name,
    current_price: asset.attributes.current_price,
    market_cap_rank: asset.attributes.market_cap_rank,
    amount: asset.attributes.amount,
  }));

  const handleSellCoin = async (amount: number) => {
    if (selectedCoin === null) {
      toast.error("No coin selected for selling.");
      return;
    }

    const newAmount = selectedCoin.amount - amount;
    const newDeposit = userDeposit + amount * selectedCoin.current_price;
    console.log("newDeposit", newDeposit);

    try {
      await sellCoin({ coinId: selectedCoin.id, newAmount });
      await axiosInstance.put(`/users/${user?.id}`, {
        deposit: newDeposit,
      });
      toast.success(`Successfully sold ${amount} ${selectedCoin.name}.`);
    } catch (error) {
      toast.error(`Error selling ${selectedCoin.name}: ${error.message}`);
    }
  };
  return (
    <div className="portfolio">
      <div style={{ marginBottom: "20px" }} className="info">
        <h2>My portfolio</h2>
      </div>
      {userAssets.data.length < 1 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Alert icon={false} severity="info">
            <h3>Nothing here yet! Go buy some coins</h3>{" "}
            <Link to="/coins">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#8884d8",
                    "&:hover": {
                      backgroundColor: "#6663a7", // Button color on hover
                    }, // Custom button color
                  }}
                >
                  Buy here
                </Button>
              </div>
            </Link>
          </Alert>
        </div>
      ) : (
        <DataTable columns={columns} rows={rows} />
      )}
      {open && (
        <Add
          name={url.pathname.includes("/portfolio") ? "Sell" : "Buy"}
          item={selectedCoin}
          setOpen={setOpen}
          onSubmit={handleSellCoin}
          maxAmountOfCoins={selectedCoin?.amount}
        />
      )}
    </div>
  );
};

export default Portfolio;
