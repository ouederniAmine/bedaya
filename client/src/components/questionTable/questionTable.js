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
    choicename:""
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
      width: 400,
    }
  ];

  // get the questions list from server
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/fullQuestion")
      .then((res) => {
        //change the data to fit the data grid and set the data
      
        let data =[]
        res.data.map((item)=>{
          let newData = {
            id:0,
            questionname:"",
            choicename:""
          }
          console.log(item)
          newData.id = item.questionID
          newData.questionname = item.questionName
          // format the choices to be a string
          let choices = ""
          for (let i = 0; i < item.choices.length; i++) {
            choices += item.choices[i].name + ",";
          }
          newData.choicename = choices

          data.push(newData)
        })
        
        setData(data);
        
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