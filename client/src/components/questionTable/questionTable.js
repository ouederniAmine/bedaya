import "./questionTable.css";
import { DataGrid , GridColDef } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../assets/datatablesource";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
const QuestionTable = (props) => {
  const [data, setData] = useState({});
  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    
    {
      field: "questionText",
      headerName: "Question",
      width: 230,
    },
  
    {
      field: "choice",
      headerName: "Choice",
      width: 100,
    },
    {
      field: "variable",
      headerName: "Variable",
      width: 100,
    }
   
  ];
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];
  // get the variable list from server
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/variable")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
<div className="datatableTitle">
 Questions List
        <Link to={ "new"} className="link">
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

export default QuestionTable;