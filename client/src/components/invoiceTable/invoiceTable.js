import "./invoiceTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React from "react";
import { useState  , useEffect} from "react";
import axios from "axios";
const InvoiceTable = (props) => {
  const [data, setData] = useState({
    id:1,
    name:"", 
    phone:"",
    date:"",
    pdflink:""
  });
  const [length, setLength] = useState(0);
  useEffect(() => {
    let arr =[]

    axios
      .get("http://localhost:3001/api/invoices")
      .then((res) => {
        setLength(res.data.length);
        setData(res.data);
        })
      .catch((err) => {
        console.log(err);
      });
      axios
      .get("http://localhost:3001/api/clients")
      .then((res) => {
        //update the data with the client name
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (data[i].clientid == res.data[j].id) {
              data[i].name = res.data[j].name;
              data[i].phone = res.data[j].phone;
              data[i].date = res.data[j].date;            }
          }
        }
        setData(data);
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
    //delete invoice from database
    axios
      .delete("http://localhost:3001/api/invoice/" + id)
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
            <Link to={"/users/"+params.row.id }style={{ textDecoration: "none" }}>
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