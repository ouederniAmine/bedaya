import "./questionTable.css";
import { DataGrid , GridColDef } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../assets/datatablesource";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
const QuestionTable = (props) => {
  const [data, setData] = useState({
    id:0,
    questionname:"", 
    choicename:"",
    variablename:"",
    pdflink:""
  });
  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    
    {
      field: "questionname",
      headerName: "Question",
      width: 230,
    },
  
    {
      field: "choicename",
      headerName: "Choice",
      width: 100,
    },
    {
      field: "variablename",
      headerName: "Variable",
      width: 100,
    }
   
  ];

  // get the questions list from server
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/fullResponse")
      .then((res) => {
        // map the data from response to the table
        let newData = {
          id:0,
          questionname:"", 
          choicename:"",
          variablename:"",
          pdflink:""
        }
        res.data.map((item)=>{
          newData.id = item.questionid
          newData.questionname = item.questionname
          newData.variablename = item.variablename
          newData.choicename = item.choicename
          newData.pdflink = item.pdflink
        })
        setData(res.data);
        console.log(res.data);
            })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    // delete the question from server
    axios
      .delete("http://localhost:3001/api/question/" + id)
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
            <Link to={"edit/" + params.row.id} style={{ textDecoration: "none" }}>
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