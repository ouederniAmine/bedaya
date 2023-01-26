import "./NewChoice.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "../../components/searchBar/searchBar";
const NewChoice = ({ inputs, title }) => {
  // get data from variable api endpoint
  const [data, setData] = useState([{ unitname: "loading"  , variablename: "loading"}]);
  const [unit, setUnit] = useState("");
  const [variable, setVariable] = useState("");
  const [choiceName, setChoiceName] = useState("");
  const [choicePrice, setChoicePrice] = useState(0);
  const onChange = (event , choix) => {
    if (choix == 1) {
      setUnit(event.target.value);
    }
    else {
      setVariable(event.target.value);
    }
  };

  const onSearch = (searchTerm ,choix) => {
    if (choix == 1) {
      setUnit(searchTerm);
    }
    else {
      setVariable(searchTerm);
    }
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/fullChoice")
      .then((res) => {
        setData(res.data); 
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // handle the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    let questionid;
    //get the question id from the url
    const url = window.location.href;
    const urlParts = url.split("/");
    questionid = urlParts[urlParts.length - 1];
    //get the id of the unit and variable from data
    let unitid;
    let variableid;
    for (let i = 0; i < data.length; i++) {
      if (data[i].unitname === unit ) {
        unitid = data[i].unitid;
      }
      if (data[i].variablename === variable) {
        variableid = data[i].variableid;
      }
    }
     console.log(unitid);

    
    
    const variables = {
      name: choiceName,
      uservalue: 0,
      price: choicePrice,
      unitid: unitid,
      variableid: variableid,
      questionid : questionid,
    };
    axios
      .post("http://localhost:3001/api/choice", variables)
      .then((res) => {
        console.log(res);
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
                    Choice Name
                  </label>
                  <input  className="formInput" type="text" value={choiceName} onChange={(e)=>{setChoiceName(e.target.value)}}></input>
                </div>
                <div className="formInput" key={10}>
                <label>
                    Choice price
                  </label>
                  <input  className="formInput" type="number" value={choicePrice} onChange={(e)=>{setChoicePrice(e.target.value)}}></input>   </div>
               <div className="formInput" key={3}>
                  <label>Unit</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={unit} onChange={(e)=>onChange(e,1)} />
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = unit.toLowerCase();
              const fullName = item.unitname.toLowerCase();
              console.log(fullName);

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item ,i) => (
              <div
                onClick={() => onSearch(item.unitname ,1)}
                className="dropdown-row"
                key={i}
              >
                {item.unitname}
              </div>
            ))}
        </div>
      </div>                </div><div className="formInput" key={4}>
                  <label>Variable</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={variable} onChange={(e)=>onChange(e,2)} />
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = variable.toLowerCase();
              const fullName = item.variablename.toLowerCase();
              console.log(fullName);

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item ,i) => (
              <div
                onClick={() => onSearch(item.variablename,2)}
                className="dropdown-row"
                key={i}
              >
                {item.variablename}
              </div>
            ))}
        </div>
      </div>                       </div>
              <button onClick={handleSubmit}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChoice;