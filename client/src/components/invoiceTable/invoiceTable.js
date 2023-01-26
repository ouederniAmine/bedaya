import "./invoiceTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React from "react";
import { useState  , useEffect} from "react";
import axios from "axios";
const InvoiceTable = (props) => {
  const [data, setData] = useState({
    id:0,
    name:"", 
    phone:"",
    date:"",
    pdflink:""
  });

  useEffect(() => {
    let arr =[]

    axios
      .get("http://localhost:3001/api/invoices")
      .then((res) => {
        setData(res.data);
        })

      .catch((err) => {
        console.log(err);
      });
      //map all the element of data state
      
      //left everything here!!!
      
      axios
      .get("http://localhost:3001/api/clients")
      .then((res) => {
        console.log(res.data);
        let newData = {
          id:0,
          name:"", 
          phone:2,
          date:"",
          pdflink:""
        }
        res.data.map(element => {
          for(let i = 0 ; i< res.data.length ; i++){
            if (res.data[i].id === element.clientid){
              setData(data.map((row) => ({ ...row, name: res.data[i].name })));
            }
          }
          
        });
        setData(newData)
        console.log(newData)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    
    {
      field: "name",
      headerName: "Client Name",
      width: 230,
    },
  
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "date",
      headerName: "Created on",
      width: 200,
    },
    {
      field: "pdfLink",
      headerName: "PDF Link",
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
         Invoices
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

export default InvoiceTable;