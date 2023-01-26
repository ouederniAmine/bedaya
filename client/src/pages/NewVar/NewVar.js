import "./NewVar.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/searchBar/searchBar";
const NewVar = ({ inputs, title }) => {
  // get data from variable api endpoint

  const [data, setData] = useState([{ variablename: "loading" , unitname: "loading" , var1name: "loading" , var2name: "loading" , operationtype: "loading" }]);
  const navigate = useNavigate();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  //state of var name
  const [varname, setVarname] = useState("");
  //state of operation type
  const [operationtype, setOperationtype] = useState("");
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
    const unitid = data.find((element) => element.unitname == value3).unitid;
    const var2id = data.find((element) => element.variablename == value2).unitid;
    const var1id = data.find((element) => element.variablename == value1).unitid;


    const variable = {
      name:varname,
      value: 0,
      var1id: var1id,
      var2id: var2id,
      operationtype: operationtype,
      unitid: unitid,
    };
    axios
      .post("http://localhost:3001/api/variable", variable)
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
                    Variable Name
                  </label>
                  <input className="formInput" type="text" onChange={(e)=>{setVarname(e.target.value)}}></input>
                </div>
              
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
          
          data
            .filter((item) => {
              console.log(item);
              console.log(value1);
              const searchTerm = value1.toLowerCase();
              console.log(item);
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
                onClick={() => onSearch(item.variablename ,1)}
                className="dropdown-row"
                key={i}
              >
                {item.variablename}
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
          {data
            .filter((item) => {
              const searchTerm = value2.toLowerCase();
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
      <div className="formInput" key={7}>
                  <label>Unit</label>
                  <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value3} onChange={(e)=>onChange(e,3)} />
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value3.toLowerCase();
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
                onClick={() => onSearch(item.unitname,3)}
                className="dropdown-row"
                key={i}
              >
                {item.unitname}
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