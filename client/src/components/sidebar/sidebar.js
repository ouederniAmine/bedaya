import "./sidebar.css";

import authService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import img from "./logo.png";
import { useState } from "react";
const Sidebar = () => {
    const navigate = useNavigate();
    
    const signOutUser = () => {authService.logout()
        navigate("/login");
    }
    const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return ( <div className="flex">
  <div
    className={` ${
      open ? "w-72" : "w-20 "
    } bg h-screen p-5  pt-8 relative duration-300`}
  >
    <img
      src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png"
      className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
       border-2 rounded-full  ${!open && "rotate-180"}`}
      onClick={() => setOpen(!open)}
    />
    <div className="flex gap-x-4 items-center">
      <img
        src={img}
        className={`logo cursor-pointer duration-500 ${
          open && "rotate-[360deg]"
        }`}
        style={{ width: "50%" }}
      />
      
      <h1
        className={`text-white origin-left font-medium text-xl duration-200 ${
          !open && "scale-0"
        }`}
      >
        Bedaya
      </h1>
    </div>
    <ul className="pt-6 flex flex-col space-y-4">
      
        <li
          key={0}
          onClick={() => navigate("/app")}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          my-8"
            "bg-light-white"
           `}
        >
          <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Dashboard
          </span>
        </li> 
        <li
        onClick={() => navigate("/users")}
          key={1}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          my-8"
            "bg-light-white"
           `}
        >
          <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Folder.png`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Invoices
          </span>
        </li> 
        <li
          key={2}
          onClick={() => navigate("/questions")}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
         my-8"
            "bg-light-white"
           `}
        >
          <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Chat.png`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Questions
          </span>
        </li> 
        <li
         onClick={() => navigate("/variables")}
          key={3}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
         my-8"
            "bg-light-white"
           `}
        >
          <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Calendar.png`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Variables
          </span>
        </li> 
        <li 
          key={3}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
         my-8"
            "bg-light-white"
           `}
           style={{alignSelf:"baseline"}}
           onClick={signOutUser} 
        >
          <img src={`https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/Setting.png`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Sign Out
          </span>
        </li> 
      
    </ul>
  </div>
</div>
);
};

export default Sidebar;