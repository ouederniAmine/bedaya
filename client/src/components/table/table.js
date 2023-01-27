import "./table.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React from "react";
import { useState  , useEffect} from "react";
import axios from "axios";
const Table = (props) => {
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
        res.data.map((item)=>{
          newData.id = item.id
          newData.name = item.name
          newData.phone = item.phone
          newData.date = item.date
          newData.pdflink = item.pdflink
        })
        setData(res.data)
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

export default Table;