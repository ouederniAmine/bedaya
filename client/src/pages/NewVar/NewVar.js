import "./NewVar.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/searchBar/searchBar";
import { Checkbox } from "@mui/material";
const NewVar = ({ inputs, title }) => {
  // get data from variable api endpoint

  const [data, setData] = useState([{ variablename: "loading" , unitname: "loading" , var1name: "loading" , var2name: "loading" , operationtype: "loading" }]);
  const navigate = useNavigate();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [var1name , setVar1name] = useState([{name: "loading"}]);
  const [var2name , setVar2name] = useState([{name: "loading"}]);
  const [unitname , setUnitname] = useState([{name: "loading"}]);
  const [edit , setEdit] = useState(false);
  //state of var name
  const [varname, setVarname] = useState("");
  //state of operation type
  const [operationtype, setOperationtype] = useState("+");
  const onChange = (event , choix) => {
    if (choix == 1) {

      setValue1(event.target.value);
    }
    else if (choix == 2) {
      setValue2(event.target.value);
    } 
    else {
      setValue3(event.target.value);
    }
  };

  const onSearch = (searchTerm ,choix) => {
    if (choix == 1) {
      setValue1(searchTerm);
    }
    else if (choix == 2) {
      setValue2(searchTerm);
    }
    else {
      setValue3(searchTerm);
    }
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/variable")
      .then((res) => {
        setVar1name(res.data); 
        setVar2name(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/unit")
      .then((res) => {
        setUnitname(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
    console.log(e.target);
    console.log("form submitted");
    //get id from data where name = unitname
    if (edit){
      const unitid = unitname.find((element) => element.name == value3).id;
      const var2id = var2name.find((element) => element.name == value2).id;
      const var1id = var1name.find((element) => element.name == value1).id;
  
  
      const variable = {
        name:varname,
        value: 0,
        var1id: var1id,
        unitid: unitid,
        var2id: var2id,
        operationtype: operationtype,
      };
      axios
        .post("http://localhost:3001/api/variable", variable)
        .then((res) => {
          console.log(res);
          
          navigate("/variables");
        })
        .catch((err) => {
          console.log(err);
        });

    }else{
      const unitid = unitname.find((element) => element.name == value3).id;
      const variable = {
        name:varname,
        value: 0,
        unitid: unitid,
      };
      axios
        .post("http://localhost:3001/api/simplevariable", variable)
        .then((res) => {
          console.log(res);
          navigate("/variables");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  

  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Create your new variable</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
                <div className="formInput" key={8}>
                <label>
                    Variable Name
                  </label>
                  <input className="formInput" type="text" onChange={(e)=>{setVarname(e.target.value)}}></input>
                </div>
                <div className="formInput" key={1}>
                  <label>Has operation ? </label>
                  <Checkbox onChange={(e)=>setEdit(!edit)}></Checkbox>
                </div>

                {//render when edit is true
                edit &&
                
                <div>
                <div className="formInput" key={2}>
                  
                  <label>Operation Type</label>

                  <select name="cars" id="cars"  onChange={(e)=>{setOperationtype(e.target.value)}}>
  <option value="+">+</option>
  <option value="-">-</option>
  <option value="/">/</option>
  <option value="*">*</option>
</select>                </div><div className="formInput" key={3}>
                  <label>Variable1 ID</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value1} onChange={(e)=>onChange(e,1)} />
        </div>
        <div className="dropdown">
          {
          
          var1name
            .filter((item) => {
              console.log(item);
              console.log(value1);
              const searchTerm = value1.toLowerCase();
              console.log(item);
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
      </div>                </div><div className="formInput" key={4}>
                  <label>Variable2 ID</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value2} onChange={(e)=>onChange(e,2)} />
        </div>
        <div className="dropdown">
          {var2name
            .filter((item) => {
              const searchTerm = value2.toLowerCase();
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
      </div>}
      <div className="formInput" key={7}>
                  <label>Unit</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value3} onChange={(e)=>onChange(e,3)} />
        </div>
        <div className="dropdown">
          {unitname
            .filter((item) => {
              console.log(item);
              console.log(value3);
              const searchTerm = value3.toLowerCase();
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
                onClick={() => onSearch(item.name,3)}
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

export default NewVar;