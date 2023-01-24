import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import authService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Sidebar = () => {
    const navigate = useNavigate();
    
    const signOutUser = () => {authService.logout()
        navigate("/login");
    }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Bedaya</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() =>navigate("/")}>
            <DashboardIcon className="icon"  />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Invoices</span>
            </li>
          </Link>
          <Link to="/questions" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>questions</span>
            </li>
          </Link>
         
          <br></br>
          <br></br>
          


          <li onClick={signOutUser}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
        ></div>
        <div
          className="colorOption"
        ></div>
      </div>
      
    </div>
  );
};

export default Sidebar;