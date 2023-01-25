import "./variableTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
const VariableTable = (props) => {
  const [data, setData] = useState({});
  // get the variable list from server
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/variable")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    
    {
      field: "VariableName",
      headerName: "Variable Name",
      width: 200,
    },
  
    {
      field: "VariableValue",
      headerName: "Variable Value",
      width: 200,
    },
    {
      field: "VariableFactor",
      headerName: "Variable Factor",
      width: 200,
    }
   
  ];

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  console.log(window.location.href.split("/").pop()+"/new");

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"edit"} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
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
  <div className="datatableTitle">
  Variable Lists

        <Link to={"new"} className="link">
          Add New
        </Link>
      </div>
        
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

export default VariableTable;