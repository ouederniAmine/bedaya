import { Outlet } from 'react-router-dom';
import React from 'react';
import LoginPage  from '../pages/Login';
import AuthService from "../services/auth.service";

const PrivateRoute = () => {
    const user = AuthService.getCurrentUser();
    
    if(user){
        console.log("user is not null");
    }else{
        console.log("user is null");
    }
  
    return  user !== null ? (
      <Outlet />
    ) : (
      <LoginPage />
    );
  };

  export default PrivateRoute;