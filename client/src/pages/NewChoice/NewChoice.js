import "./NewChoice.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const NewChoice = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState("");
  const [unitName , setUnitName] = useState([{ name: "loading"  , variablename: "loading"}]);
  const [variableName , setVariableName] = useState([{ name: "loading"  , variablename: "loading"}]);
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
      .get("http://localhost:3001/api/variable")
      .then((res) => {
        setVariableName(res.data); 
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/unit")
      .then((res) => {
        setUnitName(res.data); 
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
    for (let i = 0; i < unitName.length; i++) {
      if (unitName[i].name === unit ) {
        unitid = unitName[i].id;
      }
    }
    for (let i = 0; i < variableName.length; i++) {
      if (variableName[i].name === variable ) {
        variableid = variableName[i].id;
      }
    }
     console.log(unitid," unitid");
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
        alert("Choice added successfully")
        navigate("/questions/edit/"+ questionid );
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
          {unitName
            .filter((item) => {
              console.log(item);
              const searchTerm = unit.toLowerCase();
              const fullName = item.name.toLowerCase();
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
                onClick={() => onSearch(item.name ,1)}
                className="dropdown-row"
                key={i}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>          <button onClick={(e)=>{e.preventDefault();navigate("/NewUnit")}}>add new Unit</button>       </div><div className="formInput" key={4}>
                  <label>Variable</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={variable} onChange={(e)=>onChange(e,2)} />
        </div>
        <div className="dropdown">
          {variableName
            .filter((item) => {
              const searchTerm = variable.toLowerCase();
              const fullName = item.name.toLowerCase();
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
                onClick={() => onSearch(item.name,2)}
                className="dropdown-row"
                key={i}
              >
                {item.name}
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