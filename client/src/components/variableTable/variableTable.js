import "./variableTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
const VariableTable = (props) => {
  const [data, setData] = useState({
    id:0,
    unitname:"", 
    variablename:"",
  });
  // get the variable list from server
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/fullVariable")
      .then((res) => {
        let newData = {
          id:0,
          variablename:"",
          unitname:""        }
        res.data.map((item)=>{
          newData.id = item.id
          newData.questionid = item.questionid
          newData.variablename = item.variablename
          newData.unitname = item.unitname
        })
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const userColumns = [
    { field: "id", headerName: "ID", width: 200    },
    
  
  
    {
      field: "variablename",
      headerName: "Variable Name",
      width: 200,
    },
    {
      field: "unitname",
      headerName: "Unit Name",
      width: 200,
    }
   
  ];

  const handleDelete = (id) => {
    // delete the variable from server
    axios
      .delete("http://localhost:3001/api/variable/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    
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
            <Link to={"edit/"+ params.row.id} style={{ textDecoration: "none" }}>
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