import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";

type Props = {
  columns: GridColDef[];
  rows: object[];
};

const DataTable = (props: Props) => {
  // const actionColumn: GridColDef = {
  //   field: "action",
  //   headerName: "Action",
  //   width: 200,
  //   renderCell: (params) => {
  //     return (
  //       <div className="action">
  //         <Link to={`${params.row.id}`}>
  //           <Tooltip title="View coin">
  //             <IconButton>
  //               <RemoveRedEye />
  //             </IconButton>
  //           </Tooltip>
  //         </Link>
  //         <div className="delete" onClick={() => handleDelete(params.row.id)}>
  //           <Tooltip title="Buy coin">
  //             <IconButton>
  //               <AccountBalanceWallet />
  //             </IconButton>
  //           </Tooltip>
  //         </div>
  //       </div>
  //     );
  //   },
  // };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
