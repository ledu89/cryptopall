import React, { useState } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";

import { GridColDef } from "@mui/x-data-grid";
import { products, userRows } from "../../data";
import Add from "../../components/add/Add";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (param) => {
      return <img src={param.row.img || "./noavatar.png"} />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 150,
    editable: true,
  },

  {
    field: "price",
    headerName: "Price",
    type: "string",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",

    width: 150,
    type: "boolean",
  },
];
const Products = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
