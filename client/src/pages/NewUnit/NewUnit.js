import "./NewUnit.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/searchBar/searchBar";
const NewUnit = ({ inputs, title }) => {
  // get data from variable api endpoint

  const [data, setData] = useState([{unitname: "loading"  }]);
  const navigate = useNavigate();
  const [unitName, setUnitName] = useState("");
 

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/fullChoice")
      .then((res) => {
        setData(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // handle the submit button
  const handleSubmit = (e) => {   
    e.preventDefault();



    const variable = {
      name:unitName,
    };
    axios
      .post("http://localhost:3001/api/unit", variable)
      .then((res) => {
        console.log(res);
        navigate("/app");
      })
      .catch((err) => {
        console.log(err);
      });

  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
                <div className="formInput" key={8}>
                <label>
                    Unit Name
                  </label>
                  <input className="formInput" type="text" onChange={(e)=>{setUnitName(e.target.value)}}></input>
                </div>
                
  
              <button onClick={handleSubmit}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUnit;