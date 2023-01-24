import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../assets/datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = (props) => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
{props.addNew
        ?  <div className="datatableTitle">
        Add New Question
        <Link to={"/questions/new"} className="link">
          Add New
        </Link>
      </div>
        :  <div className="datatableTitle">
        Invoices
      </div>
      }     
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;