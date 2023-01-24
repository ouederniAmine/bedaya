import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import "./home.css"
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Widget from '../components/widget/widget';
import table from '../components/table/table';
import authService from '../services/auth.service';
export default function HomePage(){
    const navigate = useNavigate();
    
    const signOutUser = () => {authService.logout()
        navigate("/login");
    }
    return(
        <div className='home'>

        <Sidebar/>
    
        
            <div className="homeContainer">
                <Navbar/>

                <div className='widgets'>
                    <Widget type='user'/>
                    <Widget type='invoice'/>
                </div>
                <div className='listContainer'>
                    <div className='listTitle'>Latest Invoices</div>
                    <table>hey</table>
                </div>
                </div>
        </div>
    )
}