import { IconButton } from "@mui/material";
import "./add.scss";

import { useState } from "react";
import { CloseOutlined } from "@mui/icons-material";

type Props = {
  item: object | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (amount: number) => void;
  name?: "Buy" | "Sell";
  maxAmountOfCoins?: number | undefined;
};

const Add = ({
  item,
  setOpen,
  onSubmit,
  name = "Buy",
  maxAmountOfCoins,
}: Props) => {
  const [amount, setAmount] = useState<number>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount) {
      onSubmit(amount);
    }
    setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          <IconButton color="info">
            <CloseOutlined fontSize="medium" />
          </IconButton>
        </span>
        <h1>
          {name} {item.name}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Amount</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max={maxAmountOfCoins}
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              placeholder={
                maxAmountOfCoins
                  ? `Maximum amount is ${maxAmountOfCoins}`
                  : "How much"
              }
            />
          </div>

          <button>{name}</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
