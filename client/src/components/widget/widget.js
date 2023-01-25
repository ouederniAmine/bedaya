import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;
  //get all the users number from the client table
  const [users, setUsers] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/clients")
      .then((res) => {
        setUsers(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //get all the invoices number from the invoice table
  const [invoices, setInvoices] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/invoices")
      .then((res) => {
        setInvoices(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "invoice":
      data = {
        title: "INVOICES",
        isMoney: false,
        link: "View all invoices",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {users.length && "$"} {data.title === "USERS" ? users : invoices}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;